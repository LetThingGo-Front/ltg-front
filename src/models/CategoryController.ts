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
  CategoryDto,
  CreateCategoryData,
  DeleteCategoryData,
  GetAllCategoriesData,
  GetCategoryByIdData,
  UpdateCategoryData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CategoryController<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags category-controller
   * @name GetCategoryById
   * @request GET:/v1/category/{id}
   * @secure
   * @response `200` `GetCategoryByIdData` OK
   */
  getCategoryById = (id: number, params: RequestParams = {}) =>
    this.request<GetCategoryByIdData, any>({
      path: `/v1/category/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags category-controller
   * @name UpdateCategory
   * @request PUT:/v1/category/{id}
   * @secure
   * @response `200` `UpdateCategoryData` OK
   */
  updateCategory = (
    id: number,
    data: CategoryDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateCategoryData, any>({
      path: `/v1/category/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags category-controller
   * @name DeleteCategory
   * @request DELETE:/v1/category/{id}
   * @secure
   * @response `200` `DeleteCategoryData` OK
   */
  deleteCategory = (id: number, params: RequestParams = {}) =>
    this.request<DeleteCategoryData, any>({
      path: `/v1/category/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags category-controller
   * @name GetAllCategories
   * @request GET:/v1/category
   * @secure
   * @response `200` `GetAllCategoriesData` OK
   */
  getAllCategories = (params: RequestParams = {}) =>
    this.request<GetAllCategoriesData, any>({
      path: `/v1/category`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags category-controller
   * @name CreateCategory
   * @request POST:/v1/category
   * @secure
   * @response `200` `CreateCategoryData` OK
   */
  createCategory = (data: CategoryDto, params: RequestParams = {}) =>
    this.request<CreateCategoryData, any>({
      path: `/v1/category`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
