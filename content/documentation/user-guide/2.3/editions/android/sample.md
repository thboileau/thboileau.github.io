---
title: Sample
longTitle: Sample application
weight: 2
---
# Introduction

This sample application aims at illustrating the port of the Restlet API
on the Google Android platform.

# Architecture

The developed application uses the software architecture illustrated
below. On the upper left side, you have an enhanced Android contacts
application that can recognize the friends of your contacts. For this,
you need to enter the URI of the FOAF profile of your contacts in the
"Note" field. In the future, a specific "FOAF" field will be added and
this URI could also be guessed or provided via alternative means.

This FOAF URI entered can be either local (our case for testing reasons
and to illustrate server-side Restlet support) or remote to use your
mobile Web access if available. When run, the enhanced contacts
applications lists the current contacts registered in the address book.
For those who provide a FOAF URI, a click on their entry in the list
invokes the FOAF service illustrated below. This service is built on top
of Restlet and its recently added [RDF
extension](../../extensions/rdf).
It retrieves the FOAF representation, parses it and displays the friends
of your contact in the GUI. The user can then add some of those friends
as new local contacts.

For testing purpose, we run a local HTTP server with Restlet that can
server FOAF profiles (in the RDF/N-Triples media type) at those URIs:

-   http://localhost/users/1
-   http://localhost/users/2

# Screenshots

List of currently registered contacts in the Android's address book

List of friends of the selected contact

A new contact has been added

# Implementation

## "FOAF" Service

### Declaration of the service (AndroidManifest.xml):

{{< highlight xml "style=emacs" >}}<service android:name=".service.ContactService" android:exported="true" android:enabled="true">
    <intent-filter>
        <action android:name="org.restlet.example.android.service.IContactService" />
    </intent-filter>
</service>
{{< /highlight >}}

### Declaration of the IPC (inter process communication) interface (org/restlet/example/android/service/IContactService.aidl)

{{< highlight java "style=emacs" >}}package org.restlet.example.android.service;

    interface IContactService {
        List<FoafContact> getFriends(String foafUri);
}
{{< /highlight >}}

### Implementation of the FoafContact class

This class, referenced in the IPC interface description file, must
implement the Parcelable java interface.

{{< highlight java "style=emacs" >}}public class FoafContact implements Parcelable {
    /**
     * Used to de-serialize a stream into a FoafContact.
     */
    public static final Parcelable.Creator<FoafContact> CREATOR = new Parcelable.Creator<FoafContact>() {
        public FoafContact createFromParcel(Parcel in) {
            return new FoafContact(in);
        }

        public FoafContact[] newArray(int size) {
            return new FoafContact[size];
        }
    };

    /** First name of the contact. */
    private String firstName;

    /** FOAF URI of the contact. */
    private String foafUri;

    /** Image representation of the contact. */
    private String image;

    /** Last name of the user. */
    private String lastName;

    /** Phone number of the user. */
    private String phone;

    public FoafContact() {
        super();
    }

    private FoafContact(Parcel in) {
        super();
        firstName = in.readString();
        lastName = in.readString();
        phone = in.readString();
    }

    public int describeContents() {
        return 0;
    }

    [ getters/setters ]
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(firstName);
        dest.writeString(lastName);
        dest.writeString(phone);
    }
}
{{< /highlight >}}

### Implementation of the service (org.restlet.example.android.ContactService)

Basically, the service consists in getting the FOAF profile according to
its URI, then parsing this RDF document (in this case, it is generated
in N-Triples format), and retrieving the list of friends declared in
this FOAF profile.

{{< highlight java "style=emacs" >}}ClientResource foafProfile = new ClientResource(foafUri);
Representation rep = foafProfile.get();
if (foafProfile.getStatus().isSuccess()) {
    FoafRepresentation foafRep = new FoafRepresentation(rep);
    return foafRep.getFriends();
}
{{< /highlight >}}

## Contact activity

This activity is in charge to display the list of friends of a contact
(assuming it has a correct foaf URI, in the "Note" field of the address
book). It calls the "FOAF" service.

### Declaration of the activity (AndroidManifest.xml)

{{< highlight xml "style=emacs" >}}<activity android:name=".ContactActivity" android:label="@string/contact">
    <intent-filter>
    <category android:name="android.intent.category.DEFAULT" />
    <action android:name="org.restlet.android.example.CONTACT_DETAIL" />
    </intent-filter>
</activity>
{{< /highlight >}}

### Declaration of its layout (res/layout/contact.xml)

{{< highlight xml "style=emacs" >}}<?xml version="1.0" encoding="UTF-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="fill_parent"
        android:layout_height="fill_parent">
    <ListView android:id="@android:id/list" android:layout_width="fill_parent"
        android:layout_height="fill_parent" android:layout_weight="1"
            android:drawSelectorOnTop="false" style="@style/contacts_list" />
    <TextView android:id="@+id/empty" android:layout_width="fill_parent"
            android:layout_height="fill_parent" style="@style/empty" android:text="" />
    <ImageView android:id="@+id/imagefoaf" android:src="@drawable/restletandroid"
        android:layout_width="fill_parent" android:layout_height="wrap_content"
            android:adjustViewBounds="true" />
</LinearLayout>
{{< /highlight >}}

### Implementation (org.restlet.example.android.ContactActivity)

Connection to the remote service. Refreshes the list of friends of the
current contact.

{{< highlight java "style=emacs" >}}private ServiceConnection connection = new ServiceConnection() {
    public void onServiceConnected(ComponentName name, IBinder service) {
        contactService = IContactService.Stub.asInterface(service);
        // Once connected, then update the interface
        loadFriends();
            }
    public void onServiceDisconnected(ComponentName name) {
        contactService = null;
    }
};
{{< /highlight >}}

Load the list of friends of the current contact, from its foaf profile.
It simply calls the contactService method "getFriends(String)".

{{< highlight java "style=emacs" >}}private void loadFriends() {
    if (contactService != null) {
        try {
            List<FoafContact> list = contactService.getFriends(this.contact.getFoafUri());
            this.friends = new ArrayList<Contact>();
            for (int i = 0; i < list.size(); i++) {
                Contact contact = new Contact();
                contact.setFirstName(list.get(i).getFirstName());
                contact.setLastName(list.get(i).getLastName());
                        contact.setPhone(list.get(i).getPhone());
                friends.add(contact);
            }
        } catch (RemoteException e) {
            Log.e("contactFoaf", "error", e);
        }
    }
    handler.sendEmptyMessage(0);
}
{{< /highlight >}}

Used to unbind the service.

{{< highlight java "style=emacs" >}}@Override
protected void onPause() {
    super.onPause();
    if (contactService != null) {
        this.unbindService(connection);
    }
}
{{< /highlight >}}

Used to bind the service, when the activity starts.

{{< highlight java "style=emacs" >}}@Override
protected void onStart() {
    super.onStart();
    if (contactService == null) {
        bindService(new Intent(
                "org.restlet.example.android.service.IContactService"),
                connection, Context.BIND_AUTO_CREATE);
    }
}
{{< /highlight >}}
