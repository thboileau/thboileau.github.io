---
title: First client
weight: 3
---
# Introduction

As we mentioned in the [introduction](/documentation/user-guide/{{% param version %}}/introduction/overview "Part I - Introduction"),
the Restlet Framework is at the same time a client and a server
framework. For example, you can easily work with remote resources using
its HTTP client connector.

A connector in REST is a software element that enables the communication
between components, typically by implementing one side of a network
protocol. Restlet provides several implementations of client connectors
based on existing open-source projects. The
[connectors](/documentation/user-guide/{{% param version %}}/core/base/connectors "Connectors")
section lists all available client and server connectors and explain how
to use and configure them.

Here we will retrieve the representation of an existing resource and
output it in the JVM console:


{{< highlight java "style=emacs" >}}// Outputting the content of a Web page  
new ClientResource("http://restlet.com").get().write(System.out);  
{{< /highlight >}}


If you are running your client behind a proxy, please [check this
page](/documentation/user-guide/{{% param version %}}/core/base/connectors) to
pick an HTTP client that can be configured. The internal HTTP client
doesn't support proxies at the moment.

The next example sets some preferences in your client call, like a
referrer URI:

{{< highlight java "style=emacs" >}}// Create the client resource  
ClientResource resource = new ClientResource("http://restlet.com");  

// Customize the referrer property  
resource.setReferrerRef("http://www.mysite.org");  

// Write the response entity on the console
resource.get().write(System.out);  
{{< /highlight >}}


After those first two steps, [let's now develop a more complete Restlet
application](/documentation/user-guide/{{% param version %}}/introduction/first-steps/first-application "First application"),
taking advantage of the various editions of the Restlet Framework.
