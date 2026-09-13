---
title: Overview
weight: 1
---

The Restlet Framework is composed of two parts:

-   The Restlet Core (Restlet API + Restlet Engine implementing the API)
-   Optional Restlet extensions

# Description

The Restlet Framework lets you build complete Web applications by itself
and is capable of leveraging other open source projects to facilitate
tasks such as generation of dynamic representations, management of
uploaded files, sending of mails, etc. There are two types of
extensions.

The first one is for extensions built only on top of the Restlet API and
typically provide new type of representations (JAXB, FreeMarker, JiBx,
etc.) or support of important standards (Atom, WADL).

The second one covers extensions to the Restlet engine such as client
connectors, server connectors and authentication helpers.

# Distribution

All extensions and their dependencies are shipped with the Restlet
distribution by the way of JAR files. Adding an extension to your
application is as simple as adding the archives of the chosen extension
and its dependencies to the classpath. 
