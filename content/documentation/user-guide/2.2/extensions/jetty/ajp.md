---
title: AJP
longTitle: Supporting AJP with Jetty
weight: 2
---
# Introduction

Here are a few links that will get you started:

-   [What's AJP(Apache JServ Protocol)?](http://en.wikipedia.org/wiki/Apache_JServ_Protocol)
-   [What's Apache module  mod\_jk?](http://tomcat.apache.org/connectors-doc/webserver_howto/apache.html)
-   [What's Jetty,and how to get it?!](http://www.eclipse.org/jetty/)
-   [How to embedding Jetty in program way?](http://wiki.eclipse.org/Jetty/Tutorial/Embedding_Jetty)

This page needs to be updated for Restlet 2.x

# Description

## Embedding Jetty

### JettyAJPApplication.Class

{{< highlight java "style=emacs" >}}package com.bjinfotech.restlet.practice.demo.microblog;

import org.restlet.Application;
import org.restlet.Component;
import org.restlet.Directory;
import org.restlet.Restlet;
import org.restlet.Router;
import org.restlet.Server;
import org.restlet.data.Protocol;
import com.noelios.restlet.ext.jetty.AjpServerHelper;
import com.noelios.restlet.ext.jetty.HttpServerHelper;
import com.noelios.restlet.ext.jetty.JettyServerHelper;

public class JettyAJPApplication extends Application {
    public static void main(String[] argv) throws Exception{
        Component component=new Component();

        Application application=new Application(component.getContext()){
            @Override
            public Restlet createRoot(){
                final String DIR_ROOT_URI="file:///E:/eclipse3.1RC3/workspace/RestletPractice/static_files/";

                Router router=new Router(getContext());
                Directory dir=new Directory(getContext(),DIR_ROOT_URI);
                dir.setListingAllowed(true);
                dir.setDeeplyAccessible(true);
                dir.setNegotiateContent(true);
                router.attach("/www/",dir);
                return router;
            }
        };

        ...
        //create embedding jetty server
        Server embedingJettyServer=new Server(
                component.getContext(),
                Protocol.HTTP,
                8182,
                component
            );
        //construct and start JettyServerHelper
        JettyServerHelper jettyServerHelper=new HttpServerHelper(embedingJettyServer);
        jettyServerHelper.start();

        //create embedding AJP Server
        Server embedingJettyAJPServer=new Server(
                component.getContext(),
                Protocol.HTTP,
                8183,
                component
            );

        //construct and start AjpServerHelper
        AjpServerHelper ajpServerHelper=new AjpServerHelper(embedingJettyAJPServer);
        ajpServerHelper.start();

    }
}
{{</ highlight >}}

### Running JettyAJPApplication

> 2008-02-13 15:33:54.890::INFO:  Logging to STDERR via
> org.mortbay.log.StdErrLog\
>  2008-02-13 15:33:54.953::INFO:  jetty-6.1.x\
>  2008-02-13 15:33:55.140::INFO:  Started SelectChannelConnector @
> 0.0.0.0:8182 \
>  2008-02-13 15:33:55.140::INFO:  jetty-6.1.x\
>  2008-02-13 15:33:55.140::INFO:  AJP13 is not a secure protocol.
> Please protect port 8183\
>  2008-02-13 15:33:55.140::INFO:  Started Ajp13SocketConnector @
> 0.0.0.0:8183

## Configuring Apache HTTPd server with mod\_jk

-   put mod\_jk.so into your \<apache-root\>/modules/ directory
-   you can download mod\_jk.so here
    [http://archive.apache.org/dist/tomcat/tomcat-connectors/jk/binaries/](http://archive.apache.org/dist/tomcat/tomcat-connectors/jk/binaries/)
-   add the entry below in your httpd.conf apache configuration file
    located in \<apache-root\>/conf/ directory:

{{< highlight plaintext "style=emacs" >}}<IfModule !mod_jk.c>
     LoadModule jk_module  modules/mod_jk.so
</IfModule>

<IfModule mod_jk.c>
     JkWorkersFile &quot;conf/worker.properties&quot;
     JkLogFile &quot;logs/mod_jk.log&quot;
     JkLogLevel info
     JkLogStampFormat &quot;[%a %b %d %H:%M:%S %Y] &quot;
     JkOptions +ForwardKeySize +ForwardURICompat
</IfModule>
{{</ highlight >}}

-   **LoadModule jk\_module modules/mod\_jk.so** tells your apache
    server to load the mod\_jk libray and where it is located.
-   **JkWorkersFile conf/worker.properties** tells mod\_jk where your
    worker.properties is located.
-   **JkLogFile logs/mod\_jk.log** tells mod\_jk where to write mod\_jk
    related Logs.

After adding the mod\_jk configuration you may add a **VirtualHost**
Entry in the same file (httpd.conf) as long as its located below your
mod\_jk configuration entry:

{{< highlight plaintext "style=emacs" >}}<VirtualHost host:*>
     ServerName yourserver
      ServerAdmin user@yourserver
      ## you may add further entries concerning log-files, log-level, URL-rewriting, ...
      ## pass requests through to jetty worker
JkMount /* jetty
</VirtualHost>
{{</ highlight >}}
-   Add a worker file **worker.properties** in your
    \<apache-root\>/conf/
-   add the entries below, and make sure to specify your ip-address or
    hostname in **worker.jetty.host** property entry to where your jetty
    application is runnning

 `worker.list=jetty`
 `worker.jetty.port=8009`
 `worker.jetty.host=<server name or ip where your jetty will be running>`
 `worker.jetty.type=ajp13`

## mod\_jk Compatibilities


Apache | Win32 | Linux(ubuntu)
------ | ----- | -------------
Apache 1.3 | no mod_proxy_ajp bundled |no mod_proxy_ajp bundled
Apache 2.0 (2.0.59) | no mod_proxy_ajp bundled | no mod_proxy_ajp bundled
Apache 2.2 | ![](/images/icons/8/puce.png) | ![](/images/icons/8/puce.png)

## Running Apache Httpd and test your application

[To be detailled]

## More Resource

* [Jetty doc:Configuring+AJP13+Using+mod\_jk](http://docs.codehaus.org/display/JETTY/Configuring+AJP13+Using+mod_jk) moved to [Jetty/Tutorial/Apache](http://wiki.eclipse.org/Jetty/Tutorial/Apache)
* [Apache Httpd Document](http://httpd.apache.org/docs/)
* [HttpServerHelper Class API](https://javadocs.restlet.talend.com/{{% param version %}}/jse/ext/org/restlet/ext/jetty/HttpServerHelper.html)
* [Server Class API](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/Server.html)
* [AjpServerHelper Class API](https://javadocs.restlet.talend.com/{{% param version %}}/jse/ext/org/restlet/ext/jetty/AjpServerHelper.html)
