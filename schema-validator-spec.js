var Validator = require('json-schema-validator');
var _ = require('lodash');
var Glob = require("glob");
var expect = require('chai').expect;
var assert = require('chai').assert;
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
    it("should be valid to the spec", function(done) {

      var test = function(err, schemas, done){
        Validator.simple('http://json-schema.org/draft-04/schema#', function (error, v) {
          assert.isNull(error, "there was no error");
          for (var key in schemas) {
            var res = v.validate(
              schemas[key],
              'http://json-schema.org/draft-04/schema#'
            );
            console.log("res", schemas[key].id, res);
            assert.ok(res);
          }
          done();
        });
      };

      new Glob("schemas/**/*.json", {}, runTest(test, done));
    });
});
