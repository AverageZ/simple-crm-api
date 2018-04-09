

## Included

+ [TypeScript][typescript] [2.8][typescript-28] to ES6 transpilation,
+ [TSLint][tslint] 5.x
+ [Jest][jest] unit testing and code coverage,
+ Type definitions for Node.js v8.x and Jest,
+ [NPM scripts for common operations](#available-scripts),
+ a simple example of TypeScript code and unit test,
+ .editorconfig for consistent file format.

## Quick start

This project is intended to be used with v8.9 (LTS Carbon) release of [Node.js][nodejs] or newer and [NPM][npm]. Make sure you have those installed. Then just type following commands:

```sh
git clone https://github.com/averagez/simple-crm-api
cd node-typescript-boilerplate
yarn
```

### Unit tests

This is **optional**, but if you want to learn how to write JavaScript tests for TypeScript modules, read the [corresponding wiki page][wiki-js-tests].

## Available scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `watch` - interactive watch mode to automatically transpile source files,
+ `start` - node start the built server
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests

## Docs
[Overview](docs/general.md)
