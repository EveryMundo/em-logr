'use strict';

const
  BUNY = process.env.EM_LOGR_BUNYAN_DEFAULT_NAME || process.env.EM_LOGR_DEFAULT_NAME || 'BUNY',
  PINO = process.env.EM_LOGR_PINOJS_DEFAULT_NAME || process.env.EM_LOGR_DEFAULT_NAME || 'PINO';

function overrideBunyanChildMethod(bunyan) {
  bunyan.prototype.child = function (options, simple) {
    var name;
    if (options && options.name) {
      name = options.name;delete options.name;
    }

    const child = new (this.constructor)(this, options || {}, simple);

    if (name) child.fields.name = name;

    return child;
  };

  bunyan.__childMethodReplaced = true;
}

function getBunyan(_options = {}) {
  const bunyan = require('bunyan');
  if (!bunyan.__childMethodReplaced) overrideBunyanChildMethod(bunyan);

  const options = Object.assign({
    name: BUNY,
    level,
    serializers: {
      req: bunyan.stdSerializers.req,
      res: bunyan.stdSerializers.res
    },
    src: ( ['debug','trace'].indexOf(level) !== -1 ),
  }, _options);

  const logr = bunyan.createLogger(options);

  return Object.defineProperty(logr, 'name', {
    get( ){ return this.fields.name; },
    set(_){ return this.fields.name = _; }
  });
}

function getPino(options = {}) {
  const pino = require('pino')(Object.assign({name: PINO, level}, options));

  pino.fields = {pino};
  Object.defineProperty(pino.fields, 'name', {
    get( ){ return this.pino.name; },
    set(_){ return this.pino.name = _; }
  });

  return pino;
}

const level  = !process.env.LOG_LEVEL ? 'debug' :
  (process.env.LOG_LEVEL === 'test' ? 'fatal' : process.env.LOG_LEVEL);

const create = (options={}, _level) => {
  const logr = ['debug', 'trace'].includes(_level || level) ? getBunyan(options) : getPino(options);
  logr.create = create;
  return logr;
};

// const logr = ['debug', 'trace'].includes(level) ? getBunyan(level) : getPino(level);
const logr = create();

logr.raw = (_) => process.stdout.write(_ + '\n');

module.exports = logr;
