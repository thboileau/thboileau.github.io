---
title: Redirection
longTitle: URI rewriting and redirection
weight: 3
---
# Introduction

The first tool available is the Redirector, which allows the rewriting
of a cool URI to another URI, followed by an automatic redirection.
Several types of redirection are supported, the external redirection via
the client/browser and the connector redirection for proxy-like
behavior. In the example below, we will define a search service for our
web site (named "mysite.org") based on Google. The "/search" relative
URI identifies the search service, accepting some keywords via the "kwd"
parameter:

{{< highlight java "style=emacs" >}}// Create a root router
Router router = new Router(getContext());

// Create a Redirector to Google search service
String target = "http://www.google.com/search?q=site:mysite.org+{keywords}";
Redirector redirector = new Redirector(getContext(), target,
Redirector.MODE_CLIENT_TEMPORARY);

// While routing requests to the redirector, extract the "kwd" query
// parameter. For instance :
// http://localhost:8182/search?kwd=myKeyword1+myKeyword2
// will be routed to
// http://www.google.com/search?q=site:mysite.org+myKeyword1%20myKeyword2
Extractor extractor = new Extractor(getContext(), redirector);
extractor.extractFromQuery("keywords", "kwd", true);

// Attach the extractor to the router
router.attach("/search", extractor);
{{< /highlight >}}

Note that the Redirector needs three parameters only. The first is the
parent context, the second one defines how the URI rewriting should be
done, based on a URI template. This template will be processed by the
[Template](https://javadoc.io/static/org.restlet/org.restlet/{{% frameworkLatestRelease %}}/org/restlet/routing/Template.html)
class. The third parameter defines the type of redirection; here we
chose the client redirection, for simplicity purpose.

Also, we are relying on the Route class to extract the query parameter
"kwd" from the initial request while the call is routed to the
application. If the parameter is found, it is copied into the request
attribute named "keywords", ready to be used by the Redirector when
formatting its target URIs.
