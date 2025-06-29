---
title: jSSLutils
longTitle: jSSLutils extension
---
# Introduction

The SSL extension provides concrete implementations of the
[SslContextFactory](https://javadocs.restlet.talend.com/{{% param version %}}/jse/engine/org/restlet/engine/ssl/SslContextFactory.html)
that rely on
[jSSLutils](http://code.google.com/p/jsslutils/).

For additional details, please consult the
[Javadocs](https://javadocs.restlet.talend.com/{{% param version %}}/jse/ext/org/restlet/ext/jsslutils/package-summary.html).

# Description

## JsslutilsSslContextFactory

The JsslutilsSslContextFactory class is a wrapper for
`jsslutils.sslcontext.SSLContextFactory`. It has to be constructed with
the instance to wrap and is therefore only suitable to be used in the
context `sslContextFactory` *attribute*, not *parameter*. This is more
likely to be used for more specialised features such as the key or trust
manager wrappers of jSSLutils.

## PkixSslContextFactory

The PkixSslContextFactory class is a class that uses
`jsslutils.sslcontext.PKIXSSLContextFactory`. It provides a way to
configure the key store, the trust store (required for client-side
authentication) and the server alias. As part of its trust manager
configuration, it provides a way to set up certificate revocation lists
(CRLs).

### Example using the Component XML configuration:

{{< highlight xml "style=emacs" >}}<component xmlns="http://www.restlet.org/schemas/1.1/Component"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.restlet.org/schemas/1.1/Component">

    <client protocol="FILE" />

    <server protocol="HTTPS" port="8183">
        <parameter name="sslContextFactory" value="org.restlet.ext.ssl.PkixSslContextFactory" />
        <parameter name="keystorePath" value="/path/to/keystore.p12" />
        <parameter name="keystoreType" value="PKCS12" />
        <parameter name="keystorePassword" value="testtest" />
        <parameter name="keyPassword" value="testtest" />
        <parameter name="truststorePath" value="/path/to/truststore.jks" />
        <parameter name="truststoreType" value="JKS" />
        <parameter name="truststorePassword" value="testtest" />
        <parameter name="crlUrl" value="file:///path/to/crl.crl" />
        <parameter name="wantClientAuthentication" value="true" />
    </server>

    <defaultHost>
        <attach uriPattern="" targetClass="org.restlet.example.tutorial.Part12" />
    </defaultHost>
</component>
{{</ highlight >}}

There can be multiple `crlUrl` parameters. In addition, two other
parameters can be set:

-   `sslServerAlias`, which will use a particular alias from the key
    store.
-   `disableCrl`, which should be set to "true" if CRLs are not to be
    used.

The `wantClientAuthentication` parameter is handled by this the
SslContextFactory, but is often used in conjunction with it.

### Example embedded within the program, using two connectors:

{{< highlight java "style=emacs" >}}Component component = new Component();

Server server1 = component.getServers().add(Protocol.HTTPS,
   "host1.example.org", 8083);
Series<Parameter> param1 = server1.getContext().getParameters();

param1.add("sslContextFactory","org.restlet.ext.ssl.PkixSslContextFactory");
param1.add("keystorePath","/path/to/keystore1.p12");
param1.add("keystorePassword","...");
param1.add("keystoreType","PKCS12");
//...

Server server2 = component.getServers().add(Protocol.HTTPS,
   "host2.example.com", 8083);
Series<Parameter> param2 = server2.getContext().getParameters();

param2.add("sslContextFactory","org.restlet.ext.ssl.PkixSslContextFactory");
param2.add("keystorePath","/path/to/keystore2.p12");
//...
{{</ highlight >}}

This example uses two certificates depending on which server connector
(and thus which listening socket) is used.
