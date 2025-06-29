---
title: Future plans - Known caveats
longTitle: Oracle XDB Restlet Adapter - Others
weight: 6
---
** Future plans

 - __XmldbDirectory__ class sub-classing __Directory__ to provide load and browse operation over __XMLDB__ repository.
 - __XMLType__ optimized Variant to exploit Lazy DOM native implementation inside the __OJVM__, extract method and native stream support.


** Known caveats


Some browser such Firefox reports an unexpected exception because it tries to stay connected to XMLDB HTTP protocol handler, you can avoid it changing network.http.keep-alive property to false. See this [OTN Forums thread](http://forums.oracle.com/forums/thread.jspa?threadID=336855&amp;start=30&amp;tstart=0).

Usually to run REST application in other schemas like SCOTT these grants are required (JDK Logging and class loader functionality):


{{< highlight sql "style=emacs" >}}SQL> exec dbms_java.grant_permission( 'SCOTT', 'SYS:java.lang.RuntimePermission', 'getClassLoader', '' );
SQL> exec dbms_java.grant_permission( 'SCOTT', 'SYS:java.util.logging.LoggingPermission', 'control', '' );
SQL> commit;

{{</ highlight >}}
