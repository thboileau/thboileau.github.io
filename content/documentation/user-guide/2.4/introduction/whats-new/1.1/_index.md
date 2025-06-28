---
title: In version 1.1
weight: 6
---
# Introduction

After one year and half of development, the Restlet project has made
tremendous progress. We will try to summarize here the main benefits
that you can expect by migrating from Restlet 1.0 to the latest 1.1
version.

# Uniform Development Environment

Truly boost the productivity of your team by leveraging our uniform
Restlet API:

-   Develop Client-side, Server-side or Unified Applications using the
    exact same RESTful concepts and classes
-   Develop Web Services, Static or Dynamic Web Sites in the same way,
    blending them into RESTful Web Applications
-   Support multiple protocols (HTTP, File, CLAP, WAR, POP3, SMTP, ...)
    using the exact same API and a pluggable connector mechanism

In order to deal with your largest development needs, support for
application modularization has been added. It is now easy to split a
large application into several ones, and still be able to efficiently
communicate. There is a new internal protocol (RIAP) to do private
RESTful calls between applications hosted in the same JVM.

# Improved Deployment Flexibility

The Restlet project has always been open to other technologies and tries
to give its developers the maximum freedom in term of deployment. We
don't try to lock you down to a specific technology. Here is the current
list of deployment environments that you can target:

-   Standalone JAR
-   Servlet containers (Tomcat, Jetty, Resin, etc.)
-   JEE application servers (WebLogic, WebSphere, Glassfish, JBoss AS,
    etc.)
-   Spring container (several integration options)
-   OSGi environment (Eclipse Equinox, Apache Felix, etc.)
-   Oracle database (XDB technology)
-   Google Web Toolkit (Restlet-GWT module for Rich Web Clients)
-   JAIN/SLEE

Most of the time, your Restlet Applications code will be fully portable,
requiring only simple deployment configuration adjustments.

Regarding configuration, we now support our own compact XML syntax. This
can be very convenient, in addition to the usual programmatic way, to
let administrators tweak the configuration of Restlet components,
connectors and virtual hosts, without recompiling the source code. This
is also possible to leverage Spring XML configuration mechanism to
similar results.

# Automatic REST API Documentation

Don't you think that having a comprehensive, fully customizable and
always up-to-date documentation for your REST API is essential? We do
and made some major enhancements on this front in collaboration with our
customers and users.

In this new version, we think we have the most complete and useful
support for WADL (Web Application Description Language), the equivalent
of WSDL for RESTful applications. Thanks to our WADL extension, you can
now have your whole application, or just each single resource
self-described. The WADL documentation can be dynamically generated from
your source code and exposed either as machine processable XML (WADL) or
as human readable HTML (WADL) documents.

# Significantly Improved Performance

Top notch performance has always been a core concern for us. This led to
the implementation of a pluggable connector mechanism in Restlet 1.0,
and the shipping of several HTTP connector options such as Jetty and
Simple.

In Restlet 1.1, we continued on this path and added a brand new Grizzly
HTTP server based on the very responsive and scalable NIO framework
developped by the Sun Glassfish project. This connector fits perfectly
with the NIO provisions in the Restlet API, resulting in direct
disk-to-socket sending of static files and reduced memory and CPU usage!

We have also added very convenient internal HTTP client and server
connectors that ensure that you can get started right away with your
Restlet development needs. This is also a perfectly suitable option for
compact or embedded deployment scenarios.

# More Licensing Options

Led by the founder of the Restlet project, the Noelios Technologies
company is now the main copyright holder of the Restlet source code. It
funds most development efforts and incorporate contributions from the
active Restlet community.

As a result, it can offers flexible licensing options to suit the needs
of all users of the technology:

-   LGPL 2.1
-   LGPL 3.0
-   CDDL 1.0
-   [Commercial license](http://restlet.com/services/subscriptions) (optionally transferable)

# More Extensions

In order to keep our core library light and focused, we have proposed an
extension mechanism in Restlet 1.0. This makes sure that we don't force
technology choice, beside the RESTful design at the core of the project,
onto our users. Instead, we prefer to give them open integration options
with their favorite technologies such as JavaMail, FreeMarker, JSON or
Velocity.

In Restlet 1.1, we have continued those efforts and added the following
extensions:

-   JAX-RS to support the new annotation-based RESTful API
-   WADL for "Automatic REST API Documentation" (see details above)
-   JiBX and JAXB as two strong alternatives for XML serialization
-   OAuth for REST API access delegation
-   XDB for deployment in Oracle databases
-   Atom for feed reading or writing
-   SSL for more security options
