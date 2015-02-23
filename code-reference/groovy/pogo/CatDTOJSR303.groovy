package org.gex.v1
import groovy.transform.*
import javax.validation.constraints.*
/**
 *A cat from Atoms catalog
 **/
@CompileStatic
@Canonical
public class ComplexCat implements Serializable {

  /* The unique identifier for a cat */
  @NotNull
  Long id

  /* Name of the cat */
  @NotNull
  @Size(min=5, max=20)
  String name

  /* Something to play */
  Map toy

  /* friends */
  List friends

  /* characteristics */
  Map sings

  /* The age of the cat */
  @Min(1l)
  @Max(15l)
  Long age

  /* The weight of the cat */
  @DecimalMin("0.1")
  @DecimalMax("10")
  BigDecimal weight

  /* Something to eat */
  Food food

  /* The owner of the cat. */
  Owner owner

  static class Food implements Serializable {

    /* what the cat eats */
    String name

  }
}
