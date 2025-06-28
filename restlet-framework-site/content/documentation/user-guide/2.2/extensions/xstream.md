---
title: XStream
longTitle: XStream extension
---
# Introduction

This extension provides and integration of Restlet with XStream.
[XStream](http://x-stream.github.io/) is
a simple library to serialize objects to XML or JSON and back again. For
JSON support, it depends on Jettison 1.0 (note that usage Jettison 1.1
with this version of XStream is discouraged).

For additional details, please consult the
[Javadocs](https://javadocs.restlet.talend.com/{{% param version %}}/jse/ext/org/restlet/ext/xstream/package-summary.html).

# Usage instructions

The extension comes with an XstreamRepresentation that can either:

-   wrap a Java object to serialize as XML or JSON
-   wrap an XML or JSON representation to parse as a Java object

It also provides a plugin for the ConverterService which will
automatically serialize and deserialize your Java objets returned by
annotated methods in ServerResource subclasses. To make it work, you just need to have the org.restlet.ext.xstream.jar in your classpath.

Here is an example server resource:

{{< highlight java "style=emacs" >}}import org.restlet.Server;
import org.restlet.data.Protocol;
import org.restlet.resource.Get;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;

public class TestServer extends ServerResource {

    private static volatile Customer myCustomer = Customer.createSample();

    public static void main(String[] args) throws Exception {
        new Server(Protocol.HTTP, 8182, TestServer.class).start();
    }

    @Get
    public Customer retrieve() {
        return myCustomer;
    }

    @Put
    public void store(Customer customer) {
        myCustomer = customer;
    }

}
{{</ highlight >}}

Here is the matching client resource:

{{< highlight java "style=emacs" >}}import org.restlet.resource.ClientResource;
import org.restlet.resource.ResourceException;

public class TestClient {

    /**
     * @param args
     * @throws ResourceException
     */
    public static void main(String[] args) throws Exception {

        ClientResource cr = new ClientResource("http://localhost:8182");

        // Retrieve a representation
        Customer customer = cr.get(Customer.class);
        System.out.println(customer);

        // Update the target resource
        customer.setFirstName("John");
        customer.setLastName("Doe");
        cr.put(customer);

        // Retrieve the updated version
        customer = cr.get(Customer.class);
        System.out.println(customer);
    }

}
{{</ highlight >}}

Note that our Customer and Address classes are just regular serializable
beans, with no special parent classes and no special annotations.

# Customization

What is nice is that the automatically generated JSON and XML
representations can be customized via XStream mechanisms such as manual
settings on the XstreamRepresentation\#xstream object or via XStream
annotations on the serialized beans. More details on annotations are
[available in XStream
documentation](http://x-stream.github.io/annotations-tutorial.html).
