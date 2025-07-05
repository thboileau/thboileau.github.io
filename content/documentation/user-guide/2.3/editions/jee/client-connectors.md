---
title: Client connectors
weight: 2
---
# Introduction

It is possible to declare client connectors when the application is
hosted on a Servlet container. The Javadocs of the Servlet adapter
([ServerServlet](https://javadocs.restlet.talend.com/{{% param version %}}/jee/ext/org/restlet/ext/servlet/ServerServlet.html)
class) answers this question and others related to the configuration of
Restlet based applications.

The web.xml file declares the client connectors in a dedicated
"org.restlet.clients" parameter:

{{< highlight xml "style=emacs" >}}<servlet>
    <servlet-name>RestletAdapter</servlet-name>
    [...]
    <!-- List of supported client protocols (Optional - Only in mode 3) -->
    <init-param>
        <param-name>org.restlet.clients</param-name>
        <param-value>HTTP HTTPS FILE</param-value>
    </init-param>
    [...]
</servlet>
{{< /highlight >}}
