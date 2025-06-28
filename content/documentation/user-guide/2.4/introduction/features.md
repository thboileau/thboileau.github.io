---
title: Features
weight: 2
---
# Introduction

Restlet Framework is mature and scalable, based on a small core and many optional extensions, making it suitable for any kind of web API development, including cross-channel web sites and applications.

# Web API support

- Core REST and HTTP concepts have equivalent Java artifacts (Resource,
  Representation, Connector or Component classes for example).
- Suitable for both client-side and server-side web applications. The innovation is that that it uses the same Java API, reducing the learning curve and the software footprint.
- Concept of "URIs as UI" supported based on the URI Templates standard. This results in a very flexible yet simple routing with automatic extraction of URI variables into request attributes.
- Tunnelling service lets browsers issue any HTTP method (PUT, DELETE, PATCH, etc.) through a simple HTTP POST. This service is transparent for Restlet applications.
- Easy API documentation thanks to WADL support and Swagger integration.

# Complete Web server

Contrary to the Servlet API, the Restlet API gives you extensive control on the URI mapping and on the virtual hosts configuration. It includes a powerful Directory class to server static files in a way similar to Apache Web Server. For example, our Restlet.com web site is directly powered by Restlet Framework on a regular JVM!

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

By staying open to all presentation environments and technologies (AngularJS, Android, iOS, Eclipse RCP, GWT, etc.) and all persistence technologies (JDBC, Hibernate, Spring IO, Cassandra, MongoDB, etc.), your investment in Restlet is secured. With very little work, your Restlet applications can be made portable from one environment to the other.

# Multiple editions

REST principles have no limit, they can be applied everywhere the Web is and even in places where there is no Internet but needs for communication or effective decoupling. Currently, the Restlet Framework is available in several editions:

- Edition for Java SE, to run your Restlet applications in regular JVMs.
- Edition for Java EE, to run your Restlet applications in Servlet containers.
- Edition for GAE, to run your Restlet applications in Google App Engine cloud platform.
- Edition for GWT, to run your Web browser clients, without plugins.
- Edition for Android, letting you deploy Restlet applications on mobile Android devices.
- Edition for OSGi, letting you deploy Restlet applications on dynamic and embedded OSGi environments.

# Servlet compatible

Restlet was an attempt to build a better Servlet API, aligned with the true Web architecture (REST) and standards (HTTP, URI). Therefore the Restlet API has no dependency on the Servlet API, it only depends on the Java SE. However, it is perfectly possible to deploy a Restlet application into Java EE application servers or just Servlet containers. This is possible using an adapter Servlet provided as an extension.

# Available Connectors

- Multiple server HTTP connectors available, based on either [Eclipse Jetty](http://www.eclipse.org/jetty/) or the [Simple framework](http://www.simpleframework.org/).
- [AJP](http://tomcat.apache.org/connectors-doc/) server connector available to let you plug behind an Apache HTTP server or Microsoft IIS. It is based on Jetty's connector.
- Multiple client HTTP connectors available, based on either [Apache HTTP Client](http://jakarta.apache.org/commons/httpclient/) or on an NIO-based extension (preview).
- Compact internal HTTP client and server for development and light deployments based on HTTPUrlConnection class. No external dependency needed.
- Client SMTP, SMTPS, POP v3 and POPS v3 connectors are provided based on [JavaMail](http://www.oracle.com/technetwork/java/javamail/index.html) and a custom email XML format.
- Client JDBC connector based on the JDBC API, a custom request XML format and the JDBC [WebRowSet interface](http://docs.oracle.com/javase/7/docs/api/javax/sql/rowset/WebRowSet.html) for XML responses.
- Client FILE connector supports GET, PUT and DELETE methods on files and directories. In addition, it is able to return directory listings.
- Client CLAP connector to access to the Classloader resources.
- Client and server [RIAP connectors](/documentation/user-guide/{{% param version %}}/core/base/connectors) to access to the Restlet internal resources, directly inside the JVM, relatively to the current application or virtual host or component.
- Client SOLR connector to call embedded [Apache Lucene Solr](http://lucene.apache.org/solr/)
  search and indexing engine.

# Available Representations

- Built-in support for XML representations (JAX, JibX, DOM or SAX
  based) with a simple XPath API based on JDK's built-in XPath engine.
- Integration with the [FreeMarker template engine](http://freemarker.org/)
- Integration with the [Velocity template engine](http://velocity.apache.org/)
- Integration with [Apache FileUpload](http://jakarta.apache.org/commons/fileupload/) to support multi-part forms and easily handle large file uploads from browsers
  to support multi-part forms and easily handle large file uploads from browsers
- Transformer filter to easily apply XSLT stylesheets on XML representations. It is based on JDK's built-in XSLT engine.
- Extensible set of core representations based on NIO readable or writable channels, BIO input or output streams.
- Support for Atom and JSON standards.
- Integration with [Apache Lucene Tika](http://lucene.apache.org/tika/) to support metadata extraction from any representation.

# Flexible configuration

- Complete configuration possible in Java via the Restlet API
- Configuration possible via Restlet XML and WADL files
- Implementation of the JAX-RS 1.1 standard API (based on JSR-311).
- Deployment as native services is possible and illustrated using the
  powerful [Java Service Wrapper](http://wrapper.tanukisoftware.org/).
- Extensive integration with popular Spring Framework.
- Deployment to Oracle 11g embedded JVM supported by special extension.

# Security

- Supports HTTP Basic and Digest authentication (client and server side)
- Supports HTTPS (HTTP over SSL)
- Supports OAuth 2.0 authentication (preview mode)
- Supports Amazon S3 authentication
- Supports Microsoft Shared Key and Shared Key Lite authentication (client side)
- Supports SMTPS (SMTP over SSL) and SMTP-STARTTLS
- Supports POPS (POP over SSL)

# Scalability

- Fully multi-threaded design with per-request Resource instances to reduce thread-safety issues when developing applications.
- Intentional removal of Servlet-like HTTP sessions. This concept, attractive as a first sight, is one of the major issue for Servlet scalability and is going against the stateless exchanges promoted by REST.
- Supports non-blocking NIO modes to decouple the number of connections from the number of threads.
- Supports asynchronous request processing, decoupled from IO operations. Unlike the Servlet API, the Restlet applications don't have a direct control on the outputstream, they only provide output representation to be written by the server connector.

# Upcoming features

Is something important for you missing? Maybe we are already working on
it or are planning to do so.

We suggest that you have a look at [our public roadmap](https://github.com/restlet/restlet-framework-java/wiki) or at our [issue tracker on GitHub](https://github.com/restlet/restlet-framework-java/issues).

Feel free to create some new ones if needed!
