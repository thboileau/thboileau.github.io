---
title: Listen to web browsers
weight: 3
---
Now, we want to see how the Restlet framework can listen to client
requests and reply to them. We will use one of the NRE HTTP server
connectors (such as the one based on Mortbay's Jetty) and return a
simple string representation "Hello World!" as plain text. Note that in
a more realistic application, we would probably create a separate class
extending the Restlet instead of relying on an anonymous inner class.

The Restlet class is similar to a Servlet and has provides somewhat
limited help when handling calls in a RESTful applications. We will see
later one that the framework provides many specialized subclasses as
well as a Resource class that will be able to greatly abstract and
simplify the handling process. For now, let's stick to a simple example:

{{< highlight java "style=emacs" >}}// Creating a minimal Restlet returning "Hello World"
Restlet restlet = new Restlet() {
    @Override
    public void handle(Request request, Response response) {
        response.setEntity("Hello World!", MediaType.TEXT_PLAIN);
    }
};

// Create the HTTP server and listen on port 8182
new Server(Protocol.HTTP, 8182, restlet).start();
{{</ highlight >}}

If you run this code and launch your server, you can open a Web browser
and hit the <http://localhost:8182>. Actually, any URI will work, try
also <http://localhost:8182/test/tutorial>. Note that if you test your
server from a different machine, you need to replace "localhost" by
either the IP address of your server or its domain name if it has one
defined.
