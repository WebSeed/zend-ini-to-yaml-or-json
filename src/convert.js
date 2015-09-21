var _ = require('lodash');
var properties = require('properties');
var YAML = require('yamljs');

var toObject = function(ini) {

  if (typeof ini !== 'string')
    throw 'Error: toObject() requires a string input';

  var data = properties.parse(
    ini,
    {
      comments: ';',
      namespaces: true,
      reviver: function(key, value, section) {

        if (typeof value === 'string')
          return stripQuoteWrap(value.trim());

        return value;
        this.assert();
      }
    }
  );

  return data;
};

function stripQuoteWrap(v) {
  return (v.length >= 2 && v[0] === '"' && v[v.length - 1] === '"') ?
    v.slice(1, v.length - 1) :
    v;
}

function toJSON(ini) {
  return JSON.stringify(toObject(ini), null, 4);
};

function toYAML(ini) {
  return YAML.stringify(toObject(ini), 4);
};

module.exports = {
  toObject: toObject,
  toJSON: toJSON,
  toYAML: toYAML
};
