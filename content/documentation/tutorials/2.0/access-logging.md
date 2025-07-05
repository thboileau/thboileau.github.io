---
title: Access logging & display error pages
weight: 9
---
# Access logging

Being able to properly log the activity of a Web application is a common
requirement. Restlet Components know by default how to generate
Apache-like logs or even custom ones. By taking advantage of the logging
facility built in the JDK, the logger can be configured like any
standard JDK log to filter messages, reformat them or specify where to
send them. Rotation of logs is also supported; see the
[java.util.logging](http://docs.oracle.com/javase/1.5.0/docs/api/java/util/logging/package-summary.html)
package for details.

Note that you can customize the logger name given to the
java.util.logging framework by modifying the Component's "logService"
property. In order to fully configure the logging, you need to declare a
configuration file by setting a system property like:

{{< highlight java "style=emacs" >}}System.setProperty("java.util.logging.config.file", "/your/path/logging.config");
{{< /highlight >}}

For details on the configuration file format, please check the [JDK's
LogManager](http://docs.oracle.com/javase/1.5.0/docs/api/index.html?java/util/logging/LogManager.html)
class.

You can also have a look at the [Restlet {{% param version %}} logging
documentation](/documentation/user-guide/{{% param version %}}#/101-restlet.html).

# Displaying error pages

Another common requirement is the ability to customize the status pages
returned when something didn't go as expected during the call handling.
Maybe a resource was not found or an acceptable representation isn't
available? In this case, or when any unhandled exception is be
intercepted, the Application or the Component will automatically provide
a default status page for you. This service is associated to the
org.restlet.util.StatusService class, which is accessible as an
Application and Component property called "statusService".

In order to customize the default messages, you will simply need to
create a subclass of StatusService and override the
getRepresentation(Status, Request, Response) method. Then just set an
instance of your custom service to the appropriate "statusService"
property.
