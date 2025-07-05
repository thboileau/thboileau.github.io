---
title: Testing
longTitle: Oracle XDB Restlet Adapter - Testing
weight: 4
---
* Testing using a browser

Test your __REST__ examples with your favorite browser using these URLs (they where configured as __XMLDB__ Servlets by src/com.noelios.restlet.ext.xdb_11.1/resources/sql/postInstall.sql script):


{{< highlight bash "style=emacs" >}}http://localhost:8080/searchapp/search?kwd=marcelo+ochoa
http://localhost:8080/userapp/users/scott/orders/300
{{< /highlight >}}


Note: XMLDB is an HTTP 1.0 complaint connector, usually modern browsers try to connect using HTTP 1.1 so you can experiment that the browser leave the connection open because is trying to use Keep-alive feature.


* Tests using telnet


Some test can be done by using telnet application to see which headers are sent and got as response from __REST WS__. For example:


{{< highlight bash "style=emacs" >}}[mochoa@mochoa resources]$ telnet localhost 8080
Trying 127.0.0.1...
Connected to live.dbprism.mochoa.dyndns.org (127.0.0.1).
Escape character is '^]'.
GET /userapp/users/scott/orders/300 HTTP/1.0


HTTP/1.1 200 OK
MS-Author-Via: DAV
DAV: 1,2,<http://www.oracle.com/xdb/webdav/props>
Date: Tue, 03 Jun 2008 19:18:11 GMT
Server: Noelios-Restlet-Engine/1.1.snapshot
Content-Type: text/plain; charset=ISO-8859-1
Vary: Accept-Charset, Accept-Encoding, Accept-Language, Accept
Content-Length: 28



__Order "300" for user "scott"__
{{< /highlight >}}


* Minimalistic test comparing REST versus native SOAP

** Benchmarking REST application


As you can see in a previous section there is simple User application which returns orders for __scott__ user. Using __ApacheBench__ you can test the application executing:

{{< highlight bash "style=emacs" >}}ab -n {total_request} -c {concurrent_request} http://localhost:8080/userapp/users/scott/orders/300
{{< /highlight >}}

