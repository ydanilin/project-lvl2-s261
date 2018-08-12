# DIFFERENCE EVALUATOR
The second project in scope of "Backend JS Programmer (Node.js)" course on [Hexlet](https://en.hexlet.io/)

[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
[![Build Status](https://travis-ci.org/ydanilin/project-lvl2-s261.svg?branch=master)](https://travis-ci.org/ydanilin/project-lvl2-s261)

Command-line tool which compares two files and shows the difference.  
File formats can be:
* json
* yaml
* ini

The diffs can be shown as:
* git-style  
```diff
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}
```
* json
```json
[
  {
    "name": "host",
    "type": "unchanged",
    "newValue": "hexlet.io"
  },
  {
    "name": "timeout",
    "type": "updated",
    "oldValue": 50,
    "newValue": 20
  },
  {
    "name": "proxy",
    "type": "removed",
    "newValue": "123.234.53.22"
  },
  {
    "name": "verbose",
    "type": "added",
    "newValue": true
  }
]
```
* logfile record style
```diff
Property 'timeout' was updated. From 50 to 20
Property 'proxy' was removed
Property 'verbose' was added with value: true

```
## Prerequisites:
* Node.js
## Run (also possible without installation)
```sh
npx gendiff-dan-hexlet [options] <firstConfig> <secondConfig>
```
## Installation
```sh
npm i -D gendiff-dan-hexlet
```
## Usage:
```sh
gendiff [options] <firstConfig> <secondConfig>

  Options:

    -V, --version        output the version number
    -f, --format [type]  Output format, type:
                             git (default) - gitDiff style
                             log - messages like in logfiles
                             json - stringified json
    -h, --help           output usage information
```