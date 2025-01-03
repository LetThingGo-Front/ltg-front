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

import { Pageable, RetrieveBookmarkedItemsData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class UserItemBookmarkController<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 북마크한 물품 목록을 조회합니다.
   *
   * @tags user-item-bookmark-controller
   * @name RetrieveBookmarkedItems
   * @summary 북마크 목록 조회 API
   * @request GET:/v1/users/bookmarks
   * @secure
   * @response `200` `RetrieveBookmarkedItemsData` OK
   * @response `500` `void` Interval Server Error
   */
  retrieveBookmarkedItems = (
    query: {
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetrieveBookmarkedItemsData, void>({
      path: `/v1/users/bookmarks`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
