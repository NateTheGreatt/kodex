const R = require('ramda')
const walk = require('walk-r')
const frontMatter = require('front-matter')
const fs = require('fs')
const path = require('path')

function Kodex(dir, options) {

  let readFile = filePath => {return {name: path.parse(filePath).name, contents: fs.readFileSync(filePath, {encoding: 'utf8'})}}
  let readFiles = R.map(readFile)

  let transcribe = R.map(file => {
    var fm = frontMatter(file.contents)
    return {
      attributes: fm.attributes,
      body: fm.body,
      name: file.name
    }
  })

  let fileNames = walk(dir)
  let transcriptions = R.pipe(readFiles, transcribe)(fileNames)

  // constants
  const defaultRecentCount = 5
  const tagsPath = ['attributes','tags']
  const datePath = ['attributes','date']

  // attribute partials
  let getAttribute = attribute => R.path(['attributes', attribute])

  // tag partials
  let rejectUndefinedTags = R.reject(R.pathEq(tagsPath, undefined))
  let containsTag = tagName => R.pipe(R.path(tagsPath), R.contains(tagName))
  let filterByTag = tagName => R.filter(containsTag(tagName))
  let mapTags = R.map(R.path(tagsPath))

  // date partials
  let parsedDate = R.pipe(R.path(datePath), d => new Date(d))
  let sortByDate = R.sortBy(parsedDate)
  let sortByDateDesc = R.pipe(sortByDate, R.reverse)

  // general partials
  let findEntryByName = name => R.find(R.propEq('name', name))
  let nameContains = term => R.pipe(R.prop('name'), R.contains(term))
  let searchEntryByName = term => R.filter(nameContains(term))

  // api
  return {

    get: name => findEntryByName(name)(transcriptions),

    search: term => searchEntryByName(term)(transcriptions),

    recent: (count) => R.pipe(
      sortByDateDesc,
      R.take(count || defaultRecentCount)
    )(transcriptions),

    allTags: () => R.pipe(
      mapTags,
      R.flatten,
      R.reject(R.isNil),
      R.uniq
    )(transcriptions),

    findWithTag: tagName => R.pipe(
      rejectUndefinedTags,
      filterByTag(tagName),
      sortByDateDesc
    )(transcriptions)

  }
}

module.exports = Kodex
