---
title: Editions matrix
---

This table presents the list of extensions provided, and their integration with the [GWT](../../editions/gwt/overview "GWT") edition.

The [core module](/documentation/user-guide/{{% param version %}}/core/overview "Part II - Core Restlet") including both the Restlet API and the Restlet Engine is shipped by all editions.

With the introduction of the
[editions](/documentation/user-guide/{{% param version %}}/editions/overview "Part III - Restlet Editions")
for the Restlet framework, it is necessary to make a distinction between
an extension for a given edition and the same extension for another
extension simply because the code of the extension may change between
each edition.

## Java edition

The *group id* for all these artifacts is : `org.restlet`.

| artifactId                                                             | Description                                                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [org.restlet.ext.atom](../../extensions/atom "atom")                   |Support for the Atom syndication and the AtomPub (Atom Publication Protocol) standards in their 1.0 version |
| [org.restlet.ext.crypto](../../extensions/crypto "crypto")             |Support for cryptography                                                                                    |
| [org.restlet.ext.freemarker](../../extensions/freemarker "freemarker") |Integration with FreeMarker                                                                                 |
| [org.restlet.ext.gson](../../extensions/gson "gson")                   |Support for GSON representations                                                                            |
| [org.restlet.ext.guice](../../extensions/guice "guice")                |Server-side integration with Guice                                                                          |
| [org.restlet.ext.gwt](../../extensions/gwt "gwt")                      |Server-side integration with GWT                                                                            |
| [org.restlet.ext.jaas](../../extensions/jaas "jaas")                   |Support for JAAS based security                                                                             |
| [org.restlet.ext.jackson](../../extensions/jackson "jackson")          |Integration with Jackson                                                                                    |
| [org.restlet.ext.jaxb](../../extensions/jaxb "jaxb")                   |Integration with Java XML Binding                                                                           |
| [org.restlet.ext.jetty](../../extensions/jetty "jetty")                |Integration with Jetty                                                                                      |
| [org.restlet.ext.json](../../extensions/json "json")                   |Support for JSON representations                                                                            |
| [org.restlet.ext.odata](../../extensions/odata/overview "odata")       |Integration with OData services                                                                             |
| [org.restlet.ext.servlet](../../extensions/servlet "servlet")          |Integration with Servlet API                                                                                |
| [org.restlet.ext.slf4j](../../extensions/slf4j "slf4j")                |Support for the SLF4J logging bridge                                                                        |
| [org.restlet.ext.spring](../../extensions/spring/overview "spring")    |Integration with Spring Framework                                                                           |
| [org.restlet.ext.thymeleaf](../../extensions/thymeleaf "thymeleaf")    |Integration with Thymeleaf                                                                                  |
| [org.restlet.ext.velocity](../../extensions/velocity "velocity")       |Integration with Apache Velocity                                                                            |
| [org.restlet.ext.xml](../../extensions/xml "xml")                      |Support for the XML documents                                                                               |

## GWT edition

The *group id* for all these artifacts is : `org.restlet.gwt`.

| artifactId                                               | Description                     |
| -------------------------------------------------------- | ------------------------------- |
| [org.restlet.gwt.ext.json](../../extensions/json "json") |Support for JSON representations |
| [org.restlet.gwt.ext.xml](../../extensions/xml "xml")    |Support for the XML documents    |
