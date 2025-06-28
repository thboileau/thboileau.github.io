---
title: Implemented services
longTitle: XMLDB Restet Adapter/Lucene/Maven - Services implemented
weight: 10
---
__This documentation refers to Lucene Web Service with a deprecated URL: `http://dev.lucene-ws.net`__


__It seems that Lucene Web Service has moved to [http://lucene-ws.sourceforge.net/docs.html](http://lucene-ws.sourceforge.net/docs.html) and does not have the same API than it was__


GET services are implemented because PUT methods are easier to perform using
SQL interface. There is no limitation to implement PUT, POST and DELETE methods,
but we think that SQL interface is a better place to do it.

Other services will be implemented soon to provide other services not available
through SQL interface and Lucene REST WS API, for example to get term info.


Here a list of GET services implemented and his link to the specification

Resource | Method | Description | Server Content | Class
---------|--------|-------------|----------------|------
Service: `http://dev.lucene-ws.net/wiki/ServiceAPI#GET` | GET | Retrieves a list of indices | AtomPP introspection document | [IndexesResource.java](http://dbprism.cvs.sourceforge.net/dbprism/lucene-restlet/src/main/java/org/apache/lucene/ws/IndexesResource.java?view=log)
Index: `http://dev.lucene-ws.net/wiki/IndexAPI#GET` | GET | Most recent modified documents | Atom Feed| [IndexResource.java](http://dbprism.cvs.sourceforge.net/dbprism/lucene-restlet/src/main/java/org/apache/lucene/ws/IndexResource.java?view=log)
Index: `http://dev.lucene-ws.net/wiki/IndexSearchAPI#GETwithquery` |  GET (with ?query) | Searches the index | Atom Feed | [QueryResource.java](http://dbprism.cvs.sourceforge.net/dbprism/lucene-restlet/src/main/java/org/apache/lucene/ws/QueryResource.java?view=log)
Index.Properties: `http://dev.lucene-ws.net/wiki/IndexPropertiesAPI#GET` | GET | Retrieves the list of properties for the index | Atom Entry | [IndexProperty.java](http://dbprism.cvs.sourceforge.net/dbprism/lucene-restlet/src/main/java/org/apache/lucene/ws/IndexProperty.java?view=log)
OpenSearch Description: `http://dev.lucene-ws.net/wiki/IndexSearchAPI#GETopensearchdescription.xml` | GET | Gets the OpenSearch Description document | OSD Document | [IndexOpenSearch.java](http://dbprism.cvs.sourceforge.net/dbprism/lucene-restlet/src/main/java/org/apache/lucene/ws/IndexOpenSearch.java?view=log)
Document: `http://dev.lucene-ws.net/wiki/DocumentAPI#GET` | GET | Gets a document from the index | Atom Entry | [DocumentResource.java](http://dbprism.cvs.sourceforge.net/dbprism/lucene-restlet/src/main/java/org/apache/lucene/ws/DocumentResource.java?view=log)
Document | GET (with /mlt at end) | Gets a list of document like this (More like this) | Atom Feed | To be Implemented
Document | GET (with /fieldName at end) | Gets a list of term freq for a given term | Atom Feed | To be implemented

