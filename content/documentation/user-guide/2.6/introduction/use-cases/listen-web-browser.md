---
title: Listen to web browsers
weight: 1
aliases:
 - /documentation/user-guide/2.6/introduction/use-cases/overview/
---
Now, we want to see how the Restlet Framework can listen to client
requests and reply to them. We will use the internal Restlet HTTP server
connector (even though it is possible to switch to others such as the
one based on Eclipse Jetty for production workloads) and return a simple
string representation "hello, world" as plain text. Note that the Part03
class extends the base ServerResource class provided by Restlet:

{{< highlight java "style=emacs" >}}public class HelloWorldServerResource extends ServerResource {

    public static void main(String[] args) throws Exception {
        // Create the HTTP server and listen on port 8182
        new Server(Protocol.HTTP,
                   8182, 
                   HelloWorldServerResource.class).start();
    }

    @Get("txt")
    public String toString() {
        return "hello, world";
    }

}
{{< /highlight >}}

If you run this code and launch your server, you can open a Web browser
and hit the <http://localhost:8182>. Actually, any URI will work, try
also <http://localhost:8182/test/tutorial>. Note that if you test your
server from a different machine, you need to replace "localhost" by
either the IP address of your server or its domain name if it has one
defined.

So far, we have mostly shown you the highest level of abstraction in
the Restlet API, with the ClientResource and ServerResource classes. But
as we move forward, you will discover that those two classes are
supported by a rich API, letting you manipulate all the REST artifacts.
