---
title: Architecture
weight: 2
---

The Restlet Framework is composed of two main parts. First, there is the
[Restlet API](/documentation/user-guide/{{% param version %}}/core/overview "Part II - Core Restlet"),
a neutral API supporting the concepts of REST and HTTP, facilitating the
handling of calls for both client-side and server-side applications.
This API is backed by the Restlet Engine and both are now shipped in a
single JAR ("org.restlet.jar").

![](../images/tutorial01.png)

This separation between the API and the implementation is similar to the
one between the Servlet API and Web containers like Jetty or Tomcat, or
between the JDBC API and concrete JDBC drivers.

# Overview of a REST architecture

Let's step back a little and consider typical web architectures from a
REST point of view. In the diagram below, ports represent the connector
that enables the communication between components which are represented
by the larger boxes. The links represents the particular protocol (HTTP,
SMTP, etc.) used for the actual communication.

![](../images/tutorial04.png)

Note that the same component can have any number of client and server
connectors attached to it. Web Server B, for example, has both a server
connector to respond to requests from the User Agent component, and
client connectors to send requests to Web Server A and the Mail Server.

# Overview of a Restlet architecture

In addition to supporting the standard REST software architecture
elements as presented before, the Restlet Framework also provides a set
of classes that greatly simplify the hosting of multiple applications
within a single JVM. The goal is to provide a RESTful, portable and more
flexible alternative to the existing Servlet API. In the diagram below,
we can see the three types of Restlets that are provided in order to
manage these complex cases. Components can manage several Virtual Hosts
and Applications.

Virtual Hosts support flexible configuration where, for example, the
same IP address is shared by several domain names, or where the same
domain name is load-balanced across several IP addresses. Finally, we
use Applications to manage a set of related Restlets, Resources and
Representations. In addition, Applications are ensured to be portable
and reconfigurable over different Restlet implementations and with
different virtual hosts. In addition, they provide important services
like access logging, automatic decoding of request entities,
configurable status page setting and more!

![](../images/tutorial05.png)

In order to illustrate these classes, let's examine a simple example.
Here we create a Component, then add an HTTP server connector to it,
listening on port 8182. Then we create a simple trace ServerResource and attach
it to the defaut VirtualHost of the Component. This default host is
catching any request that wasn't already routed to a declared
VirtualHost (see the Component.hosts property for details). In a later
example, we will also introduce the usage of the Application class. Note
that for now you don't see any access log displayed in the console. 

{{< highlight java "style=emacs" >}}import org.restlet.Component;
import org.restlet.data.Protocol;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

public class Test extends ServerResource {
    public static void main(String[] args) throws Exception {
        // Create a new Restlet component and add a HTTP server connector to it
        Component component = new Component();  
        component.getServers().add(Protocol.HTTP, 8182);  
        // Then attach it to the local host
        component.getDefaultHost().attach("/trace", Test.class);  
        // Now, let's start the component!
        // Note that the HTTP server connector is also automatically started.
        component.start();  
    }  
    @Get("txt")
    public String toString() {  
        // Print the requested URI path
        return "Resource URI  : " + getReference() + '\n' + "Root URI      : "
                + getRootRef() + '\n' + "Routed part   : "
                + getReference().getBaseRef() + '\n' + "Remaining part: "
                + getReference().getRemainingPart();  
    }
}
{{< /highlight >}}

Now let's test it by entering
http://localhost:8182/trace/abc/def?param=123 in a Web browser. Here is
the result that you will get:

{{< highlight bash "style=emacs" >}}    Resource URI  : http://localhost:8182/trace/abc/def?param=123
    Root URI      : http://localhost:8182/trace
    Routed part   : http://localhost:8182/trace
    Remaining part: /abc/def?param=123
{{< /highlight >}}

# Persistence layer

The Restlet framework is completely agnostic regarding the persistence
technology that you want to use. Many alternatives having been used
successfully and we are confident that you won't hit any special
limitation in this area.

The basic idea is that from a Restlet point of view, your application
with be composed of resources, extending the
org.restlet.resource.Resource class. Those subclassed will be in charge
of handling the incoming requests. One instance of your resource
subclass will be created for each request to handle, making sure that
you don't have to care about concurrent access at this point of your
application.

When you resource is instantiated, it will need to expose its
representations (via HEAD, GET methods), to store (PUT method), accept
(POST method) or remove (DELETE method) representations. During
construction, based on the actual identity of your resource and other
parameters or attributes of the request, you will be able to contact
your persistence backend in order to support your processing logic or
the representations of your resources returned.

# Presentation layer

When compared to the Servlet API, the Restlet API doesn't have a sister
API like Java Server Pages (JSP). Instead we made the design choice to
be equally open to all presentation technologies. This openess is
materialized in the Representation class which is used for response
entities. 

More concretely, we provide integrations with three popular template
technologies : XSLT, Apache FreeMarker, Apache Velocity and Thymeleaf.

The design idea of those extensions is to use a TemplateRepresentation
that combines at generation time a data model with a template document.

