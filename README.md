# logr
Bunyan / Pino Logger instance ready to use

Bunyan is really great for debugging purposes but Pino is crazily fast.

Thinking about that this package was created to use Bunyan whenever the
LOG_LEVEL environmental variable is set to ```debug``` or ```trace```;

## INSTALL

    npm install em-loger --save

## Config

Logr will use [bunyan][1] if the **LOG_LEVEL** environmental variable has the values *trace* or *debug*
and it will also enable the **src** option of bunyan automatically, which displays the filename along
side with the line number on each log message.

Using **LOG_LEVEL** environmental variable with the values *info*, *warn* or *trace* will load
[pinojs][2] which is faster and has a very similar api.

## USAGE
```javascript
    const logr = require('em-logr');
    
    logr.trace('My trace message');
    logr.debug('My debug message');
    logr.info('My info message');
    logr.warn('My warn message')
    logr.error('My error message');
```
Child loggers
```javascript
    const
      _1stChildLogr = require('em-logr').child({name:'1stChild'}),
      _2ndChildLogr = require('em-logr').child({name:'2ndChild'});

    _1stChildLogr.info("The remote is mine, I am the first born child");
    _2ndChildLogr.info("The remote is mine, Mom likes me better");
    _1stChildLogr.warn("Get out of here or I'll hit you in the face!");
    _2ndChildLogr.info("Do not touch me or I'll tell mom to know about  secret.");
    _1stChildLogr.error("I did' see that coming!");
```

[1]: https://github.com/trentm/node-bunyan
[2]: https://github.com/pinojs/pino
