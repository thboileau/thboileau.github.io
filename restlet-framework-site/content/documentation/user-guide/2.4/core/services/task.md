---
title: Task service
weight: 9
---
# Introduction

This service is capable of running tasks asynchronously. The service
instance returned will not invoke the runnable task in the current
thread.

In addition to allowing pooling, this method will ensure that the
threads executing the tasks will have the thread local variables copied
from the calling thread. This will ensure that call to static methods
like
[Application.getCurrent()](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/Application.html#getCurrent%28%29)
still work.

Also, note that this executor service will be shared among all Restlets
and Resources that are part of your context. In general this context
corresponds to a parent Application's context. If you want to have your
own service instance, you can use the
[wrap(ExecutorService)](https://javadocs.restlet.talend.com/{{% param version %}}/jse/api/org/restlet/service/TaskService.html#wrap%28java.util.concurrent.ExecutorService%29)
method to ensure that thread local variables are correctly set.
