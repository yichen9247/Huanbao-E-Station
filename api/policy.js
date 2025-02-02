import {
	ajax
} from '@/utils/ajax';

/**
 * 获取政策新闻列表
 * @returns {Promise} 返回一个 Promise 对象，解析为从 '/policy/news/list' 获取的新闻列表数据
 */
export const getPolicyNewsList = () => {
	return ajax("/policy/news/list", "GET", { data: {} });
}

/**
 * 获取指定ID的政策新闻。
 * @param {Object} params - 包含请求参数的对象。
 * @param {string} params.id - 新闻的唯一标识ID。
 * @returns {Promise} 返回一个Promise对象，该对象将在请求成功时解析为响应数据。
 */
export const getPolicyNews = ({ id }) => {
	return ajax("/policy/news/" + id, "GET", { data: {} });
}