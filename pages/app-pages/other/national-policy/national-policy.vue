<template>
	<view class="app-activity activity-national-policy">
		<up-input class="input-model" placeholder="请输入搜索内容" border="surround" v-model="search_value"
			style="height: 26px;" color="#666666" prefixIcon="search"
			prefixIconStyle="font-size: 22px; color: var(--dominColor)" />
		
		<view class="swiper-view">
			<SwiperComponent type="news"/>
		</view>
		
		<view class="recommend-reading app-card">
			<TitleComponent title="推荐阅读" style="width: 95%;"/>
			<up-list class="data-list" style="height: unset!important;;">
				<up-list-item class="data-list-item" v-for="(item, index) in policyList" :key="index" @tap="openPolicyDetail(item.id)">
					<up-lazy-load class="item-image" width="120" :image="getSplitByImagelist(item.imageUrls)" img-mode="widthFix" loading-img="" error-img=""/>
					<view class="item-content">
						<text class="item-title up-line-1">{{ item.title }}</text>
						<text class="item-descs up-line-2">{{ item.textContent }}</text>
					</view>
				</up-list-item>
			</up-list>

			<view style="padding-bottom: 20px;" v-if="policyList.length === 0">
				<up-loadmore :status="'loading'"/>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted } from "vue";
	import { getPolicyNewsList } from "@/api/policy";
	import { getSplitByImagelist } from "@/utils/utils";
	
	const search_value = ref('');
	const policyList = reactive([]);

	onMounted(() => {
		getPolicyNewsList().then(response => {
			for (const element of response.data) {
				policyList.push(element);
			}
		});
	});

	/**
	 * 打开政策详情页面
	 * @param {number} id - 提示的唯一标识符
	 * @description 通过传入提示的ID，使用uni.navigateTo方法导航到政策详情页面。
	 */
	 const openPolicyDetail = (id) => {
		uni.navigateTo({
			url: "/pages/app-pages/detail/policy-detail/policy-detail?id=" + id
		});
	}
</script>

<style lang="scss">
	@import "style.scss";
</style>