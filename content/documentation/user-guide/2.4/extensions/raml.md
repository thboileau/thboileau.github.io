---
title: RAML
longTitle: RAML extension
---
# Introduction

This extension provides a preview integration with [RAML](http://raml.org/) including:

- automated generation of RAML descriptor in YAML
- introspection of Restlet API based applications

In this scenario, we will add RAML support to a Restlet based API.

# Usage

## Dependencies

Add org.restlet.ext.raml.jar (provided in the "lib" directory of
[restlet framework](/documentation/user-guide/2.4/introduction/setup/download/
"download restlet framework")) to your classpath.

Make sure you are using the version {{% param version %}} of Restlet and java 1.7 or higher.

## Configuration

Make your application class extend org.restlet.ext.raml.RamlApplication instead of org.restlet.Application.

By default, the RAML documentation will be available on the path "/raml" of your API. If you want to change this path, you can specify it manually in the method _createInboundRoot_:

{{< highlight java "style=emacs" >}}public Restlet createInboundRoot() {
        // Router for the API's resources
        Router apiRouter = createApiRouter();
        attachRamlSpecificationRestlet(apiRouter, "/docs");
        // Protect the set of resources
        ChallengeAuthenticator guard = createApiGuard(apiRouter);
        return guard;
    }
{{< /highlight >}}

Here, you specify that the RAML definition will be provided on the path "/docs".

# Customization

If you want to display a definition edited manually, the RamlApplication can get it directly from files. To do that, you just have to override the method _getRamlSpecificationRestlet()_ of class RamlApplication and make it return a custom Restlet.

I am using RAML java parser to get the definition from a file. You can get it [here](https://github.com/raml-org/raml-java-parser).

See sample implementation below:

{{< highlight java "style=emacs" >}}@Override
    public RamlSpecificationRestlet getRamlSpecificationRestlet(
            Context context) {
        return new RamlSpecificationRestlet(getContext()) {

            @Override
            public Representation getRaml() {
                StringRepresentation result = new StringRepresentation(
        				new RamlEmitter().dump(new RamlDocumentBuilder()
        						.build("file:///path/to/my/repo/ramldoc.raml")),
        			    MediaType.TEXT_PLAIN);
                return result;
            }
        };
    }
{{< /highlight >}}

For additional details, please consult the
[Javadocs](https://javadocs.restlet.talend.com/{{% param version %}}/jse/ext/org/restlet/ext/raml/package-summary.html).
