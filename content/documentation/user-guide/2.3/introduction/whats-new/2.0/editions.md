---
title: Editions
weight: 2
---
# Introduction

The packaging has been reworked to provide **separate distributions for each edition** that we support: Java SE, Java EE (with Servlet support), Google Web Toolkit, Google App Engine and Android.

In addition, the porting of the main source code base to each edition is now fully automated, ensuring a constant synchronization in term of features and bug fixes. All extensions and API features aren’t (or can’t be) supported in all editions, but the API is consistent. As a side effect, the “org.restlet.gwt” package has been moved to the regular
“org.restlet” one.

# Java SE edition (JSE)

This is the usual distribution previously available in version 1.1, without the Servlet related extensions.

# Java EE edition (JEE)

This is the usual distribution previously available in version 1.1, without the standalone connectors such as Jetty, Grizzly, Netty or Simple.

# Google App Engine edition (GAE)

This edition is based on the Java EE edition as GAE requires the deployment of web applications in a constrained Servlet container.

# Google Web Toolkit edition (GWT)

GWT object serialization support, based on annotated Restlet interfaces was also added for the GWT edition, leveraging GWT’s deferred binding mechanism and GWT-RPC serialization format! This achieves the same level of productivity than GWT-RPC, in a RESTful way.

# Android edition

Port of the Crypto, Apache HTTP Client, JAAS, JSON, Net extension (without FTP client).
