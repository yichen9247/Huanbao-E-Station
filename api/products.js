import {
    ajax
} from "@/utils/ajax"

/**
 * 获取最新商品列表
 * @param page
 * @param limit
 * @returns {*}
 */
export function getProductsList({ page, limit} ) {
    return ajax("/products/list", "GET", { data: { page, limit } });
}

/**
 * 分类获取商品列表
 * @param categoryId
 * @returns {*}
 */
export function getProductsListCategoryId({ categoryId }) {
	return ajax("/products/list/categoryId/" + categoryId, "GET", { data: {} });
}

/**
 * 创建商品
 * @param name
 * @param description 介绍
 * @param price 结果
 * @param quantity 库存
 * @param imageList 图片
 * @returns {*}
 */
export function createProducts({ data }) {
    return ajax("/products/create", "POST", { data: data });
}

/**
 * 商品详情
 * @param productId
 * @returns {*}
 */
export function getProductsListID({ productId }) {
	return ajax("/products/list/" + productId, "GET", { data: {} });
}

/**
 * 获取产品分类列表
 * @returns {Promise} 返回一个 Promise 对象，解析为产品分类列表数据
 */
export function getProductsClassityList() {
    return ajax("/products/classify/list", "GET", { data: {} });
}
