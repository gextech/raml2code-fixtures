package org.gex.v1
import groovy.transform.*
import javax.validation.constraints.*
/**
 *A widget is used to generated partials
 **/
@CompileStatic
@Canonical
public class WidgetSelfReference implements Serializable {

  /* The friendly name of the widget  */
  @NotNull
  String name


  List<String> etiquetas

}
