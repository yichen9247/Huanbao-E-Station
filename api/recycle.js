import {
	ajax
} from "../utils/ajax";

/**
 * 获取附近的回收站点列表
 * 无参数
 */
export const getRecyclePlaceList = () => {
	return ajax("/recycle/place", "GET", { data: { } });
}