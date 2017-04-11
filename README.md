# Kodex.js
Kodex.js walks a directory of markdown files, parses them as front-matter, and generates a simple API for accessing those files.

The main focus is to provide sorting and filtering methods for (but not limited to) blog posts. The service can be used in any number of ways. Wrap a RESTful API around it, or utilize it during static generation (plays nicely with [Nuxt.js](https://nuxtjs.org)).

Features:
- Recursively walks through a given directory
- Parses all markdown (.md) files with front-matter
- Generates a service for acquiring data from the collection

Planned:
- Pluggable parsers
- Custom attributes

---

## Usage
```
let Kodex = require('kodex')
let postKodex = new Kodex(path.join(__dirname, 'posts'))

postKodex.get('filename')
```

---

## Docs

### `.get(filename)`

Gets an entry by filename
| PARAMETER | TYPE | DESCRIPTION |
| --- | --- | --- |
| filename | `string` | Exact filename of desired file (minus the extension) |
**Returns:** Array

### `.search(term)`

Searches for an entry
| PARAMETER | TYPE | DESCRIPTION |
| --- | --- | --- |
| term | `string` | Term to be matched against filenames |
**Returns:** Array

### `.recent(count)`

Gets n most recent posts (sorted by date descending)
| PARAMETER | TYPE | DESCRIPTION |
| --- | --- | --- |
| count | `number` | Number of recent entries to return |
**Returns:** Array

### `.allTags()`

Scrapes all tags from files

**Returns:** Array

### `.findWithTag(tagName)`

Gets all files that have the specified tag

**Returns:** Array

---

Caveats:
- Directory cannot contain extensionless files (matches folders based on lack of period, confuses for folder)
