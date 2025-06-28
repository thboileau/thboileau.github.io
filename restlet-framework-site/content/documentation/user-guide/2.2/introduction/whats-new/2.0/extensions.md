---
title: Extensions
longTitle: Extensions for version 2.0
weight: 4
---
# Crypto extension

New extension that contains support for Amazon S3 and Windows Azure client HTTP authentication (Shared Key and Shared Key Lite) schemes.

The support for HTTP DIGEST has been vastly improved, especially on the client-side, with proper mapping of its properties to AuthenticationInfo (new), ChallengeMessage (new), ChallengeRequest and ChallengeResponse
classes.

# FreeMarker extension

FreeMarker templates can now be loaded via the Context’s client dispatcher and relatively to a base URI.

# GWT extension (server-side)

Added an ObjectRepresentation class to the GWT edition and to the "org.restlet.ext.gwt" server extension. This allows transparent serialization of Java objects leveraging GWT-RPC serialization mechanism, but using your REST APIs.

# HTTP Client extension (Apache)

The extension has been updated from 3.1 to 4.0 version. Note that some parameters have been changed, so be sure to verify your configuration. In addition, it is now possible to specify a different proxy server to use for each Restlet connector.

# JAAS extension

Following the security API enhancements and refactorings, the classes relying on the javax.security.auth package have been moved to a new JAAS extension**.**

# Jackson extension

New [Jackson](http://wiki.fasterxml.com/JacksonHome) extension added, offering a nice alternative to the existing XStream
extension for JSON object serialization (based on Jettison).

# JAX-RS extension

Now leverages the new Security API.

# Jetty extension

Updated to leverage the recent Jetty 7.0 version now hosted at Eclipse.

# Lucene extension

In addition, a [Lucene extension](/documentation/user-guide/{{% param version %}}/extensions/lucene)has been created to host the Solr client connector contributed by Rémi Dewitte who will lead this extension. There is also a TikaRepresentation available to leverage Lucene Tika subproject when extracting metadata from representations.

# Net extension

A new FTP client connector was added in the “org.restlet.ext.net” extension, based on the JDK’s URLConnection class. It is limited and only support GET methods.

# Netty extension

New extension leveraging the new NIO framework from JBoss. Provides HTTP and HTTPS server connectors.

# OData extension

A new extension for Microsoft ADO.NET Data Services technology (previously known as “project Astoria”) was added, later renamed to WCF Data Services then OData.

It provides a high-level client API based on the ClientResource class that lets you access remote OData services, typically hosted in an ASP.NET servers or on the Windows Azure cloud computing platform. The extension contains both a code generator for the representation beans and a runtime layer.

Advanced features such as projections, blobs, server-side paging, row counts, customizable feeds or version headers are supported.

This extension is in the "org.restlet.ext.odata" package and depends on "org.restlet.ext.atom" and "org.restlet.ext.xml" extensions. The extension is also available on the Android edition of the Restlet Framework.

# RDF extension

As announced when we presented the roadmap, we want to make Restlet a great framework for building applications for the Semantic Web. The relationship between REST and RDF is perfect and builds around the concept of resources and their representations (REST) and the expression of meaningful links between those resources (RDF).

In Restlet 2.0, we have added Literal, Link,  LinkReference, LinkSet and RdfRepresentation classes. That makes it easy to build a RDF graph, like you would use a DOM API to build and XML document..

This extension contains a full RDF API, leveraging the Restlet API, and capable of processing RDF documents either in a DOM-like way or in a SAX-like way. It is also capable of writing large RDF documents is a SAX-like way. We currently support two serialization formats: RDF/XML, RDF/n3, Turtle and N-Triples. In the next version we will extend those
formats to Turtle and NTriples.

A RdfClientResource class facilitates the navigation in the Web of Data.

# ROME extension

A new ROME extension was added to support several versions of RSS and
Atom syndication feeds formats. This extension is complementary with the
existing Atom extension which is fully based on Restlet API.

# Servlet extension

Improved to support multiple declarations of the ServerServlet in the same Servlet application.

# SLF4J extension

The Restlet logging, based on JULI (java.util.logging), now has an extension mechanism allowing an efficient redirection to alternate mechanisms like log4j as [explained here](/documentation/user-guide/{{% param version %}}/editions/jse/logging). A new SLF4J extension has been added to facilitate the replacement of Restlet’s default logger facade.

# Spring extension

Updated to leverage Spring Framework version 3.0.

# XML extension

New "org.restlet.ext.xml" extension including XML related classes previously in the core Restlet API. This ensures that the core Restlet API stays as consistent as possible across all editions. In this case, those features weren’t available in Android.

# XStream extension

Added an "org.restlet.ext.xstream" extension providing transparent serialization between Java objects and XML or JSON.
