---
title: Overview
weight: 1
---
This **org.restlet** package contains the most important classes of the Restlet API,
mapping key HTTP and REST concepts to Java including:

 - **Client**: Connector acting as a generic client.
 - **Component**: Restlet managing a set of Connectors, VirtualHosts, Services and Applications.
 - **Connector**: Restlet enabling communication between Components.
 - **Message**: Generic message exchanged between components.
 - **Request**: Generic request sent by client connectors.
 - **Response**: Generic response sent by server connectors.
 - **Server**: Connector acting as a generic server.
 - **Uniform**: Uniform REST interface.

It also contains key framework classes:

 - **Application**: Restlet managing a coherent set of resources and services.
 - **Context**: Contextual data and services provided to a set of Restlets.
 - **Restlet**: Uniform class that provides a context and life cycle support.
