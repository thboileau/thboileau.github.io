# Introduction

The Website of the Restlet Framework is developed with Hugo: https://gohugo.io/

That's a great rule to test any update locally, so install Hugo: https://gohugo.io/installation/
Then run `hugo server` and reach http://localhost:1313.

Hugo allows live updates, which is a very nice feature.
However, once you're done with your updates:

- stop the server
- drop these two directories: `./public` and `./resources`
- run again `hugo server`
  It's a great habit to check your updates.

# Directories

| Directory | Comment                                                                                               |
|-----------|-------------------------------------------------------------------------------------------------------|
| `assets`  | SASS files that are transpiled into CSS                                                               |
| `content` | pages of the Website: this is the main place for your updates                                         |
| `data`    | yaml files to be used in layout code (cf themes/restlet-framework/layouts/_shortcodes/downloads.html) |
| `static`  | CSS, JS files                                                                                         |
| `themes`  | the definition of the layout                                                                          |

# Layouts and partials

Pages are organized by their main directory:
 - the pages inside the root directory
 - the pages inside the `downloads` directory
 - the pages inside the `documentation` directory

They are handled by the `baseof.html` template of the exact same directory in the layouts `./themes/restlet-framework/layouts`. As you can notice, there is no `downloads` directory: the layout in the root directory applies.
Layout include what is called `partials` (located in `./themes/restlet-framework/partials`) this is where all the logic of html code generation resides.