---
title: Engine
weight: 3
---
# Connectors

## Content negotiation

Content negotiation was rewritten to support all possible dimensions
such as media type, language, character set or encoding.

## CLAP client

Enhanced the CLAP connector to support a default authority (“class”) for
shorter URIs (ex: “clap:///org/restlet/Uniform.class”). Added
LocalReference\#createClapReference(int, Package) and
createClapReference(Package) methods to help building shorter CLAP URIs.

## Internal HTTP connectors

The internal HTTP connectors were replaced with new ones based
supporting the new asynchronous processing features in Restlet API.
They are actually the only connectors for now, beside the GWT edition,
supporting those new asynchronous capabilities which should be
considered as a preview feature at this point. In version 2.1 we attempt
to support them in alternative connectors such as Jetty, Grizzly and
Netty.

In addition, the new design of the internal connector is asynchronous in
nature and will provide you production ready performance when we
leverage non-blocking NIO. This is working in the Restlet Incubator but
is only planned for the next 2.1 version. For now, you should mainly use
these connectors for development purpose and [configure connectors](../../../core/base/connectors "Connectors") such
as Jetty and Apache HTTP Client when deploying to production.

## Internal JAR and ZIP clients

Client connectors for the ZIP and JAR pseudo-protocols were added.

## RIAP connectors

Added client and server RIAP connectors that use a protected singleton
unique in the JVM.
