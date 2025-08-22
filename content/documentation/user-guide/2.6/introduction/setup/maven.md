---
title: Maven
longTitle: Getting started with Maven
weight: 2
---
# Introduction

Maven is a comprehensive project management system built around the
concept of POM (Project Object Model). One of the main advantages is the
automated handling of project dependencies, including their download.
For more information on Maven, check the [project home page](http://maven.apache.org/).

Starting with version 2.5 of the Restlet Framework, all artifacts are 
published to Maven Central.

Hence, you should have Maven installed (cf [installation instructions](https://maven.apache.org/install.html)).

# Available artifacts

The following table lists the available artifacts and their group and
artifact ids. With the introduction of the
[editions](/documentation/user-guide/{{% param version %}}/editions/overview "Part III - Restlet Editions")
for the Restlet framework, it is necessary to make a distinction between
an extension for a given edition and the same extension for another
extension simply because the code of the extension may change between
each edition.

You can find [here](/documentation/user-guide/{{% param version %}}/extensions/editions-matrix "Editions matrix")
a full view of the list of extensions and the editions that ship them. 

## Java edition

The group id for all these artifacts is : `org.restlet`.

artifactId | Description
---------- | ------------
[org.restlet](/documentation/user-guide/{{% param version %}}/core/overview "restlet") | Restlet API
[org.restlet.ext.atom](../../extensions/atom "atom")|Support for the Atom syndication and the AtomPub (Atom Publication Protocol) standards in their 1.0 version.
[org.restlet.ext.crypto](../../extensions/crypto "crypto")|Support for cryptography.
[org.restlet.ext.freemarker](../../extensions/freemarker "freemarker")|Integration with FreeMarker.
[org.restlet.ext.gson](../../extensions/gson "gson")|Support for GSON representations.
[org.restlet.ext.guice](../../extensions/guice "guice")|Server-side integration with Guice.
[org.restlet.ext.gwt](../../extensions/gwt "gwt")|Server-side integration with GWT.
[org.restlet.ext.jaas](../../extensions/jaas "jaas")|Support for JAAS based security.
[org.restlet.ext.jackson](../../extensions/jackson "jackson")|Integration with Jackson.
[org.restlet.ext.jaxb](../../extensions/jaxb "jaxb")|Integration with Java XML Binding.
[org.restlet.ext.jetty](../../extensions/jetty "jetty")|Integration with Jetty.
[org.restlet.ext.json](../../extensions/json "json")|Support for JSON representations.
[org.restlet.ext.odata](../../extensions/odata/overview "odata")|Integration with OData services.
[org.restlet.ext.servlet](../../extensions/servlet "servlet")|Integration with Servlet API.
[org.restlet.ext.slf4j](../../extensions/slf4j "slf4j")|Support for the SLF4J logging bridge.
[org.restlet.ext.spring](../../extensions/spring/overview "spring")|Integration with Spring Framework.
[org.restlet.ext.thymeleaf](../../extensions/thymeleaf "thymeleaf")|Integration with Thymeleaf.
[org.restlet.ext.velocity](../../extensions/velocity "velocity")|Integration with Apache Velocity.
[org.restlet.ext.xml](../../extensions/xml "xml")|Support for the XML documents.
org.restlet.test | Test module

## GWT edition

The group id for all these artifacts is : `org.restlet.gwt`.

artifactId | Description
---------- | ------------
[org.restlet.gwt](/documentation/user-guide/{{% param version %}}/core/overview "restlet") | Restlet API
[org.restlet.gwt.ext.json](../../extensions/json "json")|Support for JSON representations.
[org.restlet.gwt.ext.xml](../../extensions/xml "xml")|Support for the XML documents.

# Sample dependencies declaration

Each project based on the Restlet Framework needs to declare at least
one dependency: the Restlet core module. According to your needs, you
should complete the list of dependencies with the required extensions
and connectors. For example, assuming your project is a Web server
delivering static files, you need one HTTP server connector such as
Simple. Since your Maven client correctly references the Restlet online
repository, just open and edit the *pom.xml* file for your project and
add the following lines of text into the \<dependencies\> section.

{{< highlight xml "style=emacs" >}}<dependency>
  <groupId>org.restlet</groupId>
  <artifactId>org.restlet</artifactId>
  <version>{{% frameworkLatestRelease %}}</version>
</dependency>
<dependency>
  <groupId>org.restlet</groupId>
  <artifactId>org.restlet.ext.jackson</artifactId>
  <version>{{% frameworkLatestRelease %}}</version>
</dependency>
{{< /highlight >}}
