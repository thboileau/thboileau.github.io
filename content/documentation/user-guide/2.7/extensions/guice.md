---
title: Guice
longTitle: Guice extension
---
# Introduction

This extension provides tools for dependency injection (DI) of Restlet ServerResource types that have
javax.inject-annotated members.
Although the extension has "guice" in the package name and contains direct support for Google Guice
version 3.0 or later, the tools here can be adapted for use with any DI framework that complies with JSR-330.

This extension provides three independent approaches for dependency-injecting Restlet server resources, the self-injection approach, the Finder factory approach, and the resource-injecting application approach.

Note that the extension is limited to injection of server resources, and not other Restlet types, because server resources are constructed by the Restlet framework, not by the user. The last section below describes how to use a JSR-330 DI framework to inject other Restlet types, without needing the tools in this extension.

# Self-injection

When using this approach:

- DI framework must support static field injection (Guice does).
- No constructor injection for resources; only field and method injection will work.

In the self-injection approach, extend SelfInjectingServerResource and annotate
fields and methods to be injected with @Inject.

To inject resources with Guice, install a SelfInjectingServerResourceModule when creating the Injector.

# Finder factory

When using this approach:

- DI framework does not need to support static field injection.
- All forms of injection are allowed: constructor, field, method.
- Target resource can be specified by type alone or by type and JSR-330 Qualifier.

In the Finder factory approach, inject FinderFactory into contexts where routing to resources is initialized, e.g., createInboundRoot(), and use FinderFactory.finder(Class) in calls to Router.attach() instead of the plain server resource class name. For example:

{{< highlight java "style=emacs" >}}// Binding in Guice:
bind(ServerResource.class)
     .annotatedWith(Hello.class)
     .to(HelloServerResource.class);

// In createInboundRoot():
FinderFactory finderFactory = ... injected somehow ...;

// Attachment with no coupling to concrete resource type:
router.attach("/hello", finderFactory.finder(ServerResource.class, Hello.class);
// Attachment with direct knowledge of concrete resource type:
router.attach("/bye", finderFactory.finder(ByeServerResource.class);
{{< /highlight >}}

To use a Guice-enabled FinderFactory, install a RestletGuice.Module when creating the Injector. (RestletGuice has convenience methods to install such a module that parallel those in the Guice class.)

Alternatively, for standalone Applications, create a single RestletGuice.Module instance, possibly passing other Guice modules to the constructor, and use it as the FinderFactory in createInboundRoot().

# Resource-injecting application

When using this approach:

- DI framework does not need to support static field injection.
- No constructor injection for resources; only field and method injection will work.
- Application instance must itself be injected.

In the resource-injecting application approach, extend ResourceInjectingApplication and use newRouter() instead of new Router(...). The overridden createFinder will produce Finders that inject the server resources they create.

To work with Guice, install a SelfInjectingServerResourceModule when creating the Injector that injects the application. To work with another JSR-330-compliant framework, bind SelfInjectingServerResource.MembersInjector to a framework-specific implementation.

# Injecting other Restlet types

Instead of calling new FooApplication(...) when attaching an application in setting up a component, inject that application beforehand:

{{< highlight java "style=emacs" >}}public class MyComponent extends Component {

     public static void main(String... args) {
           // Run as standalone component:
           Injector injector = ... create injector ...;
           MyComponent comp = injector.getInstance(MyComponent.class);
           // ... shutdown hooks, etc. ...
           comp.start();
       }

     @Inject
     MyComponent(FooApplication fooApp, BarApplication barApp) {
         // ...
         getDefaultHost().attach("/foo", fooApp);
         getDefaultHost().attach("/bar", barApp);
     }
 }
{{< /highlight >}}

To avoid coupling a knowledge of a specific application subtype in this setting, use qualifiers:

{{< highlight java "style=emacs" >}}@Inject
 MyComponent(@Foo Application fooApp, @Bar Application barApp) {
     // ...
     getDefaultHost().attach("/foo", fooApp);
     getDefaultHost().attach("/bar", barApp);
 }

 // With the qualifiers defined elsewhere:

 @java.lang.annotation.Retention(RUNTIME)
 @javax.inject.Qualifier
 public @interface Foo {
 }
{{< /highlight >}}

Using the @Named qualifier trades some type-safety for convenience:

{{< highlight java "style=emacs" >}}@Inject
MyComponent(@Named(FOO) Application fooApp, @Named(BAR) Application barApp) ...
{{< /highlight >}}

For additional details, please consult [the
Javadocs](https://javadoc.io/doc/org.restlet/org.restlet.ext.guice/{{% param version %}}/org/restlet/ext/guice/package-summary.html).
