---
title: Setup
longTitle: Setting up a project
weight: 7
---
# Client-side configuration

To use Restlet on the client side of your GWT application:

​1) Create an application
[normally](http://code.google.com/webtoolkit/gettingstarted.html)
with the applicationCreator and/or projectCreator scripts supplied with
GWT, or using your favorite GWT design or IDE plugins.

​2) Add the Restlet JAR (org.restlet.jar) from the Restlet edition for
GWT to the project classpath *^[explain]^*

​3) Add the following to your application's module definition file
(*yourapp*.gwt.xml):

{{< highlight xml "style=emacs" >}}    <inherits name=&apos;org.restlet.Restlet&apos;/>
{{< /highlight >}}

This will make the Restlet API available to your GWT compiled code.  The
Restlet module in turn inherits the GWT standard
[HTTP](http://google-web-toolkit.googlecode.com/svn/javadoc/2.0/com/google/gwt/http/client/package-summary.html).
Two Restlet extensions are also provided based on
the [JSON](http://google-web-toolkit.googlecode.com/svn/javadoc/2.0/com/google/gwt/json/client/package-summary.html),
and
[XML](http://google-web-toolkit.googlecode.com/svn/javadoc/2.0/com/google/gwt/xml/client/package-summary.html)
modules. You can also check the [full Javadocs of the API
online](https://javadocs.restlet.talend.com/{{% param version %}}/gwt/api/index.html).

# Server-side configuration

If you would like to use Restlet on the server-side as well, you must
also modify GWT's `web.xml` file in the `war/WEB-INF` directory. 

​1) Add the org.restlet.jar, org.restlet.ext.servlet.jar and
org.restlet.ext.gwt.jar files from the Restlet edition for Java EE to
the project classpath. **The last file is necessary for the automatic
bean serialization to work**. Also, be sure to add any other Restlet
extension JARs necessary for extensions you plan to use on the server
side.

​2) Modify the web.xml:

{{< highlight xml "style=emacs" >}}<?xml version="1.0" encoding="UTF-8"?>
<web-app>
    <servlet>
        <servlet-name>restlet</servlet-name>
        <servlet-class>org.restlet.ext.servlet.ServerServlet</servlet-class>
        <init-param>
          <param-name>org.restlet.application</param-name>
          <param-value>application</param-value>
        </init-param>
    </servlet>

    <servlet-mapping>
        <servlet-name>restlet</servlet-name>
        <url-pattern>/rest/*</url-pattern>
    </servlet-mapping>

         ...
</web-app>
{{< /highlight >}}

For *application*, supply the name of your Restlet Application, e.g.
`com.mycompany.server.TestApplication`.  You can also supply a
*component* via an `org.restlet.component` parameter, or any other
permitted ServerServlet configuration parameter.
