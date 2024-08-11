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
  RetrieveCodes1Error,
  RetrieveCodesData,
  RetrieveCodesError,
  RetrieveGroupCodes1Data,
  RetrieveGroupCodesData,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class CodeController<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 그룹코드 정보를 조회합니다.
   *
   * @tags code-controller
   * @name RetrieveGroupCodes1
   * @summary 그룹 공통코드 조회 API
   * @request GET:/v1/group-codes
   * @secure
   * @response `200` `RetrieveGroupCodes1Data` OK
   */
  retrieveGroupCodes1 = (
    query?: {
      groupCodeRequest?: GroupCodeSearchRequest;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetrieveGroupCodes1Data, any>({
      path: `/v1/group-codes`,
      method: 'GET',
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
   * @response `40101` `string` 이미 등록된 그룹코드입니다.
   */
  createGroupCode = (data: GroupCodeCreateRequest, params: RequestParams = {}) =>
    this.request<CreateGroupCodeData, CreateGroupCodeError>({
      path: `/v1/group-codes`,
      method: 'POST',
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
   * @response `40102` `string` 동일한 그룹코드에 공통코드는 중복될 수 없습니다.
   * @response `40103` `string` 그룹코드가 존재하지 않습니다.
   * @response `40104` `string` 이미 등록된 공통코드입니다.
   */
  createCode = (data: CodeCreateRequest, params: RequestParams = {}) =>
    this.request<CreateCodeData, CreateCodeError>({
      path: `/v1/codes`,
      method: 'POST',
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
   * @response `40103` `string` 그룹코드가 존재하지 않습니다.
   */
  retrieveCodes = (
    groupCode: string,
    code: string,
    query?: {
      codeRequest?: CodeSearchRequest;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetrieveCodesData, RetrieveCodesError>({
      path: `/v1/group-codes/${groupCode}/codes/${code}`,
      method: 'GET',
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
   * @response `40103` `string` 그룹코드가 존재하지 않습니다.
   */
  retrieveCodes1 = (
    groupCode: string,
    query?: {
      codeRequest?: CodeSearchRequest;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetrieveCodes1Data, RetrieveCodes1Error>({
      path: `/v1/group-codes/${groupCode}/codes`,
      method: 'GET',
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
   */
  retrieveGroupCodes = (
    groupCode: string,
    query?: {
      groupCodeRequest?: GroupCodeSearchRequest;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetrieveGroupCodesData, any>({
      path: `/v1/group-codes/${groupCode}`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
}
