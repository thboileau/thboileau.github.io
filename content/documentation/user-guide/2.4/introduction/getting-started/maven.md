---
title: Maven
longTitle: Getting started with Maven
weight: 3
---
# Introduction

Maven is a comprehensive project management system built around the
concept of POM (Project Object Model). One of the main advantages is the
automated handling of project dependencies, including their download.
For more information on Maven, check the [project home page](http://maven.apache.org/).

The [Maven](http://maven.apache.org/)
support appeared to be important for many Restlet users. The initial
response was to automatically generate the POM files for each module JAR
shipped within the Restlet distribution. This enabled users to upload
those JAR files to a local Maven repository.

But, this was clearly not easy enough and forced users to download the
full distribution for each new version released, instead of just
updating a couple of JARs. There were also issues with some third-party
dependencies that aren't available in public Maven repositories, like
the db4o, AsyncWeb or Simple.

That's why it has been decided to launch our dedicated Maven repository.
It is freely accessible from
[https://maven.restlet.talend.com](https://maven.restlet.talend.com/)
and contains all Restlet JARs and third party dependencies that aren't
available in the main public Maven repository.

# Public repository configuration

Here are some instructions about how to configure Maven client to work
with the online Maven repository.

You should have Maven installed.

-   Go to [Maven download
    page](http://maven.apache.org/download.html)
-   Download the latest version of Maven and install it on your local
    computer
-   Add Maven bin folder to your PATH

Declare the repository for your project or for a parent project by
updating the *pom.xml* file and adding the following code to the
\<repositories\> section:

{{< highlight xml "style=emacs" >}}<repository>
  <id>maven-restlet</id>
  <name>Public online Restlet repository</name>
  <url>https://maven.restlet.talend.com</url>
</repository>
{{</ highlight >}}

As an alternative, you can also declare the repository for all of your
projects. Go to the directory on the local computer where you just
install Maven. Open and edit *conf/settings.xml* file. Add to the
\<profiles\> section the following code:

{{< highlight xml "style=emacs" >}}<profile> 
  <id>restlet</id>
  <repositories>
    <repository>
      <id>maven-restlet</id>
      <name>Public online Restlet repository</name>
     <url>https://maven.restlet.talend.com</url>
    </repository>
  </repositories>
</profile>
{{</ highlight >}}

Just after the \</profiles\> add the following:

{{< highlight xml "style=emacs" >}}    <activeProfiles>&nbsp;
    &nbsp; <activeProfile>restlet</activeProfile>
    </activeProfiles>
{{</ highlight >}}

# Available artifacts

The following table lists the available artifacts and their group and
artifact ids. With the introduction of the
[editions](/documentation/user-guide/{{% param version %}}/editions/overview "Part III - Restlet Editions")
for the Restlet framework, it is necessary to make a distinction between
an extension for a given edition and the same extension for another
extension simply because the code of the extension may change between
each edition. This distinction is reflected in the group id of each
artifacts which contains a reference to an edition. They are all set on
the same pattern: "org.restlet.\<edition\>" where "\<edition\>" is
three-letters code of an edition among:

-   jse (Java SE edition)
-   jee (Java EE edition),
-   gae (Google App Engine edition),
-   android (Android edition)
-   gwt (Google Web Toolkit edition),
-   osgi (OSGi Environments edition).

You can find [here](/documentation/user-guide/{{% param version %}}/extensions/editions-matrix "Editions matrix")
a full view of the list of extensions and the editions that ship them. 

artifactId | Description
---------- | ------------
[org.restlet](/documentation/user-guide/{{% param version %}}/core/overview "restlet") | Restlet API
[org.restlet.ext.atom](../../extensions/atom "atom")|Support for the Atom syndication and the AtomPub (Atom Publication Protocol) standards in their 1.0 version.
[org.restlet.ext.crypto](../../extensions/crypto "crypto")|Support for cryptography.
[org.restlet.ext.e4](../../extensions/e4 "e4")|Support for the WADL specification.
[org.restlet.ext.emf](../../extensions/emf "emf")|Integration with Eclipse Modeling Framework.
[org.restlet.ext.fileupload](../../extensions/fileupload "fileupload")|Integration with Apache FileUpload.
[org.restlet.ext.freemarker](../../extensions/freemarker "freemarker")|Integration with FreeMarker.
[org.restlet.ext.gae](../../extensions/gae "gae")|Integration to the Google App Engine UserService for the GAE edition.
[org.restlet.ext.gson](../../extensions/gson "gson")|Support for GSON representations.
[org.restlet.ext.gwt](../../extensions/gwt "gwt")|Server-side integration with GWT.
[org.restlet.ext.html](../../extensions/html "html")|Support for the HTML (HyperText Markup Language) standard in its 4.0 version and above.
[org.restlet.ext.httpclient](../../extensions/httpclient "httpclient")|Integration with Apache Commons HTTP Client.
[org.restlet.ext.jaas](../../extensions/jaas "jaas")|Support for JAAS based security.
[org.restlet.ext.jackson](../../extensions/jackson "jackson")|Integration with Jackson.
[org.restlet.ext.javamail](../../extensions/javamail "javamail")|Integration with JavaMail.
[org.restlet.ext.jaxb](../../extensions/jaxb "jaxb")|Integration with Java XML Binding.
[org.restlet.ext.jaxrs](../../extensions/jaxrs "jaxrs")|Implementation of JAX-RS (JSR-311)
[org.restlet.ext.jdbc](../../extensions/jdbc "jdbc")|Integration with Java DataBase Connectivity (JDBC).
[org.restlet.ext.jetty](/documentation/user-guide/{{% param version %}}/extensions/jetty "jetty")|Integration with Jetty.
[org.restlet.ext.jibx](../../extensions/jibx "jibx")|Integration with JiBX.
[org.restlet.ext.json](../../extensions/json "json")|Support for JSON representations.
[org.restlet.ext.jsslutils](../../extensions/jsslutils "jsslutils")|Utilities to provide additional SSL support.
[org.restlet.ext.lucene](../../extensions/lucene "lucene")|Integration with Apache Lucene, Solr and Tika sub-projects.
[org.restlet.ext.nio](../../extensions/nio "nio")|Integration with java.nio package.
[org.restlet.ext.oauth](../../extensions/oauth "oauth")|Support for OAuth HTTP authentication.
[org.restlet.ext.odata](/documentation/user-guide/{{% param version %}}/extensions/odata/overview "odata")|Integration with OData services.
[org.restlet.ext.openid](../../extensions/openid "openid")|Support for OpenID authentication.
[org.restlet.ext.osgi](../../extensions/osgi "osgi")|Support for the OSGi specification.
[org.restlet.ext.rdf](../../extensions/rdf "rdf")|Support for the RDF parsing and generation.
[org.restlet.ext.rome](../../extensions/rome "rome")|Support for syndicated representations via the ROME library.
[org.restlet.ext.sdc](../../extensions/sdc "sdc")|Integration with Google Secure Data Connector on the cloud side.
[org.restlet.ext.servlet](../../extensions/servlet "servlet")|Integration with Servlet API.
[org.restlet.ext.simple](../../extensions/simple "simple")|Integration with Simple framework.
[org.restlet.ext.sip](../../extensions/sip "sip")|Support for Session Initiation Protocol (SIP).
[org.restlet.ext.slf4j](../../extensions/slf4j "slf4j")|Support for the SLF4J logging bridge.
[org.restlet.ext.spring](/documentation/user-guide/{{% param version %}}/extensions/spring/overview "spring")|Integration with Spring Framework.
[org.restlet.ext.swagger](../../extensions/swagger "swagger")|Integration with Swagger.
[org.restlet.ext.thymeleaf](../../extensions/thymeleaf "thymeleaf")|Integration with Thymeleaf.
[org.restlet.ext.velocity](../../extensions/velocity "velocity")|Integration with Apache Velocity.
[org.restlet.ext.wadl](../../extensions/wadl "wadl")|Support for the WADL specification.
[org.restlet.ext.xdb](/documentation/user-guide/{{% param version %}}/extensions/xdb/overview "xdb")|Integration within OracleJVM via the Oracle XML DB feature.
[org.restlet.ext.xml](../../extensions/xml "xml")|Support for the XML documents.
[org.restlet.ext.xstream](../../extensions/xstream "xstream")|Integration with XStream.
org.restlet.test | Test module

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
  <groupId>org.restlet.jse</groupId>
  <artifactId>org.restlet</artifactId>
  <version>2.2-RC4</version>
</dependency>
<dependency>
  <groupId>org.restlet.jse</groupId>
  <artifactId>org.restlet.ext.simple</artifactId>
  <version>2.2-RC4</version>
</dependency>
{{</ highlight >}}
