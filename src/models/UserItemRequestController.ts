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

import { Pageable, RetrieveUserRequestsData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class UserItemRequestController<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 나눔 신청 목록을 조회합니다.
   *
   * @tags user-item-request-controller
   * @name RetrieveUserRequests
   * @summary 나눔 신청 목록 조회 API
   * @request GET:/v1/users/requests
   * @secure
   * @response `200` `RetrieveUserRequestsData` OK
   */
  retrieveUserRequests = (
    query: {
      requestStatus?: string;
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetrieveUserRequestsData, any>({
      path: `/v1/users/requests`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
