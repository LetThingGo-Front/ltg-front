/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  GenerateNicknameData,
  GetUserInfoData,
  RetrieveUserFavoritePlaceByPlaceTypeData,
  RetrieveUserFavoritePlaceByPlaceTypeError,
  RetrieveUserFavoritePlacesData,
  SaveUserProfileData,
  UserProfileRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class UserController<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 이용자의 프로필사진,최근이력 및 닉네임을 전달합니다.
   *
   * @tags user-controller
   * @name GetUserInfo
   * @summary 이용자 정보 API
   * @request GET:/v1/users/profile
   * @secure
   * @response `200` `GetUserInfoData` OK
   */
  getUserInfo = (params: RequestParams = {}) =>
    this.request<GetUserInfoData, any>({
      path: `/v1/users/profile`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 이용자의 닉네임 및 프로필을 변경합니다..
   *
   * @tags user-controller
   * @name SaveUserProfile
   * @summary 이용자 프로필 사진 수정 API
   * @request PUT:/v1/users/profile
   * @secure
   * @response `200` `SaveUserProfileData` 이미지 업로드 완료 후, 각각 이미지의 url list를 json 형식으로 반환합니다.
   */
  saveUserProfile = (data: UserProfileRequest, params: RequestParams = {}) =>
    this.request<SaveUserProfileData, any>({
      path: `/v1/users/profile`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 닉네임을 자동생성 합니다.
   *
   * @tags user-controller
   * @name GenerateNickname
   * @summary 닉네임 자동생성 API
   * @request GET:/v1/users/nickname
   * @secure
   * @response `200` `GenerateNicknameData` OK
   */
  generateNickname = (params: RequestParams = {}) =>
    this.request<GenerateNicknameData, any>({
      path: `/v1/users/nickname`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name RetrieveUserFavoritePlaces
   * @summary 내 즐겨찾기 장소 전체 조회 API
   * @request GET:/v1/users/favorite-places
   * @secure
   * @response `200` `RetrieveUserFavoritePlacesData` OK
   * @response `404` `void` Not Found
   */
  retrieveUserFavoritePlaces = (params: RequestParams = {}) =>
    this.request<RetrieveUserFavoritePlacesData, void>({
      path: `/v1/users/favorite-places`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 장소타입(H: 집근처, W: 회사근처, E 기타)
   *
   * @tags user-controller
   * @name RetrieveUserFavoritePlaceByPlaceType
   * @summary 장소 타입별 내 즐겨찾기 장소 조회 API
   * @request GET:/v1/users/favorite-places/{placeType}
   * @secure
   * @response `200` `RetrieveUserFavoritePlaceByPlaceTypeData` OK
   * @response `400` `string` Invalid Place Type
   * @response `404` `void` Not Found
   */
  retrieveUserFavoritePlaceByPlaceType = (
    placeType: string,
    params: RequestParams = {},
  ) =>
    this.request<
      RetrieveUserFavoritePlaceByPlaceTypeData,
      RetrieveUserFavoritePlaceByPlaceTypeError
    >({
      path: `/v1/users/favorite-places/${placeType}`,
      method: "GET",
      secure: true,
      ...params,
    });
}
