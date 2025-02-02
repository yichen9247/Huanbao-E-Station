<template>
    <view class="app-activity activity-user-detail" style="height: 100%;">
        <view class="detail-list" v-if="applicationStore.userInfo">
            <view class="detail-item" @tap="editAvatarModel = true">
                <text class="item-name">头像</text>
                <view style="display: flex; align-items: center;">
                    <up-avatar :src="applicationStore.userInfo ? getSplitByImagelist(applicationStore.userInfo.photo) : default_avatar" size="26"></up-avatar>
                </view>
            </view>

            <view class="detail-item" @tap="editNameModel = true">
                <text class="item-name">昵称</text>
                <view style="display: flex; align-items: center;">
                    <text style="color: #666666; margin-right: 10px;">{{ applicationStore.userInfo.nickname }}</text>
                    <up-icon name="arrow-right" color="#333333" size="20"></up-icon>
                </view>
            </view>

            <view class="detail-item">
                <text class="item-name">性别</text>
                <view style="display: flex; align-items: center;">
                    <text style="color: #666666; margin-right: 10px;">未知</text>
                    <up-icon name="arrow-right" color="#333333" size="20"></up-icon>
                </view>
            </view>

            <view class="detail-item">
                <text class="item-name">账号</text>
                <view style="display: flex; align-items: center;">
                    <text style="color: #666666; margin-right: 10px;">{{ username }}</text>
                    <up-icon name="arrow-right" color="#333333" size="20"></up-icon>
                </view>
            </view>

            <view class="detail-item" @tap="applicationStore.subNavigateTo('/pages/app-pages/user/user-password/user-password')">
                <text class="item-name">更改密码</text>
                <view style="display: flex; align-items: center;">
                    <up-icon name="arrow-right" color="#333333" size="20"></up-icon>
                </view>
            </view>

            <view class="detail-item" @tap="applicationStore.subNavigateTo('/pages/app-pages/user/user-address/user-address')">
                <text class="item-name">收货地址管理</text>
                <view style="display: flex; align-items: center;">
                    <up-icon name="arrow-right" color="#333333" size="20"></up-icon>
                </view>
            </view>

            <view class="detail-item" style="justify-content: center;">
				<text class="item-name" style="color: #dd524d;" @tap="exitLogin()">退出登录</text>
			</view>
        </view>

        <up-modal :show="editAvatarModel" title="修改头像" @close="editAvatarModel = false" closeOnClickOverlay showCancelButton @confirm="confirmEditAvatar()" @cancel="editAvatarModel = false">
            <view style="width: 100%; display: flex; justify-content: center;">
                <up-upload accept="image" :fileList="uploadList" name="1" multiple :previewFullImage="true"
                :maxCount="1" @afterRead="afterRead" class="upload"/>
            </view>
        </up-modal>
        <up-modal :show="editNameModel" title="修改昵称" @close="editNameModel = false" closeOnClickOverlay showCancelButton @confirm="confirmEditName()" @cancel="editNameModel = false">
            <up-form style="width: 100%;">
                <up-form-item style="width: 100%;">
                    <up-input placeholder="请输入昵称" border="surround" v-model="editForm.nickname"/>
                </up-form-item>
            </up-form>
        </up-modal>
        <up-modal :show="exitModelStatus" title="退出登录" content="确认退出登录吗，退出登录后，使用软件的部分功能时需要重新登录才可使用" @close="exitModelStatus = false" closeOnClickOverlay showCancelButton @confirm="exitLogin()" @cancel="exitModelStatus = false"></up-modal>
    </view>
</template>

