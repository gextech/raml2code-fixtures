package org.gex.v1
import javax.ws.rs.*
import javax.ws.rs.core.*
import java.util.List
import java.util.Map
import org.gex.dto.v1.*

import org.glassfish.jersey.media.multipart.*

@Path("/settings/{key}")
@Consumes("application/json")
@Produces("application/json")
interface SettingsResource {

  /***
   * @return Response This must be a valid genericMap JSON object.
   */
  @GET
  Response getSettings(
      @Context UriInfo uriInfo,
      @PathParam("key")String key);

  /***
   * @return Response This must be a valid genericMap JSON object.
   */
  @POST
  Response postSettings(
      @Context UriInfo uriInfo,
      @PathParam("key")String key,
      Map genericmap);

  /***
   * @return Response This must be a valid GenericArray JSON object.
   */
  @PUT
  Response putSettings(
      @Context UriInfo uriInfo,
      @PathParam("key")String key,
      List genericarray);

  /***
   * @return Response This must be a valid  JSON object.
   */
  @DELETE
  Response deleteSettings(
      @Context UriInfo uriInfo,
      @PathParam("key")String key);


}
