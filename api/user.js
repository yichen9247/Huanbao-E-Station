import {
	ajax
} from '@/utils/ajax';

/**
 * 获取当前用户的个人信息。
 * @returns {Promise} 返回一个 Promise 对象，成功时包含用户信息的响应数据。
 */
export const getUserMyInfo = () => {
	return ajax("/user/my/info", "GET", { data: {} });
}

/**
 * 获取用户的邮箱验证码
 * @param {Object} params - 请求参数对象
 * @param {string} params.email - 用户的邮箱地址
 * @returns {Promise} 返回一个Promise对象，表示异步获取邮箱验证码的结果
 */
export const getUserEmailCode = ({ email }) => {
	return ajax("/user/email/code", "GET", {
		data: {
			"email": email,
		}
	});
}

/**
 * 忘记密码功能，用于重置用户密码。
 * @param {Object} params - 包含用户名和新密码的对象。
 * @param {string} params.username - 用户的用户名。
 * @param {string} params.password - 用户的新密码。
 * @returns {Promise} - 返回一个Promise对象，该对象在请求成功时解析为服务器响应。
 */
export const forgetPassword = ({ username, password }) => {
	return ajax("/user/reset/password", "POST", {
		data: {
			"username": username,
			"password": password
		}
	});
}

/**
 * 更新用户密码的API函数。
 * @param {Object} params - 包含用户密码更新数据的参数对象。
 * @param {Object} params.data - 需要更新的用户密码数据。
 * @returns {Promise} - 返回一个Promise对象，该对象在请求成功时解析为服务器响应。
 */
export const updatePassword = ({ data }) => {
	return ajax("/user/update/password", "POST", { data: data });
}

/**
 * 用户登录函数
 * @param {Object} params - 包含用户名和密码的对象
 * @param {string} params.username - 用户名
 * @param {string} params.password - 密码
 * @returns {Promise} - 返回一个Promise对象，包含登录请求的结果
 * @description 该函数用于处理用户登录请求，通过ajax向服务器发送POST请求，包含用户名和密码
 */
export const login = ({ username, password }) => {
	return ajax("/user/login", "POST", {
		data: {
			"username": username,
			"password": password
		}
	})
}

/**
 * 注册新用户
 * @param {Object} userInfo - 包含用户名、密码和电子邮件的对象
 * @param {string} userInfo.username - 用户名
 * @param {string} userInfo.password - 密码
 * @param {string} userInfo.email - 电子邮件地址
 * @returns {Promise} - 返回一个Promise对象，表示注册请求的结果
 */
export const register = ({ username, password, email }) => {
	return ajax("/user/register", "POST", {
		data: {
			"username": username,
			"password": password,
			"email": email
		}
	});
}

/**
 * 更新用户信息的确认函数。
 * @param {Object} params - 包含用户照片和昵称的对象。
 * @param {string} params.photo - 用户的新照片。
 * @param {string} params.nickname - 用户的新昵称。
 * @returns {Promise} 返回一个 Promise 对象，该对象在请求成功时解析为服务器响应。
 * @example
 * confirmEditUserInfo({ photo: 'newPhoto.jpg', nickname: 'newNickname' });
 */
export const confirmEditUserInfo = ({ photo, nickname }) => {
	return ajax("/user/update/info", "POST", { data: { photo, nickname } });
}

/**
 * 分类获取用户消息列表
 * @param { number } code 消息类型
 */
export const getUserNoticeList  = ({ code }) => {
	return ajax("/user/notice/list", "GET", { data: { code } });
}