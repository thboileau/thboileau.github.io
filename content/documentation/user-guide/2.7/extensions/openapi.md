---
title: OpenAPI
longTitle: OpenAPI extension
---
# Introduction

This extension provides an integration of Restlet with [OpenAPI](https://www.openapis.org/), based on
[swagger-core](https://github.com/swagger-api/swagger-core). It automatically generates an OpenAPI 3.1
specification of your API by introspecting the routes and annotated resources of a Restlet application,
so you don't have to write or maintain a descriptor by hand.

It supports:

- automatic generation of an OpenAPI 3.1 specification (JSON or YAML) from your application's routing
  and annotated `ServerResource` methods,
- documentation of path parameters, request bodies and response bodies inferred from the Java types used
  by your resources,
- fine-grained customization of the generated operations through swagger-core annotations,
- automatic documentation of security requirements for resources protected by a `ChallengeAuthenticator`
  (such as HTTP Basic authentication).

# Usage instructions

## Dependencies

Add `org.restlet.ext.openapi.jar` (provided in the "lib" directory of the
[Restlet Framework](/documentation/user-guide/{{% param version %}}/introduction/setup/download/ "download restlet framework"))
to your classpath.

Make sure you are using the version {{% param version %}} of Restlet. This extension pulls in
[swagger-core](https://github.com/swagger-api/swagger-core) and Jackson as dependencies.

## Configuration

Make your application class extend `org.restlet.ext.openapi.OpenApiApplication` instead of
`org.restlet.Application`. The extension then automatically publishes the generated OpenAPI specification
on the path "/openapi" of your API, as soon as the application's root `Router` is created.

{{< highlight java "style=emacs" >}}
public class LibraryApplication extends OpenApiApplication {

    @Override
    public Restlet createInboundRoot() {
        Router router = new Router(getContext());
        router.attach("/books", BooksResource.class);
        router.attach("/books/{bookId}", BookResource.class);
        return router;
    }

}
{{< /highlight >}}

Requesting `GET /openapi` on this application returns the generated specification, negotiated between
JSON and YAML representations depending on the client's `Accept` header.

If you want to publish the specification on a different path, override `getOpenApiSpecificationPath()`:

{{< highlight java "style=emacs" >}}
@Override
protected String getOpenApiSpecificationPath() {
    return "/api-docs";
}
{{< /highlight >}}

## How the specification is generated

The extension walks through the routes attached to your application's root router, following child
routers and unwrapping any `ChallengeAuthenticator` it encounters along the way. For every route that
targets a `ServerResource`, it inspects the resource's annotated methods (`@Get`, `@Post`, `@Put`,
`@Delete`, etc.) and creates one OpenAPI operation per method:

- variables found in the URI template (e.g. `{bookId}`) are documented as required path parameters,
- the request body, if any, is inferred from the type of the method's first parameter,
- the response body is inferred from the method's return type,

Request and response schemas are resolved using the same `ConverterService` your application relies on to
serialize and deserialize representations, so make sure a converter extension able to produce a schema for
your media type (typically
[org.restlet.ext.jackson](/documentation/user-guide/{{% param version %}}/extensions/jackson) for JSON) is
on the classpath. If a method doesn't declare any specific response, the extension documents a default
`200` "Success" response.

## Customizing the generated operations

You can refine any operation by adding swagger-core annotations (`io.swagger.v3.oas.annotations.*`)
directly on the annotated resource methods: `@Operation` to set a summary, description or custom
responses, and `@Parameter` to document query, header or cookie parameters.

{{< highlight java "style=emacs" >}}
public class BooksResource extends ServerResource {

    @Get
    @Operation(
            summary = "Get a list of all books",
            parameters = {
                @Parameter(
                        name = "filter",
                        description = "Filter books",
                        in = ParameterIn.QUERY,
                        schema = @Schema(type = "string"))
            })
    public List<Book> getBooks() {
        return BOOKS;
    }

    @Post
    @Operation(
            summary = "Add a new book",
            responses = {
                @ApiResponse(
                        responseCode = "201",
                        headers = @Header(name = "Location", schema = @Schema(type = "string")),
                        content = @Content())
            })
    public void addBook(Book book) {
        getResponse().setStatus(Status.SUCCESS_CREATED);
        getResponse().setLocationRef(getRequest().getResourceRef().addSegment(book.id()));
    }

}
{{< /highlight >}}

## Documenting API-level information

By default, the specification's `info.title` is derived from your application class name (stripping a
trailing "Application", e.g. `LibraryApplication` becomes "Library REST API") and its `info.version` is
set to "1.0.0". You can override this by annotating your application class with swagger-core's
`@OpenAPIDefinition`:

{{< highlight java "style=emacs" >}}
@OpenAPIDefinition(
        info = @Info(title = "Library REST API", version = "2.0.0", description = "Manages a library's books"))
public class LibraryApplication extends OpenApiApplication {
    // ...
}
{{< /highlight >}}

## Security

If a route is protected by one or more `ChallengeAuthenticator` (attached anywhere between the
application's root and the resource, e.g. for HTTP Basic authentication), the extension automatically
registers a matching OpenAPI security scheme and requires it on the affected operations, provided the
authenticator isn't marked as optional.

{{< highlight java "style=emacs" >}}
@Override
public Restlet createInboundRoot() {
    Router router = new Router(getContext());
    router.attach("/books", BooksResource.class);
    router.attach("/books/{bookId}", BookResource.class);

    ChallengeAuthenticator authenticator =
            new ChallengeAuthenticator(getContext(), ChallengeScheme.HTTP_BASIC, "realm");
    authenticator.setVerifier(myVerifier);
    authenticator.setNext(router);

    return authenticator;
}
{{< /highlight >}}

# Trying it out

Once your application is running, fetch its specification with a browser or a tool like curl:

{{< highlight bash "style=emacs" >}}
curl -H "Accept: application/json" http://localhost:8182/openapi
{{< /highlight >}}

You can then paste its content into [Swagger Editor](https://editor.swagger.io/) or any OpenAPI-compatible
tool such as Swagger UI to explore and try out your API.

For additional details, please consult the
[Javadocs](https://javadoc.io/doc/org.restlet/org.restlet.ext.openapi/{{% param version %}}/org/restlet/ext/openapi/package-summary.html).
