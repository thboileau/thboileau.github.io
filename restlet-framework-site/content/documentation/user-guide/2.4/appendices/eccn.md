---
title: ECCN
weight: 4
---
# Introduction

This page gives some information to help you obtain an ECCN ([Export
Control Classification
Number](http://en.wikipedia.org/wiki/Export_Control_Classification_Number))
for your Restlet based application.

We are aware of several organizations that attempted to obtain such a
number for their Restlet-based application but we don't think that there
is a single ECCN for Restlet. Depending on the actual Restlet extensions
that you are using and redistributing, this classification could change.

In order to help you find your ECCN, we try to answer the typical
questions related to the classification process.

# FAQ

## Does Restlet include any encryption technology?

The Restlet Framework has a [cryptographic
extension](https://javadocs.restlet.talend.com/{{% param version %}}/jee/ext/org/restlet/ext/crypto/package-summary.html)
(org.restlet.ext.crypto.jar file) that includes all cryptographic
related features. It is based on regular Java Cryptography APIs
(javax.crypto) and used for authentication purpose only (so far): 

 In addition, we can take advantage of SSL/HTTPS features to encrypt
communications.

### **1) org.restlet.security package**

This is the generic security API for Restlet dealing with authentication
and authorization. It doesn't contain actual implementations for
specific schemes.

However, pluggable authenticator helpers can be registered in the
Restlet engine, such as these ones in the [crypto
extension](https://github.com/restlet/restlet-framework-java/tree/{{% param version %}}/modules/org.restlet.ext.crypto/src/main/java/org/restlet/ext/crypto/internal)
(note the "internal" packages are hidden from public Javadocs).

### **2) org.restlet.engine.http.security package**

This package contains one class for HTTP Basic support, not really
encryption related. This was removed in version 2.1 and the
HttpBasicHelper was moved into org.restlet.engine.security.

### **3) org.restlet.engine.security package**

This package contains SSL related classes, but only in version 2.0. In
version 2.1 those classes were moved to the org.restlet.ext.ssl
extension:

## What encryption algorithms and key lengths are used?

When we encrypt authentication data in a cookie, we give the option to
change the algorithm and the secret key, [see details
here](https://javadocs.restlet.talend.com/{{% param version %}}/jee/ext/org/restlet/ext/crypto/CookieAuthenticator.html).

For the HTTPS support in connectors, the DefaultSslContextFactory uses :

-   Algorithm used: “TLS” (see the [JSSE reference for
    details](http://download.oracle.com/javase/1.5.0/docs/guide/security/jsse/JSSERefGuide.html#AppA)
    and [RFC
    2246](http://www.ietf.org/rfc/rfc2246.txt)
    for TLS 1.0 specs)
-   Certificate algorithm: “SunX509”
-   Key store type: via System.getProperty("javax.net.ssl.keyStoreType")
-   Key length : depends on the certificate that you configure for your
    HTTPS server (if any)

## What its encryption function is designed for?

### Authentication

The purpose is authentication for the CookieAuthenticator class and data
hiding for the HTTPS/SSL connectors. Note that those software components
are optional, so you can still use Restlet without relying on any
encryption technology.

### Digital signature

No, beside the HTTP digest feature (see Content-MD5 header) supported
via the org.restlet.data.Digest and
org.restlet.representation.DigesterRepresentation classes.

### Software copy protection

No.

### Data hiding

The purpose is data hiding for the HTTPS/SSL connectors. Note that those
software components are optional, so you can still use Restlet without
relying on any encryption technology.

## Are there any differences between Restlet version 2.0 and 2.1?

There are the three classes that were moved from the
org.restlet.engine.security package related to SSL into the Crypto
extension. See these two pages to compare:

-   [org.restlet.engine.security package in Restlet 2.0](https://github.com/restlet/restlet-framework-java/tree/2.0/modules/org.restlet/src/org/restlet/engine/security/)
-   [org.restlet.engine.security package in Restlet 2.1](https://github.com/restlet/restlet-framework-java/tree/2.1/modules/org.restlet/src/org/restlet/engine/security/)
-   [org.restlet.engine.security package in Restlet 2.3](https://github.com/restlet/restlet-framework-java/tree/2.3/modules/org.restlet/src/org/restlet/engine/security/)
-   [org.restlet.engine.security package in Restlet 2.4](https://github.com/restlet/restlet-framework-java/tree/2.4/modules/org.restlet/src/main/java/org/restlet/engine/security/)

Here are some precisions for version 2.0. Those two classes, do not
contain or rely on any encryption algorithm:

-   SslContextFactory is an empty abstract class
-   SslUtils is only providing utility method to extract the length of
    the key used and parse parameters

 So, only DefaultSslContextFactory is interesting here ([see source code
here](https://github.com/restlet/restlet-framework-java/tree/{{% param version %}}/modules/org.restlet/src/main/java/org/restlet/engine/ssl/DefaultSslContextFactory.java?view=markup)).

## Is there both object and source code for the encryption technology?

Yes, Restlet is an open source project, and all source code is publicly
available. Note that the encryption features provided rely on Java or
third-party software. You should verify the eligibility of any
dependency that you are using via Restlet.
