package org.gex.v1
import javax.ws.rs.*
import javax.ws.rs.core.*
import java.util.List
import java.util.Map
import org.gex.dto.v1.*

import org.glassfish.jersey.media.multipart.*

@Path("/cats/{catId}/webFormCat")
@Consumes("application/json")
@Produces("application/json")
interface GatitopByIdFormResource {

  /***
   * @return Response This must be a valid Complex Cat JSON object.
   */
  @POST
  Response postGatitopByIdForm(
      @Context UriInfo uriInfo,
      @PathParam("catId")String catId,
      @FormDataParam("name")String name);


}
