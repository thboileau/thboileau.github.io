---
title: Static Files
weight: 4
---
# Introduction

Do you have a part of your web application that serves static pages like
Javadocs? Well, no need to setup an Apache server just for that, use
instead the dedicated org.restlet.resource.Directory class. See how
simple it is to use it:

{{< highlight java "style=emacs" >}}public class FileServer extends Restlet {
    // URI of the root directory.  
    public static final String ROOT_URI = "file:///c:/path/to/root";  

    public static void main(String[] args) throws Exception {

        // Create a component
        Component component = new Component();  
        component.getServers().add(Protocol.HTTP, 8182);  
        component.getClients().add(Protocol.FILE);  

        // Create an application  
        Application application = new Application() {  
            @Override  
            public Restlet createInboundRoot() {  
                return new Directory(getContext(), ROOT_URI);  
            }  
        };  

        // Attach the application to the component and start it  
        component.getDefaultHost().attach(application);  
        component.start();
    }
}
{{< /highlight >}}

In order to run this example, you need to specify a valid value for
ROOT\_URI, In this case, it is set to
"file:///c:/path/to/root/".Note that no additional configuration is
needed. If you want to customize the mapping between file extensions and
metadata (media type, language or encoding) or if you want to specify a
different index name, you can use the Application's
["metadataService"](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/service/MetadataService.html)
property.
