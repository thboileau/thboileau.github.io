---
title: Configuration of Restlet Resources in Spring
longTitle: Spring extension - Configuration of Restlet resources
weight: 5
---
# Configuration of basic properties

Restlet resources support only limited configuration beyond injecting
custom dependencies such as the ObjectContainer in the example above. To
make specific ServerResource classes more reusable, it would be helpful
if their basic properties could be configured through Spring:

-   available
-   modifiable
-   negotiateContent
-   readable

Currently, the init method resets these properties to their default
values but, in the Spring component life cycle, is invoked after Spring
sets the properties. An obvious workaround is to refine the init method
like so:


{{< highlight java "style=emacs" >}}    @Override
    public void init(Context context, Request request, Response response) {
        final ResourcePropertyHolder backup = new ResourcePropertyHolder(); 
        BeanUtils.copyProperties(this, backup);
        super.init(context, request, response);
        BeanUtils.copyProperties(backup, this);
    }
{{< /highlight >}}

# Configuration of representation templates

In addition, it would be quite useful if one could map media types to
representation templates in Spring. In the following example, we explore
this idea further by mapping different media types to different
Freemarker and JSON representation factories. Whenever a Resource
creates a concrete representation, it passes a uniform data model to the
representation factory, which then instantiates the template with the
data model and returns the resulting representation. (The Freemarker
configuration is also handled by Spring.)


{{< highlight xml "style=emacs" >}}<bean id="resource" class="helloworldrestlet.HelloWorldResource"
    scope="prototype">
    <property name="available" value="true" />
    <property name="representationTemplates">
        <map>
            <entry key-ref="org.restlet.data.MediaType.TEXT_PLAIN"
                value-ref="hwFreemarkerTextPlain" />
            <entry key-ref="org.restlet.data.MediaType.TEXT_HTML"
                value-ref="hwFreemarkerTextHtml" />
            <entry key-ref="org.restlet.data.MediaType.APPLICATION_JSON"
                value-ref="jsonRepresentationFactory" />
        </map>
    </property>
</bean>

<bean id="hwFreemarkerTextPlain"
    class="edu.luc.etl.restlet.spring.FreemarkerRepresentationFactory">
    <property name="templateName" value="hw-plain.ftl" />
    <property name="freemarkerConfig" ref="freemarkerConfig" />
</bean>

<bean id="hwFreemarkerTextHtml"
    class="edu.luc.etl.restlet.spring.FreemarkerRepresentationFactory">
    <property name="templateName" value="hw-html.ftl" />
    <property name="freemarkerConfig" ref="freemarkerConfig" />
</bean>

<bean id="jsonRepresentationFactory"
    class="edu.luc.etl.restlet.spring.JsonRepresentationFactory" />

<!-- omitted beans for specific MediaType static fields -->

<bean id="freemarkerConfig"
    class="freemarker.template.Configuration">
    <property name="directoryForTemplateLoading"
        value="src/test/resources/presentation" />
    <property name="objectWrapper">
        <bean class="freemarker.template.DefaultObjectWrapper" />
    </property>
</bean>
{{< /highlight >}}

When using this approach, the ServerResources themselves become very
simple, for example:


{{< highlight java "style=emacs" >}}public class HelloWorldResource extends ConfigurableRestletResource {
    @Override
    public Representation get(Variant variant) {
    Map<String, Object> dataModel = Collections.singletonMap("DATE", (Object) new Date());
    return createTemplateRepresentation(variant.getMediaType(), dataModel);
    }
}
{{< /highlight >}}

A working proof-of-concept for this approach is available through
Git at
[https://github.com/LoyolaChicagoCode/configurableresource-restlet-java](https://github.com/LoyolaChicagoCode/configurableresource-restlet-java).
Support for the missing configuration of representations tied to
responses to non-GET requests is in the works.
