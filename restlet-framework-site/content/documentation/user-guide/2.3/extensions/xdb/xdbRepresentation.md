---
title: XdbRepresentation
longTitle: Oracle XDB Restlet Adapter - XdbRepresentation
weight: 7
---
** An Optimized XdbRepresentation class for Oracle XMLDB


Until Oracle allow us to use OTN Developer license for including ojdbc5.jar, xdb.jar and xmlparserv2.jar we can not put the above code under SVN. This is due it will not compile caused by missing dependencies.
Here the step by step instruction to compile the code: create a directory under Restlet SVN latest checkout:


{{< highlight bash "style=emacs" >}}# cd restlet/
# mkdir libraries/oracle.xdb_11.1/
# cp $ORACLE_HOME/rdbms/jlib/xdb.jar libraries/oracle.xdb_11.1/
# cp $ORACLE_HOME/jdbc/lib/ojdbc5.jar libraries/oracle.xdb_11.1/
# cp $ORACLE_HOME/lib/xmlparserv2.jar libraries/oracle.xdb_11.1/
# mkdir modules/org.restlet.ext.xdb/src/org/restlet/representation/
# vi
modules/org.restlet.ext.xdb/src/org/restlet/representation/XdbRepresentation.java

--- Edit here the content of the class below -----

{{</ highlight >}}


XdbRepresentation.java class


{{< highlight java "style=emacs" >}}/**
 * Copyright 2005-2014 Restlet
 *
 * The contents of this file are subject to the terms of one of the following
 * open source licenses: Apache 2.0 or or EPL 1.0 (the "Licenses"). You can
 * select the license that you prefer but you may not use this file except in
 * compliance with one of these Licenses.
 *
 * You can obtain a copy of the Apache 2.0 license at
 * http://www.opensource.org/licenses/apache-2.0
 *
 * You can obtain a copy of the EPL 1.0 license at
 * http://www.opensource.org/licenses/eclipse-1.0
 *
 * See the Licenses for the specific language governing permissions and
 * limitations under the Licenses.
 *
 * Alternatively, you can obtain a royalty free commercial license with less
 * limitations, transferable or non-transferable, directly at
 * http://restlet.com/products/restlet-framework
 *
 * Restlet is a registered trademark of Restlet S.A.S.
 */
package org.restlet.representation;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.xml.namespace.QName;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

import oracle.xdb.XMLType;

import org.restlet.data.MediaType;
import org.restlet.ext.xml.XmlRepresentation;
import org.restlet.representation.Representation;
import org.w3c.dom.Document;

public class XdbRepresentation extends XmlRepresentation {

    /** The wrapped DOM document. */
    private volatile XMLType dom;

    /** The source XML representation. */
    private volatile Representation xmlRepresentation;

    /**
     * import oracle.xdb.XMLType; Constructor for an empty document.
     *
     * @param mediaType
     *            The representation's media type.
     */
    public XdbRepresentation(MediaType mediaType) throws IOException {
        super(mediaType);
        this.dom = null;
    }

    /**
     * Constructor from an existing Oracle DOM document.
     *
     * @param mediaType
     *            The representation's media type.
     * @param xmlDocument
     *            The source DOM document.
     */

    public XdbRepresentation(MediaType mediaType, Document xmlDocument)
            throws IOException {
        super(mediaType);
        try {
            this.dom = XMLType.createXML(XdbServerServlet.getConnection(),
                    xmlDocument);
        } catch (SQLException e) {
            throw new IOException("Can not create XMLType from Document"
                    + e.getMessage());
        } catch (ServletException e) {
            throw new IOException("Can not create XMLType from Document"
                    + e.getMessage());
        }
    }

    /**
     * Constructor from an existing Oracle DOM document.
     *
     * @param mediaType
     *            The representation's media type.
     * @param xmlDocument
     *            The source DOM document.
     */
    public XdbRepresentation(MediaType mediaType, XMLType xmlDocument) {
        super(mediaType);
        this.dom = xmlDocument;
    }

    /**
     * Constructor.
     *
     * @param xmlRepresentation
     *            A source XML representation to parse.
     */

