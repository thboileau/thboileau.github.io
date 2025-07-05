---
title: Connectors
weight: 2
---
# Connectors

## Introduction

A connector in the REST architecture style is a software element that
manages network communication for a component, typically by implementing
a network protocol (e.g. HTTP). A client connector initiates
communication with a server (of any kind) by creating a request. A
server connector listens for connections (from clients of any kind),
transmits the request to the component that performs the request
processing, creates the response and sends it to the client.

All connectors are provided as plugins for the Restlet Engine. This
document will describe how to add a connector to your application, how
to configure it and will give you the list of available server and
client connectors.

## Add a connector to your application

All connectors and their dependencies are shipped with the Restlet
distribution by the way of jar files. Adding a connector to your
application is as simple as adding the archives of the chosen connector
and its dependencies to the classpath.

## Configuration

Each connector looks for its configuration from its context. The latter
provides a list of modifiable parameters, which is the right place to
set up the connector's configuration. Some parameters are defined by the
Restlet engine and thus are shared by all clients (in the ClientHelper
hierarchy) and server connectors (in the ServerHelper hierarchy), and
most of them by the connector's ClientHelper or ServerHelper subclasses.

The list of all parameters are available in the javadocs. Pleaser refer
to the rest of this document for references to these documentation. Here
are the [commons
parameters](https://javadocs.restlet.talend.com/{{% param version %}}/jse/engine/org/restlet/engine/connector/ServerHelper.html)
dedicated to internal connectors.

### Server connectors

Here are the [commons
parameters](https://javadocs.restlet.talend.com/{{% param version %}}/jse/engine/org/restlet/engine/adapter/HttpServerHelper.html)
dedicated to non-internal HTTP server connectors.

Here are the [commons
parameters](https://javadocs.restlet.talend.com/{{% param version %}}/jse/engine/org/restlet/engine/connector/ServerHelper.html)
dedicated to internal HTTP server connectors.

Here is a sample code showing how to set such a parameter on a
component's server connector.

{{< highlight java "style=emacs" >}}// Create the HTTP server and listen on port 8182
Component c = new Component();
Server server = c.getServers().add(Protocol.HTTP, 8182);
server.getContext().getParameters().add("useForwardedForHeader", "true");
c.start();
{{< /highlight >}}

### Client connectors

Here are the [commons parameters](https://javadocs.restlet.talend.com/{{% param version %}}/jse/engine/org/restlet/engine/adapter/HttpClientHelper.html)
dedicated to non-internal HTTP client connectors.

Here are the [commons parameters](https://javadocs.restlet.talend.com/{{% param version %}}/jse/engine/org/restlet/engine/connector/ClientHelper.html)
dedicated to internal HTTP client connectors.

Here is a sample code showing how to set such a parameter.

{{< highlight java "style=emacs" >}}Client client = new Client(new Context(), Protocol.HTTP);
client.getContext().getParameters().add("useForwardedForHeader","false");
{{< /highlight >}}

Here is a sample code showing how to set such a parameter on a
component's client connector.

{{< highlight java "style=emacs" >}}// Create the HTTP server and listen on port 8182
Component c = new Component();
Client client = c.getClients().add(Protocol.HTTP);
client.getContext().getParameters().add("useForwardedForHeader", "false");
{{< /highlight >}}

If you want to configure the client connector used by a ClientResource,
there are several cases. When your ClientResource instances are created
in the context of an application hosted by a Component, the client
connector of the component is used for all requests. Thus, just
configure the component's client connector as shown just above. If not,
just set it:

{{< highlight java "style=emacs" >}}// Instantiate the client connector, and configure it.
Client client = new Client(new Context(), Protocol.HTTP);
client.getContext().getParameters().add("useForwardedForHeader","false");

// Instantiate the ClientResource, and set it's client connector.
ClientResource cr = new ClientResource("http://www.example.com/");
cr.setNext(client);
{{< /highlight >}}

## List of available connectors

### Server connectors

Extension | Version | Protocols | Asynchronous | Comment
--------- | ------- | --------- | ------------ | ---------
[Internal](/documentation/user-guide/{{% param version %}}/core/engine/internal-connectors/overview "Internal connectors") | 2.2 | HTTP, HTTPS, RIAP | No | Recommended for development and lightweight deployments
[Jetty](/documentation/user-guide/{{% param version %}}/extensions/jetty "Eclipse Jetty extension") | 8.1 | HTTP, HTTPS | No | Recommended for robust and scalable deployments
[NIO](/documentation/user-guide/{{% param version %}}/extensions/nio "NIO extension") | 2.2 | HTTP, HTTPS | Yes | Fully asynchronous, preview mode
[Simple](/documentation/user-guide/{{% param version %}}/extensions/simple "Simple Framework extension") | 5.1 | HTTP, HTTPS | No | Recommended for lightweight and scalable deployments
[Servlet](/documentation/user-guide/{{% param version %}}/extensions/servlet "Servlet extension") | 3.0 | HTTP, HTTPS, AJP | No | Recommended for deployments inside Java EE servers

### Client connectors

Extension | Version | Protocols | Asynchronous | Proxy | Comment
--------- | ------- | --------- | ------------ | ----- | -------
[Internal](/documentation/user-guide/{{% param version %}}/core/engine/internal-connectors/overview "Internal connectors") | 2.2 | CLAP, FILE, FTP, HTTP, HTTPS, RIAP | No | Yes | Recommended for development and lightweight deployments
[Apache HTTP Client](/documentation/user-guide/{{% param version %}}/extensions/httpclient "Apache HTTP Client extension") | 4.3 | HTTP, HTTPS | No | Yes | Recommended for robust and scalable deployments
[JavaMail](/documentation/user-guide/{{% param version %}}/extensions/javamail "JavaMail extension") | 1.4 | SMTP, SMTPS, POP, POPS | No |  No | Stable
[JDBC](/documentation/user-guide/{{% param version %}}/extensions/jdbc "JDBC extension") | 3.0 | JDBC | No | No | Stable
[Lucene Solr](/documentation/user-guide/{{% param version %}}/extensions/lucene "Lucene extension") | 4.6 | SOLR | No | No | Stable
[NIO](/documentation/user-guide/{{% param version %}}/extensions/nio "NIO extension") | 2.2 | HTTP, HTTPS | Yes | Yes | Fully asynchronous, preview mode
