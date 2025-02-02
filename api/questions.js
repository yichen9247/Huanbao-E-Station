import {
    ajax
} from "@/utils/ajax"


/**
 * 获取问题列表
 * @param {Object} options - 请求参数
 * @param {number} options.page - 页码
 * @param {number} options.limit - 每页数量
 * @returns {Promise} 返回问题列表的Promise对象
 */
export function getQuestionsList({ page, limit }) {
    return ajax("/questions/list", "GET", { data: { page, limit } })
}

/**
 * 获取问题排名列表
 * @param {Object} options - 参数对象
 * @param {number} options.page - 页码
 * @param {number} options.limit - 每页数量
 * @returns {Promise} - 返回一个 Promise 对象，包含请求的结果
 */
export const geyQuestionsRankList = ({ page, limit }) => {
    return ajax("/questions/rankings/list", "GET", { data: { page, limit } });
}

/**
 * 记录问题排名信息。
 * @param {Object} params - 包含请求参数的对象。
 * @param {number} params.useTime - 使用时间。
 * @param {Function} params.success - 请求成功时的回调函数。
 * @param {Function} params.error - 请求失败时的回调函数。
 * @returns {Promise} 返回一个 Promise 对象，表示异步操作的最终完成（或失败）及其结果值。
 */
export const recordQuestionRankings = ({ useTime, success, error }) => {
    return ajax("/questions/rankings/record", "POST", { data: { useTime, success, error } });
}