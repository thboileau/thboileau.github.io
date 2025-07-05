---
title: Tunnel service
weight: 10
---
# Introduction

This service tunnels request method or client preferences. The tunneling
can use query parameters and file-like extensions. This is particularly
useful for browser-based applications that can't fully control the HTTP
requests sent.

Here is the list of the default parameter names supported:

Property | Default name | Value type | Description
---------|--------------|------------|------------
methodParameter | method | See values in [Method](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/data/Method.html) | For POST requests, let you specify the actual method to use (DELETE, PUT, MOVE, etc.). For GET requests, let you specify OPTIONS as the actual method to use.
characterSetParameter | charset | Use extension names defined in [MetadataService](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/service/MetadataService.html) | For GET requests, replaces the accepted character set by the given value.
encodingParameter | encoding | Use extension names defined in [MetadataService](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/service/MetadataService.html) | For GET requests, replaces the accepted encoding by the given value.
languageParameter | language | Use extension names defined in [MetadataService](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/service/MetadataService.html) | For GET requests, replaces the accepted language by the given value.
mediaTypeParameter | media | Use extension names defined in [MetadataService](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/service/MetadataService.html) | For GET requests, replaces the accepted media type set by the given value.


The client preferences can also be updated based on the extensions
available in the last path segment. The syntax is similar to file
extensions by allows several extensions to be present, in any particular
order: e.g. "/path/foo.fr.txt"). This mechanism relies on the mapping
between an extension and a metadata (e.g. "txt" =\> "text/plain")
declared by the
[MetadataService](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/service/MetadataService.html).

The client preferences can also be updated according to the user agent
properties (its name, version, operating system, or other) available via
the
[ClientInfo.getAgentAttributes()](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/data/ClientInfo.html#getAgentAttributes%28%29)
method. The feature is based on a property-like file called
"accept.properties" and loaded from the classpath. Here is an excerpt of
such file :

{{< highlight bash "style=emacs" >}}agentName: firefox accept:
application/xhtml+xml,text/html,text/xml;q=0.9,application/xml;q=0.9
{{< /highlight >}}

It allows to specify a complete "accept" header string for a set of
(key:value) pairs. The header value is given with the "accept" key, and
the set of (key:value) pairs is the simple list of key:value just above
the "accept" line.
