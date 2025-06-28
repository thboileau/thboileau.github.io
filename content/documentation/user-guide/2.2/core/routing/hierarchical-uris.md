---
title: Hierarchical URIs
longTitle: Routers and hierarchical URIs
weight: 2
---
# Introduction

In addition to the Redirector, we have another tool to manage cool URIs:
Routers. They are specialized Restlets that can have other Restlets
(Finders and Filters for example) attached to them and that can
automatically delegate calls based on a [URI
template](https://tools.ietf.org/html/rfc6570).
In general, you will set a Router as the root of your Application.

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

![](../images/hierarchy.png)

See the implementation code below. In a real application, you will probably want to create separate subclasses instead of the anonymous ones we use here:

{{< highlight java "style=emacs" >}}// Create a root router
Router router = new Router(getContext());

// Create a simple password verifier
MapVerifier verifier = new MapVerifier();
verifier.getLocalSecrets().put("scott", "tiger".toCharArray());

// Create a Guard
// Attach a guard to secure access to the directory
ChallengeAuthenticator guard = new ChallengeAuthenticator(getContext(),
        ChallengeScheme.HTTP_BASIC, "Tutorial");
guard.setVerifier(verifier);
router.attach("/docs/", guard).setMatchingMode(
        Template.MODE_STARTS_WITH);

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
{{</ highlight >}}

>**Note** that the routing assumes that your request contains an absolute
target URI that identifies a target resource. During the request
processing the resource's base URI is continuously updated, for each
level in the hierarchy of routers. This explains why the default
behavior of routers is to match only the beginning of the remaining URI
part and not the totality of it. In some cases, you might want to change
this default mode, and this is easy to do via the "defaultMatchingMode"
property on Router, or by modifying the "matchingMode" property of the
template associated with the route created by the Router.attach()
methods. For the modes, you can use the Template.MODE\_EQUALS or
Template.MODE\_STARTS\_WITH constants.

Please note that the values of the variables are directly extracted from
the URI and are therefore not percent-decoded. In order to achieve such
a task, have a look to the
[Reference\#decode(String)](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/data/Reference.html#decode%28java.lang.String%29)
method.
