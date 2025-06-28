---
title: SIP
longTitle: SIP extension
---
# Introduction

This extension provides support for the Session Initiation Protocol,
largely used for voice over IP (VoIP). It ships both client and server
SIP connectors over TCP, reusing the 90% of the logic used by the new
NIO/HTTP internal connector, providing excellent scalability and
performance.

# Features

-   SIP transport over TCP
-   All SIP headers, including "Via", map to a Java API
-   All base SIP methods supported
-   Extension INFO, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH and REFER
    methods supported
-   OPTIONS method supported : useful for integration purposes as most
    gateways require it for redundancy

# Mapping SIP headers

The [complete list of SIP headers](http://www.iana.org/assignments/sip-parameters)
is available at the IANA site.

SIP header | Restlet property name | Restlet property class | Description
---------- | --------------------- | ---------------------- | -----------
Accept | request.clientInfo.acceptedMediaTypes | org.restlet.data.Preference\<MediaType\> | Identical to HTTP with the exception that if no header field is present, the server should assume a default value of "application/sdp".
Accept-Encoding | request.clientInfo. | acceptedEncodings | Identical to HTTP.
Accept-Language | request.clientInfo. | acceptedLanguages | Identical to HTTP.
Alert-Info | message.alertInfo | org.restlet.ext.sip.data.Address | Specifies an alternative ring tone to the UAS or alternative ringback tone to the UAC.
Allow | response.allowedMethods |  | Identical to HTTP.
Allow-Events | message.allowedEventTypes | org.restlet.ext.sip.data.EventType | Includes a list of tokens which indicates the event packages supported. [See RFC 3265](http://tools.ietf.org/html/rfc3265#section-3.3.7).
Authentication-Info | response.authenticationInfo | | Identical to HTTP.
Authorization | request.challengeResponse |  | Identical to HTTP.
Call-ID | message.callId | String | Uniquely identifies a particular invitation or all registrations of a particular client.
Call-Info | message. | calleeInfo or callerInfo | List of org.restlet.ext.sip.data.Address | Provides additional information about the caller or callee.
Contact | message. | contact | org.restlet.ext.sip.data.ContactInfo | Provides a URI and additional parameters whose meaning depends on the type of request or response it is in.
Content-Disposition | entity.disposition |  | Similar to HTTP with no disposition types defined.
Content-Encoding | entity.encodings |  | Identical to HTTP.
Content-Language | entity.languages |  | Identical to HTTP.
Content-Length | entity.size |  | Identical to HTTP.
Content-Type | entity.mediaType and entity.characterSet |  | Identical to HTTP.
CSeq | message.callSequence | org.restlet.ext.sip.data.CallSequence | Serves to order transactions within a dialog, to provide a means to uniquely identify transactions, and to differentiate between new requests and request retransmissions.
Date | message.date |  | Similar to HTTP with restriction on the date format supported.
Error-Info | response.errorInfo | org.restlet.ext.sip.data.Address | Provides a pointer to additional information about the error status response.
Event | message.event | org.restlet.ext.sip.data.Event | Describes an event notification. [See RFC 3265](http://tools.ietf.org/html/rfc3265#section-3.1).
Expires | entity.expirationDate |  | Similar to HTTP but with SIP specificities.
From | request.clientInfo.from | org.restlet.ext.sip.data.Address | Similar to HTTP but with a more specific format.
In-Reply-To | request.inReplyTo | List\<org.restlet.ext.sip.data.CallId\> | Enumerates the Call-IDs that this call references or returns.
Max-Forwards | [Support for proxies planned for later](http://restlet.tigris.org/issues/show_bug.cgi?id=207) |  | Identical to HTTP.
Min-Expires | response.minExpires |  | Conveys the minimum refresh interval supported for soft-state element managed by that server.
MIME-Version | message.mimeVersion | Indicates what version of the MIME protocol was used to construct the message.
Organization | message.organization |  | Conveys the name of the organization to which the SIP element issuing the request or response belongs.
Priority | request.priority | org.restlet.ext.sip.data.Priority | Indicates the urgency of the request as perceived by the client.
Proxy-Authenticate | response.proxyChallengeRequests |  | Identical to HTTP.
Proxy-Authorization | request.proxyChallengeResponse |  | Identical to HTTP.
Proxy-Require | message.proxyRequire | List\<org.restlet.ext.sip.data.OptionTag\> | Used to indicate proxy-sensitive features that must be supported by the proxy.
RAck | ? |  | Supports reliability of provisional responses. Mentionned in [RFC 3262](http://tools.ietf.org/html/rfc3262#section-7.2).
Record-Route | message.recordedRoutes | List\<org.restlet.ext.sip.data.Address\> | Inserted by proxies in a request to force future requests in the dialog to be routed through the proxy.
Refer-To | request.refertTo | org.restlet.ext.sip.data.Address | Provides a URL to reference. See [RFC 3515](http://tools.ietf.org/html/rfc3515#section-2.1).
Reply-To | message.replyTo | org.restlet.ext.sip.data.Address | Contains a logical return URI that may be different from the From header field. 
Require | request.requires | List\<org.restlet.ext.sip.data.OptionTag\> | Used by UACs to tell UASs about options that the UAC expects the UAS to support in order to process the request.
Retry-After | response.sipRetryAfter | List\<org.restlet.ext.sip.data.Availability\> | Identical to HTTP.
Route | request.routes | List\<org.restlet.ext.sip.data.Address\> | Used to force routing for a request through the listed set of proxies.
Rseq | response | Transmit provisional responses reliably. Mentionned in [RFC 3262](http://tools.ietf.org/html/rfc3262#section-7.1)
Server | response.serverInfo.agent |  | Identical to HTTP.
SIP-ETag | response.sipTag | org.restlet.data.Tag | [See RFC 3903](http://tools.ietf.org/html/rfc3903#section-11.3.1)
SIP-If-Match | request.conditions.sipIfMatch | org.restlet.data.Tag | [See RFC 3903](http://tools.ietf.org/html/rfc3903#section-11.3.2)
Subject | request.subject |  | Provides a summary or indicates the nature of the call, allowing call filtering without having to parse the session description.
Subscription-State | request.subscriptionState | org.restlet.ext.sip.data.SubscriptionState | Provides the state of a subscription. [See RFC 3265](http://tools.ietf.org/html/rfc3265#section-3.2.4).
Supported | message.supported | List\<org.restlet.ext.sip.data.OptionTag\> | Enumerates all the extensions supported by the UAC or UAS.
Timestamp | message.timestamp |  | Describes when the UAC sent the request to the UAS.
To | message.to | org.restlet.ext.sip.data.Address | Specifies the logical recipient of the request.
Unsupported | message.unsupported | List\<org.restlet.ext.sip.data.OptionTag\> | Lists the features not supported by the UAS.
User-Agent | request.clientInfo.agent |  | Identical to HTTP.
Via | message.recipientsInfo |  | Identical to HTTP.
Warning | message.warnings |  | Identical to HTTP.
WWW-Authenticate | response.challengeRequests |  | Identical to HTTP.
