---
title: First server
weight: 2
---
# Introduction

Let's first see how the Restlet Framework can listen to client requests
and reply to them. We will use the internal Restlet HTTP server
connector (even though it is possible to switch to others such as the
one based on
[Jetty](../../extensions/jetty "Eclipse Jetty extension"))
and return a simple string representation "hello, world" as plain text.
Note that the FirstServerResource class extends the base
org.restlet.resource.ServerResource class provided by the Restlet API:

{{< highlight java "style=emacs" >}}public class FirstServerResource extends ServerResource {  

   public static void main(String[] args) throws Exception {  
      // Create the HTTP server and listen on port 8182  
      new Server(Protocol.HTTP, 8182, FirstServerResource.class).start();  
   }

   @Get  
   public String toString() {  
      return "hello, world";  
   }

}  
{{< /highlight >}}

If you run this code and launch your server, you can open a Web browser
and hit the
[http://localhost:8182](http://localhost:8182/).
Actually, any URI will work, try also
[http://localhost:8182/test/tutorial](http://localhost:8182/test/tutorial).
Note that if you test your server from a different machine, you need to
replace "localhost" by either the IP address of your server or its
domain name if it has one defined.

So far, we have mostly shown you the highest level of abstraction in
the Restlet API, with the ServerResource classes. But as we move
forward, you will discover that this class is supported by a broad Java
API, [mapping](../../core/http-headers-mapping "Mapping HTTP headers")
all REST and HTTP concepts to a set of Java classes, interfaces and
annotations.

[Let's now illustrate how to use this API on the client-side](/documentation/user-guide/{{% param version %}}/introduction/first-steps/first-client "First client").
