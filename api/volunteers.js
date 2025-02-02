import {
	ajax
} from '@/utils/ajax';

/**
 * 获取志愿者任务列表
 * @returns {Promise} 返回一个包含志愿者任务列表的 Promise 对象
 */
export const getVolunteerTaskList = () => {
    return ajax("/volunteers/task/list", "GET", { data: {} });
}

/**
 * 注册志愿者的API接口。
 * @param {Object} params - 包含志愿者注册信息的参数对象。
 * @param {Object} params.data - 志愿者注册所需的数据。
 * @returns {Promise} 返回一个Promise对象，该对象在请求成功时解析为服务器响应。
 */
export const signUpVlunteer = ({ data }) => {
    return ajax("/volunteers/register", "POST", { data: data });
}

/**
 * 获取志愿者任务详情
 * @param {Object} params - 参数对象
 * @param {string} params.id - 任务ID
 * @returns {Promise} - 返回一个Promise对象，包含任务详情数据
 */
export const getVolunteerTaskDetail = ({ id }) => {
    return ajax("/volunteers/task/" + id, "GET", { data: {} });
}

/**
 * 注册志愿者任务
 * @param {Object} params - 参数对象
 * @param {string} params.taskId - 任务ID
 * @returns {Promise} - 返回ajax请求的Promise对象
 * @description 调用此函数可以向服务器注册一个志愿者任务。
 */
export const signUpVlounteerTask = ({ taskId }) => {
    return ajax("/volunteers/task/register", "POST", { data: { taskId } });
}

/**
 * 获取志愿者新闻列表
 * @returns {Promise} 返回一个包含志愿者新闻列表的Promise对象
 */
export const getVolunteerNewsList = () => {
    return ajax("/volunteers/news/list", "GET", { data: {} });
}

/**
 * 获取志愿者新闻详情
 * @param {Object} params - 参数对象
 * @param {string} params.id - 新闻ID
 * @returns {Promise} - 返回一个Promise对象，包含新闻详情数据
 */
export const getVolunteerNewsDetail = ({ id }) => {
    return ajax("/volunteers/news/" + id, "GET", { data: {} });
}