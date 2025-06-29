---
title: Introduction, download, compiling and installing
longTitle: XMLDB Restet Adapter/Lucene/Maven
weight: 8
---
* Purpose of the document


This document and his related project aims to show how to implement REST Web Services inside Oracle JVM.
To show it, the idea is to implement some services which interacts with [Lucene Domain Index for Oracle](http://www.oracle.com/technetwork/database/s298820-java-db-lucene-134484.pdf), this domain index provides to Oracle
[free text searching facilities](http://marceloochoa.blogspot.com/2007/09/running-lucene-inside-your-oracle-jvm.html) using
[Apache Lucene library](http://lucene.apache.org/java/docs/index.html).
To re-use some ideas and specification we use [Lucene WS API Document](http://dev.lucene-ws.net/wiki/API).


* Change Log

 - Initial 0.9.0

* Dependencies

 - Restlet Artifacts, version 1.1-SNAPSHOT
   - org.restlet
   - org.restlet.ext.xdb
   - org.restlet.ext.servlet

 - Lucene Artifacts, version 2.3.2
   - lucene-core
   - lucene-snowball
   - lucene-wikipedia

 - Lucene-OJVM library, version 2.3.2
   - lucene-ojvm
   - lucene-ojvm-test

 - Oracle JDBC 11g library, version 11.1.0
 - JUnit library, version 3.8.1
 - Servlet API, version 2.2

* Where to download


This project is downloaded from several sources as follow:
 - Project binary archive [Zip](http://downloads.sourceforge.net/dbprism/lucene-restlet-0.9.0.zip?download) or [Tar.gz](http://downloads.sourceforge.net/dbprism/lucene-restlet-0.9.0.tar.gz?download)
 - Project source from __CVS__ repository, follow instructions from [lucene-restlet](http://sourceforge.net/cvs/?group_id=56183) module.
 - Lucene Domain Index [binary distribution](http://downloads.sourceforge.net/dbprism/ojvm-bin-11g-2.3.2.0.0.jar?download), download and extract in any directory, then follow Maven install instruction to add to your local repository.
 - Restlet artifacts, automatically download from http://maven.restlet.org/.
 - Lucene artifacts, automatically downloaded from Maven's public repository.


* Directory structure

This project follows Maven standard layout. Here a list of the content of each one:

 - __src/main/java__ (source of Lucene WS API implementation)
 - __src/main/scripts__ (HTTP test messages to show Lucene WS API usage)
 - __src/main/sql__ (post installation script to register Lucene WS API as XMLDB Servlet)
 - __src/main/webapp__ (a Web Application layout to test and debug this implementation outside the OJVM using Jetty)
 - __src/test/java__ (Client side JUnit tests suites which consumes Lucene REST WS API, coming soon)
 - __src/test/____jmeter__ (Apache JMeter test suites for testing WS performance)
 - __src/resources__ (a build.properties file used to deploy Lucene WS API inside the OJVM)


* Configuration Parameters

Several parameters at the boton of pom.xml file, properties section, are used during install target, here a brief explanation of each one:


{{< highlight xml "style=emacs" >}}....
<properties>

<sqlplus.app.value>${env.ORACLE_HOME}/bin/sqlplus</sqlplus.app.value>

    <restlet.owner.value>RESTLET</restlet.owner.value>
    <sqlnet.string.value>test</sqlnet.string.value>
    <jdbc.str.value>test</jdbc.str.value>
    <jdbc.username.value>LUCENE</jdbc.username.value>
    <jdbc.password.value>LUCENE</jdbc.password.value>
    <jdbc.sysusr.value>sys</jdbc.sysusr.value>
    <jdbc.syspwd.value>change_on_install</jdbc.syspwd.value>
  </properties>
....
{{</ highlight >}}

 - __sqlplus.app__: using __ORACLE_HOME__ environment variable will work in most of the installation, this parameter is used to locate Oracle
 - __SQLPlus__ executable application used to connect as sysdba.
 - __restlet.owner__: Oracle schema where __XMLDB__ Restlet adapter was installed.
 - __sqlnet.string__: SQLNet connect string to the target database.
 - __jdbc.{username,password,sysusr,syspwd}__: username/password where Lucene REST WS API will be installed, sysusr/syspwd used to connect with sysdba role to perform post installation steps.


* Targets


** mvn clean


Clean Maven's target directory.


** mvn compile


Compile Lucene REST WS API implementation. First execution of this target will try to download from Maven publics repostories Oracle JDBC driver and Oracle-Lucene artifacts, this Maven's artifacts are not in public repositories you can install into your local repository as follow


{{< highlight bash "style=emacs" >}}mvn install:install-file -DgroupId=oracle -DartifactId=ojdbc5 -Dversion=11.1.0 -Dpackaging=jar -Dfile=$ORACLE_HOME/jdbc/lib/ojdbc5.jar
mvn install:install-file -DgroupId=oracle -DartifactId=xdb -Dversion=11.1.0 -Dpackaging=jar -Dfile=$ORACLE_HOME/rdbms/jlib/xdb.jar
mvn install:install-file -DgroupId=org.apache.lucene -DartifactId=lucene-ojvm -Dversion=2.3.2 -Dpackaging=jar -Dfile=/home/mochoa/jdevhome/mywork/ojvm-bin/11g/ojvm/lib/lucene-ojvm-2.3.jar
mvn install:install-file -DgroupId=org.apache.lucene -DartifactId=lucene-ojvm-test -Dversion=2.3.2 -Dpackaging=jar -Dfile=/home/mochoa/jdevhome/mywork/ojvm-bin/11g/ojvm/lib/lucene-ojvm-2.3-test.jar

{{</ highlight >}}


** mvn test


Runs JUnit test suites. By now only a simple test suite is performed, Maven requires one to create an artifact. More Restlet client side test suites will be added soon.


** mvn install

Install Lucene REST WS API into the database using configurations parameters explained above. Also copy a .jar file to a local repository.