<script setup>
    import config from "@/config";
    import { ref, reactive } from 'vue';
    import { decrypt } from "@/utils/ajax";
    import { confirmEditUserInfo } from "@/api/user";
    import { getSplitByImagelist } from "@/utils/utils";
    import { useApplicationStore } from "@/store/applicationStore";
    import default_avatar from "@/static/images/avatar-default.png";

    const uploadList = reactive([]);
    const exitModelStatus = ref(false);
    const applicationStore = useApplicationStore();
    const username = ref(uni.getStorageSync('username'));

    const editNameModel = ref(false);
    const editAvatarModel = ref(false);
    const editForm = reactive({
        photo: "",
        nickname: ""
    });
	
	// 检测用户是否已经登录，如果没有登录，则跳转至登录界面
    if (!applicationStore.userInfo) uni.navigateTo({
		url: "/pages/app-account/app-login"
	});

    /**
	 * 退出登录功能
	 * 当退出确认状态为真时，移除本地存储中的token，显示退出成功的提示，并重新加载首页。
	 * 如果退出确认状态为假，则设置退出确认状态为真，等待用户确认。
	 */
	const exitLogin = () => {
		if (exitModelStatus.value) {
			uni.removeStorage({
				key: 'token'
			});
			uni.showToast({
				icon: 'success',
				title: "退出登录成功"
			});
			exitModelStatus.value = false;
			setTimeout(() => uni.reLaunch({
				url: "/pages/app-index/app-index"
			}), 1000);
		} else exitModelStatus.value = true;
	}

    /**
     * 确认编辑昵称的函数。
     * 当用户尝试保存昵称时调用，如果昵称为空，则显示提示信息。
     * 如果昵称不为空，则调用 confirmEditUserInfo 函数更新用户信息。
     * 更新成功或失败后，关闭昵称编辑模态框。
     * @returns {void}
     */
    const confirmEditName = () => {
        if (editForm.nickname === "") return uni.showToast({
			icon: 'none',
			title: "请输入昵称"
		});
        confirmEditUserInfo({
            photo: applicationStore.userInfo.photo,
            nickname: editForm.nickname
        }).then(response => {
            uni.showToast({
				icon: 'success',
				title: "修改昵称成功"
			});
            setTimeout(() => uni.reLaunch({
				url: "/pages/app-index/app-index"
			}), 1000);
        }).catch(e => {
            uni.showToast({
		    	icon: 'none',
		    	title: e.msg
		    });
        }).finally(() => {
            editNameModel.value = false;
        });
    }

    /**
     * 确认编辑头像的函数。
     * 该函数检查所有上传的文件是否都成功上传，如果是，则调用确认编辑用户信息的方法，
     * 并传入新的头像和昵称。成功后显示成功提示，并在一秒后重新加载首页。
     * 如果上传未完成，则提示用户等待文件上传完成。
     * 无论操作成功与否，最后都会关闭编辑头像的弹窗。
     */
    const confirmEditAvatar = () => {
        if (uploadList.every(file => file.status === 'success')) {
            confirmEditUserInfo({
                photo: editForm.photo,
                nickname: applicationStore.userInfo.nickname
            }).then(response => {
                uni.showToast({
		    		icon: 'success',
		    		title: "修改头像成功"
		    	});
                setTimeout(() => uni.reLaunch({
		    		url: "/pages/app-index/app-index"
		    	}), 1000);
            }).catch(e => {
                uni.showToast({
		        	icon: 'none',
		        	title: e.msg
		        });
            }).finally(() => {
                editAvatarModel.value = false;
            });
        } else uni.showToast({
    		icon: 'none',
    		title: "请等待头像上传"
    	});
    }

    /**
     * 处理文件上传后的逻辑
     * @param {Object} event - 文件选择事件对象
     * @returns {Promise<void>} - 异步处理上传后的文件状态
     * 
     * 该函数用于处理文件选择后的上传逻辑，将选中的文件添加到上传列表中，并更新每个文件的状态。
     * 文件上传成功后，会更新文件的状态为 'success' 并附带上传后的 URL。
     */
     const afterRead = async (event) => {
        let lists = [].concat(event.file);
        let fileListLen = uploadList.length;
        lists.map((item) => {
            uploadList.push({
                ...item,
                status: 'uploading',
                message: '上传中',
            });
        });
        for (let i = 0; i < lists.length; i++) {
            const result = await uploadFilePromise(lists[i].url);
            let item = uploadList[fileListLen];
            uploadList.splice(fileListLen, 1, {
                ...item,
                status: 'success',
                message: '',
                url: result,
            });
            fileListLen++;
        }
    };

    /**
     * 上传文件的函数，返回一个Promise对象。
     * @param {string} url - 需要上传的文件路径。
     * @returns {Promise} - 返回一个Promise对象，成功时解析为上传文件的数据。
     * 该函数使用uni.uploadFile方法上传文件到服务器，并在成功后处理响应数据。
     * 如果editForm.photo为空，则直接添加解密后的数据；否则，在现有数据后追加解密后的数据。
     * 使用setTimeout模拟异步操作，1秒后解析Promise。
     */
    const uploadFilePromise = (url) => {
        return new Promise((resolve, reject) => {
            uni.uploadFile({
                url: config.baseUrl + "/upload/image",
                filePath: url,
                name: 'file',
                header: {
                    token: uni.getStorageSync("token")
                },
                success: (response) => {
                    if (editForm.photo === "") {
                        editForm.photo += decrypt(JSON.parse(response.data)).data.path;
                    } else editForm.photo += `,${decrypt(JSON.parse(response.data)).data.path}`;
                    setTimeout(() => {
                        resolve(response.data.data);
                    }, 1000);
                }
            });
        });
    };
</script>

<style lang="scss">
    @import "style.scss";
</style>
