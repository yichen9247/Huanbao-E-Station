<template>
    <view class="head-component" :style="{ padding: config.none && 'var(--status-bar-height) 15px', paddingBottom: config.none && '0'  }">
		<view class="top-view" v-if="!none">
			<view class="view-content">
				<text class="app-title">{{ config.title }}</text>
				<up-input class="input-model" placeholder="请输入搜索内容" border="surround" v-model="search_value"
					style="height: 16px;" color="#666666" prefixIcon="search"
					prefixIconStyle="font-size: 20px; color: #666666" />
				<view class="icon-box">
					<view class="app-icon" @tap="onIconClick()">
						<slot v-if="!config.default"></slot>
                        <image class="avatar-png" v-else :src="applicationStore.userInfo ? getSplitByImagelist(applicationStore.userInfo.photo) : default_avatar" mode="" @tap="switchToUserFrame()"/>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
    import { ref } from "vue";
	import { getSplitByImagelist } from "../../utils/utils";
	import { useApplicationStore } from "@/store/applicationStore";
    import default_avatar from "@/static/images/avatar-default.png";

    const search_value = ref('');
    const config = defineProps({
		path: String,
		none: Boolean,
		title: String,
        default: Boolean
	});
	const applicationStore = useApplicationStore();

	const onIconClick = () => {
		if (config.path !== undefined) {
			uni.navigateTo({
				url: config.path
			});
		}
	}

	/**
	 * 切换到用户框架页面
	 * 使用 uni.switchTab 方法跳转到用户框架页面，路径为 '/pages/frame/frame-user/frame-user'。
	 */
	const switchToUserFrame = () => {
		uni.navigateTo({
			url: "/pages/app-pages/user/user-detail/user-detail"
		});
	}
</script>

<style lang="scss">
    @import "style.scss";
</style>