    public XdbRepresentation(Representation xmlRepresentation) {
        super((xmlRepresentation == null) ? null : xmlRepresentation
                .getMediaType());
        this.xmlRepresentation = xmlRepresentation;
    }

    /**
     * Function to extract the given set of nodes from the XMLType. This set of
     * nodes is specified by the xpath expression.
     *
     * @param expression
     *            - the xpath expression which specifies the nodes to search
     *            for.
     * @param nsmap
     *            - the map of namespaces which resolves the prefixes in the
     *            xpath expression. format is "xmlns=a.com xmlns:b=b.com"
     * @return XMLType which contains the extracted nodes. null if no nodes
     *         match the specified expression.
     */
    public XMLType extract(String expression, String nsmap) throws Exception {
        return this.dom.extract(expression, nsmap);
    }

    /**
     * Function to transform the XMLType using the given XSL document. The new
     * (transformed) XML document is returned.
     *
     * @param xsldoc
     *            the XSL document to be applied to the XMLType
     * @param parammap
     *            the top level parameters to be passed to the XSL
     *            transformation. This should be of the format "a=b c=d e=f".
     *            This can be null.
     * @return the transformed XMLType.
     *
     * @throws java.sql.SQLException
     */

    public XMLType transform(XMLType xsldoc, String parammap)
            throws SQLException {
        return this.dom.transform(xsldoc, parammap);
    }

    /**
     * Function to check for the existence of the given set of nodes in the
     * XMLType. This set of nodes is specified by the xpath expression.
     *
     * @param expression
     *            the xpath expression which specifies the nodes to search for.
     * @param nsmap
     *            the map of namespaces which resolves the prefixes in the xpath
     *            expression. format is "xmlns=a.com xmlns:b=b.com"
     * @return TRUE if specified nodes exist in the XMLType else FALSE
     */

    public boolean existsNode(String expression, String nsmap) throws Exception {
        return this.dom.existsNode(expression, nsmap);
    }

    /**
     * Writes the representation to a byte stream. This method is ensured to
     * write the full content for each invocation unless it is a transient
     * representation, in which case an exception is thrown.
     *
     * @param outputStream
     *            The output stream.
     * @throws IOException
     */

    public void write(OutputStream outputStream) throws IOException {
        try {
            this.dom.writeToOutputStream(outputStream);

        } catch (SQLException e) {
            throw new IOException("Can not write to the output stream. "
                    + e.getMessage());
        }
    }

    /**
     * Evaluates an XPath expression and returns the result as in the given
     * return type.
     *
     * For faster response time, specially in relational schema mappings objects
     * use.
     *
     * @param returnType
     *            The qualified name of the return type.
     *
     * @return The evaluation result.
     * @see javax.xml.xpath.XPathException
     * @see javax.xml.xpath.XPathConstants
     * @see org.restlet.representation.XdbRepresentation#extract
     */

    @Override
    public Object evaluate(String expression, QName returnType)
            throws Exception {
        final XPath xpath = XPathFactory.newInstance().newXPath();
        xpath.setNamespaceContext(this);
        return xpath.evaluate(expression, getDocument().getDocument(),
                returnType);
    }

    /**
     * Returns the wrapped DOM document. If no document is defined yet, it
     * attempts to parse the XML representation eventually given at construction
     * time. Otherwise, it just creates a new document.
     *
     * @return The wrapped DOM document.
     */

    public XMLType getDocument() throws IOException {
        if (this.dom == null) {
            try {
                if (this.xmlRepresentation != null) {
                    this.dom = XMLType.createXML(
                            XdbServerServlet.getConnection(),
                            this.xmlRepresentation.getStream());
                } else {
                    this.dom = new XMLType(XdbServerServlet.getConnection(), "");
                }
            } catch (SQLException e) {
                throw new IOException(
                        "Can not create XMLType from representation"
                                + e.getMessage());
            } catch (ServletException e) {
                throw new IOException(
                        "Can not create XMLType from representation"
                                + e.getMessage());
            }
        }

        return this.dom;
    }
}

{{</ highlight >}}
