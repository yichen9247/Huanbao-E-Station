import {
	ajax
} from '@/utils/ajax';

/**
 * 获取竞赛项目列表
 * @returns {Promise} 返回一个 Promise 对象，包含竞赛项目列表的数据
 */
export const getCompetitionProjectList = ({ page, limit }) => {
    return ajax("/competitions/project/list", "GET", { data: { page, limit } });
}

/**
 * 获取竞赛项目详情
 * @param {Object} params - 参数对象
 * @param {string} params.id - 竞赛项目的ID
 * @returns {Promise} - 返回一个Promise对象，解析为竞赛项目的详细信息
 */
export const getCompetitionProjectDetail = ({ id }) => {
    return ajax("/competitions/project/" + id, "GET", { data: {} });
}

/**
 * 获取指定项目的竞赛艺术品列表。
 * @param {Object} params - 请求参数对象。
 * @param {string} params.projectId - 项目ID。
 * @param {number} [params.page=1] - 页码，默认为1。
 * @param {number} [params.limit=10] - 每页数量，默认为10。
 * @returns {Promise} 返回一个Promise对象，包含艺术品列表的响应数据。
 */
export const getCompetitionArtworkList = ({ projectId, page, limit }) => {
    return ajax("/competitions/artwork/list", "GET", { data: { projectId, page, limit } });
}

/**
 * 获取指定项目的热门竞赛主持人答案列表。
 * @param {Object} params - 请求参数对象。
 * @param {string} params.projectId - 项目ID。
 * @returns {Promise} 返回一个Promise对象，解析为从服务器获取的数据。
 */
export const getCompetitionHotArtworkList = ({ projectId }) => {
    return ajax("/competitions/artwork/hot/list", "GET", { data: { projectId } });
}

/**
 * 获取指定竞赛艺术作品的详细信息。
 * @param {Object} params - 包含请求参数的对象。
 * @param {string} params.id - 艺术作品的ID。
 * @returns {Promise} 返回一个Promise对象，解析为竞赛艺术作品的详细信息。
 */
export const getCompetitionArtworkDetail = ({ id }) => {
    return ajax("/competitions/artwork/" + id, "GET", { data: {} });
}

/**
 * 获取投票竞赛的艺术作品信息。
 * @param {Object} params - 包含竞赛ID的对象。
 * @param {string} params.id - 竞赛的唯一标识符。
 * @returns {Promise} 返回一个Promise对象，该对象解析为从服务器获取的艺术作品数据。
 */
export const votingCompetitionArtwork = ({ id }) => {
    return ajax("/competitions/artwork/voting/" + id, "GET", { data: {} });
}

/**
 * 注册参加竞赛项目的函数。
 * @param {Object} params - 包含请求数据的参数对象。
 * @param {Object} params.data - 要发送到服务器的数据。
 * @returns {Promise} 返回一个 Promise 对象，表示异步请求的结果。
 */
export const signUpCompetitionProject = ({ data }) => {
    return ajax("/competitions/project/create", "POST", { data });
}

/**
 * 提交竞赛作品
 * @param {Object} params - 包含提交数据的参数对象
 * @param {Object} params.data - 要提交的作品数据
 * @returns {Promise} - 返回一个 Promise 对象，表示异步请求的结果
 */
export const submitCompetitionArtwork = ({ data }) => {
    return ajax("/competitions/artwork/create", "POST", { data: data });
}