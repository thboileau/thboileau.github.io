---
title: Migration
longTitle: Migration guide from Restlet 1.0 to 1.1
weight: 3
---
# Introduction

This guide intends to explain the main differences between the Restlet
1.0 and 1.1 releases and to help you migrate your existing applications.

It presents a set of important modifications related to:

-   Handling of context
-   Handling of resources
-   Usage of the Servlet Adapter
-   Access to "current" objects
-   Access to the original resource reference of the current request
-   Handling of statuses and exceptions
-   Miscellaneous
-   List of deprecations (mainly renamed methods)

# Important breaking changes

## Handling of context

The handling of Context has been significantly refactored in the 1.1
release due to security reasons. In release 1.0, a Component shared its
context between all attached applications. It appeared that this design
could lead to conflicts where an application would update the
component's context and thus impact the behavior of the other
applications.

Here are the main changes implemented in the 1.1 release:

-   Each connector now has its own instance of Context to allow setting
    of different parameter values on different connectors.
-   A new Context\#createChildContext() method has been added to create
    a new isolated child context from a parent component's context.
-   The semantics of the Application(Context) constructor has changed in
    that the given context is no more the parent context, but the
    application's context.
-   The "attach" methods on virtual hosts and internal component router
    now automatically set the child context on the target application
    with a null context is detected.

Thus, we encourage you to override the default Application() constructor
instead of the Application(Context) one which is only useful in a few
cases where you need to immediately have access to the application's
context.

Another consequence is that parameters or attributes are not copied from
the component to the application by the default implementation of the
Context\#createChildContext() method which is typically used to prepare
the Application's context based on the parent Component's context.

## Sample code

When a component instantiate an Application, or any kind of Restlet, it
is no more mandatory to specify the context. Taking a simple component
that attaches an application, here is the ancient way to achieve this:

{{< highlight java "style=emacs" >}}Component component = new Component();

// Add a new HTTP server listening on port 8182.
component.getServers().add(Protocol.HTTP, 8182);

// Attach the sample application.
component.getDefaultHost().attach(new FirstStepsApplication(component.getContext()));
{{</ highlight >}}

And now, here is the new way:

{{< highlight java "style=emacs" >}}Component component = new Component();

// Add a new HTTP server listening on port 8182.
component.getServers().add(Protocol.HTTP, 8182);

// Attach the sample application.
component.getDefaultHost().attach(new FirstStepsApplication());
{{</ highlight >}}

If you still need to handle the context in the Application constructor,
you must do as follow:

{{< highlight java "style=emacs" >}}Component component = new Component();

// Add a new HTTP server listening on port 8182.
component.getServers().add(Protocol.HTTP, 8182);

// Attach the sample application.
component.getDefaultHost().attach(new FirstStepsApplication(component.getContext().createChildContext()));
{{</ highlight >}}

The application is instantiated with a child context, not the component
context. Otherwise, your application might not start properly and a log
trace will warn you.

# Handling of resources

Some new boolean attributes have been added on the resource class. They
help to specify the state of a Resource instance.

-   The "available" attribute says if the current resource exists and
    can present a representation. If a resource is not available, then a
    404 status is returned.
-   The "modifiable" attribute says if the current resource supports the
    methods that update its state, that is to say, for the HTTP
    protocol: POST, PUT and DELETE.
-   The "readable" attribute says if the current resource is able to
    generate a representation. If a resource is not readable, a resource
    will answer to GET and HEAD HTTP methods with a "method not allowed"
    response status.

# Usage of the Servlet Adapter

-   The ServletConverter now also copy the Servlet's request attributes
    into the Restlet attributes map.
-   A static ServletCall.getRequest(Request) method has been added to
    the Servlet extension and gives access to the HttpServletRequest
    object.
