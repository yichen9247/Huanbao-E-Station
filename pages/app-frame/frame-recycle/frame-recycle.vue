<template>
	<view class="app-frame recycle-frame">
		<HeadComponent title="回收" path="/pages/app-pages/add/add-shop/add-shop">
			<view v-html="icons.app_add"></view>
		</HeadComponent>

		<view class="swiper-view">
			<SwiperComponent type="products"/>
		</view>

		<view class="service-view app-card">
			<view v-if="serviceList.length === 0">
				<up-loadmore :status="'loading'"/>
			</view>
			<up-scroll-list class="scroll-list" indicatorActiveColor="var(--dominColor)">
				<view class="scroll-item" v-for="(item, index) in serviceList" :key="index"
					@tap="applicationStore.subNavigateTo('/pages/app-pages/other/product-classify/product-classify?classId=' + item.id + '&className=' + item.name)">
					<image class="item-icon" :src="iconList[index]" mode="aspectFit"></image>
					<text class="item-text">{{ item.name }}</text>
				</view>
			</up-scroll-list>
		</view>

		<view class="inter-view">
			<view class="inter-box app-card" @tap="applicationStore.navigateTo('/pages/app-pages/add/add-shop/add-shop')">
				<image
					class="item-icon"
					src="/static/app-frame/frame-home/service-7.png"
					mode="scaleToFill"
				/>
				<text class="item-text">发布二手</text>
			</view>
			<view class="inter-box app-card" @tap="applicationStore.navigateTo('/pages/app-pages/other/recycle-place/recycle-place')">
				<image
					class="item-icon"
					src="/static/app-frame/frame-home/service-8.png"
					mode="scaleToFill"
				/>
				<text class="item-text">回收站点</text>
			</view>
		</view>

		<view style="padding-bottom: 20px;">
			<view class="store-view app-card" style="margin-bottom: 0;">
				<TitleComponent title="低碳好物" style="width: 95%;" />
				<StoreComponent />
			</view>
		</view>
	</view>
</template>

<script setup>
	import icons from "@/utils/icons";
	import { reactive, onMounted } from "vue";
	import { getProductsClassityList } from "@/api/products";
	import { useApplicationStore } from "@/store/applicationStore";

	const applicationStore = useApplicationStore();

	const iconList = reactive([
		"/static/app-frame/frame-home/v2/service-1.png",
		"/static/app-frame/frame-home/v2/service-2.png",
		"/static/app-frame/frame-home/v2/service-3.png",
		"/static/app-frame/frame-home/v2/service-4.png",
		"/static/app-frame/frame-home/v2/service-5.png",
		"/static/app-frame/frame-home/v2/service-1.png",
		"/static/app-frame/frame-home/v2/service-2.png",
		"/static/app-frame/frame-home/v2/service-3.png",
		"/static/app-frame/frame-home/v2/service-4.png",
		"/static/app-frame/frame-home/v2/service-5.png"
	]);
	const serviceList = reactive([]);

	onMounted(() => {
		getProductsClassityList().then(response => {
			for (const element of response.data) {
				serviceList.push(element);
			}
		});
	});
</script>

<style lang="scss">
	@import "style.scss";
</style>