'use strict';

function getBunyan(level) {
  const bunyan = require('bunyan');
  
  bunyan.prototype.child = function (options, simple) {
    var name;
    if (options && options.name) {
      name = options.name;delete options.name;
    }

    const child = new (this.constructor)(this, options || {}, simple);

    if (name) child.fields.name = name;

    return child;
  };

  const logr = bunyan.createLogger({
    name: 'BUNY',
    level,
    serializers: {
      req: bunyan.stdSerializers.req,
      res: bunyan.stdSerializers.res
    },
    src: ( ['debug','trace'].indexOf(level) !== -1 ),
  });

  return Object.defineProperty(logr, 'name', {
    get( ){ return this.fields.name; },
    set(_){ return this.fields.name = _; }
  });
}

function getPino(level) {
  const pino = require('pino')({name: 'PINO', level});

  pino.fields = {pino};
  Object.defineProperty(pino.fields, 'name', {
    get( ){ return this.pino.name; },
    set(_){ return this.pino.name = _; }
  });

  return pino;
}

const level  = !process.env.LOG_LEVEL ? 'debug' :
  (process.env.LOG_LEVEL === 'test' ? 'fatal' : process.env.LOG_LEVEL);

const logr = ['debug', 'trace'].includes(level) ? getBunyan(level) : getPino(level);

logr.raw = (_) => process.stdout.write(_ + '\n');

module.exports = logr;
