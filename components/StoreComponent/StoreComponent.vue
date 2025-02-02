<template>
	<view class="store-list">
		<up-waterfall v-model="storeList" v-if="storeList.length !== 0">
			<template v-slot:left="{ leftList }">
				<view style="margin-right: 10px; margin-bottom: 20px;" class="store-warter" v-for="(item, index) in leftList" :key="index"
					@tap="openShopDetail(item.id)">
					<up-image class="store-image" width="100%" :src="getSplitByImagelist(item.imageList)" mode="aspectFill"
						radius="10" style="min-height: 150px; max-height: 170px; overflow: hidden; border-radius: 5px;"></up-image>

					<view class="item-content" style="margin-top: 10px;">
						<view class="store-title up-line-2">{{ item.name }}</view>
					</view>

					<view class="item-foot" style="font-size: 14px; color: #666666; margin-top: 5px; margin-bottom: 10px;">
						<text class="store-shop up-line-2">{{ item.description }}</text>
					</view>
					<text class="store-price" style="color: #dd524d; font-size: 16px; font-weight: bold;">￥{{ item.price }}</text>
				</view>
			</template>
			<template v-slot:right="{ rightList }">
				<view style="margin-left: 10px; margin-bottom: 20px;" class="store-warter" v-for="(item, index) in rightList" :key="index"
					@tap="openShopDetail(item.id)">
					<up-image class="store-image" width="100%" :src="getSplitByImagelist(item.imageList)" mode="aspectFill"
						radius="10" style="min-height: 150px; max-height: 170px; overflow: hidden; border-radius: 5px;"></up-image>
					<view class="item-content" style="margin-top: 10px;">
						<view class="store-title up-line-2">{{ item.name }}</view>
					</view>
					<view class="item-foot" style="font-size: 14px; color: #666666; margin-top: 5px; margin-bottom: 10px;">
						<text class="store-shop up-line-2">{{ item.description }}</text>
					</view>
					<text class="store-price" style="color: #dd524d; font-size: 16px; font-weight: bold;">￥{{ item.price }}</text>
				</view>
			</template>
		</up-waterfall>
		<up-loadmore v-if="storeList.length === 0" :status="'loading'"/>
		<view class="none" v-if="noneList" style="text-align: center; color: #666666;">暂无更多数据了</view>
	</view>
</template>

<script setup>
	import { getSplitByImagelist } from "@/utils/utils";
	import { onReachBottom, onShow } from '@dcloudio/uni-app';
	import { ref, reactive, defineProps, onMounted } from 'vue';
	import { getProductsList, getProductsListCategoryId } from "@/api/products";

	const page = ref(1);
	const limit = ref(10);
	const noneList = ref(false);
	const props = defineProps({
		classId: String
	});
	const storeList = reactive([]);

	/**
	 * 打开商品详情页
	 * @param {number} id - 店铺的唯一标识符
	 */
	const openShopDetail = (shopId) => {
		uni.navigateTo({
			url: "/pages/app-pages/detail/product-detail/product-detail?shopId=" + shopId
		});
	}

	/**
	 * 获取商店列表的函数。
	 * 如果提供了classId，则根据classId获取产品列表；否则，根据当前页码和每页限制获取产品列表。
	 * @param {Object} props - 组件属性对象。
	 * @param {number} props.classId - 分类ID，用于筛选特定分类的产品。
	 * @param {Object} page - 分页对象。
	 * @param {number} page.value - 当前页码。
	 * @param {Object} limit - 每页限制对象。
	 * @param {number} limit.value - 每页显示的产品数量。
	 */
	const getShopList = () => {
		if (props.classId !== undefined) {
			getProductsListCategoryId({
				categoryId: props.classId,
			}).then(response => renderResponse(response));
		} else {
			getProductsList({
				page: page.value,
				limit: limit.value
			}).then(response => renderResponse(response));
		}
	}

	/**
	 * 渲染响应数据的函数。
	 * 如果响应数据长度小于1，则设置noneList为true，表示没有数据可显示。
	 * 否则，遍历响应数据并将每个元素添加到storeList数组中。
	 * @param {Object} response - 包含数据的响应对象。
	 */
	const renderResponse = (response) => {
		if (response.data.length < 1 && page.value === 1) {
			noneList.value = true;
			return;
		}
		for (const element of response.data) storeList.push(element);
	}
	
	onReachBottom(() => {
		page.value++;
		getShopList();
	});

	onShow(() => {
		page.value = 1;
		storeList.length = 0;
		getShopList();
	});
</script>

<style>
	@import "style.scss";
</style>