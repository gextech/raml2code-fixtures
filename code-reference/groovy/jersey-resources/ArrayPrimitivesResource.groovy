package org.gex.v1
import javax.ws.rs.*
import javax.ws.rs.core.*
import java.util.List
import java.util.Map
import org.gex.dto.v1.*

import org.glassfish.jersey.media.multipart.*

@Path("/arrayprimitives")
@Consumes("application/json")
@Produces("application/json")
interface ArrayPrimitivesResource {

  /***
   * @return Response This must be a valid GenericArray JSON object.
   */
  @POST
  Response postArrayPrimitives(
      @Context UriInfo uriInfo,
      List<String> genericarray);


}
