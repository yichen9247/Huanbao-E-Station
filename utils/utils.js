
import config from "@/config";

/**
 * 获取当前日期对应的星期几
 * @returns {string} 当前日期对应的星期几，例如：'星期一'
 */
export const getWeekDay = () => {
	const today = new Date();
	const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	return days[today.getDay()];
}

/**
 * 获取当前日期并以 YYYY/MM/DD 格式返回。
 * @returns {string} 格式化后的当前日期字符串。
 */
export const getDate = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}/${month}/${day}`;
}

/**
 * @name 日期比较器
 * @param {Object} dateStr
 */
export const isSameDay = (dateStr) => {
	const givenDate = new Date(dateStr);
	const today = new Date();
	return givenDate.getFullYear() === today.getFullYear() && givenDate.getMonth() === today.getMonth() && givenDate.getDate() === today.getDate();
}

/**
 * 根据图片列表获取分割后的第一个图片的URL。
 * @param {string} imageList - 以逗号分隔的图片列表字符串。
 * @returns {string} 返回拼接后的第一个图片的完整URL。
 */
export const getSplitByImagelist = (imageList) => {
	return config.baseUrl + '' + imageList.split(',')?.[0]
}

/**
 * 预览图片
 * @param {Object} item - 图片对象
 * @param {Number} index - 当前图片索引
 * @description 使用uni-app的previewImage方法预览图片，传入当前图片索引和图片URL数组。
 */
export const previewImage = (item, index) => {
	uni.previewImage({
		current: index,
		urls: item
	});
}

/**
 * 根据图片列表获取分割后所有图片的URL列表。
 * @param {string} imageList - 以逗号分隔的图片列表字符串。
 * @returns {string[]} 返回拼接后的所有图片的完整URL列表。
 */
export const getSplitListByImagelist = (imageList) => {
	return imageList.split(',').map(image => config.baseUrl + '' + image.trim());
}

/**
 * 根据时间戳获取格式化的日期和时间字符串。
 * @param {number} timeStamp - 时间戳（毫秒）
 * @returns {string} 格式为 'YYYY-MM-DD HH:mm' 的日期时间字符串
 */
export const getDateByTimeStamp = (timeStamp) => {
	const date = new Date(timeStamp);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * 获取当前日期的字符串表示，格式为 YYYY-MM-DD。
 * @returns {string} 当前日期的字符串表示。
 */
export const getTodayDate = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}