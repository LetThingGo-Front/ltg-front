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

import { ApplicationCreateRequest, CreateApplicationData, CreateApplicationError } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class ApplicationController<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 물품 나눔을 받기 위한 신청 정보를 등록합니다.
   *
   * @tags application-controller
   * @name CreateApplication
   * @summary 나눔 신청 API
   * @request POST:/v1/applications
   * @secure
   * @response `200` `CreateApplicationData` OK
   * @response `10201` `string` 사용자가 존재하지 않습니다.
   * @response `30101` `string` 해당 물품에 이미 신청하셨습니다.
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
