package org.gex.v1
import javax.ws.rs.*
import javax.ws.rs.core.*
import java.util.List
import java.util.Map
import org.gex.dto.v1.*

import org.glassfish.jersey.media.multipart.*

@Path("/cats/{catId}")
@Consumes("application/json")
@Produces("application/json")
interface GatitoByIdResource {

  /***
   * @return Response This must be a valid Complex Cat JSON object.
   */
  @GET
  Response getGatitoById(
      @Context UriInfo uriInfo,
      @PathParam("catId")String catId,
      @QueryParam("filterBy")String filterBy,
      @QueryParam("orderBy")String orderBy,
      @QueryParam("clientSecret")String clientSecret);

  /***
   * @return Response This must be a valid Complex Cat JSON object.
   */
  @PUT
  Response putGatitoById(
      @Context UriInfo uriInfo,
      @PathParam("catId")String catId,
      ComplexCat complexCat);


}
