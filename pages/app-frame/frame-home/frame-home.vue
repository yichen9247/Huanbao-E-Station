<template>
	<view class="app-frame home-frame">
		<FloatComponent/>
		<HeadComponent :title="config.name" default/>
		<scroll-view show-scrollbar="true" scroll-y="true" :refresher-enabled="refresherEnabled" :refresher-triggered="refresherTriggered" :refresher-threshold="100" refresher-background="transparent" @refresherrefresh="onRefresh" class="fixed-scroll-view">
			<view class="swiper-view">
				<SwiperComponent type="home" />
			</view>

			<view class="service-view">
				<!-- <up-scroll-list class="scroll-list" indicatorActiveColor="var(--dominColor)">
					<view class="scroll-item" v-for="(item, index) in serviceList" :key="index"
						@tap="applicationStore.navigateTo(item.path)">
						<image class="item-icon" :src="item.icon" mode="aspectFit"></image>
						<text class="item-text">{{ item.text }}</text>
					</view>
				</up-scroll-list> -->
				<view class="top-box">
					<view class="service-item" v-for="(item, index) in serviceList" :key="index"  @tap="applicationStore.navigateTo(item.path)">
						<image
							class="item-icon"
							:src="item.icon"
							mode="scaleToFill"
						/>
						<text class="item-name">{{ item.text }}</text>
					</view>
				</view>
				
				<view class="service-item item-other" style="width: 48%; margin-bottom: unset" @tap="applicationStore.navigateTo('/pages/app-pages/app/app-activity/app-activity')">
					<image
						class="item-icon"
						src="/static/app-frame/frame-home/service-5.png"
						mode="scaleToFill"
					/>
					<text class="item-text">校园活动</text>
				</view>

				<view class="service-item item-other" style="width: 48%; margin-bottom: unset" @tap="applicationStore.navigateTo('/pages/app-pages/app/app-volunteer/app-volunteer')">
					<image
						class="item-icon"
						src="/static/app-frame/frame-home/service-6.png"
						mode="scaleToFill"
					/>
					<text class="item-text">志愿服务</text>
				</view>
			</view>

			<view class="tips-view app-card">
				<TitleComponent title="低碳生活小贴士" style="width: 95%;" />
				<up-list class="tips-list">
					<up-list-item class="tips-list-item" v-for="(item, index) in greenestTips" :key="index"
						@tap="applicationStore.subNavigateTo('/pages/app-pages/detail/tips-detail/tips-detail?id=' + item.id)">
						<up-lazy-load class="item-image" width="120" :image="getSplitByImagelist(item.imageList)" img-mode="widthFix" loading-img="" error-img=""/>
						<view class="item-content">
							<text class="item-title up-line-1">{{ item.title }}</text>
							<text class="item-descs up-line-2">{{ item.content }}</text>
						</view>
					</up-list-item>
				</up-list>
				<view style="padding-bottom: 20px;" v-if="greenestTips.length === 0">
					<up-loadmore :status="'loading'"/>
				</view>
			</view>

			<view class="artwork-view app-card">
				<TitleComponent title="热门作品" style="width: 95%;" />
				<view class="answer-list">
                    <view class="answer-item" v-for="(item, index) in hotArtwork" :key="index" @tap="applicationStore.subNavigateTo('/pages/app-pages/detail/artwork-detail/artwork-detail?id=' + item.id)">
                        <view class="image-box">
                            <up-lazy-load class="image" width="120" :image="getSplitByImagelist(item.imageList)" img-mode="widthFix" loading-img="" error-img=""/>
                            <view class="content-box">
                                <text class="title">{{ item.votesNumber }} 票</text>
                            </view>
                        </view>
                        <view class="content-desc">
                            <text class="item-name up-line-1">{{ item.name }}</text>
                            <text class="item-desc up-line-1">{{ item.description }}</text>
                        </view>
                    </view>
                </view>
				<view style="padding-bottom: 20px;" v-if="hotArtwork.length === 0">
					<up-loadmore :status="'loading'"/>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import config from "@/config";
	import { onMounted, reactive, ref } from "vue";
	import { getSplitByImagelist } from "@/utils/utils";
	import { getGreenestTipsList } from "@/api/greenestTips";
	import { useApplicationStore } from "@/store/applicationStore";
	import { getCompetitionHotArtworkList } from '@/api/competitions';

	const hotArtwork = reactive([]);
	const greenestTips = reactive([]);
	const refresherEnabled = ref(false);
	const refresherTriggered = ref(false);
	const applicationStore = useApplicationStore();

	const serviceList = reactive([{
		text: "任务",
		path: "/pages/app-pages/user/user-signed/user-signed",
		icon: "/static/app-frame/frame-home/v3/service-1.png"
	}, {
		text: "智答",
		path: "/pages/app-pages/app/app-zhida/app-zhida",
		icon: "/static/app-frame/frame-home/v3/service-2.png"
	}, {
		text: "换宝",
		path: "/pages/app-pages/other/integral-mall/integral-mall",
		icon: "/static/app-frame/frame-home/v3/service-3.png"
	}, {
		text: "热讯",
		path: "/pages/app-pages/other/national-policy/national-policy",
		icon: "/static/app-frame/frame-home/v3/service-4.png"
	}, {
		text: "咨询",
		path: "/pages/app-pages/app/app-zixun/app-zixun",
		icon: "/static/app-frame/frame-home/v3/service-5.png"
	}]);

	onMounted(() => {
		getGreenestTips();
		getCompetitionHotArtworkList({ projectId: 1 }).then(response => {
            for (const element of response.data) {
                hotArtwork.push(element);
            }
        });
	});

	/**
	 * 触发刷新操作，调用获取最环保小贴士的函数。
	 * 如果刷新触发器已经被激活，则不再执行后续操作。
	 * @returns {void}
	 */
	const onRefresh = () => {
		getGreenestTips();
	  	if (refresherTriggered.value) return;
	  	refresherTriggered.value = true;
	};

	/**
	 * 获取最环保的小贴士列表，并更新到 greenestTips 数组中。
	 * 调用 getGreenestTipsList API 获取数据，成功后将数据存入 greenestTips。
	 * 无论请求成功与否，1秒后将 refresherTriggered 设置为 false。
	 */
	const getGreenestTips = () => {
		getGreenestTipsList().then(response => {
			greenestTips.length = 0;
			for (const element of response.data) {
				greenestTips.push(element);
			}
		}).finally(() => {
			setTimeout(() => refresherTriggered.value = false, 1000);
		});
	}
</script>

<style lang="scss">
	@import "style.scss";
</style>