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

export interface UserProfileRequest {
  /** @format binary */
  profileImage?: File;
  /** 닉네임 */
  nickname: string;
  /**
   * 프로필 사진 삭제 여부
   * @example "Y/N"
   */
  hasRemovedProfile: string;
}

export interface ApiCommonResponseObject {
  status?: string;
  data?: object;
  message?: string;
  code?: string;
}

export interface TokenRequestDto {
  externalToken: string;
}

/** 나눔 가능 시간 DTO */
export interface ItemAvailabiltyDto {
  /**
   * 요일 코드
   * @example "1"
   */
  dayOfWeek: string;
  /**
   * 시작시간
   * @pattern ^[0-9]{4}$
   * @example "1300"
   */
  startTime?: string;
  /**
   * 종료시간
   * @pattern ^[0-9]{4}$
   * @example "1659"
   */
  endTime?: string;
}

/** 아이템 생성 요청 JSON */
export interface ItemCreateRequest {
  /**
   * 물품명
   * @minLength 0
   * @maxLength 150
   * @example "자바의 정석"
   */
  itemName: string;
  /**
   * 카테고리 코드
   * @example "1"
   */
  categoryCode: string;
  /**
   * 물품상태코드
   * @example "11"
   */
  itemStatus: string;
  /**
   * 나눔 가능 장소 DTO
   * @maxItems 2
   * @minItems 1
   */
  itemLocations: ItemLocationDto[];
  /**
   * 물품 상세 설명
   * @minLength 0
   * @maxLength 1000
   * @example "새상품입니다."
   */
  itemDescription?: string;
}

/** 나눔 가능 장소 DTO */
export interface ItemLocationDto {
  /**
   * 주소
   * @minLength 0
   * @maxLength 500
   * @example "서울 강남구 테헤란로 538"
   */
  address: string;
  /**
   * 상세길안내
   * @minLength 0
   * @maxLength 500
   * @example "지상 삼성역 5번출구 앞"
   */
  addressDescription?: string;
  /**
   * 지역구
   * @minLength 0
   * @maxLength 30
   * @example "강남구"
   */
  district: string;
  /**
   * 동정보
   * @minLength 0
   * @maxLength 30
   * @example "삼성동"
   */
  dong: string;
  /**
   * 위도
   * @example 37.508587
   */
  latitude: number;
  /**
   * 경도
   * @example 127.06302
   */
  longitude: number;
  /**
   * 오늘번개여부
   * @pattern ^[YN]$
   * @example "N"
   */
  lightningYn?: string;
  /**
   * 즐겨찾는 장소 아이디(PK)
   * @format int64
   * @example 1
   */
  favoritePlaceId?: number;
  /**
   * 즐겨찾는 장소 유형 코드(H:집근처, W:회사근처, E:기타)
   * @example "H"
   */
  placeType?: string;
  /** 나눔 가능 시간 DTO */
  itemAvailabilities?: ItemAvailabiltyDto[];
}

export interface ItemCreateResponse {
  /**
   * 물품ID
   * @format int64
   * @example 1
   */
  itemId?: number;
  /**
   * 물품명
   * @example "자바의 정석"
   */
  itemName?: string;
  /**
   * 카테고리명
   * @example "도서"
   */
  categoryName?: string;
  /**
   * 물품상태명
   * @example "포장도 뜯지 않은 새것"
   */
  itemStatusName?: string;
  /**
   * 물품 상세 설명
   * @example "새상품입니다."
   */
  itemDescription?: string;
  /**
   * 물품 썸네일 URL
   * @example "https://letthinggo-bucket.s3.ap-northeast-2.amazonaws.com/item_thumb_ec9221b5fbee4eec9302905ab723020e.jpg"
   */
  itemThumbnailUrl?: string;
  /** 나눔 가능 장소 DTO */
  itemLocations?: ItemLocationResponse[];
  failedUploads?: string[];
}

/** 나눔 가능 장소 DTO */
export interface ItemLocationResponse {
  /**
   * 주소
   * @example "서울 강남구 테헤란로 538"
   */
  address?: string;
  /**
   * 번개여부
   * @example true
   */
  isLightning?: boolean;
  /**
   * 일정 제안 받기 여부
   * @example false
   */
  isScheduleSuggestible?: boolean;
}

