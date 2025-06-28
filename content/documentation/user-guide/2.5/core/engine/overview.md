---
title: Overview
weight: 1
---
# Introduction

The engine is the set of classes that supports or implements the Restlet
API. Since version 2.0, the Restlet API and Engine have been merged in a
single "org.restlet.jar" file.

This separation has however stayed conceptually between the classes that
are expected to be used by Restlet API users while developing their
applications and the one that power this API and provide extensibility
those additional connectors, authenticators and so on.

# Internal connectors

In addition to supporting the Restlet API, the Reslet Engine includes a set
of [internal connectors](/documentation/user-guide/{{% param version %}}/core/engine/internal-connectors/overview) that can be further extended or replaced through
extensions.
