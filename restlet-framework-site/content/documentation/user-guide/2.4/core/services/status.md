---
title: Status service
weight: 3
---
# Introduction

This service handles error statuses. If an exception is thrown within
your application or Restlet code, it will be intercepted by this service
if it is enabled.

When an exception or an error is caught, the [getStatus(Throwable,
Request,
Response)](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/service/StatusService.html#getStatus%28java.lang.Throwable,%20org.restlet.Request,%20org.restlet.Response%29)
method is first invoked to obtain the status that you want to set on the
response. If this method isn't overridden or returns null, the
[Status.SERVER\_ERROR\_INTERNAL](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/data/Status.html#SERVER_ERROR_INTERNAL)
constant will be set by default.

Also, when the status of a response returned is an error status (see
[Status.isError()](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/data/Status.html#isError%28%29),
the [getRepresentation(Status, Request,
Response)](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/service/StatusService.html#getRepresentation%28org.restlet.data.Status,%20org.restlet.Request,%20org.restlet.Response%29)
method is then invoked to give your service a chance to override the
default error page.

If you want to customize the default behavior, you need to create a
subclass of StatusService that overrides some or all of the methods
mentioned above. Then, just create a instance of your class and set it
on your Component or Application via the setStatusService() methods.

# Display error pages

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
