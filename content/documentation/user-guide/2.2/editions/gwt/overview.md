---
title: Overview
weight: 1
---
# Introduction

This chapter presents the Restlet edition for GWT, which is a
client-side port of the Restlet Framework to GWT 2.2 and above releases.

# Description

Google Web Toolkit is a powerful and widely used platform for rich
internet application. It is based on a smart compiler taking Java source
and producing optimized JavaScript (byte)code.

By default, GWT recommends using a custom GWT-RPC mechanism to
communicate between the GWT front-end (Web browser) and the back-end
(Web server). In addition, the back-end has to be built using a Servlet
container in order to work properly and to invoke your custom classes
and methods. This might remind you of the RMI (Remote Method Invocation)
or CORBA mechanisms and it comes with the same issues: the tight
coupling between client and server code. Also, this reduces the
opportunities of integration with other back-end technologies, outside
Java/Servlet.

As you know, REST is a much more flexible and interoperable way to
communicate between a client and a server. On the server-side, you can
use Restlet or alternative technologies. But on the GWT front-end, the
support has been limited so far. The GWT API does contain classes to
send HTTP requests but they are quite low-level (you need to understand
the HTTP headers syntax for example) and slow down productivity.

With the GWT 1.5 release and its support for the Java 5 syntax, it
became possible to automate the port of the Restlet Framework to GWT. Of
course, we kept only the classes required for the client-side obviously
and had to remove classes based on Java APIs not available in GWT (such
as NIO channels or BIO streams).

# Automatic bean serialization

Finally, Restlet 2.0 added support for annotated Restlet interfaces and
automatic bean serialization into its GWT edition, in a way that is
consistent with other editions. See this [first application
example](/documentation/user-guide/{{% param version %}}/introduction/first-steps/first-application "First application").
With this feature, you don't need to care about formatting or parsing
your beans in JSON or XML as the Restlet edition for GWT with
automatically generate serializer classes for you using GWT Deferred
Binding mechanism and reusing the bean serialization format of GWT-RPC
(not the protocol, just the format). Combined with easy content
negotiation on the Restlet server-side, your web API stays unchanged,
able to support JSON, XML and other formats in parallel with no code
change!
