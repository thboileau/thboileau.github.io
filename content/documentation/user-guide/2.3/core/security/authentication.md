---
title: Authentication
weight: 2
---
# Introduction

There are two commons ways to authenticate your users with your Restlet
application. The first is to use is to leverage the standard HTTP
authentication mechanism, either the Basic or the Digest authentication.
The Basic mechanism is sending the password in clear and should only be
used over a secure HTTPS channel. The second mechanism is to use a
custom authentication form and some cookie set by the server.

# HTTP Basic authentication

## Introduction

Here is a very simple code illustrating a component that guards its
applications with the BASIC authentication scheme.

The whole code can be downloaded
[here](https://download.restlet.talend.com/technical-resources/restlet-framework/archives/examples/authentication/{{% param version %}}/sample.zip "testHttpBasic") (application/force-download, 1.2 kB).

## Description of the server side

### Component

The sample component is composed of two parts. The first one is a very
simple Restlet that answers to request with a "hello, word" text
representation. Of course this Restlet is a very simple representation
of your own complex application.

{{< highlight java "style=emacs" >}}// Restlet that simply replies to requests with an "hello, world" text message
Restlet restlet = new Restlet() {
    @Override
    public void handle(Request request, Response response) {
        response.setEntity(new StringRepresentation("hello, world", MediaType.TEXT_PLAIN));
    }
};
{{< /highlight >}}

Then, the component protects this Restlet with a ChallengeAuthenticator
instance based on the BASIC authentication scheme. Once the instance is
created, it is given the list of known (login/password) pairs via the
"verifier" attibute.

{{< highlight java "style=emacs" >}}// Guard the restlet with BASIC authentication.
ChallengeAuthenticator guard = new ChallengeAuthenticator(null, ChallengeScheme.HTTP_BASIC, "testRealm");
// Instantiates a Verifier of identifier/secret couples based on a simple Map.
MapVerifier mapVerifier = new MapVerifier();
// Load a single static login/secret pair.
mapVerifier.getLocalSecrets().put("login", "secret".toCharArray());
guard.setVerifier(mapVerifier);

guard.setNext(restlet);

Component component = new Component();  
component.getServers().add(Protocol.HTTP, 8182);  
component.getDefaultHost().attachDefault(guard);
component.start();
{{< /highlight >}}

### Customization

As you may have noticed earlier, the list of known login/password pairs
are loaded by the authenticator via the "verifier" attribute via a
simple Verifier based on a Map. This is useful when the list of pairs
are known by advance and is not susceptible to change. In a more
realistic case, the credentials are hosted in a database or a LDAP
directory, etc. In this case, the responsibility to resolve the password
according to the login is deported to a class that implements the
org.restlet.security.Verifier interface.

The contract of the Verifier is a simple method which aims at returning
the given password according to the given login. The Restlet framework
provides an abstract implementation that retrieves the pair of
identifier/secret in the request's challenge response and allow to
verify them:

{{< highlight java "style=emacs" >}}import org.restlet.security.LocalVerifier;

public class TestVerifier extends LocalVerifier {

    @Override
    public char[] getLocalSecret(String identifier) {
        // Could have a look into a database, LDAP directory, etc.
        if ("login".equals(identifier)) {
            return "secret".toCharArray();
        }

        return null;
    }

}
{{< /highlight >}}

## Description of the client side

The credentials are transmitted to the request via a ChallengeResponse
object as follow:

{{< highlight java "style=emacs" >}}public static void main(String args[]) {
     ClientResource resource = new ClientResource("http://localhost:8182/");

     // Send an authenticated request using the Basic authentication scheme.
     resource.setChallengeResponse(ChallengeScheme.HTTP_BASIC, "login", "secret");

     // Send the request
     resource.get();
     // Should be 200
     System.out.println(resource.getStatus());
 }
{{< /highlight >}}

If you try to access http://localhost:8182/ via a web browser, a window will
appear to type in your credentials.

# HTTP Digest authentication

## Introduction

Here is a very simple code illustrating a component that guards its
applications with the DIGEST authentication scheme.

The whole code can be downloaded
[here](https://download.restlet.talend.com/technical-resources/restlet-framework/archives/examples/authentication/{{% param version %}}/httpDigestSample.zip "Sample code illustrating Digest authentication") (application/force-download, 1.6 kB).

## Description of the server side

### Component

The sample component is composed of two parts. The first one is a very
simple Restlet that answers to request with a "hello, word" text
representation. Of course this Restlet is a very simple representation
of your own complex application.

{{< highlight java "style=emacs" >}}// Restlet that simply replies to requests with an "hello, world" text message
 Restlet restlet = new Restlet() {
     @Override
     public void handle(Request request, Response response) {
         response.setEntity(new StringRepresentation("hello, world", MediaType.TEXT_PLAIN));
     }
 };
{{< /highlight >}}

Then, the component protects this Restlet with an Authenticator instance
based on the DIGEST authentication scheme. A dedicated constructor of
the Guard class of the Restlet API allows you to create such instance.
Once the instance is created, it is given the list of known
(login/password) pairs via the "secrets" attibute.

{{< highlight java "style=emacs" >}}DigestAuthenticator guard = new DigestAuthenticator(null, "TestRealm", "mySecretServerKey");

 // Instantiates a Verifier of identifier/secret couples based on a simple Map.
 MapVerifier mapVerifier = new MapVerifier();
 // Load a single static login/secret pair.
 mapVerifier.getLocalSecrets().put("login", "secret".toCharArray());
 guard.setWrappedVerifier(mapVerifier);

 // Guard the restlet
 guard.setNext(restlet);

 component.getDefaultHost().attachDefault(guard);
{{< /highlight >}}

### Customization

As you may have noticed earlier, the list of known login/password pairs
are loaded by the authenticator via the "verifier" attribute via a
simple Verifier based on a Map. This is useful when the list of pairs
are known by advance and is not susceptible to change. In a more
realistic case, the credentials are hosted in a database or a LDAP
directory, etc. In this case, the responsibility to resolve the password
according to the login is deported to a class that implements the
org.restlet.security.Verifier interface.

The contract of the Verifier is a simple method which aims at returning
the given password according to the given login. The Restlet framework
provides an abstract implementation that retrieves the pair of
identifier/secret in the request's challenge response and allow to
verify them:

{{< highlight java "style=emacs" >}}import org.restlet.security.LocalVerifier;

public class TestVerifier extends LocalVerifier {

    @Override
    public char[] getLocalSecret(String identifier) {
        // Could have a look into a database, LDAP directory, etc.
        if ("login".equals(identifier)) {
            return "secret".toCharArray();
        }

        return null;
    }

}
{{< /highlight >}}

## Description of the client side

The authentication with the DIGEST scheme is bit more difficult than the
one for the BASIC scheme. The credentials provided by the client is the
result of computation of data given by the client on one side (login and
password) and by the server on the other side ("nonce" value, "realm"
value, etc.). Unless these pieces of data are known in advance by the
client, it appears that in general a first request is required in order
to collect them.

{{< highlight java "style=emacs" >}}ClientResource resource = new ClientResource("http://localhost:8182/");

resource.setChallengeResponse(ChallengeScheme.HTTP_DIGEST, "login", "secret");
// Send the first request with unsufficient authentication.
try {
    resource.get();
} catch (ResourceException re) {
}
// Should be 401, since the client needs some data sent by the server in
// order to complete the ChallengeResponse.
System.out.println(resource.getStatus());
{{< /highlight >}}

Then, the second step allows to get the required data for the final
computation of a correct ChallengeResponse object:

{{< highlight java "style=emacs" >}}// Complete the challengeResponse object according to the server's data
 // 1- Loop over the challengeRequest objects sent by the server.
 ChallengeRequest c1 = null;
 for (ChallengeRequest challengeRequest : resource.getChallengeRequests()) {
     if (ChallengeScheme.HTTP_DIGEST.equals(challengeRequest.getScheme())) {
         c1 = challengeRequest;
         break;
     }
 }

 // 2- Create the Challenge response used by the client to authenticate its requests.
 ChallengeResponse challengeResponse = new ChallengeResponse(c1,
                                                             resource.getResponse(),
                                                             "login",
                                                             "secret".toCharArray());
{{< /highlight >}}

Finally, the request is completed with the computed ChallengeResponse
instance:

{{< highlight java "style=emacs" >}}resource.setChallengeResponse(challengeResponse);

// Try authenticated request
resource.get();
// Should be 200.
System.out.println(resource.getStatus());
{{< /highlight >}}
