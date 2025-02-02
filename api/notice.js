import {
	ajax
} from "../utils/ajax";


/**
 * 获取用户消息列表
 * code 0 1 2 3 分别为 全部 活动 消息 物流
 */
export const getUserNoticeList = ({ code }) => {
	return ajax("/user/ajax", "GET", { data: { code } });
}