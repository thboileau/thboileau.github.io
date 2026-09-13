---
title: Overview
weight: 1
---

The **org.restlet.service** package contains services used by
applications and components. This chapter lists the services hosted by
default by Component and Application instances.

# Component services

Here is the list of services hosted by default by an instance of
Component:

-   [Log service](/documentation/user-guide/{{% param version %}}/core/services/log "Log service"): provide access to logging service.
-   [Status service](/documentation/user-guide/{{% param version %}}/core/services/status "Status service"): provide common representations for exception status.

# Application services

Here is the list of services hosted by default by an instance of
Application :

-   [Connector service](/documentation/user-guide/{{% param version %}}/core/services/connector "Connector service"): declare necessary client and server connectors.
-   [Decoder service](/documentation/user-guide/{{% param version %}}/core/services/decoder "Decoder service"): automatically decode or decompress request entities.
-   [Metadata service](/documentation/user-guide/{{% param version %}}/core/services/metadata "Metadata service"): provide access to metadata and their associated extension names.
-   [Range service](/documentation/user-guide/{{% param version %}}/core/services/range "Range service"): automatically exposes ranges of response entities.
-   [Status service](/documentation/user-guide/{{% param version %}}/core/services/status "Status service"): provide common representations for exception status.
-   [Task service](/documentation/user-guide/{{% param version %}}/core/services/task "Task service"): run tasks asynchronously.
-   [Tunnel service](/documentation/user-guide/{{% param version %}}/core/services/tunnel "Tunnel service"): tunnel method names or client preferences via query parameters.
