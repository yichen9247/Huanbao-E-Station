import {
	ajax
} from '@/utils/ajax';

/**
 * 获取轮播图列表
 * @param {Object} options - 参数对象
 * @param {string} options.type - 轮播图类型
 * @returns {Promise} - 返回一个 Promise 对象，解析为从服务器获取的轮播图列表数据
 */
export const getSwiperList = ({ types }) => {
	return ajax("/ad/list", "GET", { data: { types } });
}
