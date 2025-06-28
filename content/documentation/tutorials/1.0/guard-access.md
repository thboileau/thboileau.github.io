---
title: Guard access to sensitive resources
weight: 7
---
When you need to secure the access to some Restlets, several options are
available. A common way is to rely on cookies to identify clients (or
client sessions) and to check a given user ID or session ID against your
application state to determine if access should be granted. Restlets
natively support cookies via the
[Cookie](api/org/restlet/data/Cookie.html) and
[CookieSetting](api/org/restlet/data/CookieSetting.html) objects
accessible from a [Request](api/org/restlet/data/Request.html) or a
[Response](api/org/restlet/data/Response.html).

There is another way based on the standard HTTP authentication
mechanism. The Restlet Engine currently accepts credentials sent and
received in the Basic HTTP scheme and also the credentials sent in the
Amazon Web Services scheme.

When receiving a call, developers can use the parsed credentials
available in Request.challengeResponse.identifier/secret via the Guard
filter. Filters are specialized Restlets that can pre-process a call
before invoking and attached Restlet or post-process a call after the
attached Restlet returns it. If you are familiar with the Servlet API,
the concept is similar to the
[Filter](http://docs.oracle.com/javaee/1.4/api/javax/servlet/Filter.html)
interface. See below how we would modify the previous example to secure
the access to the Directory:

{{< highlight java "style=emacs" >}}// Create a Guard
Guard guard = new Guard(getContext(), ChallengeScheme.HTTP_BASIC, "Tutorial");
guard.getSecrets().put("scott", "tiger".toCharArray());

// Create a Directory able to return a deep hierarchy of files
Directory directory = new Directory(getContext(), ROOT_URI);
guard.setNext(directory);
return guard;
{{</ highlight >}}

![](../images/tutorial09.png)

Note that the authentication and authorization decisions are fully
customizable via the authenticate() and authorize() methods. Any custom
mechanism can be used to check whether the given credentials are valid
and whether the authenticated user is authorized to continue to the
attached Restlet. Here we simply hard-coded a single user and password
couple. In order to test, let's use the client-side Restlet API:

{{< highlight java "style=emacs" >}}// Prepare the request
Request request = new Request(Method.GET, "http://localhost:8182/");

// Add the client authentication to the call
ChallengeScheme scheme = ChallengeScheme.HTTP_BASIC;
ChallengeResponse authentication = new ChallengeResponse(scheme,
        "scott", "tiger");
request.setChallengeResponse(authentication);

// Ask to the HTTP client connector to handle the call
Client client = new Client(Protocol.HTTP);
Response response = client.handle(request);

if (response.getStatus().isSuccess()) {
    // Output the response entity on the JVM console
    response.getEntity().write(System.out);
} else if (response.getStatus()
        .equals(Status.CLIENT_ERROR_FORBIDDEN)) {
    // Unauthorized access
    System.out
            .println("Access unauthorized by the server, " +
                    "check your credentials");
} else {
    // Unexpected status
    System.out.println("An unexpected status was returned: "
            + response.getStatus());
}
{{</ highlight >}}

You can change the user ID or password sent by this test client in order
to check the response returned by the server. Remember to launch the
previous Restlet server before starting your client. Note that if you
test your server from a different machine, you need to replace
"localhost" by either the IP address of your server or its domain name
when typing the URI in the browser. The server won't need any adjustment
due to the usage of a VirtualHost which accepts all types of URIs by
default.
