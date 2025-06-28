---
title: Overview
weight: 1
---
The Restlet framework is composed of two main parts. First, there is the
"[Restlet API](api/)", a neutral API supporting the concepts of REST and
facilitating the handling of calls for both client-side and server-side
applications. This API is backed by the Restlet Engine and both are now
shipped in a single JAR ("org.restlet.jar").

![](../images/tutorial01.png)

This separation between the API and the implementation is similar to the
one between the Servlet API and Web containers like Jetty or Tomcat, or
between the JDBC API and concrete JDBC drivers.
