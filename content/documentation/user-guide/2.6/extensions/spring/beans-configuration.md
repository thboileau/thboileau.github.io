---
title: Configuring Restlet beans
longTitle: Spring extension - Configuring Restlet beans
weight: 3
---
# Passing the parent context

One frequent issue that developers encounter when configuring their
Restlet beans with Spring XML is that it is not easy to find a way to
pass the Context instance to the Restlet subclasses such as Application,
Directory or Router. What we actually need to do is to extract the
context property from the parent Restlet (typically a Component or an
Application) and pass it by reference to the constructor method.

Spring provides two mechanism to achieve this: either using the
PropertyPathFactoryBean class to create a context bean such as:

{{< highlight xml "style=emacs" >}}<!-- Restlet Component bean -->
<bean id="component" class="org.restlet.ext.spring.SpringComponent">
    ...
</bean>

<!-- Component's Context bean -->
<bean id="component.context" class="org.springframework.beans.factory.config.PropertyPathFactoryBean"/>

<!-- Application bean -->
<bean id="application" class="org.restlet.Application">
    <constructor-arg ref="component.context" />
    ...
</bean>
{{</ highlight >}}

The second mechanism is based on the Spring utilities schema and is
actually more compact:

{{< highlight xml "style=emacs" >}}<!-- Restlet Component bean -->
<bean id="component" class="org.restlet.ext.spring.SpringComponent">
    ...
</bean>

<!-- Application bean -->
    <constructor-arg>
        <util:property-path path="component.context" />
    </constructor-arg>
    ...
</bean>
{{</ highlight >}}

You also have to make sure that the util namespace is properly declared
in your XML configuration header. Here is a snippet for Spring 2.5:

{{< highlight xml "style=emacs" >}}<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="
http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd
http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util-2.5.xsd">

<!-- Add you <bean/> definitions here -->

</beans>
{{</ highlight >}}

This utilities mechanism is quite powerful and flexible, for more
information [check this
page](http://static.springframework.org/spring/docs/2.5.x/reference/xsd-config.html#xsd-config-body-schemas-util-property-path).
