<template>
	<view class="app-frame user-frame">
		<HeadComponent title="我的" none/>
		<view class="top-container app-card">
			<view class="user-info">
				<view style="display: flex; height: 100%; align-items: center;" @tap="applicationStore.navigateTo('/pages/app-pages/user/user-detail/user-detail')">
					<view class="avatar-box">
						<image class="avatar" :src="applicationStore.userInfo ? getSplitByImagelist(applicationStore.userInfo.photo) : default_avatar" mode=""></image>
					</view>
					<view class="info-box">
						<text class="username">{{ applicationStore.userInfo ? applicationStore.userInfo.nickname : '用户未登录' }}</text>
						<view class="user-boot">
							<text class="tag user-lv">LV{{ applicationStore.userInfo ? applicationStore.userInfo.level : 0 }}</text>
							<text class="tag user-points">积分：{{ applicationStore.userInfo ? applicationStore.userInfo.coin : 0 }}</text>
						</view>
					</view>
				</view>
				
				<view class="button-box">
					<up-icon class="icon" name="bell" color="#333333" size="26"  @tap="applicationStore.navigateTo('/pages/app-pages/user/user-notice/user-notice')"></up-icon>
					<up-icon class="icon" name="setting" color="#333333" size="26" @tap="applicationStore.subNavigateTo('/pages/app-pages/app/app-setting/app-setting')"></up-icon>
				</view>
			</view>
			<view class="statics-info">
				<view class="statics-box">
					<text class="data-value">0</text>
					<text class="data-name">我的收藏</text>
				</view>

				<view class="statics-box" @tap="applicationStore.subNavigateTo('/pages/app-pages/user/user-browse/user-browse')">
					<text class="data-value">{{ browseHistory.length }}</text>
					<text class="data-name">历史浏览</text>
				</view>

				<view class="statics-box" @tap="applicationStore.navigateTo('/pages/app-pages/other/integral-mall/integral-mall')">
					<text class="data-value">{{ applicationStore.userInfo ? applicationStore.userInfo.coin : 0 }}</text>
					<text class="data-name">我的积分</text>
				</view>

				<view class="statics-box">
					<text class="data-value">0</text>
					<text class="data-name">我的发布</text>
				</view>
			</view>
		</view>

		<view class="tips-contianer app-card" @tap="applicationStore.navigateTo('/pages/app-pages/app/app-zixun/app-zixun')">
			<text class="tips-title">AI助手</text>
			<text class="tips-content">{{ tips_content }}</text>
			<view class="icon-box">
				<up-icon class="icon" name="arrow-right" color="#333333" size="16"></up-icon>
			</view>
		</view>

		<view class="service-container app-card">
			<view class="service-item" v-for="(item, index) in serviceList" :key="index" @tap="applicationStore.navigateTo(item.path)">
				<view class="item-icon" v-html="item.icon"></view>
				<text class="item-name">{{ item.name }}</text>
			</view>
		</view>

		<view class="browse-history app-card">
			<view class="title-box">
				<text class="title-text">浏览历史</text>
			</view>

			<up-empty style="padding-bottom: 25px;" text="暂无数据" v-if="browseHistory.length < 1"
			    icon="/static/app-empty/list.png">
			</up-empty>

			<up-list class="history-list" v-else>
				<up-list-item class="tips-list-item" v-for="(item, index) in browseHistory.slice(0, 3)" :key="index" @tap="onHistoryItemClick(item)">
					<up-lazy-load class="item-image" width="120" :image="getSplitByImagelist(item.imageList[0])" img-mode="widthFix" loading-img="" error-img=""/>
					<view class="item-content">
						<text class="item-title up-line-1">{{ item.title }}</text>
						<text class="item-descs up-line-2">{{ item.content }}</text>
					</view>
				</up-list-item>
			</up-list>
		</view>

		<view class="user-collect app-card" style="margin-bottom: 0;">
			<view class="title-box">
				<text class="title-text">我的收藏</text>
			</view>

			<up-empty style="padding-bottom: 25px;" text="暂无数据" v-if="browseHistory.length < 1"
			    icon="/static/app-empty/list.png">
			</up-empty>
			
			<up-list class="history-list" v-else>
				<up-list-item class="tips-list-item" v-for="(item, index) in browseHistory.slice(0, 3)" :key="index" @tap="onHistoryItemClick(item)">
					<up-lazy-load class="item-image" width="120" :image="getSplitByImagelist(item.imageList[0])" img-mode="widthFix" loading-img="" error-img=""/>
					<view class="item-content">
						<text class="item-title up-line-1">{{ item.title }}</text>
						<text class="item-descs up-line-2">{{ item.content }}</text>
					</view>
				</up-list-item>
			</up-list>
		</view>

		<view style="padding-bottom: 20px;">
			<!-- <button v-if="!applicationStore.userInfo" class="app-btn" type="primary" @tap="userLogin()" style="width: calc(100% - 30px); height: 50px; line-height: 50px; margin: 25px auto; margin-bottom: 0;">点击登录</button> -->
		</view>
	</view>
</template>

<script setup>
	import icons from "@/utils/icons";
	import { reactive, ref } from "vue";
	import { onShow } from '@dcloudio/uni-app';
	import { getSplitByImagelist } from "@/utils/utils";
	import { useApplicationStore } from "@/store/applicationStore";
	import default_avatar from "@/static/images/avatar-default.png";
	
	const browseHistory = reactive([]);
	const tips_content = ref("低碳出行，人人有责");
	const applicationStore = useApplicationStore();

	const dataList = reactive([{
		title: "使用环保垃圾袋的五大好处",
		image: '',
		descs: "这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容"
	}, {
		title: "使用环保垃圾袋的五大好处",
		image: '',
		descs: "这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容"
	}, {
		title: "使用环保垃圾袋的五大好处",
		image: '',
		descs: "这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容，这是文本内容"
	}]);
	
	const serviceList = reactive([
		{
			name: "我的成就",
			path: "/pages/app-pages/",
			icon: icons.user_achieve
		},{
			name: "我的订单",
			path: "/pages/app-pages/user/user-orders/user-orders",
			icon: icons.user_order
		},{
			name: "我的签到",
			path: "/pages/app-pages/user/user-signed/user-signed",
			icon: icons.user_signIn
		},{
			name: "积分商城",
			path: "/pages/app-pages/other/integral-mall/integral-mall",
			icon: icons.user_mall
		}
	]);

	onShow(() => {
		browseHistory.length = 0;
		const history = uni.getStorageSync('browseHistory') || [];
		for (const element of history.reverse()) {
			browseHistory.push(element);
		}
	});

	/**
	 * 处理历史记录项点击事件。
	 * 根据点击项的类型，导航到相应的详情页面。
	 * @param {Object} item - 点击的历史记录项。
	 * @param {string} item.type - 历史记录项的类型，可以是 'tips' 或 'policy'。
	 * @param {number} item.id - 历史记录项的ID。
	 */
	const onHistoryItemClick = (item) => {
		if (item.type === "tips") {
			uni.navigateTo({
				url: "/pages/app-pages/detail/tips-detail/tips-detail?id=" + item.id
			});
		}

		if (item.type === "policy") {
			uni.navigateTo({
				url: "/pages/app-pages/detail/policy-detail/policy-detail?id=" + item.id
			});
		}
	}
</script>

<style lang="scss">
	@import "style.scss"
</style>