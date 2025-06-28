---
title: Overview
weight: 1
---
# Introduction

This connector is based on the [Eclipse Jetty](http://www.eclipse.org/jetty/)
open-source web server. Jetty is popular alternative to Tomcat developed
by Mortbay Consulting and has a nice separation between its HTTP
protocol implementation and its support for the Servlet API which led to
the first HTTP server connector developed for the Restlet Framework.

# Description

This connector supports the following protocols: HTTP, HTTPS, AJP.

The list of supported specific parameters is available in the javadocs:

-   [Jetty common parameters](https://javadocs.restlet.talend.com/{{% param version %}}/jse/ext/org/restlet/ext/jetty/JettyServerHelper.html)
-   [HTTP specific parameters](https://javadocs.restlet.talend.com/{{% param version %}}/jse/ext/org/restlet/ext/jetty/HttpServerHelper.html)
-   [HTTPS specific parameters](https://javadocs.restlet.talend.com/{{% param version %}}/jse/ext/org/restlet/ext/jetty/HttpsServerHelper.html)

Here is the list of dependencies of this connector:

-   [Jetty](http://www.eclipse.org/jetty/)
-   [Java Servlet](http://www.oracle.com/technetwork/java/javaee/servlet/index.html)

For additional details, please consult the
[Javadocs](https://javadocs.restlet.talend.com/{{% param version %}}/jse/ext/org/restlet/ext/jetty/package-summary.html).

# Usage example

Please consult [connector configuration documentation](/documentation/user-guide/{{% param version %}}/core/base/connectors)

## HTTPS

For general information on Jetty HTTPS/SSL configuration, please read
[this document](http://wiki.eclipse.org/Jetty/Howto/Configure_SSL).
For configuration of the connector in a Restlet component, you will need
to set some of the HTTPS parameters listed above, for example:

    Server server = myComponent.getServers().add(Protocol.HTTPS, 8183);
    server.getContext().getParameters().add("keystorePath", "<your-path>");
    server.getContext().getParameters().add("keystorePassword", "<your-password>");
    server.getContext().getParameters().add("keyPassword", "<your-password>");
