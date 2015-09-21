var fs = require('fs');
var convert = require('./convert.js');

var options = getOptions(
  {
    input: null,
    output: 'output',
    format: 'json'
  },
  process.argv
);

function getOptions(options, args) {
  args.slice(2).forEach(function (a) {
    var kv = a.split('=');
    var v = kv[1];
    v = v === 'true' ? true : (v === 'false' ? false : v);
    options[kv[0]] = v;

  });
  return options;
}

function logObject(obj) {
  for (var key in obj) {
    console.log(key + ': ' + obj[key]);
  }
}

console.log('\nOptions:');
logObject(options);

function processFile(err, data) {

  if (err) {
    console.log(err);
    process.exit(1);
  }

  var outputData;
  if (options.format === 'json') {
    outputData = convert.toJSON(data);
  } else if (options.format === 'yaml') {
    outputData = convert.toYAML(data);
  } else {
    console.log('Unknown format "' + options.format + '"');
    process.exit(1);
  }

  var outputPath = options.output + '.' + options.format;

  fs.writeFile(outputPath, outputData, function(err) {

    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log('Done');
    process.exit(0);
  });
}

fs.readFile(options.input, 'utf8', processFile);
