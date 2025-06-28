---
title: Features
weight: 2
---
# Introduction

Restlet Framework is mature and scalable, based on a small core and many optional extensions, making it suitable for any kind of web API development, including cross-channel web sites and applications.

# Web API support

- Core REST and HTTP concepts have equivalent Java artifacts (Resource, Representation, Connector or Component classes for example).
- Suitable for both client-side and server-side web applications. The innovation is that that it uses the same Java API, reducing the learning curve and the software footprint.
- Concept of "URIs as UI" supported based on the URI Templates standard. This results in a very flexible yet simple routing with automatic extraction of URI variables into request attributes.
- Tunnelling service lets browsers issue any HTTP method (PUT, DELETE, PATCH, etc.) through a simple HTTP POST. This service is transparent for Restlet applications.

# Complete Web server

Contrary to the Servlet API, the Restlet API gives you extensive control on the URI mapping and on the virtual hosts configuration. It includes a powerful Directory class to server static files in a way similar to Apache Web Server.

Here is a more complete list of features provided by the internal Web server:

- Static file serving similar to Apache HTTP Server, with metadata association based on file extensions.
- Transparent content negotiation based on client preferences.
- Conditional requests automatically supported for resources.
- Remote edition of files based on PUT and DELETE methods (aka mini-WebDAV mode).
- Decoder service transparently decodes compressed or encoded input representations. This service is transparent for Restlet applications.
- Log service writes all accesses to your applications in a standard Web log file. The log format follows the [W3C Extended Log File Format](http://www.w3.org/TR/WD-logfile.html) and is fully customizable.
- Powerful URI based redirection support similar to Apache Rewrite module.
- Extensive and flexible security support for both authentication and authorization.

# Presentation and persistence agnostic

By staying agnostic to all presentation technologies (React, AngularJS, VueJSm Android, iOS, GWT, etc.) and all persistence technologies (JDBC, Hibernate, Spring IO, Cassandra, MongoDB, etc.), your investment in Restlet is secured. With very little work, your Restlet applications can be made portable from one environment to the other.

# Multiple editions

REST principles have no limit, they can be applied everywhere the Web is and even in places where there is no Internet but needs for communication or effective decoupling. Currently, the Restlet Framework is available in two editions:

- Edition for Java, to run your Restlet applications in regular JVMs, Servlet containers, Android devices, GAE or OSGi environments
- Edition for GWT, to run your Web browser clients, without plugins.

# Servlet compatible

Restlet was initially an attempt to build a better Servlet API, aligned with the true Web architecture (REST) and standards (HTTP, URI). Therefore the Restlet API has no dependency on the Servlet API, it only depends on the Java SE. However, it is perfectly possible to deploy a Restlet application into Java EE application servers or just Servlet containers. This is possible using an adapter Servlet provided as an extension.

# Available Connectors

- Scalable HTTP server connector based on [Eclipse Jetty](http://www.eclipse.org/jetty/)
- Scalable  HTTP client connector based on [Apache HTTP Client](http://jakarta.apache.org/commons/httpclient/).
- Compact internal HTTP client and server for development and light deployments based on java.net.HTTPUrlConnection class and com.sun.net.httpserver. No external dependency needed.
- [AJP](http://tomcat.apache.org/connectors-doc/) server connector available to let you plug behind an Apache HTTP server or Microsoft IIS. It is based on Jetty's connector.
- Client FILE connector supports GET, PUT and DELETE methods on files and directories. In addition, it is able to return directory listings.
- Client CLAP connector to access to the Classloader resources.
- Client and server [RIAP connectors](/documentation/user-guide/{{% param version %}}/core/base/connectors) to access to the Restlet internal resources, directly inside the JVM, relatively to the current application or virtual host or component.

# Available Representations

- Built-in support for XML representations (JAX, JibX, DOM or SAX
  based) with a simple XPath API based on JDK's built-in XPath engine.
- Integration with the [FreeMarker template engine](https://freemarker.apache.org/)
- Integration with the [Velocity template engine](http://velocity.apache.org/)
- Integration with [Apache FileUpload](http://jakarta.apache.org/commons/fileupload/) to support multi-part forms and easily handle large file uploads from browsers
  to support multi-part forms and easily handle large file uploads from browsers
- Transformer filter to easily apply XSLT stylesheets on XML representations. It is based on JDK's built-in XSLT engine.
- Extensible set of core representations based on BIO input or output streams.
- Support for Atom and JSON standards.

# Flexible configuration

- Complete configuration possible in Java via the Restlet API
- Extensive integration with popular Spring Framework.
- Deployment as native services is possible and illustrated using the
  powerful [Java Service Wrapper](http://wrapper.tanukisoftware.org/).

# Security

- Supports HTTP Basic and Digest authentication (client and server side)
- Supports HTTPS (HTTP over SSL)
- Supports Amazon S3 authentication
- Supports Microsoft Shared Key and Shared Key Lite authentication (client side)

# Scalability

- Fully multi-threaded design with per-request Resource instances to reduce thread-safety issues when developing applications.
- Intentional removal of Servlet-like HTTP sessions. This concept, attractive as a first sight, is one of the major issue for Servlet scalability and is going against the stateless exchanges promoted by REST.
- Supports non-blocking NIO modes to decouple the number of connections from the number of threads via the Jetty HTTP connector.

# Upcoming features

Is something important for you missing? Maybe we are already working on
it or are planning to do so.

We suggest that you have a look at [our public roadmap](https://github.com/restlet/restlet-framework-java/wiki/Roadmap) or at our [issue tracker on GitHub](https://github.com/restlet/restlet-framework-java/issues).

Feel free to create some new ones if needed!
