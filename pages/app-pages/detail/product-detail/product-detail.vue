<template>
	<view class="app-activity activity-product-detail" style="height: 100%;">
		<up-loading-page :loading="loading">
			<text style="margin-top: 20px;">正在加载中</text>
		</up-loading-page>
		
		<view class="main" v-if="shopDetail && !loading">
			<view class="shop-desc app-card">
				<text class="shop-price">￥{{ shopDetail.price }}</text>
				<text>{{ shopDetail.productsCategories[0].productsCategoriesClassify.name }}</text>
			</view>

			<view class="shop-content app-card">
				<text class="shop-name">{{ shopDetail.name }}</text>
				<text class="shop-text">{{ shopDetail.description }}</text>

				<view class="image-view">
					<image v-for="(item, index) in imageList" @tap="previewImage(imageList, index)" :key="index"
						class="shop-image" :src="item" mode="widthFix"></image>
				</view>
			</view>
		</view>

		<view class="shop-foot" v-if="shopDetail && !loading">
			<view class="action-box">
				<button class="app-btn icon-btn" style="background-color: #ffffff!important;">
					<up-icon class="icon" name="star" color="var(--dominColor)" size="24"></up-icon>
				</button>
			</view>
			<button class="app-btn" style="background-color: #ffffff!important;" @tap="applicationStore.navigateTo('/pages/app-pages/add/add-shop/add-shop?shopId=' + props.shopId);">卖同款</button>
			<button class="app-btn" type="primary" @tap="applicationStore.navigateTo('/pages/app-pages/detail/order-detail/order-detail?shopId=' + props.shopId)">我想要</button>
		</view>
	</view>
</template>

<script setup>
	import config from "@/config";
	import { previewImage } from "@/utils/utils";
	import { getProductsListID } from '@/api/products';
	import { onMounted, defineProps, ref, reactive } from 'vue';
	import { useApplicationStore } from "@/store/applicationStore";
	
	const loading = ref(true);
	const shopDetail = ref(null);
	const imageList = reactive([]);
	const props = defineProps({
		shopId: String
	});
	const applicationStore = useApplicationStore();

	onMounted(() => {
		getProductsListID({
			productId: props.shopId
		}).then(response => {
			shopDetail.value = response.data;
			setTimeout(() => loading.value = false, 500);
			response.data.imageList.split(',').forEach((img, index) => {
				imageList[index] = config.baseUrl + '' + img;
			});
		});
	});
</script>

<style lang="scss">
	@import "style.scss";
</style>