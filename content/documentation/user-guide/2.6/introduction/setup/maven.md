---
title: Maven
longTitle: Getting started with Maven
weight: 1
---

Maven is a comprehensive project management system built around the
concept of POM (Project Object Model). One of the main advantages is the
automated handling of project dependencies, including their download.
For more information on Maven, check the [project home page](http://maven.apache.org/).

Starting with version 2.5 of the Restlet Framework, all artifacts are 
published to Maven Central. Hence, you should have Maven installed (cf [installation instructions](https://maven.apache.org/install.html)).

# Available artifacts

You can find [here](/documentation/user-guide/{{% param version %}}/extensions/editions-matrix "Editions matrix")
a full view of the list of extensions and the editions that ship them. 

# Sample dependencies declaration

Each project based on the Restlet Framework needs to declare at least
one dependency: the Restlet core module.

According to your needs, you should complete the list of dependencies 
with the required extensions and connectors. For example, assuming your 
project is a Web server delivering static files, you need one HTTP server 
connector such as Jetty. Just open and edit the `pom.xml` file for your 
project and add the following lines of text into the `<dependencies>` 
section.

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
