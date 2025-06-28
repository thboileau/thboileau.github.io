---
title: Overview
weight: 1
---
# Introduction

This chapter presents the Restlet Framework edition for Java SE (Java
Standard Edition).

This edition is aimed for development and deployment of Restlet
applications inside a regular Java virtual machine using the internal
HTTP server of the Restlet Engine, or a pluggable one such as Jetty.
[This page](/documentation/user-guide/{{% param version %}}/core/base/connectors "Connectors")
contains a detailed list of available HTTP server connectors.

# Getting started

The rest of this page should get you started with the Restlet Framework,
Java SE edition, in less than 10 minutes. It explains how to create a
resource that says "hello, world" and run it.

1.  [What do I need?](#what_do_i_need)
2.  [The "hello, world" application](#the-hello-world-application)
3.  [Run in a Servlet container](#run-in-a-servlet-container)
4.  [Run as a standalone application](#run-as-a-standalone-java-application)
5.  [Conclusion](#conclusion)

## <a name="what-do-i-need"></a>What do I need?

We assume that you have a development environment set up and
operational, and that you already have installed the Java 1.5 (or
higher). In case you haven't downloaded the Restlet Framework yet,
select one of the available distributions of the [Restlet Framework
{{% param version %}}](/downloads/current). Make sure you
add org.restlet.jar in your Build path.

## <a name="the-hello-world-application"></a>The "hello, world" application

Let's start with the core of a REST application: the Resource. Here is
the code of the single resource defined by the sample application.
Copy/paste the code in your "HelloWorldResource" class.

{{< highlight java "style=emacs" >}}package firstSteps;

import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

/**
 * Resource which has only one representation.
 */
public class HelloWorldResource extends ServerResource {

    @Get
    public String represent() {
        return "hello, world";
    }

}
{{</ highlight >}}

Then, create the sample application. Let's call it
"FirstStepsApplication" and copy/paste the following code:

{{< highlight java "style=emacs" >}}package firstSteps;

import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;

public class FirstStepsApplication extends Application {

    /**
     * Creates a root Restlet that will receive all incoming calls.
     */
    @Override
    public synchronized Restlet createInboundRoot() {
        // Create a router Restlet that routes each call to a new instance of HelloWorldResource.
        Router router = new Router(getContext());

        // Defines only one route
        router.attach("/hello", HelloWorldResource.class);

        return router;
    }

}
{{</ highlight >}}

## <a name="run-as-a-standalone-java-application"></a>Run as a standalone Java application

A Restlet application can run inside a regular Java virtual machine or
Java Runtime Environment (JRE), using a single "org.restlet.jar" JAR in
the classpath. For this we only need to create a Restlet component and
associate a HTTP server connector.

Create also a main class, copy/paste the following code which aims at
defining a new HTTP server listening on port 8182 and delegating all
requests to the "FirstStepsApplication".

{{< highlight java "style=emacs" >}}public static void main(String[] args) throws Exception {  
    // Create a new Component.  
    Component component = new Component();  

    // Add a new HTTP server listening on port 8182.  
    component.getServers().add(Protocol.HTTP, 8182);  

    // Attach the sample application.  
    component.getDefaultHost().attach("/firstSteps",  
            new FirstStepsApplication());  

    // Start the component.  
    component.start();  
}      
{{</ highlight >}}
Once you have launched the main class, if you can open your favorite web
browser, and gently type the following URL:
[http://localhost:8182/firstSteps/hello](http://localhost:8182/firstSteps/hello)
, the server will happily welcome you with a nice "hello, world". Otherwise,
make sure that the classpath is correct and that no other program is currently
using the port 8182.

You can find the sources of this sample application in the
"[FirstStepsStandalone](https://download.restlet.talend.com/technical-resources/restlet-framework/archives/examples/firstSteps/firstStepsStandalone.zip "firstStepsStandalone") (application/zip, 1.4 kB)"
file.

## <a name="conclusion"></a>Conclusion

We hope you that enjoyed these first steps and encourage you to check
[the equivalent page in the Java EE
edition](/documentation/user-guide/{{% param version %}}/editions/jee/overview "Restlet edition for Java EE")
for deployments of the same application in Servlet containers. This can
also be a convenient way to deploy your Restlet application in an
existing Java EE application server available in your organization.

# Notes

-   Thanks to [Didier
    Girard](http://www.ongwt.com/)
    for suggesting this page.
