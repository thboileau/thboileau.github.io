---
title: Current Release
aliases:
- /downloads/current
---

Starting from release 2.5, the Restlet Framework is available from Maven Central repository.

## Sample POM for version {{% param versions.stable %}}

Each Restlet Framework project needs at least one dependency: the Restlet core module, and we assume that you will use Jackson for JSON support. As Restlet is now published into the Maven Central repository, just edit the pom.xml file for your project and add the following lines of text. For the GWT edition, just use `org.restlet.gwt` for the groupId instead of `org.restlet`:


{{< highlight xml "style=emacs" >}}
<properties>
  <restlet-version>{{% frameworkLatestStableRelease %}}</restlet-version>
</properties>

<dependencies>
  <dependency>
    <groupId>org.restlet</groupId>
    <artifactId>org.restlet</artifactId>
    <version>${restlet-version}</version>
  </dependency>
  <dependency>
    <groupId>org.restlet</groupId>
    <artifactId>org.restlet.ext.jackson</artifactId>
    <version>${restlet-version}</version>
  </dependency>
</dependencies>
{{< /highlight >}}

[Getting started with Maven](/documentation/user-guide/{{% param versions.stable %}}/introduction/getting-started/maven)
<ul class="list-inline">
  <li class="doc"><a href="/documentation/{{% param versions.stable %}}/changelog" id="change_log_link" target="_blank">View change log for version
    <span class="download_name">{{% param versions.stable %}}</span></a>
  </li>
</ul>
