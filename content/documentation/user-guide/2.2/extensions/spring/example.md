---
title: A complete example
longTitle: Spring extension - A complete example
weight: 4
---
# Introduction

This example is a Spring-enabled but otherwise functionally equivalent
version of the [bookmarks example](http://examples.oreilly.com/9780596529260/)
from chapter 7 of [RESTful Web Services](http://www.oreilly.com/catalog/9780596529260/)
by Richardson and Ruby. The complete code for this version is available
through CVS from :pserver:anonymous@cvs.cs.luc.edu:/root/laufer/433,
module BookmarksRestletSpring. Project dependencies are managed using
[Apache Maven](http://maven.apache.org/),
and the example illustrates standalone and servlet-container deployment.

In a nutshell, Spring handles the configuration of the top-level Restlet
Component and Router beans. The Restlet Resources had to be modified to
support the init method and the injection of the dependency on the
[db4o](http://supportservices.actian.com/versant/default.html)
ObjectContainer, which is also configured in Spring. As expected, the
domain objects User and Bookmark remained unchanged.

# Description

First, we show the configuration of the Restlet Component and top-level
Router beans. The top-level Router is necessary only if an non-root
context path is required for standalone deployment.


{{< highlight xml "style=emacs" >}}<bean id="top" class="org.restlet.ext.spring.SpringComponent">
    <property name="server">
        <bean class="org.restlet.ext.spring.SpringServer">
            <constructor-arg value="http" />
            <constructor-arg value="3000" />
        </bean>
    </property>
    <property name="defaultTarget" ref="default" />
</bean>

<bean id="default" class="org.restlet.ext.spring.SpringRouter">
    <property name="attachments">
        <map>
            <entry key="/v1" value-ref="root" />
        </map>
    </property>
</bean>
{{</ highlight >}}

As a result, the main method has become very simple. It loads a Spring
context based on two configuration metadata files, one for the preceding
top-level beans, and one for the application-specific beans shown below.
It then starts up the top-level Restlet Component.


{{< highlight java "style=emacs" >}}    public static void main(String... args) throws Exception {
    // load the Spring application context
    ApplicationContext springContext = new ClassPathXmlApplicationContext(
        new String[] { "applicationContext-router.xml", "applicationContext-server.xml" });

    // obtain the Restlet component from the Spring context and start it
    ((Component) springContext.getBean("top")).start();
    }
{{</ highlight >}}

Next, we look at the configuration of the application-specific Router.
We use a SpringRouter for this purpose, which is configured using a map
of URI patterns to resources. The SpringFinder beans provide the extra
level of indirection required to create Resource instances lazily on a
per-request basis.

In this example, the last URI pattern has to be customized to accept
complete URIs (possibly including slashes) as the last component of the
pattern. We use Spring's nested properties to drill into the
configuration of the URI pattern along with Spring's mechanism for
accessing a static field in a class.


{{< highlight xml "style=emacs" >}}<bean id="root" class="org.restlet.ext.spring.SpringRouter">
    <property name="attachments">
        <map>
            <entry key="/users/{username}">
                <bean class="org.restlet.ext.spring.SpringFinder">
                    <lookup-method name="create"
                        bean="userResource" />
                </bean>
            </entry>
            <entry key="/users/{username}/bookmarks">
                <bean class="org.restlet.ext.spring.SpringFinder">
                    <lookup-method name="create"
                        bean="bookmarksResource" />
                </bean>
            </entry>
            <entry key="/users/{username}/bookmarks/{URI}">
                <bean class="org.restlet.ext.spring.SpringFinder">
                    <lookup-method name="create"
                        bean="bookmarkResource" />
                </bean>
            </entry>
        </map>
    </property>
    <property name="routes[2].template.variables[URI]">
        <bean class="org.restlet.util.Variable">
            <constructor-arg ref="org.restlet.util.Variable.TYPE_URI_ALL" />
        </bean>
    </property>
</bean>

<bean id="org.restlet.util.Variable.TYPE_URI_ALL"
    class="org.springframework.beans.factory.config.FieldRetrievingFactoryBean" />
{{</ highlight >}}

Unlike the preceding singleton beans, we define the ServerResources as
prototype beans so that they get instantiated separately for each
request. All of the Resource beans depend on the
[db4o](http://supportservices.actian.com/versant/default.html)
ObjectContainer and are configured analogously, so we show only
UserResource here.


{{< highlight xml "style=emacs" >}}<bean id="userResource"
    class="org.restlet.example.book.rest.ch7.spring.UserResource"
    scope="prototype">
    <property name="container" ref="db4oContainer" />
</bean>
{{</ highlight >}}

Using the
[db4o](http://supportservices.actian.com/versant/default.html)
[Spring Module](http://community.versant.com/Projects/html/projectspaces/db4o-spring.html),
configuring the ObjectContainer is straightforward.


{{< highlight xml "style=emacs" >}}<bean id="db4oContainer"
    class="org.springmodules.db4o.ObjectContainerFactoryBean">
    <property name="configuration" ref="db4oConfiguration" />
    <property name="databaseFile" value="file://${user.home}/restbook.dbo" />
</bean>

<bean id="db4oConfiguration"
    class="org.springmodules.db4o.ConfigurationFactoryBean">
    <property name="updateDepth" value="2" />
    <property name="configurationCreationMode" value="NEW" />
</bean>
{{</ highlight >}}

As mentioned above, we added the following elements to each
application-specific Resource:

-   An empty default constructor.
-   An init method containing the code originally in the non-default
    constructor. That constructor now simply invokes the init method,
    although it is no longer used in this context.
-   An instance variable and getter/setter pair for the db4o
    ObjectContainer.

The following code fragment summarizes these changes.


{{< highlight java "style=emacs" >}}public class UserResource extends ServerResource {

    private ObjectContainer container;

    // other instance variables

    public UserResource() { }

    @Override
    public void init(Context context, Request request, Response response) {
        super.init(context, request, response);
        // code originally in non-default constructor
    }

    public UserResource(Context context, Request request, Response response) {
        super(context, request, response);
        init(context, request, response);
    }

    public ObjectContainer getContainer() {
        return container;
    }

    public void setContainer(ObjectContainer container) {
        this.container = container;
    }

    // other methods
}
{{</ highlight >}}
