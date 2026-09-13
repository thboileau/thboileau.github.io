---
title: Atom
longTitle: Atom extension
---
# Introduction

This extension provides support for the Atom standard. Atom is an
evolution of the RSS standard that was introduced to remove know
limitations and enable new features and usages, especially in the light
of the REST principles.

Its main purpose it to define a format to represent Web feeds such as
news feed. This is called the [Atom Syndication
Format](http://www.atomenabled.org/developers/syndication/atom-format-spec.php).

The second purpose is to support the publication and modification of
those Web feeds, remotely on the Web and in an interoperable manner.
This is called the [Atom Publishing
Protocol](http://www.atomenabled.org/developers/protocol/atom-protocol-spec.php)
(APP).

# Description

The Restlet extension for Atom provides a complete Atom API for both Web
feeds and publication documents. This API is capable of both parsing and
formatting Atom and APP XML documents compliant with the 1.0
specifications.

The two main classes you should use are Feed (an Atom XML feed) and
Service (an AtomPub XML service descriptor) which are both subclasses of
SaxRepresentation. As such instances of both classes can be directly
returned as representation of your Restlet resources. They also support
parsing via the constructors accepting a Representation parameter.

For an usage example, check the source code of the
org.restlet.example.book.restlet.ch8.resources.FeedResource class.

For additional details, please consult [the
Javadocs](https://javadoc.io/doc/org.restlet/org.restlet.ext.atom/{{% param version %}}/org/restlet/ext/atom/package-summary.html).

## Links

-   [AtomEnabled.org](http://www.atomenabled.org/)
-   [Wikipedia
    entry](http://en.wikipedia.org/wiki/Atom_%28standard%29)
