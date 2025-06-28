---
title: EMF
---
# Introduction

[Eclipse
EMF](http://www.eclipse.org/modeling/emf/)
is a widely used modeling technology that can unify models defined in
XML Schema, UML or Java code. This extension facilitates the usage of
EMF to convert between "representation beans" generated from EMF and
XML/XMI/ECore representations.

For additional details, please consult [the
Javadocs](https://javadocs.restlet.talend.com/{{% param version %}}/jse/ext/org/restlet/ext/emf/package-summary.html).

# Description

This extension provides a main EmfRepresentation class that is able to
both format and EObject as an XML/XMI/HTML representation and to parse
an XML/XMI representation is generated back as an EObject. It comes with
its EmfConverter which allows you to automatically benefit from the
feature by simply adding org.restlet.ext.emf.jar in your classpath and
using your EObject subclasses in resource annotated interface.

TODO - Add a simple yet comprehensive example of how to use EMF to save
time to manage representations

## HTML representations

In addition to XML/XMI support common for EMF model, we offer a generic
HTML representation. It lists all its properties and can even generate
HTML links when the proper EMF eAnnotation is detected. This is useful
to be able to automatically navigate a web API whose resource 
representations are defined using EMF.

In order to display EMF attributes containing URI references into proper
HTML hyperlinks, you just need to add eAnnotations to your EMF ECore
metamodel using the "http://restlet.org/schemas/2011/emf/html"
namespace and then add an entry with the "linked" name and a "true"
value.

In order to change the title of the HTML document or the name of a
property, you need to use the same namespace with the "label" name and
the text you want to display as a value.
