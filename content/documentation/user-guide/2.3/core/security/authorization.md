---
title: Authorization
weight: 3
---
# Introduction

Authorization should happen after authentication to define what an
authenticated user is effectively authorized to do in your application.
We identified four approaches to authorization in a Restlet application.
When we mentionned LDAP as a permission store, it could be replaced by a
static file or by any sort of database.

You can find the sources of the code shown [here](https://download.restlet.talend.com/technical-resources/restlet-framework/archives/examples/authorization/{{% param version %}}/sources.zip).

# Coarse-grained authorization

You configure some Authorizer instances (or subclasses like
RoleAuthorizer, MethodAuthorizer, etc.) and attach them at key points in
the call routing graph (before a Router, for a single route, etc.).

This works nicely if you can assign roles to your authenticated users
and if your authorization rules don't vary too much between resources.
Otherwise, you might end-up with an Authorizer instance in front of each
resource class...

Here is a simple example, you will get a String response containing the
resource's name when accessing resources with authorized profile and
a "403 Forbidden" error otherwise.

This code is self-sufficient so you just need to copy-paste it in a
MyApiWithRoleAuthorization class, create the resources as shown below
and run it. Don't forget to add the JSE edition org.restlet.jar
([download here](/documentation/user-guide/2.3/introduction/setup/download/))
in your build path.

Main class for role authorization example:

{{< highlight java "style=emacs" >}}public class MyApiWithRoleAuthorization extends Application {

    //Define role names
    public static final String ROLE_USER = "user";
    public static final String ROLE_OWNER = "owner";

    @Override
    public Restlet createInboundRoot() {
        //Create the authenticator, the authorizer and the router that will be protected
        ChallengeAuthenticator authenticator = createAuthenticator();
        RoleAuthorizer authorizer = createRoleAuthorizer();
        Router router = createRouter();

    	Router baseRouter = new Router(getContext());

        //Protect the resource by enforcing authentication then authorization
        authorizer.setNext(Resource0.class);
        authenticator.setNext(baseRouter);

    	//Protect only the private resources with authorizer
    	//You could use several different authorizers to authorize different roles
    	baseRouter.attach("/resourceTypePrivate", authorizer);
    	baseRouter.attach("/resourceTypePublic", router);
        return authenticator;
    }

    private ChallengeAuthenticator createAuthenticator() {
        ChallengeAuthenticator guard = new ChallengeAuthenticator(
                getContext(), ChallengeScheme.HTTP_BASIC, "realm");

        //Create in-memory users with roles
        MemoryRealm realm = new MemoryRealm();
        User user = new User("user", "user");
        realm.getUsers().add(user);
        realm.map(user, Role.get(this, ROLE_USER));
        User owner = new User("owner", "owner");
        realm.getUsers().add(owner);
        realm.map(owner, Role.get(this, ROLE_OWNER));

        //Attach verifier to check authentication and enroler to determine roles
        guard.setVerifier(realm.getVerifier());
        guard.setEnroler(realm.getEnroler());
        return guard;
    }

    private RoleAuthorizer createRoleAuthorizer() {
    	//Authorize owners and forbid users on roleAuth's children
    	RoleAuthorizer roleAuth = new RoleAuthorizer();
    	roleAuth.getAuthorizedRoles().add(Role.get(this, ROLE_OWNER));
    	roleAuth.getForbiddenRoles().add(Role.get(this, ROLE_USER));
    	return roleAuth;
    }

    private Router createRouter() {
        //Attach Server Resources to given URL
        Router router = new Router(getContext());
        router.attach("/resource1/", Resource1.class);
        router.attach("/resource2/", Resource2.class);
        return router;
    }

    public static void main(String[] args) throws Exception {
        //Attach application to http://localhost:9000/v1
        Component c = new Component();
        c.getServers().add(Protocol.HTTP, 9000);
        c.getDefaultHost().attach("/v1", new MyApiWithRoleAuthorization());
        c.start();
    }
}
{{< /highlight >}}

Resources classes, call them Resource1, Resource2 etc... and copy-paste
their content from here:

{{< highlight java "style=emacs" >}}public class Resource0 extends ServerResource{

    @Get
	public String represent() throws Exception {
		return this.getClass().getSimpleName() + " found !";
	}

	@Post
	public String add() {
		return this.getClass().getSimpleName() + " posted !";
	}

	@Put
	public String change() {
		return this.getClass().getSimpleName() + " changed !";
	}

	@Patch
	public String partiallyChange() {
		return this.getClass().getSimpleName() + " partially changed !";
	}

	@Delete
	public String destroy() {
		return this.getClass().getSimpleName() + " deleted!";
	}
}
{{< /highlight >}}

Main class for method authorization example, use the last class and replace
its createInboundRoot and createRoleAuthorizer with the methods below:

{{< highlight java "style=emacs" >}}@Override
public Restlet createInboundRoot() {
    //ChallengeAuthenticator
    ChallengeAuthenticator ca = createAuthenticator();
    ca.setOptional(true);

    //MethodAuthorizer
    MethodAuthorizer ma = createMethodAuthorizer();
    ca.setNext(ma);

    //Router
    ma.setNext(createRouter());
    return ca;
}

private MethodAuthorizer createMethodAuthorizer() {
    //Authorize GET for anonymous users and GET, POST, PUT, DELETE for
    //authenticated users
	MethodAuthorizer methodAuth = new MethodAuthorizer();
	methodAuth.getAnonymousMethods().add(Method.GET);
	methodAuth.getAuthenticatedMethods().add(Method.GET);
	methodAuth.getAuthenticatedMethods().add(Method.POST);
	methodAuth.getAuthenticatedMethods().add(Method.PUT);
	methodAuth.getAuthenticatedMethods().add(Method.DELETE);
	return methodAuth;
}
{{< /highlight >}}

# Fine-grained authorization

If your authorization rules tend to be very specific to each resource
class, or more complexly specific to resource instances, then it is
better to handle them at the resource level manually. As an help, you
can leverage the ServerResource\#isInRole() method.

Create a simple server as below:

{{< highlight java "style=emacs" >}}public class ApiWithFineGrainedAuthorization extends Application {

    @Override
	public org.restlet.Restlet createInboundRoot() {
		Router root = new Router(getContext());
		root.attach("/resource1", ResourceFineGrained.class);
		return root;
	}

	public static void main(String[] args) throws Exception {
		//Attach application to http://localhost:9000/v1
        Component c = new Component();
        c.getServers().add(Protocol.HTTP, 9000);
        c.getDefaultHost().attach("/v1", new MyApiWithMethodAuthorization());
        c.start();
	}
}
{{< /highlight >}}

With a resource like this:

{{< highlight java "style=emacs" >}}public class ResourceFineGrained extends ServerResource {

    @Get
    public String represent() throws ResourceException {
		if (!getRequest().getProtocol().equals(Protocol.HTTPS)) {
			throw new ResourceException(new Status(426, "Upgrade required", "You should switch to HTTPS", ""));
		}
        return this.getClass().getSimpleName() + " found !";
	}

	@Post
	public String postMe() {
		if (!isInRole(MyApiWithRoleAuthorization.ROLE_OWNER)) {
			throw new ResourceException(Status.CLIENT_ERROR_FORBIDDEN);
		}
		return this.getClass().getSimpleName() + " posted !";
	}

	@Patch
	public String patchMe() {
		if (!getClientInfo().isAuthenticated()) {
			throw new ResourceException(Status.CLIENT_ERROR_METHOD_NOT_ALLOWED);
		}
		return this.getClass().getSimpleName() + " patched !";
	}
}
{{< /highlight >}}

For a call to [http://localhost:9000/v1/resourceTypePublic/resource1/](http://localhost:9000/v1/resourceTypePublic/resource1/)
you will need to use the owner profile to use POST and just authenticate to use PATCH.
You will need to use an
[HTTPS endpoint](/documentation/user-guide/{{% param version %}}/core/security/https)
to GET this resource.

# Middle-grained authorization

The idea would be to define several URI subspaces in your overall
application URI space. Each subspace would have a unique name, like a
role name. Then in LDAP you could assign permissions to roles for each
subspace, not duplicating URI information in LDAP.

Then, in your Restlet application, you could have a SubspaceAuthorizer
class that would retrieve the rules from LDAP based on a given subspace
name. An instance of SubspaceAuthorizer for each identified subspace
should be created and attached to the proper place in the routing graph.

Therefore you wouldn't need to duplicate URI matching code or have to
maintain URI templates in several places.
