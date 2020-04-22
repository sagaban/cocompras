const { red } = require('colors');
const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, colorize, timestamp, label, printf } = format;
const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: red('FeathersJS') }), timestamp()),
  transports: [
    new transports.Console({
      format: combine(colorize(), myFormat),
      level: 'silly'
    })
    // new winston.transports.File({ filename: 'logfile.log' })
  ]
});

module.exports = logger;
