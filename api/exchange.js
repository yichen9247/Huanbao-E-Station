import {
	ajax
} from '@/utils/ajax';


/**
 * 创建交易所订单
 * @param {Object} options - 订单创建选项
 * @param {string} options.shopId - 商店ID
 * @param {number} options.quantity - 数量
 * @param {string} options.address - 地址
 * @returns {Promise} - 返回一个Promise对象，包含订单创建的结果
 */
export const createExchangeOrder = ({
	shopId,
	quantity,
	address
}) => {
	return ajax("/exchange/create", "POST", {
		data: {
			shopId,
			quantity,
			address
		}
	});
}

/**
 * 获取交易所订单列表
 * @param {Object} options - 请求参数
 * @param {string} options.status - 订单状态
 * @returns {Promise} 返回一个 Promise 对象，解析为订单列表数据
 */
export const getExchangeOrderList = ({
	status
}) => {
	return ajax("/exchange/list", "GET", {
		data: {
			status,
		}
	});
}

/**
 * 获取指定订单的交换信息。
 * @param {Object} params - 请求参数对象。
 * @param {string} params.orderId - 需要查询的订单ID。
 * @returns {Promise} 返回一个Promise对象，该对象在请求成功时解析为交换订单的数据。
 */
export const getExchangeOrder = ({
	orderId
}) => {
	return ajax("/exchange/" + orderId, "GET", { data: {} });
}


/**
 * 获取交易所列表
 * @returns {Promise} 返回一个包含交易所列表的 Promise 对象
 */
export const getExchangeList = () => {
	return ajax('/exchange/list', "GET", { data: {} });
}