/** 나눔 신청 가능 시간 DTO */
export interface ItemRequestAvailabilityDto {
  /**
   * 나눔신청가능시간ID
   * @format int64
   * @example 1
   */
  itemRequestAvailabilityId?: number;
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
  requestAvailabilityStatus?: string;
}

/** 나눔 신청 생성 요청 DTO */
export interface ItemRequestCreateRequest {
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
  itemRequestAvailabilities?: ItemRequestAvailabilityDto[];
}

/** 나눔 신청 생성 응답 DTO */
export interface ItemRequestCreateResponse {
  /**
   * 나눔신청ID
   * @format int64
   * @example 1
   */
  itemRequestId?: number;
  /**
   * 메모
   * @example "나눔 신청 메모"
   */
  memo?: string;
  /** 나눔 장소 정보 DTO */
  location?: ItemRequestLocationDto;
  /** 나눔 신청 가능 시간 목록 */
  itemRequestAvailabilities?: ItemRequestAvailabilityDto[];
}

/** 나눔 장소 정보 DTO */
export interface ItemRequestLocationDto {
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

export interface CodeSearchRequest2 {
  /**
   * 그룹코드값
   * @minLength 0
   * @maxLength 6
   * @example "IT001"
   */
  groupCode: string;
  /**
   * 공통코드값
   * @minLength 0
   * @maxLength 20
   * @example "1"
   */
  code?: string;
  /**
   * 사용여부
   * @pattern ^[YN]$
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

export interface PageableObject {
  /** @format int64 */
  offset?: number;
  sort?: SortObject;
  /** @format int32 */
  pageSize?: number;
  paged?: boolean;
  /** @format int32 */
  pageNumber?: number;
  unpaged?: boolean;
}

/** 나눔 신청 믈픔 DTO */
export interface RequestedItemDto {
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

export interface SortObject {
  empty?: boolean;
  unsorted?: boolean;
  sorted?: boolean;
}

/** 내 나눔 신청 리스트 DTO */
export interface UserItemRequestSearchResponse {
  /**
   * 나눔신청ID
   * @format int64
   * @example 1
   */
  itemRequestId?: number;
  /**
   * 일정조율상태메시지
   * @example "바쁜날다람쥐님의 나눔 수락 대기 중"
   */
  scheduleProcessMessage?: string;
  /**
   * 나눔 신청 상태
   * @example "1"
   */
  requestStatus?: string;
  /**
   * 나눔 신청 상태명
   * @example "수락 대기 중"
   */
  requestStatusName?: string;
  /**
   * 메모
   * @example "나눔 신청 메모"
   */
  memo?: string;
  /** 나눔 장소 정보 DTO */
  location?: ItemRequestLocationDto;
  /** 나눔 신청 믈픔 DTO */
  item?: RequestedItemDto;
  /** 나눔 신청 가능 시간 목록 */
  itemRequestAvailabilities?: ItemRequestAvailabilityDto[];
}

/** ApplicationSearchResponse의 페이징 응답 */
export interface UserItemRequestSearchResponsePage {
  content?: UserItemRequestSearchResponse[];
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

export interface UserHistoryDto {
  /** @format int32 */
  naumCount?: number;
  /** @format int32 */
  sendReviewCount?: number;
  /** @format int32 */
  receiveReviewCount?: number;
}

export interface UserProfileResponse {
  nickname?: string;
  profileUrl?: string;
  history?: Record<string, UserHistoryDto>;
}

export interface ItemDto {
  /**
   * 물품ID
   * @format int64
   * @example 1
   */
  itemId?: number;
  /**
   * 물품명
   * @example "자바의 정석"
   */
  itemName?: string;
  /**
   * 물품 썸네일 URL
   * @example "https://letthinggo-bucket.s3.ap-northeast-2.amazonaws.com/item_thumb_ec9221b5fbee4eec9302905ab723020e.jpg"
   */
  itemThumbnailUrl?: string;
}

/** 나눔 물품 리스트 DTO */
export interface ItemSearchRequest {
  /**
   * 카테고리 코드
   * @example "1"
   */
  categoryCode?: string;
  /**
   * 물품상태코드
   * @example "11"
   */
  itemStatus?: string;
  /**
   * 요일 코드
   * @example "1"
   */
  dayOfWeek?: string;
}

/** 나눔 물품 리스트 DTO */
export interface ItemSearchResponse {
  /**
   * 나눔물품ID
   * @format int64
   * @example 1
   */
  itemId?: number;
  /**
   * 물품명
   * @example "Java의 정석"
   */
  itemName?: string;
  /**
   * 동정보
   * @example "삼성동"
   */
  dongList?: string;
  /** 나눔 가능 요일 */
  availableDayList?: string;
  /**
   * 오늘 번개 가능 여부
   * @example true
   */
  isLightningAvailableToday?: boolean;
  /**
   * 일정 제안 가능 여부
   * @example false
   */
  isScheduleSuggestible?: boolean;
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

export type GetUserInfoData = UserProfileResponse;

export type SaveUserProfileData = string;

export type ItemBookmarkData = ApiCommonResponseObject;

/** @example {"status":"success","data":{}} */
export type ReissueData = string;

export type LoginData = any;

export type LoginError = string;

/** @example {"status":"success","data":{}} */
export type LogoutData = string;

export type RetrieveItemsData = ItemSearchResponse;

export interface CreateItemPayload {
  /** 아이템 생성 요청 JSON */
  itemCreateRequest: ItemCreateRequest;
  /** 물품 첨부 이미지 */
  itemImages: File[];
}

export type CreateItemData = ItemCreateResponse;

export type CreateItemError = string;

export type CreateItemRequestData = ItemRequestCreateResponse;

export type CreateItemRequestError = string;

/** @example {"status":"success","data":[{"groupCode":"AP001","groupCodeName":"나눔신청상태코드","mngDes1":"","mngDes2":"","mngDes3":"","mngDes4":"","description":"나눔 신청 상태 코드입니다.","useYn":"Y"}]} */
export type RetrieveGroupCodes1Data = string;

export type RetrieveGroupCodes1Error = string;

/** @example {"status":"success","data":{"groupCode":"10002","groupCodeName":"테스트 코드","mngDes1":"string","mngDes2":"string","mngDes3":"string","mngDes4":"string","description":"테스트 그룹 코드 입니다.","useYn":"Y"},"_links":{"self":{"href":"http://localhost:8080/v1/group-codes/10002"},"all-group-codes":{"href":"http://localhost:8080/v1/group-codes"}}} */
export type CreateGroupCodeData = string;

export type CreateGroupCodeError = string;

export type RetrieveCodesByGroupCodesPayload = CodeSearchRequest2[];

/** @example {"status":"success","data":{"AP001":[{"code":"1","codeKorName":"수락 대기 중","codeEngName":"WAITING","mngItem1":"","mngItem2":"","mngItem3":"","mngItem4":"","description":"","useYn":"Y","codeSeq":1}]}} */
export type RetrieveCodesByGroupCodesData = string;

export type CreateCodeData = any;

export type CreateCodeError = string;

export type RetrieveUserRequestsData = UserItemRequestSearchResponsePage;

export type GenerateNicknameData = any;

export type RetrieveUserFavoritePlacesData = any;

export type RetrieveUserFavoritePlaceByPlaceTypeData = any;

export type RetrieveUserFavoritePlaceByPlaceTypeError = string;

export type RetrieveBookmarkedItemsData = ItemDto;

/** @example {"status":"success","data":{"AP001":[{"code":"1","codeKorName":"수락 대기 중","codeEngName":"WAITING","mngItem1":"","mngItem2":"","mngItem3":"","mngItem4":"","description":"","useYn":"Y","codeSeq":1}]}} */
export type RetrieveCodesData = string;

/** @example {"status":"success","data":{"AP001":[{"code":"1","codeKorName":"수락 대기 중","codeEngName":"WAITING","mngItem1":"","mngItem2":"","mngItem3":"","mngItem4":"","description":"","useYn":"Y","codeSeq":1}]}} */
export type RetrieveCodes1Data = string;

/** @example {"status":"success","data":[{"groupCode":"AP001","groupCodeName":"나눔신청상태코드","mngDes1":"","mngDes2":"","mngDes3":"","mngDes4":"","description":"나눔 신청 상태 코드입니다.","useYn":"Y"}]} */
export type RetrieveGroupCodesData = string;

export type RetrieveGroupCodesError = string;

export type RetrieveAllUsersData = string;

export type RetrieveUserTestData = string;

/** @example {"status":"success","data":{}} */
export type DeleteCookieData = string;
