---
title: Converter
longTitle: ConverterService
weight: 3
---
# Introduction

The converter service of an application handles the conversion between
representations (received by a resource for example) and beans or POJOs.
It can be used either programmatically or transparently thanks to
annotated Restlet resources.

# Description

## Server-side usage

Let's describe how this service is typically used with a ServerResource
that supports GET and PUT methods as below:

{{< highlight java "style=emacs" >}}@Get("json")
// Returns a json representation of a contact.
public Contact toJson(){
   [...]
}

@Put()
// Handles a Web form in order to set the full state of the resource.
public void store(Form form){
   [...]
}
{{</ highlight >}}

In this case, the aim of the converter service is to:

-   return a JSON representation of a contact
-   convert a Web form into a Form object and pass it to the store
    method.

## Client-side usage

On the client-side you can leverage the service either by creating a
proxy of an annotated resource interface, via ClientResource.wrap(...)
or ClientResource.create(...) methods. Otherwise, it is possible to
invoke any web API and specify the excepted return type and let the
service convert between beans and representations. Here is the list of
related methods on ClientResource:

-   delete(Class\<T\> resultClass) : T
-   get(Class\<T\> resultClass) : T
-   options(Class\<T\> resultClass) : T
-   post(Object entity, Class\<T\> resultClass) : T
-   put(Object entity, Class\<T\> resultClass) : T

For example if you want to retrieve an XML representation as a DOM
document, you can just do:

{{< highlight java "style=emacs" >}}ClientResource cr = new ClientResource("http://myapi.com/path/resource");
Document doc = cr.get(Document.class);
{{</ highlight >}}

And that's all you need to do, as long as you have the
org.restlet.ext.xml.jar in your classpath!

## Internals of the service

A converter service does not contain the conversion logic itself. It
leverages a set of declared converters which are subclasses of
ConverterHelper. A converter is a piece of code that handles:

-   either the conversion of a Representation to an object
-   or the conversion of an object to a Representation
-   or both conversion

Conversion mainly relies on the media type of the given Representation
(application/json, text/xml, etc.) and an instance of a specific class.
For example, the default converter provided by the core module
(org.restlet.jar) allows the conversion of Web forms (media type
"application/x-www-form-urlencoded") to org.restlet.data.Form instances
and vice versa. The converter provided the FreeMarker extension is only
able to generate Representations from a FreeMarker Template (class
freemarker.template.Template).

A converter is declared using a simple text file located in the
"META-INF/services" source directory. Its name is
"org.restlet.engine.converter.ConverterHelper" and it contains generally
a single line of text which is the full path of the converter class. For
example, the FreeMarker extension contains in the
"src/META-INF/services" directory such text file with the following line
of text: "org.restlet.ext.freemarker.FreemarkerConverter".

# Available converters

## Conversion from representations to objects

Module | From Representations with media type | To Object
------ | ------------------------------------ | ---------
Core | APPLICATION\_JAVA\_OBJECT | java.lang.Object
Core | APPLICATION\_JAVA\_OBJECT\_XML | java.lang.Object
Core | APPLICATION\_WWW\_FORM | org.restlet.Form
Core | any kind of Representations | java.lang.String, java.io.InputStream, java.io.Reader, java.nio.ReadableByteChannel
Atom | APPLICATION\_ATOM | org.restlet.ext.atom.Feed
Atom | APPLICATION\_ATOM\_PUB | org.restlet.ext.atom.Service
GWT | APPLICATION\_JAVA\_OBJECT\_GWT | an Object, org.restlet.ext.gwt.ObjectRepresentation
Jackson | APPLICATION\_JSON | an Object
JAXB | APPLICATION\_ALL\_XML, APPLICATION\_XML, TEXT\_XML | object supporting JAXB annotations, org.restlet.ext.JaxbRepresentation
JiBX | APPLICATION\_ALL\_XML, APPLICATION\_XML, TEXT\_XML | JiBX bound object, org.restlet.ext.JibxRepresentation
JSON | APPLICATION\_JSON | org.json.JSONArray, org.json.JSONObject, org.json.JSONTokener
RDF | TEXT\_RDF\_N3, TEXT\_RDF\_NTRIPLES, APPLICATION\_RDF\_TURTLE,APPLICATION\_ALL\_XML | org.restlet.ext.rdf.Graph
WADL | APPLICATION\_WADL | org.restlet.ext.wadl.ApplicationInfo
XML | APPLICATION\_ALL\_XML, APPLICATION\_XML, TEXT\_XML | org.w3c.dom.Document, org.restlet.ext.xml.DomRepresentation, org.restlet.ext.xml.SaxRepresentation
XStream | APPLICATION\_ALL\_XML, APPLICATION\_XML, TEXT\_XML, APPLICATION\_JSON | (requires Jettison dependency) java.lang.Object, org.restlet.ext.xstream.XStreamRepresentation

## Conversion from objects to representations

Module | From Object | To Representations with media type
------ | --------- | ------------------------------------
Core | java.lang.String, java.io.File, java.io.InputStream, java.io.Reader, StringRepresentation, FileRepresentation, InputStreamRepresentation, ReaderRepresentation, org.restlet.representation.Representation | any
Core | org.restlet.Form | APPLICATION\_WWW\_FORM
Core | java.io.Serializable | APPLICATION\_JAVA\_OBJECT, APPLICATION\_JAVA\_OBJECT\_XML
Atom | org.restlet.ext.atom.Feed | APPLICATION\_ATOM
Atom | org.restlet.ext.atom.Service | APPLICATION\_ATOM\_PUB
FreeMarker | freemarker.template.Template | any
GWT | an Object, org.restlet.ext.gwt.ObjectRepresentation | APPLICATION\_JAVA\_OBJECT\_GWT
Jackson | an Object | APPLICATION\_JSON
JavaMail | a javax.mail.Message | a org.restlet.ext.javamail.MessageRepresentation
JAXB | object supporting JAXB annotations, org.restlet.ext.JaxbRepresentation | APPLICATION\_ALL\_XML, APPLICATION\_XML, TEXT\_XML
JiBX | JiBX bound object, org.restlet.ext.JibxRepresentation | APPLICATION\_ALL\_XML, APPLICATION\_XML, TEXT\_XML
JSON | org.json.JSONArray, org.json.JSONObject, org.json.JSONTokener | APPLICATION\_JSON
RDF | org.restlet.ext.rdf.Graph | TEXT\_RDF\_N3, TEXT\_RDF\_NTRIPLES, APPLICATION\_RDF\_TURTLE, APPLICATION\_ALL\_XML
ROME | com.sun.syndication..fedd.synd.SyndFeed | org.restlet.ext.rome.SyndFeedRepresentation
Velocity | org.apache.velocity.Template | any
WADL | org.restlet.ext.wadl.ApplicationInfo | APPLICATION\_WADL
XML | org.w3c.dom.Document, org.restlet.ext.xml.DomRepresentation, org.restlet.ext.xml.SaxRepresentation | APPLICATION\_ALL\_XML, APPLICATION\_XML, TEXT\_XML
XStream | an object | APPLICATION\_ALL\_XML, APPLICATION\_XML, TEXT\_XML, APPLICATION\_JSON
