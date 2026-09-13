---
title: OSGi
longTitle: Restlet edition for OSGi Environments
weight: 7
---
# Introduction

While OSGi has been for a long time an important deployment environment for Restlet developers, the rise of RESTful web APIs, the addition of an Eclipse Public License option to Restlet Framework and an increased effort from Restlet community led to the addition of this special edition.

This edition dedicated to OSGi environments such as Eclipse Equinox and Apache Felix was necessary to make space for more OSGi specific features in the framework. Using our automated Restlet Forge, we are able to automatically deliver this edition, including dedicated Javadocs and distributions as illustrated above.

# Eclipse Update Site

In addition, we provide a new distribution channel specific to this OSGi edition: an Eclipse Update Site supporting easy installation and automated update right from the Eclipse IDE.

Note that this is only recommended if you intended to develop OSGi applications leveraging Restlet Framework, not applications for other target environments such as Java EE or GAE. In the later cases, you should either manually copy the JAR files in your Eclipse project or rely on our Maven repository using a tool such as m2eclipse.

In order to use the Eclipse update site, please refer to instructions for the "Eclipse" distribution on [the download page](/documentation/user-guide/2.3/introduction/setup/download/).

# Restlet integration with ECF

In addition, thanks to the work of [Scott Lewis](http://eclipseecf.blogspot.com/), the Eclipse Communications Framework lead, an integration of Restlet with [ECF](http://www.eclipse.org/ecf/) is available.

This integration supports the OSGi Remote Services specification by adding REST/HTTP bindings based on Restlet and leveraging the Restlet extension for OSGi introduced below.

For additional details, you can read his blog posts [#1](http://eclipseecf.blogspot.com/2011/03/restlet-and-osgi-remote-services-part-1.html) and [#2](http://eclipseecf.blogspot.com/2011/04/restlet-and-osgi-remote-services-part-2.html).

# Restlet extension

Finally, based on work initiated via a Google Summer of Code project in 2010, a Restlet extension for OSGi is also available.

The extension facilitates the development of very dynamic Restlet applications, supporting for example the live addition of resources and virtual hosts.

This org.restlet.ext.osgi extension is lead by Bryan Hunt and has received significant contributions from Wolfgang Werner.

# Conclusion

Step after step, Restlet support for OSGi and the Eclipse ecosystem is growing and we will continue to work in this direction, with plans to add visual tooling for Restlet in Eclipse and to provide more integration with OSGi standard services such as the log service. As always, stay tuned!
