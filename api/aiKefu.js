import {
	ajax
} from '@/utils/ajax';

/**
 * 创建一个新的对话会话。
 * 通过发送 GET 请求到 '/ai/createConversation' 端点来实现。
 * @returns {Promise} 返回一个 Promise 对象，该对象在请求成功时解析为服务器响应。
 */
export function createConversation() {
    return ajax("/ai/createConversation", "GET", { data: {} })
}

/**
 * 发起AI客服聊天请求
 * @param {Object} options - 请求参数
 * @param {string} options.query - 用户输入的查询内容
 * @returns {Promise} - 返回一个Promise对象，包含AI客服的响应结果
 * 该函数首先检查本地存储中是否存在有效的会话ID，如果不存在则创建新会话，
 * 并将会话ID存储在本地。然后使用会话ID和用户的查询内容发起AI客服查询请求。
 */
export function aiKefuChat({ query }) {
    let dataId = uni.getStorageSync('conversationId');
    if (dataId === null || dataId.length === undefined) {
        return createConversation().then(response => {
            uni.setStorageSync('conversationId', response.data);
            return ajax("/ai/query", "POST", { data:{
                query: query,
                conversationId: response.data
            } })
        });
    } else {
        return ajax("/ai/query", "POST", { data:{
            query: query,
            conversationId: dataId
        } })
    }
}