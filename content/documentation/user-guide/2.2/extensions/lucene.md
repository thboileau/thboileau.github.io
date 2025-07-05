---
title: Lucene
longTitle: Lucene extension
---
# Introduction

The goal of this extension is to provide an integration between Restlet
and [Apache Lucene project](http://lucene.apache.org/)
and subprojects such as
[Solr](http://lucene.apache.org/solr/)
and
[Tika](http://tika.apache.org/).

Its main feature is to allow an application to have access to Lucene
indexing capabilities in a RESTful way thanks to Solr. The other feature
is to provide a TikaRepresentation leveraging Lucene Tika subproject to
extract metadata from any Representation.

For additional details, please consult the
[Javadocs](https://javadocs.restlet.talend.com/{{% param version %}}/jse/ext/org/restlet/ext/lucene/package-summary.html).

# Solr integration

The connector contributed allows you to interact with Solr with
"solr://" references the same way you would do it through HTTP : \

[http://wiki.apache.org/solr/SolrRequestHandler](http://wiki.apache.org/solr/SolrRequestHandler)

## Initialization

The CoreContainer that will be helped by the SolrClientHelper can be
initialized in two different ways.

First one is to specify directory and configFile parameters.

{{< highlight java "style=emacs" >}}Client solrClient = component.getClients().add(SolrClientHelper.SOLR_PROTOCOL);
solrClient.getContext().getParameters().getFirstValue("directory");
solrClient.getContext().getParameters().getFirstValue("configFile");
{{< /highlight >}}

Second one is to create the CoreContainer.

{{< highlight java "style=emacs" >}}Client solrClient = component.getClients().add(SolrClientHelper.SOLR_PROTOCOL);
CoreContainer coreContainer = initSolrContainer(component);
solrClient.getContext().getAttributes().put("CoreContainer",coreContainer);
{{< /highlight >}}

To configure your core container see solr documentation :
[http://wiki.apache.org/solr/](http://wiki.apache.org/solr/)

## Usage

It is possible to interact with the core container using "solr://"
Restlet requests with the client dispatcher the same way it is described
on Solr's wiki using http requests.

SolrClientHelper returns instances of SolrRepresentation from which you
can get results encoded as JSON or XML.

To update a document like described
[here](http://wiki.apache.org/solr/UpdateXmlMessages)
you can do :

{{< highlight java "style=emacs" >}}StringRepresentation repr = new StringRepresentation(xml, MediaType.TEXT_XML);
getContext().getClientDispatcher().post("solr://main/update", repr);
{{< /highlight >}}

## Solr Core Container

If you would like to interact with Solr through http without a Servlet
container you can use this restlet. It can also be very useful for
debug.

{{< highlight java "style=emacs" >}}import org.restlet.Context;
import org.restlet.Restlet;
import org.restlet.data.Reference;
import org.restlet.data.Request;
import org.restlet.data.Response;

public class SolrForward extends Restlet {

    public SolrForward() {
    }

    public SolrForward(Context context) {
        super(context);
    }

    @Override
    public void handle(Request request, Response response) {
        super.handle(request, response);
        String path = request.getResourceRef().getRemainingPart();
        Reference solrRef = new Reference("solr://"+path);
        Request solrRequest = new Request(request.getMethod(),solrRef,request.getEntity());
        Response solrResp = getContext().getClientDispatcher().handle(solrRequest);
        response.setStatus(solrResp.getStatus());
        response.setEntity(solrResp.getEntity());
    }

}
{{< /highlight >}}
