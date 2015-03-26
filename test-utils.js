var path = require('path'),
  codeReferences = path.join(__dirname, 'code-reference/'),
  raml = require('raml-parser'),
  chai = require('chai'),
  _ = require('lodash'),
  should = chai.should(),
  expect = require('chai').expect,
  fs = require('fs'),
  Glob = require("glob"),
  data2Code = require('data2code'),
  raml2code = require('raml2code'),
  gutil = require('gulp-util');


var ramlPath = path.join(__dirname, 'raml/');
exports.ramlPath = ramlPath;

var readRaml = function (filename) {
  return raml.loadFile(ramlPath + filename)
};

var wrapAssertion = function (fn, done) {
  try {
    fn();
  } catch (e) {
    done(e);
    return e;
  }
};

exports.wrapAssertion = wrapAssertion;

var loadFixtureRaml = function (raml, fn, done) {

  var p1 = readRaml(raml);
  p1.then(function (ramlData) {
    wrapAssertion(function () {
      fn(ramlData, done);
    }, done);
  }, function (error) {
    done(error);
  });

};

var readSchemas = function (fn, done) {
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

var compareContents = function (content, fixtureName, logContent) {


  if (logContent) {
    console.log("=================" + content.name + "================")
    console.log(content.body);
    console.log("==================================================")
  }

  if (fixtureName !== undefined) {
    var sampleFileFs;
    if(path.resolve(fixtureName) === path.normalize(fixtureName)){
      sampleFileFs= fixtureName;
    }else{
      sampleFileFs = codeReferences + fixtureName;
    }

    var sampleText = fs.readFileSync(sampleFileFs);

    sampleText = sampleText.toString('utf8').split('\n');
    content.body.split('\n').forEach(function (e, i) {
      e.trim().should.equal(sampleText[i].trim(), "In line " + i + " " + sampleFileFs + " " + content.name);
    });

  }

};

var validateDataWithFixture = function (done, sampleFile, validateWith, logContent, file) {

  return wrapAssertion(function () {
    if (file.path == validateWith) {
      var content = file.contents.toString('utf8');
      compareContents({body: content, name: file.path}, sampleFile, logContent);
    }
  }, done);

};

exports.runSimpleTest = function (raml, generator, extra, sampleFile, validateWith, logContent) {
  return function (done) {
    loadFixtureRaml(raml, function (data, done) {

      wrapAssertion(function () {
        logContent = logContent || false;

        generator.handleRender = handleRender.bind(undefined, done, sampleFile, validateWith, logContent);
        data.extra = extra;
        var results = data2Code.process(data, generator);
        handleRender(done, sampleFile, validateWith, logContent, results);
        done();

      }, done);

    }, done);
  }

};

exports.loadSchemasAndRun = function (fn, done, file) {
  var testSchemas;
  if (file === undefined) {
    testSchemas = path.join(__dirname, 'schemas/') + "**/*schema.json";
  } else {
    testSchemas = path.join(__dirname, 'schemas/') + file
  }

  var wrap = function (err, schemas) {
    wrapAssertion(function () {
      fn(err, schemas, done);
    }, done)

  };

  new Glob(testSchemas, {}, readSchemas(wrap, done));
};

var handleRender = function (done, sampleFile, validateWith, logContent, results) {
  var validateWithContent = _.find(results, function (arr) {
    return arr[validateWith] !== undefined
  });

  compareContents({body: validateWithContent[validateWith], name: validateWith}, sampleFile, logContent);

};

exports.handleRender = handleRender;


exports.raml2codeIntegration = function (done, ramlFile, generator, extra, sampleFile, validateWith, logContent) {

  logContent = logContent || false;

  var raml2codeInstance = raml2code({generator: generator, extra: extra});
  var innerRamlPath = ramlPath + ramlFile;
  var ramlContents = fs.readFileSync(innerRamlPath);

  raml2codeInstance.write(new gutil.File({
    path: innerRamlPath,
    contents: ramlContents
  }));

  raml2codeInstance.on('data', function (file) {

    if (file.path === validateWith) {
      var e = validateDataWithFixture(done, sampleFile, validateWith, logContent, file);
      if(e === undefined || e === null){
        done();
      }

    }
  });

  raml2codeInstance.on('error', function (error) {
    console.log("raml2code integration error", error);
    done(error);
  });

};

