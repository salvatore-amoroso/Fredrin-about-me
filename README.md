# Fredrin-about-me

A static About Me page (`index.html`, `styles.css`, `assets/portrait.jpg`).

## Fredrin host

`fredrin-apps/about-me/` is a Fredrin process app that serves this page on the
local machine. It appears as the **About Me** tab in the project's top nav.
Fredrin starts it automatically when the project is opened in the desktop app;
to start it right away from a Fredrin terminal:

```sh
fredrin apps dev ./fredrin-apps/about-me   # prints the loopback port and tab path
fredrin apps ps                            # confirm it is running
fredrin apps stop about-me
```

The app imports the root page files directly, so edit `index.html`,
`styles.css` or `assets/` as usual — there is no copy to keep in sync.
`deno.json` enables Deno's raw imports, which is how the HTML, CSS and image
are loaded without granting the sandbox read access to the repository.
