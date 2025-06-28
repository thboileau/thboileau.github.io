---
title: FileUpload
longTitle: Apache FileUpload extension
---
# Introduction

This extension leverages the [Apache FileUpload
library](http://commons.apache.org/fileupload/)
to provide a robust, high-performance, Web-based file upload in Restlet
server-side applications.

# Description

This extension lets you receive files sent by POST or PUT requests and
to parse the posted entity (which is actually an instance of the
"Representation" class) and to extract a list of FileItems from it, each
item corresponding to one file uploaded in the posted request, typically
from a Web form.

For additional details, please consult [the
Javadocs](https://javadoc.io/doc/org.restlet/org.restlet.ext.fileupload/{{% param version %}}/org/restlet/ext/fileupload/package-summary.html).

Here is the list of dependencies for this extension:

-   [Java Servlet](http://www.oracle.com/technetwork/java/javaee/servlet/index.html)
-   [Apache Commons FileUpload](http://jakarta.apache.org/commons/fileupload/)

# Usage example

This sample code illustrates how to upload files with the FileUpload
extension. It is composed of 3 classes:

-   a resource "MyResource" which responds to GET and POST requests,
-   an application called "MyApplication" which routes all received
    requests to the resource,
-   a component called "TestFileUpload" which creates a local HTTP
    server on port 8182 and contains only one application (one instance
    of "MyApplication") attached to the path "/testFileUpload".

Thus, each request to the following uri
"http://localhost/testFileUpload" will be handled by a new instance of
"MyResource".

The single representation of this resource is a web form with a file
select control and a submit button. It allows to set up a request with
an uploaded file that will be posted to the resource. The name of the
file select control ("fileToUpload") is referenced by the resource.

Every Resource instance handles the POST request in method "accept"
which accepts the posted entity as single parameter. The aim of the
MyResource instance is to parse the request, get the file and send
back its content as plain text to the client.

Here is the content of the MyResource\#accept method:

{{< highlight java "style=emacs" >}}@Post
public Representation accept(Representation entity) throws Exception {
    Representation result = null;
    if (entity != null) {
        if (MediaType.MULTIPART_FORM_DATA.equals(entity.getMediaType(), true)) {
            // 1/ Create a factory for disk-based file items
            DiskFileItemFactory factory = new DiskFileItemFactory();
            factory.setSizeThreshold(1000240);

            // 2/ Create a new file upload handler based on the Restlet
            // FileUpload extension that will parse Restlet requests and
            // generates FileItems.
            RestletFileUpload upload = new RestletFileUpload(factory);

            // 3/ Request is parsed by the handler which generates a
            // list of FileItems
            FileItemIterator fileIterator = upload.getItemIterator(entity);

            // Process only the uploaded item called "fileToUpload"
            // and return back
            boolean found = false;
            while (fileIterator.hasNext() && !found) {
                FileItemStream fi = fileIterator.next();
                if (fi.getFieldName().equals("fileToUpload")) {
                    found = true;
                    // consume the stream immediately, otherwise the stream
                    // will be closed.
                    StringBuilder sb = new StringBuilder("media type: ");
                    sb.append(fi.getContentType()).append("\n");
                    sb.append("file name : ");
                    sb.append(fi.getName()).append("\n");
                    BufferedReader br = new BufferedReader(
                            new InputStreamReader(fi.openStream()));
                    String line = null;
                    while ((line = br.readLine()) != null) {
                        sb.append(line);
                    }
                    sb.append("\n");
                    result = new StringRepresentation(sb.toString(), MediaType.TEXT_PLAIN);
                }
            }
        } else {
            // POST request with no entity.
            setStatus(Status.CLIENT_ERROR_BAD_REQUEST);
        }
    }
    return result;
}
{{</ highlight >}}

Before running this example, please add the following jars to the
classpath:

-   org.restlet (Restlet API)
-   org.restlet.ext.fileupload (Restlet extension based on the Apache FileUpload project)
-   org.apache.commons.fileupload (Apache FileUpload project)
-   org.apache.commons.io (Apache FileUpload project)
-   javax.servlet.jar (Servlet archive used by the FileUpload library)

# Links

-   [Apache FileUpload library](http://commons.apache.org/fileupload/)
-   [Server connectors](../core/base/connectors)
-   [Sample code of FileUpload extension (zip file)](https://download.restlet.talend.com/technical-resources/restlet-framework/archives/examples/fileupload/{{% param version %}}/sample.zip "Usage example of FileUpload extension")