-   The underlying component can now be customized which allows to
    define several applications either with a "/WEB-INF/restlet.xml
    file", or a "org.restlet.component" parameter in the "web.xml". see
    [ServerServlet
    javadocs](https://javadocs.restlet.talend.com/{{% param version %}}/all/ext/com/noelios/restlet/ext/servlet/ServerServlet.html)
    for more details.

# Accessing current objects

Some recurrent need is to access current objects such as the current
application, the current context, etc. Although, the API of some objects
gives direct access to such properties (e.g.
"Resource\#getApplication"), it was generally not the case with Restlet
1.0, thus some static methods have been introduced in Restlet 1.1:

Method name | Description
----------- | -----------
Response.getCurrent() | The current Response object handled by the current thread.
Application.getCurrent() | The current Application object handled by the current thread.
Context.getCurrent() | The current Context handled by the current thread.
Context.getCurrentLogger() | Always returns a non-null logger, if possible the current context's logger.

These methods may help you to reduce the number of lines of code but,
for proper object-oriented design, we recommend using them only under
duress. Typical case is when you need to integrate Restlet code with a
third-party library that doesn't let you pass in your Restlet context or
objects. For example, you should by default prefer obtaining the current
context using methods such as
[Restlet.getContext()](https://javadocs.restlet.talend.com/{{% param version %}}/all/api/org/restlet/Restlet.html#getContext%28%29)
or
[Handler.getContext()](https://javadocs.restlet.talend.com/{{% param version %}}/all/api/org/restlet/Handler.html#getContext%28%29).

# Accessing the original resource's reference

New features have been added to the tunnel filter. Some of them allow
you to automatically update the request according to some parameters
specified in the query part of the target resource's reference. In this
case, it happens that the resource's reference is updated. If you still
want to access the original reference, a new attribute has been added to
the Request object called "originalRef'".

# Handling of statuses and exceptions

A new "ResourceException" class has been introduced. Basically, it
encapsulates a status and the optional cause of a checked exception.
This exception may be thrown by a Resource instance when handling GET,
POST, PUT, etc requests. This exception can be handled by the status
service when rendering error statuses.

# Miscellaneous

This section lists several updates that may have an impact on your
existing code

-   The Resource class now accepts POST requests without any entity, or
    with an empty entity.
-   The list of known media-types defined on the MetadataService has
    been completed with Tomcat's entries
-   Added a Representation.release() to have an uniform way to release a
    representation without forcing a read for example or manually
    closing the socket, the channel, the file, etc.
-   Added a Representation.exhaust() method that reads and discards
    content optimally (better than getText())
-   Application is now concrete and has a setRoot() method.
-   Filter.beforeHandle() and doHandle() methods can now indicate if the
    processing should continue normal, go to the afterHandle() method
    directly or stop immediately.
    >**IMPORTANT NOTE**: as it isn't
    possible to add a return parameter to an existing method, the change
    can break existing filters. In this case, you just need to return
    the "CONTINUE" constant from your method and use "int" as a return
    parameter.
-   Added Handler.getQuery() method to easily return the request's
    target resource reference query as a parsed form (series of
    parameters).
-   The Message's getEntityAsDom(), getEntityAsSax() and
    getEntityAsForm() are now caching the result representation for
    easier reuse in a Restlet filters chain.

# Deprecations

## Resource class

List of renamed methods to prevent confusion with lower-level methods
handleGet(), handletPost(), handlePut() and handleDelete() now part of
the parent class of Resource, the Handler class.

Method | Replacement
------ | -----------
getPreferredRepresentation() | represent()
getRepresentation(Variant) | represent(Variant)
post(Representation) | acceptRepresentation(Representation)
put(Representation) | storeRepresentation(Representation)
delete() | removeRepresentations()

## Variant class

Some properties and methods have been moved to the Representation
subclass

-   UNKNOWN\_SIZE
-   getExpirationDate, setExpirationDate
-   getModificationDate, setModificationDate
-   getSize, setSize
-   getTag, setTag

## TunnelService

List of renamed methods.

Method | Replacement
------ | -----------
getCharacterSetAttribute | getCharacterSetParameter
setCharacterSetAttribute | setCharacterSetParameter
getEncodingAttribute | getEncodingParameter
setEncodingAttribute | setEncodingParameter
getLanguageAttribute | getLanguageParameter
setLanguageAttribute | setLanguageParameter
getMediaTypeAttribute | getMediaTypeParameter
setMediaTypeAttribute | setMediaTypeParameter

## MetadataService

This class allows to link a metadata with several extensions name.
However, only the first one in the list will be returned by the
getExtension(Metadata), it is considered as the preferred one. The
"getMappings" and "setMappings" methods have been removed. Instead, use
getExtension(Metadata), getMetadata(String) and the addExtension(String,
Metadata), addExtension(String, Metadata, boolean preferred),
clearExtension methods

## ConverterService

Since 1.1 with no replacement as it doesn't fit well with content
negotiation. Most users prefer to handle those conversion in Resource
subclasses.

## Request

As a consequence of the previous change, the following methods are not
replaced: Request\#getEntityAsObject, Request\#setEntity(Object)

## Response

List of renamed methods.

Method | Replacement
------ | -----------
getChallengeRequest | getChallengeRequests
getRedirectRef | getLocationRef
setRedirectRef | setLocationRef

## Finder

Method | Replacement
------ | -----------
createResource(Request, Response) | createTarget(Request, Response) and take care of the targetClass property.

## Template

Removed the Logger parameter to all constructors. which still can be set
with the setLogger(Logger) method.

## Restlet

The init(Request, Response) method is removed. Instead, make sure that
you call the {@link \#handle(Request, Response)} method from your
Restlet superclass.

## Form

Removed the Logger parameter to all constructors.

## Status

Method | Replacement
------ | -----------
isInfo(int code) | isInformational(int)
isInfo() | isInformational()

## ChallengeScheme

ChallengeScheme HTTP\_AWS replaced by HTTP\_AWS\_S3

## Protocol

The SMTP\_STARTTLS protocol is removed. Use the "startTls" parameter on
the JavaMail connector instead.

## Response

Method | Replacement
------ | -----------
getChallengeRequest | getChallengeRequests
getRedirectRef | getLocationRef
setRedirectRef | setLocationRef

## Guard

List of renamed methods.

Method | Replacement
------ | -----------
challenge(Response) | challenge(Response, boolean) The added boolean indicates if the new challenge is due to a stale response.
checkSecret(String, char[]) | checkSecret(Request, String, char[]) Added the request parameter

## Context

List of renamed method.

Method | Replacement
------ | -----------
getDispatcher | getClientDispatcher NB: it exists a server dispatcher.

## TransformRepresentation

List of renamed methods

Method | Replacement
------ | -----------
getURIResolver | getUriResolver
