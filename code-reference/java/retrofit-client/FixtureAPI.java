package org.gex.client.v1;
import retrofit.http.*;
import retrofit.client.Response;
import java.util.List;
import java.util.Map;

import rx.Observable;
import retrofit.mime.TypedFile;
import com.pojos.v1.*;


public interface FixtureAPI {

  @GET("/v1/cats")
  Observable<List> getGatitosAndSearchBy(
      @Query("searchBy") String searchBy);

  @GET("/v1/cats")
  Observable<List> getGatitos();

  @POST("/v1/cats")
  Observable<Complex Cat> postGatitos(
      @Body Complex Cat complex cat);

  @GET("/v1/cats/{catId}")
  Observable<Complex Cat> getGatitoByIdAndClientSecretAndOrderByAndFilterBy(
      @Path("catId") String catId,
      @Query("clientSecret") String clientSecret,
      @Query("orderBy") String orderBy,
      @Query("filterBy") String filterBy);

  @GET("/v1/cats/{catId}")
  Observable<Complex Cat> getGatitoByIdAndOrderByAndFilterBy(
      @Path("catId") String catId,
      @Query("orderBy") String orderBy,
      @Query("filterBy") String filterBy);

  @GET("/v1/cats/{catId}")
  Observable<Complex Cat> getGatitoByIdAndClientSecretAndFilterBy(
      @Path("catId") String catId,
      @Query("clientSecret") String clientSecret,
      @Query("filterBy") String filterBy);

  @GET("/v1/cats/{catId}")
  Observable<Complex Cat> getGatitoByIdAndFilterBy(
      @Path("catId") String catId,
      @Query("filterBy") String filterBy);

  @GET("/v1/cats/{catId}")
  Observable<Complex Cat> getGatitoByIdAndClientSecretAndOrderBy(
      @Path("catId") String catId,
      @Query("clientSecret") String clientSecret,
      @Query("orderBy") String orderBy);

  @GET("/v1/cats/{catId}")
  Observable<Complex Cat> getGatitoByIdAndOrderBy(
      @Path("catId") String catId,
      @Query("orderBy") String orderBy);

  @GET("/v1/cats/{catId}")
  Observable<Complex Cat> getGatitoByIdAndClientSecret(
      @Path("catId") String catId,
      @Query("clientSecret") String clientSecret);

  @GET("/v1/cats/{catId}")
  Observable<Complex Cat> getGatitoById(
      @Path("catId") String catId);

  @PUT("/v1/cats/{catId}")
  Observable<Complex Cat> putGatitoById(
      @Path("catId") String catId,
      @Body Complex Cat complex cat);

  @GET("/v1/cats/{catId}/mapping")
  Observable<Complex Cat> getSingleContentTypeMapping(
      @Path("catId") String catId);

  @POST("/v1/cats/{catId}/picture")
  @Multipart
  Observable<Complex Cat> postGatitoByIdPicture(
      @Path("catId") String catId,
      @Part("file") TypedFile file);

  @POST("/v1/cats/{catId}/webFormCat")
  @FormUrlEncoded
  Observable<Complex Cat> postGatitopByIdForm(
      @Path("catId") String catId,
      @Field("name") String name);

}