Where __total_request__ is number of request sent by Apache benchmark paralleling it in __concurrent_request__ request.
A result of this execution on my notebook can be compared in [this Google sheet](http://spreadsheets.google.com/pub?key=pAl-EJ5Wtb_10aTyfnO1dUw).


** Testing a similar __WS__ implemented using SOAP


A similar functionality can be implemented using __[XMLDB Native SOAP WS](http://download.oracle.com/docs/cd/B28359_01/appdev.111/b28369/xdb_web_services.htm#CHDDBCHB)__.
For doing that create this Java source at Scott's schema:

create or replace and compile java source named "my.OrderCalculator" as

{{< highlight java "style=emacs" >}}package my;

import java.util.logging.Level;
import java.util.logging.Logger;

public class OrderCalculator {
    /**
     * Java Util Logging variables and default values
     */
    private static Logger logger = null;

    /**
     * Constant used to get Logger name
     */
    static final String CLASS_NAME = OrderCalculator.class.getName();

    static {
            logger = Logger.getLogger(CLASS_NAME);
            logger.setLevel(Level.ALL);
    }

   public static String getOrder(String userName, int orderId) {
        logger.entering(CLASS_NAME,"getOrder",new Object [] {userName,new Integer(orderId)});
        logger.exiting(CLASS_NAME,"getOrder","Order '"+orderId+"' for user '"+userName+"'");
        return "Order '"+orderId+"' for user '"+userName+"'";
   }
}
{{< /highlight >}}


Note that I have added JDK Logging functionality to compare a closer example to Restlet functionality, obviously routing and many other default Restlet functionalities are not compared with this example.
And his __PLSQL__ Call Spec:


{{< highlight sql "style=emacs" >}}CREATE OR REPLACE PACKAGE orders_calculator AUTHID CURRENT_USER AS
  FUNCTION getOrder(user_name IN VARCHAR2, order_id IN NUMBER) RETURN VARCHAR2
as LANGUAGE JAVA NAME
     'my.OrderCalculator.getOrder(java.lang.String, int) return
java.lang.String';
END orders_calculator;
/
{{< /highlight >}}


As you can see OrderCalculator class is using JDK logging package, to get JDK logging working this grant is required:


{{< highlight sql "style=emacs" >}}SQL> exec dbms_java.grant_permission( 'SCOTT',
'SYS:java.util.logging.LoggingPermission', 'control', '' );
SQL> commit;
{{< /highlight >}}


Finally to send a POST message using Apache benchmark its necessary to edit a POST XML message like:


{{< highlight xml "style=emacs" >}}<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://xmlns.oracle.com/orawsv/SCOTT/ORDERS_CALCULATOR/GETORDER">
   <env:Header/>
   <env:Body>
      <ns1:SVARCHAR2-GETORDERInput>
<ns1:USER_NAME-VARCHAR2-IN>scott</ns1:USER_NAME-VARCHAR2-IN>
         <ns1:ORDER_ID-NUMBER-IN>300</ns1:ORDER_ID-NUMBER-IN>
      </ns1:SVARCHAR2-GETORDERInput>
   </env:Body>
</env:Envelope>
{{< /highlight >}}


The ApacheBench command line will look like:

{{< highlight bash "style=emacs" >}}ab -A scott:tiger -H 'SOAPAction: "GETORDER"' -p /tmp/soap-post-func.txt -n {total_request} -c {concurrent_request} http://localhost:8080/orawsv/SCOTT/ORDERS_CALCULATOR/GETORDER
{{< /highlight >}}

Where:

 - -A scott:tiger is the HTTP authorization information (XMLDB Native WS do not accept anonymous login)
 - -H 'SOAPAction: "GETORDER" is a required HTTP header for SOAP
 - -p /tmp/soap-post-func.txt is file which have the POST XML message shown above
 - and the URL is a default URL used to execute Native SOAP WS in XMLDB


Do not forget grant XDB_WEBSERVICES and XDB_WEBSERVICES_OVER_HTTP roles to SCOTT, also register the __orawsv__ Servlet.


** Testing with Apache mod_mem_cache.


One of the most important consequence of REST architecture is that is on top on HTTP protocol, so why not include for example reverse proxy in front of Oracle XMLDB Restlet adapter. On Linux you can try this configuration:
Add this to __/etc/httpd/modules.d/57_mod_mem_cache.conf__ file:


{{< highlight bash "style=emacs" >}}.....
<IfModule mod_cache.c>

    # CacheEnable - A cache type and partial URL prefix below which caching is enabled
    #CacheEnable mem /manual
    #CacheEnable fd /images
    CacheEnable mem /userapp
    CacheEnable mem /orawsv

</IfModule>
....
{{< /highlight >}}


This will enable mod_mem_cache to any URL starting with /userapp/ directory, this directory will be retrieved using Apache mod_proxy.
Edit __/etc/httpd/modules.d/30_mod_proxy.conf__ adding these lines:


{{< highlight bash "style=emacs" >}}<IfModule mod_proxy.c>
....
    SetEnv proxy-nokeepalive 1
....
    ProxyPass /userapp/ http://localhost:8080/userapp/
    ProxyPassReverse /userapp/ http://localhost:8080/userapp/
    ProxyPass /orawsv/ http://localhost:8080/orawsv/
    ProxyPassReverse /orawsv/ http://localhost:8080/orawsv/
....
</IfModule>

{{< /highlight >}}


This will redirect automatically any __URL__ __http://localhost:80/userapp/__ to __XMLDB__ __http://localhost:8080/userapp/__.
Finally start __Apache Web Server__ and test the __URL__ __http://localhost/userapp/users/scott/orders/300__ note now we are using port 80, not port 8080.
To boost your __REST WS__ performance you can change, for example, the expiration header of the response, many __WS__ can use this trick a typically example is a weather service which is updated every 30 minutes. In our User application this change can be injected at __org.restlet.example.tutorial.OrderResource__ class method __represent__, for example:


{{< highlight java "style=emacs" >}}    @Override
    public Representation represent(Variant variant) throws ResourceException {

        Representation result = null;

        if (variant.getMediaType().equals(MediaType.TEXT_PLAIN)) {
            result = new StringRepresentation("Order \"" + this.orderId  + "\" for user \"" + this.userName + "\"");
       }

        Date expirationDate = new Date(System.currentTimeMillis()+10000);

        result.setExpirationDate(expirationDate);
        return result;
    }
{{< /highlight >}}


This small change represent for 100 request in User application a difference between:
`Requests per second:    __49.65__ [#/sec] (mean)` to `Requests per second:    __1407.90__ [#/sec] (mean)` and __1__ request to __XMLDB__ instead of __100__ request, reducing a lot a server workload.
There is no change with our __SOAP WS__ because __POST__ messages are not cached by __mod_mem_cache__ reverse proxy.


*** Testing performance with Apache JMeter

__XMLDB Restlet Adapter__ can be tested with __Apache JMeter__, here some captures with the above __REST__ and __SOAP WS__.
Test plan used with Users Restlet example:


{{< highlight bash "style=emacs" >}}Thread Group -> Thread Properties
Number of Threads (users): 10

Ramp Up Period (in seconds): 0

Loop Count: 200

HTTP Request -> Web Server
Server Name or IP: localhost
HTTP Request -> HTTP Request
Protocol: http
Method: GET
Path: /userapp/users/scott/orders/300

Gaussian Random Timer -> Thread Delay Properties
Deviation (in milliseconds): 100.0
Constant Delay Offset (in milliseconds): 300
{{< /highlight >}}


Test plan used with Users SOAP example:

{{< highlight bash "style=emacs" >}}Number of Threads (users): 10
Ramp Up Period (in seconds): 0
Loop Count: 200

SOAP/XML-RPC Request -> Web Server
Server Name or IP: localhost
HTTP Request -> HTTP Request
URL: http://localhost:8080/orawsv/SCOTT/ORDERS_CALCULATOR/GETORDER

Send SOAPAction: GETORDER
User KeepAlive: true
SOAP/XML-RPC Data Filename: /tmp/soap-post-func.txt


HTTP Header Manager -> Headers Stored in the Header Manager
Authorization: Basic c2NvdHQ6dGlnZXI=    (Base 64 encoding of scott/tiger)
Gaussian Random Timer -> Thread Delay Properties
Deviation (in milliseconds): 100.0
Constant Delay Offset (in milliseconds): 300
/tmp/soap-post-func.txt file content:
{{< /highlight >}}

{{< highlight xml "style=emacs" >}}<?xml version = '1.0'?>
<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://xmlns.oracle.com/orawsv/SCOTT/ORDERS_CALCULATOR/GETORDER">

   <env:Header/>
   <env:Body>
      <ns1:SVARCHAR2-GETORDERInput>

<ns1:USER_NAME-VARCHAR2-IN>scott</ns1:USER_NAME-VARCHAR2-IN>
         <ns1:ORDER_ID-NUMBER-IN>300</ns1:ORDER_ID-NUMBER-IN>
      </ns1:SVARCHAR2-GETORDERInput>
   </env:Body>
</env:Envelope>
{{< /highlight >}}
