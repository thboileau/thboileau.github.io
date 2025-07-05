---
title: Logging
weight: 2
---
# Introduction

By default, Restlet relies on JDK's logging API (JULI) to log records
about its activity. For a complete documentation on this standard API,
you can check the [related JDK
documentation](http://docs.oracle.com/javase/7/docs/technotes/guides/logging/).
For additional configuration details, you should also read the [Javadocs
of the LogManager
class](http://docs.oracle.com/javase/7/docs/api/java/util/logging/LogManager.html).
For example, to indicate the location of your logging properties file,
you should add the following parameter to your JVM:

{{< highlight bash "style=emacs" >}}-Djava.util.logging.config.file="/home/myApp/config/myLogging.properties"
{{< /highlight >}}

When developing your Restlet code, you should always use the current
context to get a logger. This will ensure the proper naming and
filtering of your log records. Most classes like Restlet subclasses or
ServerResource subclasses offer a "getLogger()" method. Otherwise, you
can rely on the getContext().getLogger() method or on the static
"Context.getCurrentLogger()" method.

Note also that there are two main types of log record in Restlet:

-   The code related log records, for example used for tracing,
    debugging or error logging
-   The access related log records, used to log the requests received by
    a component (identical to IIS or Apache logs)

# Programmatic configuration

Since version 2.1, it is now possible to programmatically change the log
level using the Engine\#setLogLevel(…) and setRestletLogLevel(…) static
methods. It is also possible to enable selective call logging by setting
the Request\#loggable property or by overriding the
LogService\#isLoggable(Request) method.

If you do provide a logging configuration file via the system
properties, it will take over the programmatic configuration. Also, the
new default log formatter will write each log entry in the console on a
single compact line, reducing confusion while debugging.

It is also possible to define the calls to log based on a URI template
by calling the
LogService\#[setLoggableTemplate](https://javadoc.io/static/org.restlet/org.restlet/{{% frameworkLatestRelease %}}/org/restlet/service/LogService.html#setLoggableTemplate%28java.lang.String%29)(...)
method.

# Logger names

As a single JVM can contain several Restlet components at the same time
and each component can also contain several applications, we need a way
to filter the log records for each application if needed. For this
purpose, we leverage the hierarchical nature of JDK loggers:

-   At the root of all Restlet loggers is the logger named "org.restlet"
-   Below you have a logger per component, based on the simple class
    name. For example "org.restlet.MyComponent".
-   Below you have a logger per application, based on the simple class
    name. For example "org.restlet.MyComponent.MyApplication".
-   Each component also logs access using a name such as
    "org.restlet.MyComponent.LogService". This name can be customized
    using the "LogService.loggerName" property.

It can often be difficult to configure your logging properties file
because you don't always know precisely the logger names. For Restlet
code, everything is under the root "org.restlet" logger so it is
relatively easy.

However, as the Restlet extensions rely on many third-party library, you
need to understand how each one handles logging in order to consistently
configure you logging. Many of them rely on [Apache Commons Logging
API](http://commons.apache.org/logging/)
as a neutral API that can plug implementations such as
[Log4J](http://logging.apache.org/log4j/)
or JDK Logging. Other use the neutral
[SLF4J](http://www.slf4j.org/),
but in most of the cases, it is possible to redirect those alternative
logging mechanisms to the JDK logging one or the other way around.

Here is an attempt to list the logger names used by those libraries.
Please help us to complete this table.

Library | Package name | Logger name | Comment
------- | ------------ | ----------- | -------
db4o | com.db4o |  |
Grizzly | com.sun.grizzly |  |
Bloat | edu.purdue.cs.bloat |  |
Java Activation | javax.activation |  |
Java Mail | javax.mail |  |
Java Servlet | javax.servlet |  |
JAX-RS | javax.ws.rs |  |
JAXB | javax.xml.bind |  |
StAX | javax.xml.stream |  |
JLine | jline |  |
JXTA | net.jxta |  |
OAuth | net.oauth |  |
AntLR | org.antlr.runtime |  |
Commons Codec | org.apache.commons.codec |  |
Commons Collections | org.apache.commons.collections |  |
Commons DBCP | org.apache.commons.dbcp |  |
Commons FileUpload | org.apache.commons.fileupload |  |
Commons HTTP Client | org.apache.commons.httpclient | org.apache.commons.httpclient.\* httpclient.wire.\* | For more details, see the [logging documentation page](http://hc.apache.org/httpclient-3.x/logging.html).
Commons IO | org.apache.commons.io |  |
Commons Lang | org.apache.commons.lang |  |
Commons Logging | org.apache.commons.logging |  |
Commons Pool | org.apache.commons.pool |  |
MINA | org.apache.mina |  |
Velocity | org.apache.velocity |  |
Bouncy Castle | org.bouncycastle |  |
FreeMarker | freemarker |  |
JiBX | org.jibx.runtime |  |
JSON | org.json |  |
JUnit | junit |  |
Jetty | org.mortbay.jetty | org.mortbay.\* |  Jetty chooses its logger from the property "org.mortbay.log.class", biased towards SLF4J but overrideable
Simple | simple |  |
Spring | org.springframework | org.springframework.\* |
Tanuki Wrapper | org.tanukisoftware.wrapper |  |

If the logger name you are looking for isn't listed, there is an easy
way to detect it. You just have to call the static
"org.restlet.engine.log.TraceHandler.register()" method at the beginning
of your program. It will replace the default console handler by a more
compact one that will display the logger name for each log record
received by the root logger (i.e. all the log records).

# Sample configuration

As a starting point for your own logging properties file, here is the
one we use on our Restlet base Web server. Feel free to copy and paste
as needed.

{{< highlight ini "style=emacs" >}}# ================================
# ==                            ==
# ==   Web Logging Properties   ==
# ==                            ==
# ================================


# ------------------
# General properties
# ------------------


# This defines a whitespace separated list of class names for handler classes to load and register as handlers on
# the root Logger (the Logger named ""). Each class name must be for a Handler class which has a default constructor.
# Note that these Handlers may be created lazily, when they are first used.
handlers=java.util.logging.FileHandler
{{< /highlight >}}

In this first section, we declare one default handler that will receive
the log records. It is a file handler that will be configured below.

{{< highlight ini "style=emacs" >}}# ------------------
# Loggers properties
# ------------------

.level=WARNING
org.mortbay.level=WARNING
org.restlet.level=WARNING
com.noelios.level=WARNING

com.noelios.web.WebComponent.www.level=INFO
com.noelios.web.WebComponent.www.handlers=com.noelios.restlet.util.AccessLogFileHandler
com.noelios.web.WebComponent.www.useParentHandlers=false
{{< /highlight >}}

In this second section, we indicate that by default we are only
interested in log records with a WARNING level. We also configure the
Mortbay's Jetty, Restlet API and NRE log levels to WARNING. This isn't
necessary here but it can be useful when you need to lower the level of
only one of them at some point, for debugging purpose for example.

We also configured a logger for the WWW access log of our Restlet
component. For information, our Component subclass has this code in its
constructor:

{{< highlight java "style=emacs" >}}getLogService().setLoggerName("com.noelios.web.WebComponent.www");
{{< /highlight >}}

Also note that we use a specific handler for this logger, the
AccessLogFileHandler which is provided in the NRE. It can be easily
configurer to produce Apache-style HTTP log files.

{{< highlight ini "style=emacs" >}}# -------------------------
# ConsoleHandler properties
# -------------------------

# Specifies the default level for the Handler  (defaults to Level.INFO).
# java.util.logging.ConsoleHandler.level=WARNING

# Specifies the name of a Filter class to use (defaults to no Filter).
# java.util.logging.ConsoleHandler.filter=

# Specifies the name of a Formatter class to use (defaults to java.util.logging.SimpleFormatter).
# java.util.logging.ConsoleHandler.formatter=

# The name of the character set encoding to use (defaults to the default platform encoding).
# java.util.logging.ConsoleHandler.encoding=
{{< /highlight >}}

In the section above we have disabled the default ConsoleHandler
configuration as we don't use it on our server-side application.

{{< highlight ini "style=emacs" >}}# ------------------------------
# General FileHandler properties
# ------------------------------

# Specifies the default level for the Handler  (defaults to Level.ALL).
# java.util.logging.FileHandler.level=ALL

# Specifies the name of a Filter class to use (defaults to no Filter).
# java.util.logging.FileHandler.filter=

# Specifies the name of a Formatter class to use (defaults to java.util.logging.XMLFormatter)
java.util.logging.FileHandler.formatter=java.util.logging.SimpleFormatter

# The name of the character set encoding to use (defaults to the default platform encoding).
# java.util.logging.FileHandler.encoding=

# Specifies an approximate maximum amount to write (in bytes) to any one file.
# If this is zero, then there is no limit. (Defaults to no limit).
java.util.logging.FileHandler.limit=10000000

# Specifies how many output files to cycle through (defaults to 1).
java.util.logging.FileHandler.count=100

# Specifies a pattern for generating the output file name. (Defaults to "%h/java%u.log").
# A pattern consists of a string that includes the following special components that will be replaced at runtime:
#    "/" the local pathname separator
#    "%t" the system temporary directory
#    "%h" the value of the "user.home" system property
#    "%g" the generation number to distinguish rotated logs
#    "%u" a unique number to resolve conflicts
#    "%%" translates to a single percent sign "%"
java.util.logging.FileHandler.pattern=/home/prod/data/log/WebComponent-app-%u-%g.log

# Specifies whether the FileHandler should append onto any existing files (defaults to false).
# java.util.logging.FileHandler.append=
{{< /highlight >}}

Here we specify the file size limit, the number of rotation files (100)
and the file name template.

{{< highlight ini "style=emacs" >}}# -------------------------
# LogFileHandler properties
# -------------------------

# Specifies the default level for the Handler  (defaults to Level.ALL).
# org.restlet.engine.log.AccessLogFileHandler.level=ALL

# Specifies the name of a Filter class to use (defaults to no Filter).
# org.restlet.engine.log.AccessLogFileHandler.filter=

# Specifies the name of a Formatter class to use (defaults to java.util.logging.XMLFormatter)
org.restlet.engine.log.AccessLogFileHandler.formatter=com.noelios.restlet.util.AccessLogFormatter

# The name of the character set encoding to use (defaults to the default platform encoding).
# org.restlet.engine.log.AccessLogFileHandler.encoding=

# Specifies an approximate maximum amount to write (in bytes) to any one file.
# If this is zero, then there is no limit. (Defaults to no limit).
org.restlet.engine.log.AccessLogFileHandler.limit=10000000

# Specifies how many output files to cycle through (defaults to 1).
org.restlet.engine.log.AccessLogFileHandler.count=100

# Specifies a pattern for generating the output file name. (Defaults to "%h/java%u.log").
# A pattern consists of a string that includes the following special components that will be replaced at runtime:
#    "/" the local pathname separator
#    "%t" the system temporary directory
#    "%h" the value of the "user.home" system property
#    "%g" the generation number to distinguish rotated logs
#    "%u" a unique number to resolve conflicts
#    "%%" translates to a single percent sign "%" .pattern=/home/prod/data/log/WebComponent-www-%u-%g.log

# Specifies whether the FileHandler should append onto any existing files (defaults to false).
# org.restlet.util.AccessLogFileHandler.append=
{{< /highlight >}}

This is similar to the previous section, but specific to our
AccessLogFileHandler log handler. This let's us use a specific log
formatter called AccessLogFormatter, also provided by the Engine.

# Bridges to alternative logging mechanisms

Some users that prefer to use Log4J or LogBack instead of JULI,
especially because they have more features and seem more flexible.
Sometimes, Restlet applications are not isolated and have to integrate
with existing logging strategies.

In these cases, we we propose two options.

## SLF4J bridge from JULI

This bridge is [provided by the SLF4J
project](http://www.slf4j.org/legacy.html).
Once it is installed, you will just need to add these lines of code:

{{< highlight java "style=emacs" >}}import org.slf4j.bridge.SLF4JBridgeHandler;
SLF4JBridgeHandler.install();
{{< /highlight >}}

Then, you can drop the JAR from SLF4J corresponding to the target
logging mechanism. For details, you can check [this
page](http://www.slf4j.org/manual.html#binding).
This is an excellent solution, especially if you are using Restlet
extensions that rely on their own logging system, such as Jetty using
Apache Commons Logging. In those case, you can use the bridge from
Commons Logging to SLF4J and keep all log consistent.

In addition, if you want to disable the usual console outputs, you could
add those lines:

{{< highlight java "style=emacs" >}}java.util.logging.Logger rootLogger = LogManager.getLogMan​ager().getLogger(​"");
Handler[] handlers = rootLogger.getHandlers();
rootLogger.removeHan​dler(handlers[0]);
SLF4JBridgeHandler.install();
{{< /highlight >}}

## Restlet LoggerFacade for SLF4J

The previous method works, but has some performance penalties due to the
systematic creation of JULI LogRecord instances. In order to workaround
such issues, Restlet 2.0 has added a LogFacade class which is in charge
of providing JULI Loggers to the Restlet Engine. The default class fully
relies on JULI, but it is possible to replace it by a subclass by
setting a system property.

A special subclass for SLF4J is even provided in the
"org.restlet.ext.slf4j" extension. In order to install it, you need to
add this system property

{{< highlight java "style=emacs" >}}org.restlet.engine.loggerFacadeClass=org.restlet.ext.slf4j.Slf4jLoggerFacade
{{< /highlight >}}

You can set this property on the command line with the "-D" prefix, or
programmatically with the System\#setProperty() method.

# Additional resources

-   [Java Logging tutorial](http://tutorials.jenkov.com/java-logging/index.html)
-   [Java Logging API - Tutorial](http://www.vogella.com/tutorials/Logging/article.html)

