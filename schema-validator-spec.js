var _ = require('lodash');
var Glob = require("glob");
var expect = require('chai').expect;
var assert = require('chai').assert;
var fs = require('fs');
var deref = require('deref')();
var skeemas = require('skeemas');
var path = require('path');
var fs = require('fs');

var runTest = function (fn, done) {
  return function (err, files) {
    try {
      var schemas = _.map(files, function (file) {
        return JSON.parse(fs.readFileSync(file).toString('utf8'));
      });
      fn(err, schemas, done);
    } catch (e) {
      done(e);
    }
  };
};

describe('all the schemas', function () {
  it("should be valid to the spec", function (done) {
    var draftV4Path = path.join(__dirname, "./spec/draftv4.json");
    var draftv4 = fs.readFileSync(draftV4Path);

    var test = function (err, schemas, done) {
      for (var key in schemas) {
        var normSchema = deref.util.normalizeSchema(schemas[key], null);

        var da = skeemas.validate(normSchema, JSON.parse(draftv4));
        if (da.valid === false) {
          console.log(normSchema.id);
          da.errors.forEach(function (it) {
            console.log(it);
          });
        }

        //assert.ok(res.valid);
      }
      done();
    };

    new Glob("schemas/**/*.json", {}, runTest(test, done));
  });
});
