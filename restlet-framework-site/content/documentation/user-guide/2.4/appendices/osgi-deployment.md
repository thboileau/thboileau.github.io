---
title: OSGi deployment
weight: 3
---
# Introduction

This page will explain you how to run your Restlet application in an
OSGi environment such as Eclipse Equinox or Apache Felix.

Since Restlet 2.1 RC2, a new edition of Restlet Framework for OSGi
environements is available as well as an [Eclipse update site](/downloads/current?distribution=p2&release=stable&edition=osgi).

# Simple example

Since Restlet 1.1, the integration of Restlet and OSGi has become much
easier. Each Restlet module and library is an OSGi bundle, and the
automatic detection of pluggable connectors and authenticators works in
the same way as for the standalone Restlet mode. Here are some
instructions to get a simple Restlet project working with OSGi:

1.  Copy the content of the Restlet distribution under "lib" folder into
    the Eclipse "dropins" folder, including all JARs and subdirectories
2.  Launch Eclipse 3.4 which should be longer than usual as new plug-ins
    are automatically installed
3.  Open "Help / About ... / Plug-in Details" dialog and check that
    Restlet plug-ins are there ("Restlet" is the provider
    name)
4.  Create a new "Plug-in Project", name it "OsgiUsageTest1" and press
    "Next \>"
5.  Select the checkbox to generate an Activator and press "Finish"
6.  In the Dependencies tab of the manifest editor, import the following
    packages: org.restlet, org.restlet.data, org.restlet.representation,
    org.restlet.resource, org.restlet.security, org.restlet.service,
    org.restlet.util
7.  Open the "Activator" class generated and type the code below:

{{< highlight java "style=emacs" >}}public class Activator implements BundleActivator {

    private Server server;

    public void start(BundleContext context) throws Exception {
        server = new Server(Protocol.HTTP, 8554, new Restlet() {
            @Override
            public void handle(Request request, Response response) {
                response.setEntity("Hello world!", MediaType.TEXT_PLAIN);
            }
        });

        server.start();
    }

    public void stop(BundleContext context) throws Exception {
        server.stop();
    }

}
{{</ highlight >}}

1.  Open the Run Configurations dialog
2.  Create a new configuration under the "OSGi framework" tree node
3.  Deselect all bundles and select the "OsgiUsageTest1" one
4.  Click on the "Add Required Bundles" button to add all dependencies
5.  Click on the "Run" button
6.  Open your browser at the "http://localhost:8554/" URI
7.  "Hello world!" should be displayed!

# Complete example

Now, let's look at a more complete example, leveraging the Jetty
connector and attaching Resources to a Router. For this we will reuse
the Part12 example of the Restlet tutorial.

1.  Create a new "Plug-in Project", name it "OsgiUsageTest2" and press "Next \>"
2.  Select the checkbox to generate an Activator and press "Finish"
3.  In the Dependencies tab of the manifest editor, import the following
    packages:  org.restlet, org.restlet.data, org.restlet.resource, org.restlet.routing, org.restlet.util

4.  Open the "Activator" class generated and type the code below:

{{< highlight java "style=emacs" >}}import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.restlet.Application;
import org.restlet.Component;
import org.restlet.data.Protocol;

public class Activator implements BundleActivator {

    private Component component;

    public void start(BundleContext context) throws Exception {
        // Create a component
        component = new Component();
        component.getServers().add(Protocol.HTTP, 8182);

        // Create an application
        final Application application = new Part12_ServerResources();

        // Attach the application to the component and start it
        component.getDefaultHost().attachDefault(application);
        component.start();
    }

    public void stop(BundleContext context) throws Exception {
        component.stop();
    }

}
{{</ highlight >}}

For the rest of the source code, copy and paste from the regular Restlet
tutorial available in the "org.restlet.example.tutorial" package the
following classes:

-   Part12_ServerResources
-   OrderResource
-   OrdersResource
-   UserResource

Now, let's launch our component, using Jetty as our HTTP server:

1.  Open the Run Configurations dialog
2.  Create a new configuration under the "OSGi framework" tree node
3.  Deselect all bundles and select the "OsgiUsageTest2" and the
    "org.restlet.ext.jetty" bundles
4.  Click on the "Add Required Bundles" button to add all dependencies
5.  Configure the start order of the bundles:  "org.restlet" must start
    first, give it a start level of "1" and leave the rest to "default"
6.  Click on the "Run" button
7.  Open your browser at the "http://localhost:8182/users/scott" URI
8.  'Account of user "scott"' should be displayed! and the log messages
    should reflect that Jetty was started.

If you prefer not to rely on start level to select the actual connector
to be used, you can specify the connector helper class to use in the
Server/Client constructors:

-   Client(Context context, List\<Protocol\> protocols, String helperClass)
-   Server(Context context, List\<Protocol\> protocols, String address, int port, Restlet target, String helperClass)

Otherwise, it is possible to manually register connectors with the
engine, for example:

-   Engine.getInstance().getRegisteredClients().add(new HttpServerHelper(null));

An archive of this test project is [available here](https://download.restlet.talend.com/technical-resources/restlet-framework/archives/examples/osgi/{{% param version %}}/org.restlet.example.osgi.test.zip "OsgiUsageTest2") (application/zip, 7 kB).

# Standalone Equinox deployment

Here is a straightforward, light-weight way of setting up an Equinox
OSGi container proposed by Dave Fogel:

​1) You will need the eclipse equinox osgi jar file (from some recent
version of eclipse, in the plugins folder, in this case 3.5M5):

