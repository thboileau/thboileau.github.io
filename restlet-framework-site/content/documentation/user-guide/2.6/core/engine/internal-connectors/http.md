---
title: HTTP
longTitle: HTTP connector (internal)
parent: Internal connectors
section: guide-core
version: '2.6'
weight: 3
---
-   HTTP client : supporting chunked encoding, persistent connections
    and asynchronous processing, but not HTTPS
-   HTTP server : supporting chunked encoding, persistent connections
    and asynchronous processing, but not HTTPS

The internal HTTP connectors can be configured with several sets of
parameters:

* [Base parameters](https://javadoc.io/static/org.restlet/org.restlet/{{% frameworkLatestRelease %}}/org/restlet/engine/RestletHelper.html)
* [Connection parameters](https://javadoc.io/static/org.restlet/org.restlet/{{% frameworkLatestRelease %}}/org/restlet/engine/connector/ConnectorHelper.html)
* [Client parameters](https://javadoc.io/static/org.restlet/org.restlet/{{% frameworkLatestRelease %}}/org/restlet/engine/connector/ClientHelper.html)
* [Server parameters](https://javadoc.io/static/org.restlet/org.restlet/{{% frameworkLatestRelease %}}/org/restlet/engine/connector/ServerHelper.html)
