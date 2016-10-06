package org.gex.v1
import javax.ws.rs.*
import javax.ws.rs.core.*
import java.util.List
import java.util.Map
import org.gex.dto.v1.*

import org.glassfish.jersey.media.multipart.*

@Path("/cats")
@Consumes("application/json")
@Produces("application/json")
interface GatitosResource {

  /***
   * @return Response This must be a valid GenericArray JSON object.
   */
  @GET
  Response getGatitos(
      @Context UriInfo uriInfo,
      @QueryParam("searchBy")String searchBy);

  /***
   * @return Response This must be a valid Complex Cat JSON object.
   */
  @POST
  Response postGatitos(
      @Context UriInfo uriInfo,
      ComplexCat complexCat);


}
