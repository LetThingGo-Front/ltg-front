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
  CreateItemData,
  CreateItemError,
  CreateItemPayload,
  ItemSearchRequest,
  Pageable,
  RetrieveItemsData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ItemController<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 나눔 물품 목록을 조회합니다.
   *
   * @tags item-controller
   * @name RetrieveItems
   * @summary 나눔 물품 목록 조회 API
   * @request GET:/v1/items
   * @secure
   * @response `200` `RetrieveItemsData` OK 또는 Validation Error
   * @response `500` `void` Interval Server Error
   */
  retrieveItems = (
    query: {
      /** 나눔 물품 리스트 DTO */
      itemSearchRequest?: ItemSearchRequest;
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetrieveItemsData, void>({
      path: `/v1/items`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 신규 나눔 물품 정보를 등록합니다.
   *
   * @tags item-controller
   * @name CreateItem
   * @summary 나눔 물품 등록 API
   * @request POST:/v1/items
   * @secure
   * @response `200` `CreateItemData` OK 또는 Validation Error
   * @response `400` `string` Unsupported Image Format
   * @response `404` `void` Not Found
   * @response `413` `string` File Size Exceeded
   * @response `500` `void` Interval Server Error
   */
  createItem = (data: CreateItemPayload, params: RequestParams = {}) =>
    this.request<CreateItemData, CreateItemError>({
      path: `/v1/items`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
}
