<template>
	<view class="app-activity activity-app-setting">
		<view class="setting-list">
			<view class="setting-item" @tap="applicationStore.navigateTo('/pages/app-pages/user/user-detail/user-detail')">
				<text class="item-name">账号设置</text>
				<up-icon name="arrow-right" color="#333333" size="20"></up-icon>
			</view>

			<view class="setting-item">
				<text class="item-name">隐私设置</text>
				<up-icon name="arrow-right" color="#333333" size="20"></up-icon>
			</view>

			<view class="setting-item" @tap="applicationStore.navigateTo('/pages/app-pages/user/user-address/user-address')">
				<text class="item-name">地址管理</text>
				<up-icon name="arrow-right" color="#333333" size="20"></up-icon>
			</view>

			<view class="setting-item" @tap="applicationStore.subNavigateTo('/pages/app-pages/user/user-protocol/user-protocol')">
				<text class="item-name">用户协议</text>
				<up-icon name="arrow-right" color="#333333" size="20"></up-icon>
			</view>

			<view class="setting-item" @tap="applicationStore.subNavigateTo('/pages/app-pages/app/app-about/app-about')">
				<text class="item-name">关于软件</text>
				<up-icon name="arrow-right" color="#333333" size="20"></up-icon>
			</view>

			<view class="setting-item" @tap="clearCache()">
				<text class="item-name">清理缓存</text>
				<view style="display: flex; align-items: center;">
					<text style="color: #666666; margin-right: 5px;">{{ cacheSize }}{{ isWeb ? 'KB' : '' }}</text>
					<up-icon name="arrow-right" color="#333333" size="20"></up-icon>
				</view>
			</view>

			<view class="setting-item" style="justify-content: center;">
				<text class="item-name" style="color: #dd524d;" @tap="exitLogin()">退出登录</text>
			</view>
		</view>
		<up-modal :show="exitModelStatus" title="退出登录" content="确认退出登录吗，退出登录后，使用软件的部分功能时需要重新登录才可使用" @close="exitModelStatus = false" closeOnClickOverlay showCancelButton @confirm="exitLogin()" @cancel="exitModelStatus = false"></up-modal>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { useApplicationStore } from "@/store/applicationStore";

	const cacheSize = ref(0);
	const exitModelStatus = ref(false);
	const applicationStore = useApplicationStore();
	const isWeb = ref(typeof plus === 'undefined');

	/**
	 * 清理缓存功能
	 * 显示加载提示，模拟清理过程后隐藏加载提示并清理存储，
	 * 清理成功后显示提示信息并获取存储信息。
	 */
	const clearCache = () => {
		uni.showLoading({
			title: "正在清理缓存"
		});

		setTimeout(() => {
			uni.hideLoading();
			uni.clearStorage({
			  	success: () => {
					uni.showToast({
						icon: 'success',
						title: "清理缓存成功"
					});
					getStorageInfo();
					setTimeout(() => uni.reLaunch({
						url: "/pages/app-index/app-index"
					}), 1000);
			  	}
			});
		}, 1000);
	}

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

	onMounted(() => {
		getStorageInfo();
	});

	/**
	 * 获取存储信息并更新缓存大小。
	 * 如果环境中存在plus对象，则使用plus.cache.calculate计算缓存大小；
	 * 否则，使用uni.getStorageInfoSync同步获取存储信息。
	 * 缓存大小会根据实际情况转换为B、KB或MB单位。
	 */
	const getStorageInfo = () => {
		if (typeof plus === 'undefined') {
			let storageInfo = uni.getStorageInfoSync();
			cacheSize.value = storageInfo.currentSize;
		} else {
			plus.cache.calculate(size => {
			    if (size < 1024) {
			        cacheSize.value = size + 'B';
			    } else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
			        cacheSize.value = Math.floor((size / 1024) * 100) / 100 + 'KB';
			    } else if (size / 1024 / 1024 >= 1) cacheSize.value = Math.floor((size / 1024 / 1024) * 100) / 100 + 'M';
			});
		}
	}
</script>

<style lang="scss">
	@import "style.scss";
</style>