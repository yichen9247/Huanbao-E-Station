import {
	ajax
} from '@/utils/ajax'

/**
 * 获取用户签到列表。
 * @returns {Promise} 返回一个 Promise 对象，该对象在请求成功时解析为服务器响应数据。
 */
export function signList() {
	return ajax("/user/sign-in/list", "GET", { data: {} });
}

/**
 * 用户登录签名接口
 * @returns {Promise} 返回ajax请求的Promise对象
 */
export function sign() {
	return ajax("/user/sign-in/sign", "GET", { data: {} });
}

/**
 * 获取今天的任务列表。
 * 通过发送 GET 请求到 '/task/list' 接口来获取任务列表。
 * @returns {Promise} 返回一个 Promise 对象，该对象在请求成功时解析为任务列表数据。
 */
export function getTodayTaskList() {
	return ajax("/task/list", "GET", { data: {} });
} 