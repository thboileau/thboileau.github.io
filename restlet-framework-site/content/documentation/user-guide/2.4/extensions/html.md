---
title: HTML
---
# Introduction

This extension aims at providing a comprehensive support for HTML in the
Restlet Framework. The most common requirement is the manipulation of
HTML forms

# Description

It is available in the **org.restlet.ext.html** package since version
2.1 (post-M5). Currently, it contains a replacement for the usual
org.restlet.data.Form class that will be deprecated and adds support for
multipart forms using the same Java API.

The FormDataSet class is a proper Restlet representation (which wasn't
the case of Form) and is capable of parsing HTML form data in URL
encoding and to write in either URL encoding or multipart form data
based on the "multipart" boolean property.

For additional information on both encoding, please see the HTML 4.0
specification, [section
17.13](http://www.w3.org/TR/html4/interact/forms.html#h-17.13).

## Usage example

{{< highlight java "style=emacs" >}}Representation file = new FileRepresentation(***);

FormDataSet form = new FormDataSet();
form.setMultipart(true);
form.getEntries().add(new FormData("number", "5555555555"));
form.getEntries().add(new FormData("clip", "rickroll"));
form.getEntries().add(new FormData("upload_file", file));
form.getEntries().add(new FormData("tos", "agree"));

ClientResource cr = new ClientResource("http://mydomain.com/upload");
cr.post(form);
{{</ highlight >}}
