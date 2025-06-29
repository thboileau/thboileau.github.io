---
title: NTML authentication
weight: 6
---
# Using the internal HTTP client connector

At this time, the access to services secured with NTML is supported via the internal HTTP client
based on the support of NTLM authenticated introduced in Java 5. So, add the core module (org.restlet.jar) to your
application.

The required step is to setup your custom Authenticator instance wich will be
referenced each the client connector will issue a request. According to the JDK5
javadocs, just proceed as follow:

{{< highlight java "style=emacs" >}}// Create your own authenticator
Authenticator a = new Authenticator() {
&nbsp;&nbsp;&nbsp; public PasswordAuthentication getPasswordAuthentication() {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return (new PasswordAuthentication("<your account>", "<your password>".toCharArray()));
&nbsp;&nbsp;&nbsp; }
};
// Sets the default Authenticator
Authenticator.setDefault(a);
{{</ highlight >}}

## Authenticate with NTML all requests performed via the internal HTTP client connector.

No additional steps are required so far.


This does not apply to the Android extension. In this case, the
support of NTLM authentication leverages the Apache "HttpClient" extension.


# Using the Apache HTTP Client extension

This library does not provide a direct support of the the NTLM authentication
scheme (see
[here](https://hc.apache.org/httpcomponents-client-ga/ntlm.html)).
However, it explains how to leverage the Samba JCIFS library as an NTML Engine.
Basically, the following steps are required:

 - Add the the "org.restlet.ext.httpclient.jar" to your project.
 - Add the [JCIFS archive](http://jcifs.samba.org/) to your project.
 - Set up a dedicated client helper that will handle the NTML requests using
the Apache HTTP Client and JCIFS libraries.

Here is [a sample implementation](https://download.restlet.talend.com/technical-resources/restlet-framework/archives/examples/security/MyNtlmHttpClientHelper.java) of such
client helper. It extends the one provided by the [Apache HTTP Client extension](../../extensions/httpclient) that must
be added to your project.


## Make the Engine register this client helper:

Here is a sample code that manually adds this client helper:


{{< highlight java "style=emacs" >}}Engine.getInstance().getRegisteredClients().add(0, new MyNtlmHttpClientHelper(new Client(Protocol.HTTP)));
{{</ highlight >}}
