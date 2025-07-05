---
title: Attributes
longTitle: Extracting attributes
weight: 5
---
Extracting attributes
=====================

Introduction
============

Extracting values from query, entity, cookies into the request's
attributesis a common need that is supported by the Extractor class.

When routing URIs to Resource instances or Restlet, you can decide to
transfer data from query, entity or cookies into the request's list of
attributes.\
 This mechanism is declarative and has been implemented at the level of
the "routes" (see the code below for more information). This mechanism
transfers data from the query (method "extractQuery"), the entity
(method "extractEntity") or the Cookies (method "extractCookies") to the
request's list of parameters.

For example, when implementing your Application, assuming that the
posted web form contains a select input field (called "selectField") and
a text field ( called "textField"). If you want to transfer them
respectively to attributes named "selectAttribute" and "textAttribute",
just proceed as follow.

{{< highlight java "style=emacs" >}}@Override
public Restlet createInboundRoot() {
     Extractor extractor = new Extractor(getContext()); 
     extractor.extractFromEntity("selectAttribute", "selectField", true);
     extractor.extractFromEntity("textAttribute", "textField", false);

     extractor.setNext(...)

     return extractor;
}
{{< /highlight >}}

You will get a String value in the "selectAttribute" (the selected
option), and a Form object which is a collection of key/value pairs
(key="textField" in this case) with the "textAttribute" attribute.

Here is sample code which helps to retrieve some attributes:

{{< highlight java "style=emacs" >}}// Get the map of request attributes
Map<String, Object> map = request.getAttributes();

// Retrieve the "selectAttribute" value
String stringValue = (String) map.get("selectAttribute");
System.out.println(" value => " + stringValue);

// Retrieve the "textAttribute" collection of parameters
Object object = map.get("textAttribute");
if(object != null){
    if(object instanceof Form){
        Form form = (Form) object;
        for (Parameter parameter : form) {
            System.out.print("parameter " + parameter.getName());
            System.out.println("/ " + parameter.getValue());
        }
    }
}
{{< /highlight >}}
