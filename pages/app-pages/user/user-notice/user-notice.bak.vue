<template>
	<view class="app-activity activity-user-notice">
		<up-subsection class="tabController" :list="tabList" :current="0" bgColor="#ffffff" activeColor="#ffffff" inactiveColor="#333333"></up-subsection>
		<view class="notice-list">
			<view class="notice-item" v-for="(item, index) in noticeList" :key="index">
				<text class="item-type">{{ item.typeName }}</text>
				<text class="item-conent">{{ item.content }}</text>
				<text class="item-date">{{ item.date }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive } from 'vue';
	const tabList = ref(['全部', '交易物流', '活动通知', '服务通知']);
	
	const noticeList = reactive([
		{
			date: "2024-11-2",
			typeName: "活动通知",
			content: "你的专属低碳指南已到账"
		},{
			date: "2024-11-2",
			typeName: "物流通知",
			content: "你的专属低碳指南已到账"
		},{
			date: "2024-11-2",
			typeName: "服务通知",
			content: "你的专属低碳指南已到账"
		}
	]);
</script>

<style lang="scss">
	@import "style.scss";
</style>