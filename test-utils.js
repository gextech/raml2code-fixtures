var path = require('path');
var codeReferences = path.join(__dirname, 'code-reference/');
var raml = require('raml-parser');
var chai = require('chai');
var _ = require('lodash');
var should = chai.should();
var expect = require('chai').expect;
var fs = require('fs');
var Glob = require("glob");
var data2Code = require('data2code');


var helpersUtil = {};
helpersUtil.ramlPath = path.join(__dirname, 'raml/');

helpersUtil.readRaml = function (filename) {
  return raml.loadFile(helpersUtil.ramlPath + filename)
};

helpersUtil.wrapAssertion = function (fn, done) {
  try {
    fn();
  } catch (e) {
    done(e);
  }
};

helpersUtil.runSimpleTest = function (raml, generator, extra, sampleFile, validateWith, logContent ) {

 return function(done){
   helpersUtil.loadFixtureRaml(raml, function(data, done){

     helpersUtil.wrapAssertion(function(){
       logContent = logContent || false;

       generator.handleRender = helpersUtil.handleRender.bind(undefined, done, sampleFile, validateWith, logContent);
       data.extra = extra;
       data2Code.process(data, generator);
       done()

     },done);

   }, done);
 }

};


helpersUtil.loadFixtureRaml = function (raml, fn, done) {

  var p1 = helpersUtil.readRaml(raml);
  p1.then(function (ramlData) {
    helpersUtil.wrapAssertion(function () {
      fn(ramlData, done);
    }, done);
  }, function (error) {
    done(error);
  });

};

helpersUtil.loadSchemasAndRun = function (fn, done, file) {
  var testSchemas;
  if(file === undefined){
    testSchemas = path.join(__dirname, 'schemas/') + "**/*schema.json";
  }else{
    testSchemas = path.join(__dirname, 'schemas/') + file
  }

  var wrap = function (err, schemas) {
    helpersUtil.wrapAssertion(function () {
      fn(err, schemas, done);
    }, done)

  };

  new Glob(testSchemas, {}, helpersUtil.readSchemas(wrap, done));
};

helpersUtil.readSchemas = function (fn, done) {
  return function (err, files) {
    try {
      var schemas = _.map(files, function (file) {
        return JSON.parse(fs.readFileSync(file.toString()).toString('utf8'));
      });
      fn(err, schemas, done);
    } catch (e) {
      done(e);
    }
  };
};

helpersUtil.handleRender = function (done, sampleFile, validateWith, logContent, results) {


    var validateWithContent = _.find(results, function (arr) {
      return arr[validateWith] !== undefined
    });

    helpersUtil.compareContents({body: validateWithContent[validateWith], name: validateWith}, sampleFile, logContent);

};

helpersUtil.compareContents = function (content, fixtureName, logContent) {


  if (logContent) {
    console.log("=================" + content.name + "================")
    console.log(content.body);
    console.log("==================================================")
  }

  if(fixtureName !== undefined){

    var sampleFileFs = codeReferences + fixtureName;
    var sampleText = fs.readFileSync(sampleFileFs);

    sampleText = sampleText.toString('utf8').split('\n');
    content.body.split('\n').forEach(function (e, i) {
      e.trim().should.equal(sampleText[i].trim(), "In line " + i + " " + sampleFileFs + " " + content.name);
    });

  }

};


helpersUtil.validateDataWithFixture = function (done, sampleFile, validateWith, logContent, file) {

  helpersUtil.wrapAssertion(function () {
    if (file.path == validateWith) {
      var content = file.contents.toString('utf8');
      helpersUtil.compareContents({body: content, name: file.path}, sampleFile, logContent);
    }
  }, done);

};

module.exports = helpersUtil;