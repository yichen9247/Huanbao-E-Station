import {
    ajax
} from "@/utils/ajax"

/**
 * 获取产品订单地址列表
 * @returns {Promise} 返回一个 Promise 对象，包含订单地址列表数据
 * @returns {*}
 */
export function getProductsOrderAddressList() {
    return ajax("/products/orders/address/list", "GET", { data: {} });
}

/**
 * 创建产品订单地址
 * @param {Object} params - 请求参数
 * @param {Object} params.data - 订单地址数据
 * @returns {Promise} - 返回创建订单地址的Promise对象
 */
export function createProductsOrderAddress({ data }) {
    return ajax("/products/orders/address/create", "POST", { data: data });
}

export function createOrderS({ data }) {
	return ""
}

/**
 *  支付订单
 * @param orderId 订单ID
 * @param mode 支付方式
 * @returns {*}
 */
export function paymentProductsOrder({ orderId, mode }) {
    return ajax("/products/order/payment","POST", {
        data: {
            orderId,
            mode
        }
    })
}

/**
 * 创建订单（购买商品)
 * @param productsId 商品ID
 * @param quantity 购买数量
 * @param shippingAddress 地址ID
 * @returns {*}
 */
export function createProductsOrder({ productsId, quantity, addressId }) {
    return ajax("/products/order/create","POST", {
        data: {
            productsId,
            quantity,
            addressId
        }
    });
}

/**
 * 订单详情
 * @param orderId 订单ID
 * @returns {*}
 */
export function getProductsOrders({ orderId }) {
    return ajax("/products/order/" + orderId, "GET", { data: {} });
}


/**
 * 获取用户订单列表
 */
export function getProductsOrderList({ code }) {
	return ajax("/products/order/list", "GET", { data: { code } });
}