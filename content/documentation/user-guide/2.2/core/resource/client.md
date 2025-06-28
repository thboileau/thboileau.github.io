---
title: Client
longTitle: Client resources
weight: 2
---
# Introduction

For a short introduction on the usage of client resource, you should
read the [first client](../../introduction/first-steps/first-client "First client") page.

# Automatic conversion

You can get automatic conversion for retrieved representations like
this:

{{< highlight java "style=emacs" >}}String myString = myClientResource.get(String.class);
{{</ highlight >}}

For sent representations:

{{< highlight java "style=emacs" >}}myClientResource.put(myString);
{{</ highlight >}}

There is even a more transparent way if you define an annotated Java
interface (using the Restlet @Get, @Put, etc. annotations). Once it is
defined, you can use it on the server side in your ServerResource
subclasses or on the client side to consume it:

{{< highlight java "style=emacs" >}}MyAnnotatedInterface myClient = myClientResource.wrap(MyAnnotatedInterface.class);
{{</ highlight >}}

In this case, automatic conversion is handled for you. By default, the
Restlet Engine support Java object serialization (binary or XML), but
for more interoperable representations, we suggest to add our [Jackson
extension](../../extensions/jackson "Jackson extension") or [XStream
extension](../../extensions/xstream "XStream extension") to
your classpath in order to get clean XML or JSON representations.

# Leveraging annotations

It also possible to share an annotated Java interface between client and
server resources.

# Annotated Java interface

First, we define the contract between the client and the server as a
Java interface:

{{< highlight java "style=emacs" >}}package annos;

import org.restlet.resource.Delete;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.Put;

import client.Customer;

public interface TestResource {

    @Get
    public Customer retrieve();

    @Put
    public void store(Customer customer);

    @Post
    public void stop() throws Exception;

    @Delete
    public void remove() throws Exception;

}
{{</ highlight >}}

## Server side implementation

Then, we implement is in a subclass of ServerResource

{{< highlight java "style=emacs" >}}package annos;

import org.restlet.Context;
import org.restlet.Server;
import org.restlet.data.Protocol;
import org.restlet.resource.ServerResource;

import client.Customer;

public class TestServerResource extends ServerResource implements TestResource {

    private static volatile Customer myCustomer = Customer.createSample();

    private static final Server server = new Server(Protocol.HTTP, 8182,
            TestServerResource.class);

    public static void main(String[] args) throws Exception {
        Context ctx = new Context();
        server.setContext(ctx);
        server.getContext().getParameters().add("keystorePassword", "password");
        server.start();
    }

    public Customer retrieve() {
        System.out.println("GET request received");
        return myCustomer;
    }

    public void store(Customer customer) {
        System.out.println("PUT request received");
        myCustomer = customer;
    }

    public void stop() throws Exception {
        System.out.println("POST request received");
        server.stop();
    }

    public void remove() throws Exception {
        System.out.println("DELETE request received");
        myCustomer = null;
    }

}
{{</ highlight >}}

## Client-side consumption

Finally, we can consume it via the ClientResource class:

{{< highlight java "style=emacs" >}}package annos;

 import org.restlet.resource.ClientResource;

 import client.Customer;

 public class TestClientResource {

     public static void main(String[] args) throws Exception {
         ClientResource clientResource = new ClientResource(
             "http://localhost:8182/rest/test");
         TestResource testResource = clientResource.wrap(TestResource.class);

         // Retrieve the JSON value
         Customer result = testResource.retrieve();

         if (result != null) {
             System.out.println(result);
         }
     }
 }
{{</ highlight >}}

# Consuming response entities

Even though the ClientResource class gives you a high level client for
HTTP transactions, you need to be aware that the underlying network
elements such as connections and sockets must be handled and reused
carefully.

The best practice is to always fully consume the content of response
entities, in case of success as well as in case of error. If you are not
interested in this content, you should at least call the
Representation\#exhaust() method to silently consume its content.

If you forget to do this, the associated HTTP connection will stay
active for a while and won't be reused or collected, potentially leading
to starvation issues (unable to create new connections) or consuming too
much resources (unable to collect the socket and threads blocked on this
connection). In addition, once the whole content has been consumed (read
or exhausted) it is recommended to manually release the representation
and its associated objects used to produce its content (such as database
connections) by calling its Representation\#release() method.

In addition, if you are not interested in the entity content or by
further calls from this client, you can try calling the
Representation\#release() method immediately which will close the
underlying stream but might also close the underlying socket connection.
In case you are not interested in the request at all, it is however
better to explicitly call the ClientResource\#abort() method.
