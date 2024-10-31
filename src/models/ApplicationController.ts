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
  ApplicationCreateRequest,
  CreateApplicationData,
  CreateApplicationError,
  Pageable,
  RetrieveApplicationsData,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class ApplicationController<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 나눔 신청 목록을 조회합니다.
   *
   * @tags application-controller
   * @name RetrieveApplications
   * @summary 나눔 신청 목록 조회 API
   * @request GET:/v1/applications
   * @secure
   * @response `200` `RetrieveApplicationsData` OK
   */
  retrieveApplications = (
    query: {
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetrieveApplicationsData, any>({
      path: `/v1/applications`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 물품 나눔을 받기 위한 신청 정보를 등록합니다.
   *
   * @tags application-controller
   * @name CreateApplication
   * @summary 나눔 신청 등록 API
   * @request POST:/v1/applications
   * @secure
   * @response `200` `CreateApplicationData` OK
   * @response `404` `void` Not Found
   * @response `409` `string` Application Already Registered
   */
  createApplication = (data: ApplicationCreateRequest, params: RequestParams = {}) =>
    this.request<CreateApplicationData, CreateApplicationError>({
      path: `/v1/applications`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
