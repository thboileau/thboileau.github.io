---
title: XML
longTitle: Working with XML
weight: 9
---
# Description

The GWT edition contains a XML extension that provides a
org.restlet.client.ext.xml.DomRepresentation class that you can leverage
to either parse a XML representation received or to serialize a XML DOM.

Prior to leverage this extension, ensure to update your `module.gwt.xml` configuration file with the following instruction:

{{< highlight xml "style=emacs" >}}<inherits name="org.restlet.XML" />
{{< /highlight >}}

Here is a sample code taken from the example application. The
DomRepresentation gives access to the underlying DOM document via the
"getDocument()" method.

{{< highlight java "style=emacs" >}}ClientResource r = new ClientResource("/test");

// Set the callback object invoked when the response is received.
r.setOnResponse(new Uniform() {
    public void handle(Request request, Response response) {
        // Get the representation as an XmlRepresentation
        DomRepresentation rep = new DomRepresentation(response.getEntity());

        // Loop on the nodes to retrieve the node names and text content.
        NodeList nodes;
        try {
            nodes = rep.getDocument().getDocumentElement().getChildNodes();
            for (int i = 0; i < nodes.getLength(); i++) {
                Node node = nodes.item(i);
                xmlRoot.addItem(node.getNodeName() + ":" + node.getFirstChild().getNodeValue());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
});

// Indicates the client preferences and let the server handle
// the best representation with content negotiation.
r.get(MediaType.TEXT_XML);
{{< /highlight >}}
