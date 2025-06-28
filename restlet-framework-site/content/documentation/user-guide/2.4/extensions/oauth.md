---
title: OAuth
longTitle: OAuth extension
---
This extensions is a **preview support** of the OAuth v2.0 standard. It has been developed based on an initial contribution by Ericsson Labs ([see original project here](http://labs.ericsson.com/apis/oauth2-framework)) and later enhanced to support the final 2.0 RFC thanks to another community contribution.

This is intended to be used with primarily following use-cases in mind:
- Create a protected resource
- Create a authenticating server
- Create a web client accessing protected resources

It is very simple to create an OAuth server with just a few lines of code. It is also possible to implement a custom back end for data storage and retrieval. The default implementation stores only to memory, so a JVM restart flushes all data.

{{< highlight java "style=emacs" >}}{
    public Restlet createInboundRoot(){
    ...
    OAuthAuthorizer auth = new OAuthAuthorizer("http://localhost:8080/OAuth2Provider/validate");
    auth.setNext(ProtectedResource.class);
    router.attach("/me", auth);
    ...
}
{{</ highlight >}}

Example 1. Creating a Protected Resource

{{< highlight java "style=emacs" >}}{
    OAuthParameter params = new OAuthParameters("clientId", "clientSecret", oauthURL, "scope1 scope2");
    OAuthProxy proxy = new OauthProxy(params, getContext(), true);
    proxy.setNext(DummyResource.class);
    router.attach("/write", write);
    //A Slightly more advanced example that also sets some SSL client parameters
    Client client = new Client(Protocol.HTTPS);
    Context c = new Context();
    client.setContext(c);
    c.getParameters().add("truststorePath", "pathToKeyStoreFile");
    c.getParameters(0.add("truststorePassword", "password");
    OAuthParameter params = new OAuthParameters("clientId", "clientSecret", oauthURL, "scope1 scope2");
    OAuthProxy proxy = new OauthProxy(params, getContext(), true, client);
    proxy.setNext(DummyResource.class);
    router.attach("/write", write);
}
{{</ highlight >}}

Example 2. Creating a Proxies to access protected resources


For additional details, please consult the
[Javadocs](https://javadocs.restlet.talend.com/{{% param version %}}/jse/ext/org/restlet/ext/oauth/package-summary.html).
