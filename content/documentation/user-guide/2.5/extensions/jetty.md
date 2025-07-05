---
title: Jetty
longTitle: Eclipse Jetty extension
---
# Introduction

This connector is based on the [Eclipse Jetty](http://www.eclipse.org/jetty/)
open-source web server. Jetty is popular alternative to Tomcat developed
by WebTide and has a nice separation between its HTTP
protocol implementation and its support for the Servlet API which led to
the first HTTP server connector developed for the Restlet Framework.

# Description

This connector supports the following protocols: HTTP, HTTPS and SPDY on the server-side and HTTP, HTTPS
on the client-side.

The list of supported specific parameters is available in the javadocs:

-   [Jetty server common parameters](https://javadoc.io/doc/org.restlet/org.restlet.ext.jetty/{{% param version %}}/org/restlet/ext/jetty/JettyServerHelper.html)
-   [HTTP server specific parameters](https://javadoc.io/doc/org.restlet/org.restlet.ext.jetty/{{% param version %}}/org/restlet/ext/jetty/HttpServerHelper.html)
-   [HTTPS server specific parameters](https://javadoc.io/doc/org.restlet/org.restlet.ext.jetty/{{% param version %}}/org/restlet/ext/jetty/HttpsServerHelper.html)
-   [Jetty client common parameters](https://javadoc.io/doc/org.restlet/org.restlet.ext.jetty/{{% param version %}}/org/restlet/ext/jetty/HttpClientHelper.html)

Here is the list of dependencies of this connector:

-   [Jetty](http://www.eclipse.org/jetty/)
-   [Java Servlet](http://www.oracle.com/technetwork/java/javaee/servlet/index.html)

For additional details, please consult [the
Javadocs](https://javadoc.io/doc/org.restlet/org.restlet.ext.jetty/{{% param version %}}/org/restlet/ext/jetty/package-summary.html).

# Usage example

Please consult [connector configuration documentation](/documentation/user-guide/{{% param version %}}/core/base/connectors)

## HTTPS

For general information on Jetty HTTPS/SSL configuration, please read
[this document](http://wiki.eclipse.org/Jetty/Howto/Configure_SSL).
For configuration of the connector in a Restlet component, you will need
to set some of the HTTPS parameters listed above, for example:

{{< highlight java "style=emacs" >}}Server server = myComponent.getServers().add(Protocol.HTTPS, 8183);
server.getContext().getParameters().add("keystorePath", "<your-path>");
server.getContext().getParameters().add("keystorePassword", "<your-password>");
server.getContext().getParameters().add("keyPassword", "<your-password>");
{{< /highlight >}}

## SPDY

The support for SPDY is disabled by default. In order to use it, you need to add the "spdy.version" parameter to your Jetty HTTPS server configuration with a value of "3" add a special NPN JAR file to the the boot classpath of your JRE 7. See [the instructions here](https://wiki.eclipse.org/Jetty/Feature/NPN).

Additional information on Jetty support for SPDY can be found in [this chapter](https://wiki.eclipse.org/Jetty/Feature/SPDY) of Jetty's user guide.
