<template>
	<view class="app-activity activity-recycle-place" style="height: 100%;">
		<view class="recycle-map">
			<image
				mode="heightFix"
				class="recycle-map"
				src="/static/app-recycle/recycle-map.png"
			/>
		</view>
		<up-transition :show="container_expend" mode="fade-right">
			<view class="recycle-place-list">
				<view class="recycle-place-list-item" v-for="(item, index) in place_list" :key="index"
					@tap="openInerPage(item.id)">
					<view class="icon-box">
						<up-icon class="icon" name="map" color="var(--icon_color)" size="20"></up-icon>
					</view>
					<view class="item-content">
						<text class="item-name up-line-1">{{ item.name }}</text>
					</view>
				</view>
			</view>
		</up-transition>

		<view class="recycle-container" :style="{ height: container_expend ? '110px' : '50%' }">
			<view class="box-controller" @tap="container_expend = !container_expend">
				<view class="controller"></view>
			</view>
			<view class="recycle-content" :style="{ overflowY: container_expend ? 'hidden' : 'scroll' }">
				<up-input class="input-model" placeholder="请输入搜索内容" border="surround"  v-model="search_value"
					style="height: 26px;" color="#666666" prefixIcon="search"
					prefixIconStyle="font-size: 22px; color: #666666" />

				<up-list class="recycle-list">
					<up-list-item class="recycle-list-item" v-for="(item, index) in place_list" :key="index"
						@tap="openInerPage(item.id)">
						<view class="icon-box">
							<up-icon class="icon" name="map" color="var(--dominColor)" size="26"></up-icon>
						</view>
						<view class="item-content">
							<text class="item-name">{{ item.name }}</text>
							<text class="item-desc">{{ item.desc }}</text>
						</view>
						<view class="item-button">
							<text class="text">查看</text>
						</view>
					</up-list-item>
				</up-list>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive } from 'vue';
	import { getRecyclePlaceList } from '../../../../api/recycle';

	const search_value = ref('');
	const container_expend = ref(true);

	const place_list = reactive([{
		id: 1,
		name: '校门口垃圾回收点A',
		desc: '步行约30分钟'
	}, {
		id: 2,
		name: '校门口垃圾回收点B',
		desc: '步行约30分钟'
	}, {
		id: 3,
		name: '校门口垃圾回收点C',
		desc: '步行约30分钟'
	}, {
		id: 4,
		name: '校门口垃圾回收点D',
		desc: '步行约30分钟'
	}]);

	// 我们学校的坐标 106.552000,29.562701

	/**
	 * 打开内部页面的方法。
	 * @param {string} path - 要打开的页面路径。
	 * @returns {Promise<void>} 如果页面不存在，则显示提示信息。
	 */
	const openInerPage = (id) => {
		uni.navigateTo({
			url: "/pages/app-pages/detail/place-detail/place-detail"
		}).catch(e => {
			return uni.showToast({
				icon: 'none',
				title: "页面不存在"
			});
		});
	}
</script>

<style lang="scss">
	@import "style.scss";
</style>