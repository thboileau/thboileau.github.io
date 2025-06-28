---
title: Migration
longTitle: Migration guide from version 1.1 to 2.0
weight: 7
---
# Introduction

This section intends to explain the main differences between the Restlet
1.1 and 2.0 releases and to help you migrate your existing applications.

# Adjust your imports

The Restlet API and several extensions have been deeply restructured and
enhanced as explained earlier, but all 1.1 artifacts were either moved
from one package to another or deprecated, but are still available.

When you upgrade a Restlet 1.1 project with 2.0 dependencies, your
existing code will look broken as many imports won’t be resolved by your
favorite IDE. However, simply adjusting the package imports (using the
dedicated feature of your IDE, like the “Organize Imports” feature in
Eclipse) will fix those issues. Indeed, the classes themselves have
either not changed their API at all or have been properly deprecated.

# Verify your routers

In version 1.1, the default router configuration was trying to match the
start of the URI of incoming requests (using Template.MODE\_STARTS\_WITH
constant for the Router\#defaultRoutingMode property) and was including
the query string when matching the URI against the template (setting
Router\#defaultMatchingQuery to "true").

In version 2.0, we decided to change those defaults as we would tend to
match URIs that could end with anything, without control. Now the
default matching mode is Template.MODE\_EQUALS and the default query
matching property is set to "false".

If you still want to include the query string in your URI templates,
then you do need to restore the old values. Otherwise, nothing needs to
be changed. Note that another issue with this approach is that query
variables must be provided by the user in the exact same order as the
URI template, even though people tend to consider that this order
shouldn't matter.

# Replace usage of deprecated features

The next step is to look at each deprecated feature and look in the
Javadocs at the preferred alternative in Restlet 2.0. The most
significant change is related to the resource API which are been greatly
enhanced and simplified at the same time. Basically, instead of
extending the Resource class for your REST server resources, you should
now extend ServerResource.

In addition, you can now separate the resource contract in an annotated
Java interface, implemented by your ServerResource subclass. The
advantage of doing this is that your contract is well isolated and can
be written first. Most importantly, it can be used on the client-side by
the ClientResource class to remotely call your server resource. See an
example in this [first application page](/documentation/user-guide/{{% param version %}}/introduction/first-steps/first-application "First application").
