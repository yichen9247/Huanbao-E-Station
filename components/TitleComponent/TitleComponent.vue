<template>
	<view class="title-component">
		<text class="head-title">{{ config.title }}</text>
		<text class="head-link" v-if="config.router" @tap="goLink">查看更多</text>
	</view>
</template>

<script setup>
	const config = defineProps({ 
		title: String
	});

	/**
	 * 跳转到配置的路由页面。
	 * 使用 uni.navigateTo 方法实现页面跳转，跳转的目标地址由 config.router 提供。
	 */
	const goLink = () => {
		uni.navigateTo({
			url: config.router
		});
	}
</script>

<style lang="scss">
	@import "style.scss";
</style>