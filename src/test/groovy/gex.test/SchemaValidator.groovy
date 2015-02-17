package gex.test

import com.github.fge.jackson.JsonLoader
import com.github.fge.jsonschema.core.load.Dereferencing
import com.github.fge.jsonschema.core.load.configuration.LoadingConfiguration
import com.github.fge.jsonschema.core.report.ProcessingReport
import com.github.fge.jsonschema.main.JsonSchemaFactory
import com.github.fge.jsonschema.main.JsonSchemaFactoryBuilder
import com.github.fge.jsonschema.main.JsonValidator
import spock.lang.Shared
import spock.lang.Specification
import groovy.io.FileType
import spock.lang.Unroll

public class SchemaValidator extends Specification {

  @Shared
  JsonValidator DRAFTV4_WITH_ID

  def setup() {
    JsonSchemaFactoryBuilder builder = JsonSchemaFactory.newBuilder()
    LoadingConfiguration loadingCfg = LoadingConfiguration.byDefault();
    loadingCfg = loadingCfg.thaw().dereferencing(Dereferencing.INLINE).freeze();
    builder.setLoadingConfiguration(loadingCfg);
    DRAFTV4_WITH_ID = builder.freeze().getValidator();

  }

  @Unroll
  def "all the JSON schemas should be valid"() {

    setup:
      def DRAFTV4 = new File("./spec/draftv4.json")

    expect:
      ProcessingReport report = DRAFTV4_WITH_ID.validate(JsonLoader.fromString(DRAFTV4.text), JsonLoader.fromString(schema))
      report.isSuccess() == true
    where:
      schema << new DataSchema()

  }

  class DataSchema implements Iterable {

    List listFiles = []
    int counter

    DataSchema() {
      def dir = new File("./schemas")
      dir.eachFileRecurse(FileType.FILES) { File file ->
        if (file.name.contains("json")) {
          listFiles << file.text
        }
      }
    }

    @Override
    Iterator iterator() {
      return [
          hasNext: {
            counter < listFiles.size()
          },
          next   : {
            listFiles.pop()
          }
      ] as Iterator
    }
  }
}