org.eclipse.osgi\_3.5.0.v20090127-1630.jar

​2) Download the FileInstall bundle by Peter Kriens, which will monitor
a directory and automatically install bundles it finds there. (for a
longer description you can see
[http://felix.apache.org/documentation/subprojects/apache-felix-file-install.html](http://felix.apache.org/documentation/subprojects/apache-felix-file-install.html))

[http://www.aqute.biz/repo/biz/aQute/fileinstall/1.3.4/fileinstall-1.3.4.jar](http://www.aqute.biz/repo/biz/aQute/fileinstall/1.3.4/fileinstall-1.3.4.jar)

​3) you then create the following directory structure (Note substitute
your actual equinox bundle version for "3.X.X"):

{{< highlight bash "style=emacs" >}}my\_equinox/\
     org.eclipse.osgi\_3.X.X.jar\
     fileinstall-1.3.4.jar\
     load/\
         configuration/ \
             config.ini
{{</ highlight >}}

"load/" is an empty dir, where you will later put the bundles you wish
to test.

"config.ini" should be a text file with the following lines in it (but
not indented):

    osgi.bundles=fileinstall-1.3.4.jar@start \
     eclipse.ignoreApp=true

​4) run equinox from the command line (make sure to "cd" to the
"my\_equinox" directory first):

{{< highlight bash "style=emacs" >}}java -jar org.eclipse.osgi\_3.X.X.jar -console
{{</ highlight >}}
    (or)

{{< highlight bash "style=emacs" >}}java -jar org.eclipse.osgi\_3.X.X.jar -console 7777 &
{{</ highlight >}}

This will start up equinox with a command-line console. if you run the
first version above, you will enter the console directly. This can be
inconvenient if you have other things to do on the command line. Using
the 2nd version will launch equinox in a new process and tell it to
listen on port 7777 for telnet connections. To connect to the running
osgi console, you then type:

{{< highlight bash "style=emacs" >}}telnet locahost 7777
{{</ highlight >}}

​5) type "help" in the osgi console for a list of commands. To quickly
check the status of all installed bundles, type (where "osgi\>" is the
osgi command prompt):

{{< highlight bash "style=emacs" >}}osgi\> ss
{{</ highlight >}}

"ss" stands for "short status", and in this case you should see
something like:

{{< highlight bash "style=emacs" >}}id State Bundle \
0 ACTIVE org.eclipse.osgi\_3.X.X \
1 ACTIVE biz.aQute.fileinstall\_1.3.4
{{</ highlight >}}

​6) copy any bundles you want to install to the "load/" directory. The
FileInstall bundle will automatically attempt to load and start these
bundles. If you add in the bundles in random order, you may see some
temporary error messages complaining about missing dependencies, but
these should resolve themselves as the rest of your bundles load. you
may again type "ss" in the osgi console to see the status of the
bundles.

In general, you can use the Run Configurations dialog in eclipse to make
sure you have a compatible set of bundles satisfying all their mandatory
dependencies, and then copy that set into the /load directory. Let me
know if you have any problems with this setup.

# Issues when using Restlet within OSGi

## Using client connectors

You need to be very careful when using client connectors within an OSGi
container. You must be sure that the bundle providing the connector is
already loaded when trying to add the client connector. Otherwise I'll
see something like that in the trace:

{{< highlight bash "style=emacs" >}}Internal Connector Error (1002) - No available client connector supports the
requiredprotocol: 'HTTPS'. Please add the JAR of a matching connector to your
classpath.
{{</ highlight >}}

In this case, before adding your client connector, you need to check the
loaded bundles and before executing your REST request, the registered
client connector. \
 Here is the code to see all registered client connectors:

{{< highlight java "style=emacs" >}}
List<ConnectorHelper<Client>> clients = Engine.getInstance().getRegisteredClients();
System.out.println("Connectors - "+clients.size());
for(ConnectorHelper<Client> connectorHelper : clients) {   
    System.out.println("connector = "+connectorHelper.getClass());
}
{{</ highlight >}}

You can use OSGi bundle listeners to see if necessary bundles are
loaded. Here is a sample of code:

{{< highlight java "style=emacs" >}}// Checking the bundle loading in the future
bundleContext.addBundleListener(new BundleListener() {
    public void bundleChanged(BundleEvent event) {
        if (event.getBundle().getSymbolicName().equals("org.restlet.ext.ssl")             
                        & event.getBundle().getState()==BundleEvent.RESOLVED) {           
            registerClientConnector();
        }
    }
});

// Checking if the bundle is already present

Bundle[] bundles = bundleContext.getBundles();
for (Bundle bundle : bundles) {
    if (bundle.getSymbolicName().equals("org.restlet.ext.ssl")
              && bundle.getState()==BundleEvent.RESOLVED) {
        registerClientConnector();
    }
}
{{</ highlight >}}

The registerClientConnector method simply does something like that:
component.getClients().add(Protocol.HTTPS);.

# Other references

## Standalone Equinox

-   David Fogel - Detailed instruction [in this mail](http://restlet.tigris.org/ds/viewMessage.do?dsForumId=4447&dsMessageId=1344544)
