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

import { AddItemData, AddItemError, CreateRequest } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class ItemController<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 나눔 물품을 등록 위한 물품 정보를 등록합니다.
   *
   * @tags item-controller
   * @name AddItem
   * @summary 나눔 등록 API
   * @request POST:/v1/items
   * @secure
   * @response `200` `AddItemData` OK
   * @response `10201` `string` 사용자가 존재하지 않습니다.
   */
  addItem = (data: CreateRequest, params: RequestParams = {}) =>
    this.request<AddItemData, AddItemError>({
      path: `/v1/items`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
