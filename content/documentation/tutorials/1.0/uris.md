---
title: URIs
longTitle: Rewriting, redirection, router & hierarchical URIs
weight: 8
---
# URI rewriting and redirection

Another advantage of the Restlet framework is the built-in support for
[cool URIs](http://www.w3.org/Provider/Style/URI). A good description of
the importance of proper URI design is given by Jacob Nielsen in his
[AlertBox](http://www.useit.com/alertbox/990321.html).

The first tool available is the Redirector, which allows the rewriting
of a cool URI to another URI, followed by an automatic redirection.
Several types of redirection are supported, the external redirection via
the client/browser and the connector redirection for proxy-like
behavior. In the example below, we will define a search service for our
web site (named "mysite.org") based on Google. The "/search" relative
URI identifies the search service, accepting some keywords via the "kwd"
parameter:

{{< highlight java "style=emacs" >}}// Create an application
Application application = new Application(component.getContext()) {
    @Override
    public Restlet createRoot() {
        // Create a Redirector to Google search service
        String target =
           "http://www.google.com/search?q=site:mysite.org+{keywords}";
        return new Redirector(getContext(), target,
                Redirector.MODE_CLIENT_TEMPORARY);
    }
};

// Attach the application to the component's default host
Route route = component.getDefaultHost().attach("/search", application);

// While routing requests to the application, extract a query parameter
// For instance :
// http://localhost:8182/search?kwd=myKeyword1+myKeyword2
// will be routed to
// http://www.google.com/search?q=site:mysite.org+myKeyword1%20myKeyword2
route.extractQuery("keywords", "kwd", true);
{{< /highlight >}}

Note that the Redirector needs three parameters only. The first is the
parent context, the second one defines how the URI rewriting should be
done, based on a URI template. This template will be processed by the
[Template](api/org/restlet/util/Template.html) class. The third
parameter defines the type of redirection; here we chose the client
redirection, for simplicity purpose.

Also, we are relying on the Route class to extract the query parameter
"kwd" from the initial request while the call is routed to the
application. If the parameter is found, it is copied into the request
attribute named "keywords", ready to be used by the Redirector when
formatting its target URIs.

# Routers and hierarchical URIs

In addition to the Redirector, we have another tool to manage cool URIs:
Routers. They are specialized Restlets that can have other Restlets
(Finders and Filters for example) attached to them and that can
automatically delegate calls based on a [URI
template](https://tools.ietf.org/html/rfc6570). In general,
you will set a Router as the root of your Application.

Here we want to explain how to handle the following URI patterns:

1.  /docs/ to display static files
2.  /users/{user} to display a user account
3.  /users/{user}/orders to display the orders of a particular user
4.  /users/{user}/orders/{order} to display a specific order

The fact that these URIs contain variable parts (between accolades) and
that no file extension is used makes it harder to handle them in a
typical Web container. Here, you just need to attach target Restlets to
a Router using the URI template. At runtime, the route that best matches
the request URI will received the call and be able to invoke its
attached Restlet. At the same time, the request's attributes map will be
automatically updated with the value of the URI template variables!

![](../images/tutorial11.png)

See the implementation code below. In a real application, you will
probably want to create separate subclasses instead of the anonymous
ones we use here:

{{< highlight java "style=emacs" >}}// Create a component
Component component = new Component();
component.getServers().add(Protocol.HTTP, 8182);
component.getClients().add(Protocol.FILE);

// Create an application
Application application = new Application(component.getContext()) {
    @Override
    public Restlet createRoot() {
        // Create a root router
        Router router = new Router(getContext());

        // Attach a guard to secure access to the directory
        Guard guard = new Guard(getContext(),
                ChallengeScheme.HTTP_BASIC, "Restlet tutorial");
        guard.getSecrets().put("scott", "tiger".toCharArray());
        router.attach("/docs/", guard);

        // Create a directory able to expose a hierarchy of files
        Directory directory = new Directory(getContext(), ROOT_URI);
        guard.setNext(directory);

        // Create the account handler
        Restlet account = new Restlet() {
            @Override
            public void handle(Request request, Response response) {
                // Print the requested URI path
                String message = "Account of user \""
                        + request.getAttributes().get("user") + "\"";
                response.setEntity(message, MediaType.TEXT_PLAIN);
            }
        };

        // Create the orders handler
        Restlet orders = new Restlet(getContext()) {
            @Override
            public void handle(Request request, Response response) {
                // Print the user name of the requested orders
                String message = "Orders of user \""
                        + request.getAttributes().get("user") + "\"";
                response.setEntity(message, MediaType.TEXT_PLAIN);
            }
        };

        // Create the order handler
        Restlet order = new Restlet(getContext()) {
            @Override
            public void handle(Request request, Response response) {
                // Print the user name of the requested orders
                String message = "Order \""
                        + request.getAttributes().get("order")
                        + "\" for user \""
                        + request.getAttributes().get("user") + "\"";
                response.setEntity(message, MediaType.TEXT_PLAIN);
            }
        };

        // Attach the handlers to the root router
        router.attach("/users/{user}", account);
        router.attach("/users/{user}/orders", orders);
        router.attach("/users/{user}/orders/{order}", order);

        // Return the root router
        return router;
    }
};

// Attach the application to the component and start it
component.getDefaultHost().attach(application);
component.start();
{{< /highlight >}}

Please note that the values of the variables are directly extracted from
the URI and are therefore not percent-decoded. In order to achieve such
a task, have a look to the
[Reference\#decode(String)](api/org/restlet/data/Reference.html#decode(java.lang.String) "Reference#decode(String)")
method.
