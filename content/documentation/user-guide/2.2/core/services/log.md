---
title: Log service
weight: 2
---
# Introduction

The log service provides access to logging service. The implementation
is fully based on the standard logging mechanism introduced in JDK 1.4.

Being able to properly log the activity of a Web application is a common
requirement. Restlet Components know by default how to generate
Apache-like logs or even custom ones. By taking advantage of the logging
facility built in the JDK, the logger can be configured like any
standard JDK log to filter messages, reformat them or specify where to
send them. Rotation of logs is also supported; see the
[java.util.logging](http://docs.oracle.com/javase/1.5.0/docs/api/java/util/logging/package-summary.html)
package for details.

Note that you can customize the logger name given to the
java.util.logging framework by modifying the Component's "logService"
property. In order to fully configure the logging, you need to declare a
configuration file by setting a system property like:

{{< highlight java "style=emacs" >}}System.setProperty("java.util.logging.config.file", "/your/path/logging.config"); 
{{</ highlight >}}

For details on the configuration file format, please check the [JDK's
LogManager](http://docs.oracle.com/javase/6/docs/api/index.html?java/util/logging/LogManager.html)
class. You can also have a look at the [Restlet {{% param version %}} logging
documentation](/documentation/user-guide/{{% param version %}}/editions/jse/logging).

# How to customize the access log format

## First method: customize the log format

You can update the log format by setting the "responseLogFormat" attribute of the logging service.
This is a simple template which leverages the variables listed here
[Template](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/util/Resolver.html#createResolver%28org.restlet.data.Request,%20org.restlet.data.Response%29).

Here is a sample template and a sample log trace.

{{< highlight java "style=emacs" >}}Component c = new Component();
c.getServers().add(Protocol.HTTP, 8182);
c.getDefaultHost().attach(new MyApplication());

c.getLogService().setResponseLogFormat("{ciua} {cri} {ra} {m} {rp} {rq} {S} {ES} {es} {hh} {cig} {fi}");

c.start();
{{</ highlight >}}

This log format displays the following data:

1.  Client address (IP)
2.  Remote user identifier (see RFC 1413)
3.  Server address (IP) and port
4.  Method (GET, POST...)
5.  Resource reference path (including the leading slash)
6.  Resource reference query (excluding the leading question mark)
7.  Response status code
8.  Number of bytes sent
9.  Number of bytes received
10. Host reference
11. Client agent name
12. Referrer reference

For example:

{{< highlight bash "style=emacs" >}}127.0.0.1  localhost:8182 GET /ping  200 5 0 http://localhost:8182 curl/7.35.0 http://test.example.com
{{</ highlight >}}

## Second method: write the log manually

As you may have noticed, the log template does not handle data such as the response time, the date of reception of the request.
In this case, you can programmatically write your own log trace.
In order to do so, just inherit from the LogService class and override the [getResponseLogMessage(Response, int) method](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/service/LogService.html#getResponseLogMessage%28org.restlet.Response,%20int%29).
The first parameter is the Response object (wich gives your access to the Request object), and the duration of the call.
