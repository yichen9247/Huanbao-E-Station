import { reactive, ref } from "vue"
import { defineStore } from "pinia"

export const useApplicationStore = defineStore('applicationStore',() => {
    const userInfo = ref(null);
    const userAuthorities = ref({
        volunteer: false
    });
    const userDatiStorage = ref(null);

    const started = ref(false);
    const resetUserInfo = () => userInfo.value = null;
    const setStarted = (value) => started.value = value;
    const setUserInfo = (value) => userInfo.value = value;
    const setUserDatiStorage = (value) => userDatiStorage.value = value;
    const setUserAuthorities = (value) => userAuthorities.value = value;
    
    /**
     * 导航到指定页面。如果用户已登录，则导航到传入的URL；否则，导航到登录页面。
     * @param {string} url - 要导航到的页面路径。
     * @throws {uni-app错误} 如果目标页面不存在，将抛出错误并显示提示信息。
     */
    const navigateTo = (path) => {
        if (userInfo.value) {
            uni.navigateTo({
                url: path
            }).catch(e => {
                uni.showToast({
                    icon: 'none',
                    title: "页面不存在"
                });
            });
        } else uni.navigateTo({
			url: "/pages/app-account/app-login"
		});
    }

    /**
     * 导航到指定页面，如果页面不存在则显示提示信息。
     * @param {string} url - 要导航到的页面路径。
     */
    const subNavigateTo = (path) => {
        uni.navigateTo({
            url: path
        }).catch(e => {
            console.error(e);
            uni.showToast({
                icon: 'none',
                title: "页面不存在"
            });
        });
    }

    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
	
    let currentPath = currentPage.$page.fullPath;
    if (currentPath !== "/pages/app-index/app-index") uni.reLaunch({
        url: "/pages/app-index/app-index"
    });

    /**
	 * 预览图片
	 * @param {Object} item - 图片项
	 * @param {Number} index - 当前图片索引
	 * 使用uni-app的previewImage方法预览图片，展示当前索引对应的图片，并提供图片列表供用户切换。
	 */
	const previewImage = (item, index) => {
		uni.previewImage({
			current: index,
			urls: [item]
		});
	}

    return {
        userInfo, userAuthorities, started, userDatiStorage,
        setUserInfo, setUserAuthorities, setStarted, setUserDatiStorage,
        navigateTo, subNavigateTo, previewImage, resetUserInfo
    }
});