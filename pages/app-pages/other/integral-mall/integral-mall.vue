<template>
	<view class="app-activity activity-integral-mall" style="height: 100%;">
		<view class="points-view app-card">
			<text class="card-title">我的积分</text>
			<text class="card-point">{{ applicationStore.userInfo ? applicationStore.userInfo.coin : 0 }}</text>
		</view>
		
		<view class="store-view app-card">
			<up-waterfall v-model="wareList">
				<template v-slot:left="{ leftList }">
					<view style="margin-right: 10px;" class="store-warter" v-for="(item, index) in leftList" :key="index" @tap="onExangeConfirm(item)">
						<view class="image-box">
							<up-image class="store-image" width="100%" :src="getSplitByImagelist(item.imageList)" mode="widthFix" radius="5"/>
						</view>
						
						<view class="item-content">
							<view class="store-title up-line-2">{{ item.name }}</view>
						</view>
						
						<view class="store-point">
							<view class="icon-box" v-html="icons.mall_points"></view>
							<text class="store-points">{{ item.requiredQuantity }}</text>
						</view>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view style="margin-left: 10px;" class="store-warter" v-for="(item, index) in rightList" :key="index" @tap="onExangeConfirm(item)">
						<view class="image-box">
							<up-image class="store-image" width="100%" :src="getSplitByImagelist(item.imageList)" mode="widthFix" radius="5"/>
						</view>
						
						<view class="item-content">
							<view class="store-title up-line-2">{{ item.name }}</view>
						</view>
						
						<view class="store-point">
							<view class="icon-box" v-html="icons.mall_points"></view>
							<text class="store-points">{{ item.requiredQuantity }}</text>
						</view>
					</view>
				</template>
			</up-waterfall>
		</view>
	</view>
</template>

<script setup>
	import icons from '@/utils/icons';
	import { ref, reactive, onMounted } from 'vue';
	import { getExchangeList } from '@/api/exchange';
	import { getSplitByImagelist } from "@/utils/utils";
	import { useApplicationStore } from "@/store/applicationStore";

	const wareList = reactive([]);
	const currentChange = ref("");
	const exangeStatus = ref(false);
	const applicationStore = useApplicationStore();

	onMounted(() => {
		getExchangeList().then(response => {
			for (const element of response.data) {
				wareList.push(element);
			}
		});
	});

	/**
	 * 兑换确认函数
	 * @param {Object} item - 兑换项对象，包含所需积分等信息
	 * @description 当用户尝试兑换时调用此函数，检查用户积分是否足够，如果足够则显示加载动画并模拟兑换过程
	 * @returns {void}
	 */
	const onExangeConfirm = (item) => {
		if (applicationStore.userInfo.coin < item.requiredQuantity) return uni.showToast({
			icon: 'none',
			title: "积分不够"
		});

		uni.showLoading({
			title: "正在兑换中"
		});

		setTimeout(() => {
			uni.hideLoading();
			uni.showToast({
				icon: 'success',
				title: "兑换成功"
			});
		}, 1000);
	}
</script>

<style lang="scss">
	@import "style.scss";
</style>