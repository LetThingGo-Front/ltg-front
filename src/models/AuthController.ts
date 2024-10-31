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

import { LoginData, LoginError, LogoutData, ReissueData, TokenRequestDto } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class AuthController<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description access토큰 만료 시 refresh 토큰으로 재발급
   *
   * @tags auth-controller
   * @name Reissue
   * @summary 토큰 재발급 API
   * @request POST:/v1/reissue
   * @secure
   * @response `200` `ReissueData` OK
   * @response `498` `void` Invalid Token
   */
  reissue = (params: RequestParams = {}) =>
    this.request<ReissueData, void>({
      path: `/v1/reissue`,
      method: 'POST',
      secure: true,
      ...params,
    });
  /**
   * @description 로그인
   *
   * @tags auth-controller
   * @name Login
   * @summary 사용자 로그인 API
   * @request POST:/v1/oauth/{provider}
   * @secure
   * @response `200` `LoginData` OK
   * @response `404` `string` Invalid Provider Name
   */
  login = (provider: string, data: TokenRequestDto, params: RequestParams = {}) =>
    this.request<LoginData, LoginError>({
      path: `/v1/oauth/${provider}`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name Logout
   * @summary 로그아웃 API
   * @request POST:/v1/logout
   * @secure
   * @response `200` `LogoutData` OK
   */
  logout = (params: RequestParams = {}) =>
    this.request<LogoutData, any>({
      path: `/v1/logout`,
      method: 'POST',
      secure: true,
      ...params,
    });
}
