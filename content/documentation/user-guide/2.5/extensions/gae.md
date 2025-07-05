---
title: GAE
longTitle: GAE extension
---
# Introduction

This extension provides an integration with the Google App Engine API.
For details on Google App Engine (aka GAE), see the [home
page](http://code.google.com/appengine/).

# Description

At the time of writing, this extension provides an Authenticator filter
that integrates the GAE UserService and detect if the current request is
auithenticated using a Google account. For additional details, please consult [the
Javadocs](https://javadoc.io/doc/org.restlet/org.restlet.ext.gae/{{% param version %}}/org/restlet/ext/gae/package-summary.html).


# User example

This sample code illustrates how to use the Authenticator and the
Enroler provided by the GAE extension. These features are used by the
Application deployed to the Google App Engine platform.

## Usage of the GaeAuthenticator filter

The GaeAuthenticator is able to check wether or not the current request
is sent by a logged user. In case the authenticator is not optional, the
user is automatically redirected to the standard login page.

{{< highlight java "style=emacs" >}}GaeAuthenticator guard = new GaeAuthenticator(getContext());
// Attach the guarded hierarchy of URIs to the Authenticator filter
guard.setNext(adminRouter);

// Attach this guarded set of URIs
router.attach("/admin", guard);
{{< /highlight >}}

## Usage of the GaeEnroler

The GaeEnroler checks wether the current logged user can adminstrate the
deployed application and completes the list of user's roles with a
defined aministrator role. It is used in conjunction with the
GaeAuthenticator filter described above.

{{< highlight java "style=emacs" >}}/** Administrative role. */
private Role adminRole = new Role("admin", "Administractive role");

/**
 * Constructor.
 */
public TestServerApplication() {
  // Add The administration role to the application.
  getRoles().add(adminRole);
}

@Override
public Restlet createInboundRoot() {
  [...]
  // Guard this hierarchy of URIs
  GaeAuthenticator guard = new GaeAuthenticator(getContext());
  // Set the Enroler that will set the Admin Role according to the right of the logged user's.
  guard.setEnroler(new GaeEnroler(adminRole));
  guard.setNext(adminRouter);
  [...]
}
{{< /highlight >}}

Thanks to the Enroler, a resource can check if the current request is
sent by an administrator:

{{< highlight java "style=emacs" >}}@Override
protected void doInit() throws ResourceException {
  if (isInRole("admin")) {
    // logged as admin
  [...]
  }
}
{{< /highlight >}}
