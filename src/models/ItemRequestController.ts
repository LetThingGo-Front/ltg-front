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
  CreateItemRequestData,
  CreateItemRequestError,
  ItemRequestCreateRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ItemRequestController<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 물품 나눔을 받기 위한 신청 정보를 등록합니다.
   *
   * @tags item-request-controller
   * @name CreateItemRequest
   * @summary 나눔 신청 등록 API
   * @request POST:/v1/items/{itemId}/requests
   * @secure
   * @response `200` `CreateItemRequestData` OK
   * @response `400` `string` Time Not Available
   * @response `404` `void` Not Found
   * @response `409` `string` Item Request Already Registered
   */
  createItemRequest = (
    itemId: string,
    data: ItemRequestCreateRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateItemRequestData, CreateItemRequestError>({
      path: `/v1/items/${itemId}/requests`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
