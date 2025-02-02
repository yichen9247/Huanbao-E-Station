import {
	ajax
} from '@/utils/ajax';

/**
 * 获取最环保的小贴士列表。
 * 通过发送 GET 请求到 '/greenest/tips/' 端点来获取数据。
 * @returns {Promise} 返回一个包含请求结果的 Promise 对象。
 */
export const getGreenestTipsList = () => {
	return ajax("/greenest/tips/", "GET", { data: {} });
}

/**
 * 获取最环保的建议
 * @param {Object} params - 请求参数对象
 * @param {string} params.id - 建议的唯一标识符
 * @returns {Promise} 返回一个 Promise 对象，包含请求的结果
 */
export const getGreenestTips = ({ id }) => {
	return ajax("/greenest/tips/" + id, "GET", { data: {} });
}
