---
title: Retrieve the content of a web page
weight: 3
---
As we mentioned in the [introduction paper](/about/introduction/), the
Restlet framework is at the same time a client and a server framework.
For example, NRE can easily work with remote resources using its HTTP
client connector. A connector in REST is a software element that enables
the communication between components, typically by implementing one side
of a network protocol. NRE provides several implementations of client
connectors based on existing open-source projects. The
[connectors](connectors/) section lists all available client and server
connectors and explain how to use and configure them.

Here we will get the representation of an existing resource and output
it in the JVM console:

{{< highlight java "style=emacs" >}}// Outputting the content of a Web page
Client client = new Client(Protocol.HTTP);
client.get("http://restlet.com").getEntity().write(System.out);
{{< /highlight >}}

Note that the example above uses a simplified way to issue calls via the
generic Client class. A more flexible way is to create a new Request
object and to ask the Client to handle it. The example below illustrate
how to set some preferences in your call, like a referrer URI. It could
also be the languages and media types you prefer to receive as a
response:

{{< highlight java "style=emacs" >}}// Prepare the request
Request request = new Request(Method.GET, "http://restlet.com");
request.setReferrerRef("http://www.mysite.org");

// Handle it using an HTTP client connector
Client client = new Client(Protocol.HTTP);
Response response = client.handle(request);

// Write the response entity on the console
Representation output = response.getEntity();
output.write(System.out);
{{< /highlight >}}
