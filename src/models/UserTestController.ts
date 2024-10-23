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

import { RetrieveAllUsersData, RetrieveUserTestData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class UserTestController<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 전체 사용자의 정보를 조회합니다.
   *
   * @tags user-test-controller
   * @name RetrieveAllUsers
   * @summary 사용자 전체 조회 테스트 API
   * @request GET:/test/users
   * @secure
   * @response `200` `RetrieveAllUsersData` OK
   */
  retrieveAllUsers = (params: RequestParams = {}) =>
    this.request<RetrieveAllUsersData, any>({
      path: `/test/users`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 아이디로 사용자 정보 조회를 합니다.
   *
   * @tags user-test-controller
   * @name RetrieveUserTest
   * @summary 사용자 정보 조회 테스트 API
   * @request GET:/test/users/{id}
   * @secure
   * @response `200` `RetrieveUserTestData` OK
   */
  retrieveUserTest = (id: number, params: RequestParams = {}) =>
    this.request<RetrieveUserTestData, any>({
      path: `/test/users/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
}
