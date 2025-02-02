import config from "@/config"
import CryptoJS from "crypto-js"
import { error } from "uview-plus";
const key = "tiankong"
const keys = "aaaabbbbccccddddeeeeffffgggghhhh";
const iv = "1234567812345678";

export const ajax = (url, method, params = {
	data: {}
}) => {
	//请求前
	let header = {
		"token": uni.getStorageSync("token"),
	}
	
	let str = ""
	if (!params.data) {
		params = {
			data: {}
		}
	}
	if (params.data) {
		for (let item in params.data) {
			let items = params.data[item]
			if (items !== 0 && !items) {
				delete params.data[item]
			}
		}
		//参数签名
		let Obj = Object.keys(params.data)
		Obj.forEach(item => {
			str += item + "=" + params.data[item] + "&"
		})
		str += "key=" + key
		header["key"] = CryptoJS.MD5(str).toString()

	}
	if (method === "POST") {
		header['Content-Type'] = "application/x-www-form-urlencoded";
		params["data"] = URLSearchParams(params.data);
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.baseUrl + url,
			method: method,
			data: params.data,
			header: header,
			// timeout: 10000,
			success(res) {
				res = decrypt(res.data);
				if (res['code'] == 200) {
					resolve(res);
				} else {
					switch (res['code']) {
						case 401: {
							if (url !== '/user/my/info') {
								uni.navigateTo({
									url: "/pages/app-account/app-login"
								});
							} else resolve(res);
						}
					}
					reject(res)
				}
			},
			fail(e) {
				uni.showToast({
					icon: 'none',
					title: e.errMsg
				});
				reject(e);
			}
		})
	})
}

/**
 * 解密函数，用于解密传入的JSON对象中的数据。
 * 如果JSON对象包含validation字段，则使用AES算法进行解密。
 * @param {Object} json - 需要解密的JSON对象，其中应包含data和iv字段。
 * @returns {Object} 解密后的JSON对象，如果验证失败或不需要解密，则返回原JSON对象。
 */
export function decrypt(json) {
	if (json.validation) {
		const key = CryptoJS.enc.Utf8.parse("0123456789abcdef")
		const iv = CryptoJS.enc.Utf8.parse(
			CryptoJS.enc.Utf8.stringify(
				CryptoJS.enc.Base64.parse(json.iv)
			))
		var str = CryptoJS.AES.decrypt(json.data, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
			/**
			 * 将对象转换为URL查询字符串
			 * @param {Object} data - 需要转换的对象
			 * @returns {string} - 转换后的URL查询字符串
			 * @example
			 * URLSearchParams({ name: 'John', age: 30 }); // "name=John&age=30"
			 */
		}).toString(CryptoJS.enc.Utf8);
		return JSON.parse(str);
	}
	return json;
}

/**
 * 将对象转换为URL查询字符串
 * @param {Object} data - 需要转换的对象
 * @returns {string} - 转换后的URL查询字符串
 * @example
 * URLSearchParams({ name: 'John', age: 30 }); // "name=John&age=30"
 */
function URLSearchParams(data) {
	let str = ""
	data = Object.entries(data)
	for (let item in data) {
		let items = data[item]
		if (item == data.length - 1) {
			str += items[0] + "=" + items[1]
			break
		}
		str += items[0] + "=" + items[1] + "&"
	}
	return str
}