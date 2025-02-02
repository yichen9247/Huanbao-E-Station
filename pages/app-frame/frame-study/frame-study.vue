<template>
	<view class="app-frame study-frame">
		<HeadComponent title="学习">
			<view v-html="icons.app_add"></view>
		</HeadComponent>
		
		<view class="service-view app-card">
			<view class="service-item" v-for="(item, index) in service_list" :key="index" @tap="openInerPage(item.path)">
				<view class="card-container">
					<view class="item-card" :style="{ backgroundColor: item.background }">
						<view class="item-icon" v-html="item.icon"></view>
						<view class="item-text">{{ item.name }}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="swiper-view">
			<SwiperComponent type="study"/>
		</view>

		<view class="ranking-view app-card">
			<TitleComponent title="答题排行" style="width: 95%;"/>
			<RankCompoent style="width: 95%;"/>
		</view>
		
		<view style="padding-bottom: 20px;">
			<view class="news-view app-card" style="margin-bottom: 0;">
				<TitleComponent title="热门新闻" style="width: 95%;"/>
				<up-list class="news-list">
					<up-list-item class="news-list-item" v-for="(item, index) in policyList.slice(0, 5)" :key="index" @tap="openPolicyDetail(item.id)">
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
	</view>
</template>

<script setup>
	import icons from "@/utils/icons";
	import { reactive, onMounted } from "vue";
	import { getPolicyNewsList } from "@/api/policy";
	import { getSplitByImagelist } from "@/utils/utils";
	
	const policyList = reactive([]);
	const service_list = reactive([
		{
			name: "国家政策",
			path: "/pages/app-pages/other/national-policy/national-policy",
			background: "#00BFBF",
			icon: icons.study_policy
		}, {
			name: "智慧问答",
			path: "/pages/app-pages/app/app-wenda/app-wenda",
			background: "#55AA7F",
			icon: icons.study_answer
		}, {
			name: "AI咨询",
			path: "/pages/app-pages/app/app-zixun/app-zixun",
			background: "#8080FF",
			icon: icons.study_advice
		},  {
			name: "AI智答",
			path: "/pages/app-pages/app/app-zhida/app-zhida",
			background: "#C280FF",
			icon: icons.study_more
		}
	]);

	/**
	 * 打开内部页面的方法。
	 * @param {string} path - 要打开的页面路径。
	 * @returns {Promise<void>} 如果页面不存在，则显示提示信息。
	 */
	const openInerPage = (path) => {
		uni.navigateTo({
			url: path
		}).catch(e => {
			return uni.showToast({
				icon: 'none',
				title: "页面不存在"
			});
		});
	}

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
	@import "style.scss"
</style>