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

import { ItemBookmarkData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class ItemBookmarkController<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 물품에 대한 북마크를 추가 및 삭제합니다.
   *
   * @tags item-bookmark-controller
   * @name ItemBookmark
   * @summary 물품 북마크 API
   * @request PUT:/v1/items/{itemId}/bookmarks
   * @secure
   * @response `200` `ItemBookmarkData` OK
   */
  itemBookmark = (itemId: string, params: RequestParams = {}) =>
    this.request<ItemBookmarkData, any>({
      path: `/v1/items/${itemId}/bookmarks`,
      method: "PUT",
      secure: true,
      ...params,
    });
}
