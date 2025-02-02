<template>
	<view class="app-activity activity-user-notice">
		<up-subsection class="tabController" bgColor="#ffffff" activeColor="#ffffff" inactiveColor="#333333"
			:list="tabList" :key="index" @change="onTabChange"></up-subsection>
		<view class="notice-list">
			<view class="notice-item" v-for="(item, index) in dataList">
				<text class="item-type">{{ item.type }}</text>
				<text class="item-conent">{{ item.content }}</text>
				<text class="item-date">{{ item.date }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';

	// 当前通知类型
	const currentTab = ref(0);

	// 所有通知类型
	const tabList = reactive(['全部', '活动通知', '服务通知', '物流通知']);
	
	// 通知数据列表
	const dataList = ref([{
		type: '活动通知',
		content: '活动通知内容',
		date: '2025-01-04'
	}, {
		type: '服务通知',
		content: '服务通知内容',
		date: '2025-01-03'
	}, {
		type: '物流通知',
		content: '物流通知内容',
		date: '2025-01-02'
	}]);
	
	/**
	 * 切换通知查询条件
	 */
	const onTabChange = (item) => {
		currentTab.value = item;
		switch(item) {
			case 0:
				currentTab.value = 0;
				break;
			case 1:
				currentTab.value = 1;
				break;
			case 2:
				currentTab.value = 2;
				break;
			case 3:
				currentTab.value = 3;
				break;
		}
	}
</script>