---
title: Persistence Layer
weight: 2
---
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
