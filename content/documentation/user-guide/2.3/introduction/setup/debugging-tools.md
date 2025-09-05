---
title: Debugging tools
weight: 3
---

As a set of pure Java library, the Restlet framework can easily be
debugged in your favorite IDE. All the source code is available, making
debugging session even easier by going inside the Restlet code if
necessary.

A good way to start a debugging session is to put a breakpoint inside
the handle() method or inside the constructor of your Resource subclass.
Think also about turning one the access and application
[loggings](/documentation/user-guide/{{% param version %}}/editions/jse/logging "Logging").

# Tools

Regarding protocol debugging, we recommend the you install tools such
as:

-   [cURL](http://curl.haxx.se/) : command line HTTP client for Unix
-   [WireShark](http://www.wireshark.org/) : advanced network analyzer working at the IP or TCP or HTTP levels
-   [RESTClient](https://github.com/wiztools/rest-client) : Java/Swing graphical HTTP client
-   [Poster](http://code.google.com/p/poster-extension/) : FireFox extension to test RESTful Web applications
-   [Netcat](http://netcat.sourceforge.net/) : swiss-army knife for TCP/IP.
-   etc.
