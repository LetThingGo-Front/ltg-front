interface ItemSearchRequestPagination {
  /**
   * 동
   * @example "서초동"
   */
  dong?: string;
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

export type { ItemSearchRequestPagination };
