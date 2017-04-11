
# Kodex
Kodex walks a directory of markdown files, parses them as front-matter, and generates a simple API for accessing those files.

The main focus is to provide sorting and filtering methods for (but not limited to) blog posts. The service can be used in any number of ways. Wrap a RESTful API around it, or utilize it during static generation (plays nicely with [Nuxt.js](https://nuxtjs.org)).

Features:
- Recursively walks through a given directory
- Parses all markdown (.md) files with front-matter
- Generates a service for acquiring data from the collection

Planned:
- Pluggable support for other markup languages
- Custom attributes
- Sorting and filtering by custom attributes

---

## File Format

`./posts/hello-world.md`:
```
---
title: Hello, world!
date: 4/20/2017
tags: [javascript, kodex.js]
---

This is an example markdown.
```

Currently, the `date` attribute is the only required front-matter attribute. `title` and `tags` are optional attributes.

---

## Usage
```
let Kodex = require('kodex')
let postKodex = new Kodex(path.join(__dirname, 'posts'))

var helloWorldEntry = postKodex.get('hello-world')
```

---

## Docs

### `.get(filename)`

> Gets an entry by filename
>
> **Returns:** Object

### `.search(term)`

> Searches for files where filename contains term
>
> **Returns:** Array

### `.recent(count)`

> Gets n most recent entries (sorted by date descending)
>
> **Returns:** Array

### `.allTags()`

> Scrapes all tags from files
>
> **Returns:** Array

### `.findWithTag(tagName)`

> Gets all files that have the specified tag
>
> **Returns:** Array

---

Caveats:
- Directory cannot contain extensionless files (matches folders based on lack of period, confuses for folder)
