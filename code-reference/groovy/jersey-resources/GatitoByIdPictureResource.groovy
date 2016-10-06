package org.gex.v1
import javax.ws.rs.*
import javax.ws.rs.core.*
import java.util.List
import java.util.Map
import org.gex.dto.v1.*

import org.glassfish.jersey.media.multipart.*

@Path("/cats/{catId}/picture")
@Consumes("application/json")
@Produces("application/json")
interface GatitoByIdPictureResource {

  /***
   * @return Response This must be a valid Complex Cat JSON object.
   */
  @POST
  @Consumes(MediaType.MULTIPART_FORM_DATA)
  Response postGatitoByIdPicture(
      @Context UriInfo uriInfo,
      @PathParam("catId")String catId,
      @FormDataParam("file")InputStream file,
      @FormDataParam("file")FormDataContentDisposition fileData);


}
