---
title: Architecture
longTitle: Architecture flexibility
weight: 2
---
# GWT's idiomatic RPC approach

Figure 1. (For comparison)  GWT's idiomatic RPC approach requires a
Servlet container and communicates opaquely via JSON-encoded data
atoms.  Alternatives involve writing low-level HTTP code.

# The client-side Restlet/GWT module

Figure 2.  The client-side Restlet/GWT module (org.restlet.gwt) plugs
into your Google Web Toolkit code as a module, and allows you to use the
high level Restlet API to talk to any server platform.  XML and JSON
representations are supported by default, and of course you can develop
your own representational abstractions as well.  Code written for
Restlet should be simple to port to Restlet-GWT.

# Restlet/GWT can work alongside GWT-RPC

Figure 3. Restlet/GWT can work alongside GWT-RPC and other mechanisms. 
REST APIs exposed by your custom Servlets can work alongside GWT-RPC in
a Servlet container environment.

# Restlet, an ideal server side companion for Restlet-GWT

Figure 4. .  Not only does Restlet provide a simple means of defining
and mapping REST resources, it also provides useful facilities like the
Redirector, which can be used to gateway requests to other servers,
easily working around the single-source limitations of the AJAX
programming model.  The Restlet server-side library even works in GWT
Hosted Mode using the Restlet Framework GWT Extension, so your entire application
can be readily debugged.

# Integration with standalone Restlet connectors

Figure 5.  If you don't need to use the Servlet-dependent GWT-RPC API,
your compiled GWT application can be deployed very efficiently in a
standalone Restlet environment using one of the embedded server
connectors.  Restlet 1.1's Net server connector, for example, has no
dependencies other than Java; with this, it is possible to create and
release an extremely small, but very full featured, standalone
application.
