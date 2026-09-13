---
title: Google App Engine
longTitle: Restlet edition for Google App Engine
weight: 2
---
# Introduction

Google provides a Java version of his App Engine solution (GAE). It is a
PaaS (Platform as a Service) solution that offers massive and flexible
scalability for your Web applications by hosting them on the Google
cloud (based on Google computing infrastructure).

Due to the restrictions of the GAE, we need to provide an adaptation of
Restlet for this environment. GAE is based on Java 6, with a restricted
list of APIs. See [GAE developers
documentation](https://developers.google.com/appengine/)
for details.

Modules availables:

-   Restlet core (API + Engine)
-   Restlet extension - Javamail (SMTP client)
-   Restlet extension - Net (HTTP and HTTPS client)
-   Restlet extension - Servlet (HTTP and HTTPS server)
-   Restlet extension - XML (DOM, SAX and XPath)

# Usage example

Create a new GAE project with the Eclipse plugin provided, add the
"org.restlet.jar" and the "org.restlet.ext.servlet.jar" files from the
[latest Restlet snapshots](/documentation/user-guide/2.2/introduction/setup/download/)(make
sure you download the edition for GAE) to your "/war/WEB-INF/lib/"
directory and to your project build path.

Here is the Restlet resource to create:


{{< highlight java "style=emacs" >}}package firstSteps;

import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

/**
 * Resource which has only one representation.
 *
 */
public class HelloWorldResource extends ServerResource {

    @Get
    public String represent() {
        return "hello, world (from the cloud!)";
    }

}

{{< /highlight >}}

Now here is the parent application:


{{< highlight java "style=emacs" >}}package firstSteps;

import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;

public class FirstStepsApplication extends Application {

    /**
     * Creates a root Restlet that will receive all incoming calls.
     */
    @Override
    public Restlet createInboundRoot() {
        // Create a router Restlet that routes each call to a
        // new instance of HelloWorldResource.
        Router router = new Router(getContext());

        // Defines only one route
        router.attachDefault(HelloWorldResource.class);

        return router;
    }
}

{{< /highlight >}}

Finally, here is the Servlet configuration file:


{{< highlight xml "style=emacs" >}}<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE web-app PUBLIC
 "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
 "http://java.sun.com/dtd/web-app_2_3.dtd">

<web-app xmlns="http://java.sun.com/xml/ns/javaee" version="2.5">
         <display-name>first steps servlet</display-name>

         <servlet>
                 <servlet-name>RestletServlet</servlet-name>
                 <servlet-class>org.restlet.ext.servlet.ServerServlet</servlet-class>
                 <init-param>
                         <param-name>org.restlet.application</param-name>
                         <param-value>firstSteps.FirstStepsApplication  </param-value>
                 </init-param>
         </servlet>

    <!-- Catch all requests -->
    <servlet-mapping>
        <servlet-name>RestletServlet</servlet-name>
        <url-pattern>/*</url-pattern>
    </servlet-mapping>
</web-app>
{{< /highlight >}}

For more information on Restlet, please check our [documentation
pages](/documentation/javadocs/{{% param version %}}/jse).

# Javadocs

The Javadocs of the Restlet edition for GAE are available online as
well:

-   [Restlet
    API](https://javadocs.restlet.talend.com/{{% param version %}}/gae/api/index.html)
-   [Restlet
    Extensions](https://javadocs.restlet.talend.com/{{% param version %}}/gae/ext/index.html)
-   [Restlet
    Engine](https://javadocs.restlet.talend.com/{{% param version %}}/gae/engine/index.html)
