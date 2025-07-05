---
title: Retrieve the content of a web page
weight: 2
---
As we mentioned in the [introduction
paper](/documentation/user-guide/{{% param version %}}/introduction/overview), the Restlet framework is at the
same time a client and a server framework. For example, Restlet can
easily work with remote resources using its HTTP client connector. A
connector in REST is a software element that enables the communication
between components, typically by implementing one side of a network
protocol. Restlet provides several implementations of client connectors
based on existing open-source projects. The
[connectors](/documentation/user-guide/{{% param version %}}/core/base/connectors) section lists all
available client and server connectors and explain how to use and
configure them.

Here we will get the representation of an existing resource and output
it in the JVM console:

{{< highlight java "style=emacs" >}}// Outputting the content of a Web page
new ClientResource("https://restlet.org").get().write(System.out);
{{< /highlight >}}

Note that the example above uses a simplified way to issue calls via the
ClientResource class. If you need multi-threading or more control it is
still possible to manipulate use the Client connector class or the
Request objects directly. The example below explains how to set some preferences
in your client call, like a referrer URI. It could also be the languages
and media types you prefer to receive as a response:

{{< highlight java "style=emacs" >}}// Create the client resource
ClientResource resource = new ClientResource("https://restlet.org");

// Customize the referrer property
resource.setReferrerRef("http://www.mysite.org");

// Write the response entity on the console
resource.get().write(System.out);
{{< /highlight >}}
