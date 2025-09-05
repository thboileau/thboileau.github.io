---
title: Overview
weight: 1
---
This chapter presents the Restlet Framework edition for Java EE (Java
Enterprise Edition).

This edition is aimed for development and deployment of Restlet
applications inside Java EE application server, or more precisely inside
Servlet containers such as [Apache
Tomcat](http://tomcat.apache.org/).

# Getting started

The rest of this page should get you started with the Restlet Framework,
Java EE edition, in less than 10 minutes. It explains how to create a
resource that says "hello, world" and run it.

1.  [What do I need?](#what_do_i_need)
2.  [The "hello, world" application](#the-hello-world-application)
3.  [Run in a Servlet container](#run-in-a-servlet-container)
4.  [Run as a standalone application](#run-as-a-standalone-java-application)
5.  [Conclusion](#conclusion)

## What do I need?

We assume that you have a development environment set up and
operational, and that you already have installed the Java 1.5 (or
higher). In case you haven't downloaded the Restlet Framework yet,
select one of the available distributions of the [Restlet Framework
{{% param version %}}](/downloads/current).

## The "hello, world" application

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
{{< /highlight >}}

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
{{< /highlight >}}

## Run in a Servlet container

Let's now deploy this Restlet application inside your favorite Servlet
container. Create a new Servlet Web application as usual, add a
"firstStepsServlet" package and put the resource and application classes
in. Add the archives listed below into the directory of librairies
(/WEB-INF/lib):

-   org.restlet.jar
-   org.restlet.ext.servlet.jar

Then, update the "web.xml" configuration file as follow:


{{< highlight xml "style=emacs" >}}<?xml version="1.0" encoding="UTF-8"?>  
<web-app id="WebApp_ID" version="2.4"  
            xmlns="http://java.sun.com/xml/ns/j2ee"  
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
            xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee  
                 http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">  
   <display-name>first steps servlet</display-name>  

   <!-- Restlet adapter -->  
   <servlet>  
      <servlet-name>RestletServlet</servlet-name>  
      <servlet-class>org.restlet.ext.servlet.ServerServlet</servlet-class>
      <init-param>
            <!-- Application class name -->
            <param-name>org.restlet.application</param-name>
            <param-value>firstSteps.FirstStepsApplication</param-value>
      </init-param>
   </servlet>  

   <!-- Catch all requests -->  
   <servlet-mapping>  
      <servlet-name>RestletServlet</servlet-name>  
      <url-pattern>/*</url-pattern>  
   </servlet-mapping>  
</web-app>
{{< /highlight >}}

Finally, package the whole as a WAR file called for example
"firstStepsServlet.war" and deploy it inside your Servlet container.
Once you have launched the Servlet container, open your favorite web
browser, and enter the following URL:

{{< highlight bash "style=emacs" >}}http://<your server name>:<its port number>/firstStepsServlet/hello
{{< /highlight >}}

The server will happily welcome you with the expected "hello, world"
message. You can find the WAR file (packaged with archives taken from
Restlet Framework 2.0 Milestone 5) in the "First steps application"
files.

## Run as a standalone Java application

A Restlet application cannot only run inside a Servlet container, but
can also be run as a standalone Java application using a single
"org.restlet.jar" JAR.

Create also a main class, copy/paste the following code wich aims at
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
{{< /highlight >}}

Once you have launched the main class, if you can open your favorite web
browser, and gently type the following URL:
http://localhost:8182/firstSteps/hello, the server will happily welcome
you with a nice "hello, world". Otherwise, make sure that the classpath
is correct and that no other program is currently using the port 8182.

You can find the sources of this sample application in the "First steps
application" files.

## Conclusion

We hope you that enjoyed these first steps and encourage you to check
[the equivalent page in the Java SE edition](../jse/overview "Restlet edition for Java SE")
for standalone deployments of the same application. This can also be a
convenient way to develop and test your Restlet application before
actually deploying it in a Java EE application server.

# Notes

-   Thanks to [Didier
    Girard](http://www.ongwt.com/)
    for suggesting this page.
