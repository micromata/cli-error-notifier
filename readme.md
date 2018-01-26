# cli-error-notifier [![Build Status](https://travis-ci.org/micromata/cli-error-notifier.svg?branch=master)](https://travis-ci.org/micromata/cli-error-notifier) [![codecov](https://codecov.io/gh/micromata/cli-error-notifier/badge.svg?branch=master)](https://codecov.io/gh/micromata/cli-error-notifier?branch=master)

> Send native notification if CLI apps fail


## Install

```
$ npm install cli-error-notifier
```


## Usage

```js
const cliErrorNotifier = require('cli-error-notifier');

cliErrorNotifier('unicorns');
//=> 'unicorns & rainbows'
```


## API

### cliErrorNotifier(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global cli-error-notifier
```

```
$ cli-error-notifier --help

  Usage
    cli-error-notifier [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ cli-error-notifier
    unicorns & rainbows
    $ cli-error-notifier ponies
    ponies & rainbows
```


## License

MIT © [Michael Kühnel](https://micromata.de)
