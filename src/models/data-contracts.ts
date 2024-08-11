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

export interface TokenRequestDto {
  externalToken: string;
}

export interface GroupCodeCreateRequest {
  /**
   * 그룹코드
   * @minLength 0
   * @maxLength 6
   * @example "10001"
   */
  groupCode: string;
  /**
   * 그룹코드명
   * @minLength 0
   * @maxLength 150
   * @example "테스트 코드"
   */
  groupCodeName: string;
  /**
   * 관리항목설명1
   * @minLength 0
   * @maxLength 150
   */
  mngDes1?: string;
  /**
   * 관리항목설명2
   * @minLength 0
   * @maxLength 150
   */
  mngDes2?: string;
  /**
   * 관리항목설명3
   * @minLength 0
   * @maxLength 150
   */
  mngDes3?: string;
  /**
   * 관리항목설명4
   * @minLength 0
   * @maxLength 150
   */
  mngDes4?: string;
  /**
   * 그룹코드설명
   * @minLength 0
   * @maxLength 500
   * @example "테스트 그룹 코드 입니다."
   */
  description?: string;
  /**
   * 사용여부
   * @example "Y"
   */
  useYn: string;
}

export interface CodeCreateRequest {
  /**
   * 그룹코드
   * @minLength 0
   * @maxLength 6
   * @example "TEST01"
   */
  groupCode: string;
  codes?: CodeDto[];
}

export interface CodeDto {
  /**
   * 공통코드
   * @minLength 0
   * @maxLength 150
   * @example "L"
   */
  code?: string;
  /**
   * 코드한글명
   * @minLength 0
   * @maxLength 150
   * @example "렛띵고"
   */
  codeKorName?: string;
  /**
   * 코드영문명
   * @minLength 0
   * @maxLength 150
   * @example "letthinggo"
   */
  codeEngName?: string;
  /**
   * 관리항목1
   * @minLength 0
   * @maxLength 150
   */
  mngItem1?: string;
  /**
   * 관리항목2
   * @minLength 0
   * @maxLength 150
   */
  mngItem2?: string;
  /**
   * 관리항목3
   * @minLength 0
   * @maxLength 150
   */
  mngItem3?: string;
  /**
   * 관리항목4
   * @minLength 0
   * @maxLength 150
   */
  mngItem4?: string;
  /**
   * 코드설명
   * @minLength 0
   * @maxLength 500
   * @example "테스트 코드 입니다."
   */
  description?: string;
  /**
   * 사용여부
   * @minLength 0
   * @maxLength 1
   * @example "Y"
   */
  useYn: string;
  /**
   * 순서
   * @format int32
   * @example 1
   */
  codeSeq: number;
}

export interface AppAvailabilityDto {
  availableDate?: string;
  startTime?: string;
  endTime?: string;
}

export interface ApplicationCreateRequest {
  /** @format int64 */
  userId?: number;
  /** @format int64 */
  locationId?: number;
  memo?: string;
  appAvailabilities?: AppAvailabilityDto[];
  /** @format int64 */
  itemId?: number;
}

export interface AddrAndAvailDto {
  address?: string;
  addressDescription?: string;
  district?: string;
  dong?: string;
  latitude?: number;
  longitude?: number;
  lightningYn?: string;
  availabilityCode?: string;
  availabiltyList?: AvailabiltyDto[];
}

export interface AvailabiltyDto {
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
}

export interface CreateRequest {
  /** @format int64 */
  userId?: number;
  /** @format int64 */
  category?: number;
  itemStatus?: string;
  itemName?: string;
  itemDescription?: string;
  itemAttachList?: ItemAttachDto[];
  addrAndAvailList?: AddrAndAvailDto[];
}

export interface ItemAttachDto {
  itemAttachName?: string;
  /** @format byte */
  itemAttachSize?: string;
  itemAttachUrl?: string;
  itemAttachExts?: string;
  thumYn?: string;
}

export interface CodeSearchRequest {
  /**
   * 사용여부
   * @minLength 0
   * @maxLength 1
   * @example "Y"
   */
  useYn?: string;
  /**
   * 코드한글명
   * @minLength 0
   * @maxLength 150
   * @example "렛띵고"
   */
  codeKorName?: string;
  /**
   * 코드영문명
   * @minLength 0
   * @maxLength 150
   * @example "letthinggo"
   */
  codeEngName?: string;
  /**
   * 관리항목1
   * @minLength 0
   * @maxLength 150
   */
  mngItem1?: string;
  /**
   * 관리항목2
   * @minLength 0
   * @maxLength 150
   */
  mngItem2?: string;
  /**
   * 관리항목3
   * @minLength 0
   * @maxLength 150
   */
  mngItem3?: string;
  /**
   * 관리항목4
   * @minLength 0
   * @maxLength 150
   */
  mngItem4?: string;
}

export interface GroupCodeSearchRequest {
  /**
   * 사용여부
   * @example "Y"
   */
  useYn?: string;
  /**
   * 그룹코드명
   * @example "물품상태"
   */
  groupCodeName?: string;
}

export type ReissueData = string;

export type ReissueError = string;

export type LoginData = string;

export type LoginError = string;

export type LogoutData = string;

export type RetrieveGroupCodes1Data = string;

export type CreateGroupCodeData = string;

export type CreateGroupCodeError = string;

export type CreateCodeData = string;

export type CreateCodeError = string;

export type CreateApplicationData = string;

export type CreateApplicationError = string;

export type AddItemData = string;

export type RetrieveCodesData = string;

export type RetrieveCodesError = string;

export type RetrieveCodes1Data = string;

export type RetrieveCodes1Error = string;

export type RetrieveGroupCodesData = string;

export type RetrieveAllUsersData = string;

export type RetrieveUserTestData = string;
