---
title: Overview
weight: 1
---
# Topics covered

-   Accessing OData V1.0 web APIs in Java with Restlet
-   Handling queries

# References

-   [Javadocs - Restlet extension for OData](https://javadoc.io/doc/org.restlet/org.restlet.ext.odata/{{% param version %}}/org/restlet/ext/odata/package-summary.html)
-   [Advanced tutorial on the OData extension](tutorial "Tutorial")
-   [OData - Protocol specification](http://docs.oasis-open.org/odata/odata/v4.0/odata-v4.0-part1-protocol.html)
-   [MSDN - WCF Data Services](http://msdn.microsoft.com/en-us/data/bb931106.aspx)
-   [Open Government Data Initiative project](http://ogdi.codeplex.com/)

# Table of contents

-   [Introduction](#introduction "Introduction")
-   [Code generation](#code-generation "Code generation")
-   [Get the two first building permits](#get-the-two-first-building-permits "Get the two first building permits")
-   [Filter the set of the building permits](#filter-the-set-of-the-building-permits  "Filter the set of the building permits")
-   [Conclusion](#conclusion "Conclusion")

# <a name="introduction"></a>Introduction

REST can play a key role in order to facilitate the interoperability
between Java and Microsoft environments. To demonstrate this, the
Restlet team collaborated with Microsoft in order to build a new Restlet
extension that provides several high level features for accessing
[OData](http://www.odata.org/)
services (Open Data Protocol).

The Open Government Data Initiative (OGDI) is an initiative led by
Microsoft. OGDI uses the Azure platform to expose a set of public data
from several government agencies of the United States. This data is
exposed via a restful API which can be accessed from a variety of client
technologies, in this case Java with the dedicated extension of the
Restlet framework. The rest of the article shows how to start with this
extension and illustrates its simplicity of use.

The OGDI service is located at this URI "http://ogdi.cloudapp.net/v1/dc"
and exposes about 60 kinds of public data gathered in entity sets. Here
are samples of such data:

-   Ambulatory surgical centers (here is the name of the corresponding
    entity set: “/AmbulatorySurgicalCenters” relatively to the service
    root URI),
-   Building permits (“/BuildingPermits”)
-   Fire stations (“/FireStations”),
-   etc.

# <a name="code-generation"></a>Code generation

From the client perspective, if you want to handle the declared
entities, you will have to create a class for each entity, defines their
attributes, and pray that you have correctly spelled them and defined
their type. Thanks to the Restlet extension, a generation tool will make
your life easier. It will take care of this task for you, and generate
the whole set of Java classes with correct types.

Just note the URI of the target service, and specify the directory where
you would like to generate the code via the command line:

{{< highlight bash "style=emacs" >}}java -jar org.restlet.ext.odata Generator http://ogdi.cloudapp.net/v1/dc/ ~/workspace/testADO
{{< /highlight >}}

Please note that this feature requires the use of the core Restlet, and
additional dependencies such as Atom (used by OData services for all
exchanges of data), XML (required by the Atom extension) and FreeMarker
(used for the files generation). The following jars (take care of the
names) must be present on the current directory:

-   org.restlet.jar (core Restlet)
-   org.restlet.ext.odata.jar (OData extension)
-   org.restlet.ext.atom.jar (Atom extension)
-   org.restlet.ext.xml.jar (XML extension)
-   org.restlet.ext.freemarker.jar (Freemarker extension)
-   org.freemarker.jar (Freemarker dependency)

You can also used the full command line that includes the list of
required archives for the class path argument (nb: take care of the OS
specific classpath separator) and the name of the main class:

{{< highlight bash "style=emacs" >}}java -cp org.restlet.jar:org.restlet.ext.xml.jar:org.restlet.ext.atom.jar:org.restlet.ext.freemarker.jar:
 org.restlet.ext.odata.jar:org.freemarker.jar org.restlet.ext.odata.Generator
 http://ogdi.cloudapp.net/v1/dc/
 ~/workspace/testADO
{{< /highlight >}}

or programmatically:

{{< highlight java "style=emacs" >}}String[] arguments =
      { "http://ogdi.cloudapp.net/v1/dc/",
        "/home/thierry/workspace/restlet-2.0/odata/src" };
Generator.main(arguments);
{{< /highlight >}}

Please note that this feature requires the use of the core Restlet, and
additional dependencies such as Atom (used by OData services for all
exchanges of data), XML (required by the Atom extension) and FreeMarker
(used for the files generation). They must rely on the classpath.

This will generate the following Java classes and directory:

{{< highlight bash "style=emacs" >}}ogdiDc/
  +-- AmbulatorySurgicalCenter.java
  +-- BuildingPermit.java
  +-- etc

OgdiDcSession.java
{{< /highlight >}}

The classes that correspond to entities are generated in their
corresponding package (in our case: “ogdiDc”), as defined by the meta
data of the target OData service.

The last class (“OgdiDcSession”) is what we call a session object. Such
object is able to handle the communication with the data service, and is
able to store the state of the latest executed request and the
corresponding response. You probably think that such session looks like
a Servlet session. Actually, this is not true. The communication between
the client and the server is still stateless.

We have finished for now of the theoretical aspects; let's see how to
use the generated classes.

# <a name="get-the-two-first-building-permits"></a>Get the two first building permits

The code below gets the two first entities and displays some of their
properties. It will display this kind of output on the console:

{{< highlight bash "style=emacs" >}}*** buildingPermit
Owner   :DARYL ADAIR
City    :WASHINGTON
District:THIRD
Address :447 RIDGE ST NW
State   :DC

*** buildingPermit
Owner   :RUTH D PROCTOR
City    :WASHINGTON
District:FIFTH
Address :144 U ST NW
State   :DC
{{< /highlight >}}

The listing below shows how to rRetrieve the two first “BuildingPermits”
entities:

{{< highlight java "style=emacs" >}}OgdiDcSession session = new OgdiDcSession();
Query<BuildingPermit> query =
      session.createBuildingPermitQuery("/BuildingPermits").top(2);

if (query != null) {
   for (BuildingPermit buildingPermit : query) {
      System.out.println("*** building permit");
      System.out.println("Owner   :" + buildingPermit.getOwner_name());
      System.out.println("City    :" + buildingPermit.getCity());
      System.out.println("District:" + buildingPermit.getDistrict());
      System.out.println("Address :" + buildingPermit.getFull_address());
      System.out.println("State   :" + buildingPermit.getState());
      System.out.println();
   }
}
{{< /highlight >}}

The first step is the creation of a new session. This is the only
required action, and it must be done once, but prior to any other one.
Then, as we want to get a set of “BuildingPermit”, we just create a new
query and specify the desired data. In addition, as the set of data is
very large, we ask to limit its size by setting the “top” parameter.

Under the hood, it actually makes a GET request to the
“/BuildingPermits?top=2” resource (relatively to the service's URI), and
receive as a result a AtomXML feed document. This document is parsed by
the query which provides the result as an Iterator. Finally, we can loop
over the iterator and access to each “BuildingPermit” instance.

# <a name="filter-the-set-of-the-building-permits"></a>Filter the set of the building permits

The code below gets the five first entities located in the city of
Washington and more precisely on the fifth district and displays some of
their properties. It will display this kind of output on the console:

{{< highlight bash "style=emacs" >}}*** building permit
Owner   :RUTH D PROCTOR
Address :144 U ST NW

*** building permit
Owner   :212 36TH ST. LLC.
Address :1250 QUEEN ST NE

*** building permit
Owner   :GEORGE M CURRY JR TRUSTEE
Address :1902 JACKSON ST NE

*** building permit
Owner   :ADRIENNE WEAVER
Address :336 ADAMS ST NE

*** building permit
Owner   :CARL J HAMPTON
Address :2925 SOUTH DAKOTA AVE NE
{{< /highlight >}}

The listing below shows how to retrieve the five first “BuildingPermits”
entities in the fifht district of Washington:

{{< highlight java "style=emacs" >}}Query<BuildingPermit> search =
   session.createBuildingPermitQuery("/BuildingPermits")
      .filter("((city eq 'WASHINGTON') and (district eq 'FIFTH'))")
      .top(5);

if (search != null) {
   for (BuildingPermit buildingPermit : search) {
      System.out.println("*** building permit");
      System.out.println("Owner   :" + buildingPermit.getOwner_name());
      System.out.println("Address :" + buildingPermit.getFull_address());
      System.out.println();
   }
}
{{< /highlight >}}
As we want to get a set of “BuildingPermit”, we just create a new query
and specify the desired data. In addition we add a filter based on the
expression of two criteria: the name of the city and the district. This
filter property uses a subset the WCF Data Services query syntax.

It makes a GET request to the “/BuildingPermits” resource and completes
its URI with the addition of a query part including the filter and top
parameters. As for the previous example, the received AtomXML feed
document is parsed which produces the result as an Iterator. Finally, we
can loop over the iterator and access to each “BuildingPermit” instance.

# <a name="conclusion"></a>Conclusion

This document illustrates what can be done with the Restlet extension
for the OData services. We hope that you found it simple and useful to
follow to read. It is a good demonstration of how adopting of REST and
related standards such as HTTP and Atom facilitates the interoperability
across programming languages and executions environments.
