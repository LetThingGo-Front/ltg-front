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
  CodeCreateRequest,
  CodeSearchRequest,
  CreateCodeData,
  CreateCodeError,
  CreateGroupCodeData,
  CreateGroupCodeError,
  GroupCodeCreateRequest,
  GroupCodeSearchRequest,
  RetrieveCodes1Data,
  RetrieveCodesByGroupCodesData,
  RetrieveCodesByGroupCodesPayload,
  RetrieveCodesData,
  RetrieveGroupCodes1Data,
  RetrieveGroupCodes1Error,
  RetrieveGroupCodesData,
  RetrieveGroupCodesError,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CodeController<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 그룹코드 정보를 조회합니다.
   *
   * @tags code-controller
   * @name RetrieveGroupCodes1
   * @summary 그룹 공통코드 조회 API
   * @request GET:/v1/group-codes
   * @secure
   * @response `200` `RetrieveGroupCodes1Data` OK
   * @response `404` `string` Not Found Group Code
   */
  retrieveGroupCodes1 = (
    query?: {
      groupCodeRequest?: GroupCodeSearchRequest;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetrieveGroupCodes1Data, RetrieveGroupCodes1Error>({
      path: `/v1/group-codes`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 그룹코드 정보를 등록합니다.
   *
   * @tags code-controller
   * @name CreateGroupCode
   * @summary 그룹코드 생성 API
   * @request POST:/v1/group-codes
   * @secure
   * @response `200` `CreateGroupCodeData` OK
   * @response `409` `string` Duplicate Code
   */
  createGroupCode = (
    data: GroupCodeCreateRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateGroupCodeData, CreateGroupCodeError>({
      path: `/v1/group-codes`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 특정 그룹코드의 공통코드 정보를 조회합니다.
   *
   * @tags code-controller
   * @name RetrieveCodesByGroupCodes
   * @summary 그룹코드별 공통코드 목록 조회 API
   * @request POST:/v1/group-codes/codes
   * @secure
   * @response `200` `RetrieveCodesByGroupCodesData` OK
   * @response `404` `void` Not Found Entity
   */
  retrieveCodesByGroupCodes = (
    data: RetrieveCodesByGroupCodesPayload,
    params: RequestParams = {},
  ) =>
    this.request<RetrieveCodesByGroupCodesData, void>({
      path: `/v1/group-codes/codes`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 공통코드 정보를 등록합니다.
   *
   * @tags code-controller
   * @name CreateCode
   * @summary 공통코드 생성 API
   * @request POST:/v1/codes
   * @secure
   * @response `200` `CreateCodeData` OK
   * @response `404` `string` Not Found Group Code
   * @response `409` `string` Duplicate Code
   */
  createCode = (data: CodeCreateRequest, params: RequestParams = {}) =>
    this.request<CreateCodeData, CreateCodeError>({
      path: `/v1/codes`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 특정 그룹코드의 공통코드 정보를 조회합니다.
   *
   * @tags code-controller
   * @name RetrieveCodes
   * @summary 공통코드 조회 API
   * @request GET:/v1/group-codes/{groupCode}/codes/{code}
   * @secure
   * @response `200` `RetrieveCodesData` OK
   * @response `404` `void` Not Found Entity
   */
  retrieveCodes = (
    groupCode: string,
    code: string,
    query?: {
      codeRequest?: CodeSearchRequest;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetrieveCodesData, void>({
      path: `/v1/group-codes/${groupCode}/codes/${code}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 특정 그룹코드의 공통코드 정보를 조회합니다.
   *
   * @tags code-controller
   * @name RetrieveCodes1
   * @summary 공통코드 조회 API
   * @request GET:/v1/group-codes/{groupCode}/codes
   * @secure
   * @response `200` `RetrieveCodes1Data` OK
   * @response `404` `void` Not Found Entity
   */
  retrieveCodes1 = (
    groupCode: string,
    query?: {
      codeRequest?: CodeSearchRequest;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetrieveCodes1Data, void>({
      path: `/v1/group-codes/${groupCode}/codes`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 그룹코드 정보를 조회합니다.
   *
   * @tags code-controller
   * @name RetrieveGroupCodes
   * @summary 그룹 공통코드 조회 API
   * @request GET:/v1/group-codes/{groupCode}
   * @secure
   * @response `200` `RetrieveGroupCodesData` OK
   * @response `404` `string` Not Found Group Code
   */
  retrieveGroupCodes = (
    groupCode: string,
    query?: {
      groupCodeRequest?: GroupCodeSearchRequest;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetrieveGroupCodesData, RetrieveGroupCodesError>({
      path: `/v1/group-codes/${groupCode}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
