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

/** 나눔 신청 가능 시간 DTO */
export interface AppAvailabilityDto {
  /**
   * 나눔신청가능시간ID
   * @format int64
   * @example 1
   */
  appAvailabilityId?: number;
  /**
   * 가능 날짜
   * @example "20240831"
   */
  availableDate: string;
  /**
   * 시작 시간
   * @example "0900"
   */
  startTime: string;
  /**
   * 종료 시간
   * @example "1000"
   */
  endTime: string;
  /**
   * 신청 상태
   * @example "N"
   */
  appApplicationStatus?: string;
}

/** 나눔 신청 생성 요청 DTO */
export interface ApplicationCreateRequest {
  /**
   * 나눔장소ID
   * @format int64
   * @example 1
   */
  locationId: number;
  /**
   * 메모
   * @minLength 0
   * @maxLength 1000
   * @example "1"
   */
  memo?: string;
  /** 나눔 신청 가능 시간 목록 */
  appAvailabilities?: AppAvailabilityDto[];
  /** @format int64 */
  itemId?: number;
}

/** 나눔 신청 생성 응답 DTO */
export interface ApplicationCreateResponse {
  /**
   * 나눔신청ID
   * @format int64
   * @example 1
   */
  applicationId?: number;
  /**
   * 메모
   * @example "나눔 신청 메모"
   */
  memo?: string;
  /** 나눔 장소 정보 DTO */
  location?: ApplicationLocationDto;
  /** 나눔 신청 가능 시간 목록 */
  appAvailabilities?: AppAvailabilityDto[];
}

/** 나눔 장소 정보 DTO */
export interface ApplicationLocationDto {
  /**
   * 주소
   * @example "서울 서초구 강남대로 447"
   */
  address?: string;
  /**
   * 위치 설명
   * @example "자라 건물 앞"
   */
  description?: string;
  /**
   * 위도
   * @example 37.596693
   */
  latitude?: number;
  /**
   * 경도
   * @example 26.985783
   */
  longitude?: number;
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

export interface Pageable {
  /**
   * @format int32
   * @min 0
   */
  page?: number;
  /**
   * @format int32
   * @min 1
   */
  size?: number;
  sort?: string[];
}

/** 나눔 신청 믈픔 DTO */
export interface ApplicationItemDto {
  /**
   * 물품썸네일이미지URL
   * @example "https://example.com/attachments/attachment1.jpg"
   */
  thumbnail?: string;
  /**
   * 물품명
   * @example "Java의 정석"
   */
  itemName?: string;
  /**
   * 카테고리명
   * @example "도서"
   */
  categoryName?: string;
  /**
   * 물품상태명
   * @example "거의 사용안해서 새것 같음"
   */
  itemStatusName?: string;
  /**
   * 물품상세설명
   * @example "물품상세설명"
   */
  description?: string;
}

/** 내 나눔 신청 리스트 DTO */
export interface ApplicationSearchResponse {
  /**
   * 나눔신청ID
   * @format int64
   * @example 1
   */
  applicationId?: number;
  /**
   * 일정조율상태메시지
   * @example "바쁜날다람쥐님의 나눔 수락 대기 중"
   */
  scheduleProcessMessage?: string;
  /**
   * 나눔 신청 상태
   * @example "1"
   */
  applicationStatus?: string;
  /**
   * 나눔 신청 상태명
   * @example "수락 대기 중"
   */
  applicationStatusName?: string;
  /**
   * 메모
   * @example "나눔 신청 메모"
   */
  memo?: string;
  /** 나눔 장소 정보 DTO */
  location?: ApplicationLocationDto;
  /** 나눔 신청 믈픔 DTO */
  item?: ApplicationItemDto;
  /** 나눔 신청 가능 시간 목록 */
  appAvailabilities?: AppAvailabilityDto[];
}

/** ApplicationSearchResponse의 페이징 응답 */
export interface ApplicationSearchResponsePage {
  content?: ApplicationSearchResponse[];
  pageable?: PageableObject;
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  last?: boolean;
  /** @format int32 */
  size?: number;
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  /** @format int32 */
  numberOfElements?: number;
  first?: boolean;
  empty?: boolean;
}

export interface PageableObject {
  /** @format int64 */
  offset?: number;
  sort?: SortObject;
  /** @format int32 */
  pageSize?: number;
  paged?: boolean;
  unpaged?: boolean;
  /** @format int32 */
  pageNumber?: number;
}

export interface SortObject {
  empty?: boolean;
  unsorted?: boolean;
  sorted?: boolean;
}

/** @example {"status":"success","data":{}} */
export type ReissueData = string;

export type LoginData = any;

export type LoginError = string;

/** @example {"status":"success","data":{}} */
export type LogoutData = string;

export type AddItemData = string;

export type AddItemError = string;

/** @example {"status":"success","data":[{"groupCode":"AP001","groupCodeName":"나눔신청상태코드","mngDes1":"","mngDes2":"","mngDes3":"","mngDes4":"","description":"나눔 신청 상태 코드입니다.","useYn":"Y"}]} */
export type RetrieveGroupCodes1Data = string;

export type RetrieveGroupCodes1Error = string;

/** @example {"status":"success","data":{"groupCode":"10002","groupCodeName":"테스트 코드","mngDes1":"string","mngDes2":"string","mngDes3":"string","mngDes4":"string","description":"테스트 그룹 코드 입니다.","useYn":"Y"},"_links":{"self":{"href":"http://localhost:8080/v1/group-codes/10002"},"all-group-codes":{"href":"http://localhost:8080/v1/group-codes"}}} */
export type CreateGroupCodeData = string;

export type CreateGroupCodeError = string;

export type CreateCodeData = any;

export type CreateCodeError = string;

export type RetrieveApplicationsData = ApplicationSearchResponsePage;

export type CreateApplicationData = ApplicationCreateResponse;

export type CreateApplicationError = string;

/** @example {"status":"success","data":{"groupCode":"AP001","groupCodeName":"나눔신청상태코드","mngDes1":"","mngDes2":"","mngDes3":"","mngDes4":"","description":"나눔 신청 상태 코드입니다.","useYn":"Y","codes":[{"code":"1","codeKorName":"수락 대기 중","codeEngName":"WAITING","mngItem1":"","mngItem2":"","mngItem3":"","mngItem4":"","description":"","useYn":"Y","codeSeq":1}]}} */
export type RetrieveCodesData = string;

/** @example {"status":"success","data":{"groupCode":"AP001","groupCodeName":"나눔신청상태코드","mngDes1":"","mngDes2":"","mngDes3":"","mngDes4":"","description":"나눔 신청 상태 코드입니다.","useYn":"Y","codes":[{"code":"1","codeKorName":"수락 대기 중","codeEngName":"WAITING","mngItem1":"","mngItem2":"","mngItem3":"","mngItem4":"","description":"","useYn":"Y","codeSeq":1}]}} */
export type RetrieveCodes1Data = string;

/** @example {"status":"success","data":[{"groupCode":"AP001","groupCodeName":"나눔신청상태코드","mngDes1":"","mngDes2":"","mngDes3":"","mngDes4":"","description":"나눔 신청 상태 코드입니다.","useYn":"Y"}]} */
export type RetrieveGroupCodesData = string;

export type RetrieveGroupCodesError = string;

export type RetrieveAllUsersData = string;

export type RetrieveUserTestData = string;
