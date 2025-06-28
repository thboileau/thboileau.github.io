---
title: Overview
weight: 1
---
# Introduction

This document will cover the Restlet edition for Android, which is a
port of the Restlet Framework to the [Android mobile
OS](http://code.google.com/android/).

# A Web server on a mobile phone

There are several reasons for having a Web server on a mobile phone:

-   Test locally client Web applications without having to consume the
    network access which might be limited by cost or availability in
    some areas
-   Allow third-party applications, on other phones or other platforms
    to access to your phone remotely. This requires strong security
    mechanisms that are provided in part by the Restlet Framework as
    well as network level authorizations by the carrier.
-   Run local Android applications that are leveraging the internal Web
    browser and behaving like regular hypermedia applications instead of
    using GUIs specific to Android.

# A Web client on a mobile phone

The port of Restlet on Android also includes a full Web client to access
to either local or remote Web servers. Android already has an HTTP
client library, but with a much lower-level API while Restlet let you
leverage higher-level features naturally (such as conditional methods,
content negotiation, etc.). The support of other protocols than HTTP
(like file system access via file:/// URIs) is also useful.

# Specificities

Contrary to other editions, the Android edition can't leverage Restlet's
autodiscovery mechanism for connectors and converters provided as
Restlet extensions. This is due to a limitation in the way Android
repackages JAR files, leaving out the descriptor files in the
"META-INF/services/" packages used by the Restlet Framework for
autodiscovery.

The workaround consist of manually registering those additional
connectors and converter in the Restlet engine. Here is an example for
the Jackson converter:

{{< highlight java "style=emacs" >}}import org.restlet.engine.Engine;
import org.restlet.ext.jackson.JacksonConverter;

// ...

Engine.getInstance().getRegisteredConverters().add(new JacksonConverter());
{{</ highlight >}}

Here is another example for the Apache HTTP Client:

{{< highlight java "style=emacs" >}}import org.restlet.engine.Engine;
import org.restlet.ext.httpclient.HttpClientHelper;

// ...

Engine.getInstance().getRegisteredClients().clear();
Engine.getInstance().getRegisteredClients().add(new HttpClientHelper(null));
{{</ highlight >}}
