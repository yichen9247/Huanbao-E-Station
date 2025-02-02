<template>
	<up-transition :show="props.show">
		<view  class="privacy">
			<view class="content">
				<view class="title">用户隐私保护指引</view>
				<view class="des">
					感谢您选择使用低碳E站APP，我们非常重视您的个人信息安全和隐私保护，使用我们的产品前，请您仔细阅读“
					<text class="link" @tap="openPrivacyContract()">《用户协议》</text>”，
					如您同意此隐私保护指引，请点击同意按钮，开始使用此小程序，我们将尽全力保护您的个人信息及合法权益，感谢您的信任！<br />
				</view>
				<view class="btns">
					<button class="item reject" @tap="emit('reject')">拒绝</button>
					<button id="agree-btn" class="item agree" open-type="agreePrivacyAuthorization" @tap="emit('agree')">同意</button>
				</view>
			</view>
		</view>
	</up-transition>
</template>

<script setup>
	import { defineProps } from 'vue';

	const props = defineProps({
		show: Boolean,
	});

	/**
	 * 打开隐私协议合同页面
	 * 使用 `uni.navigateTo` 方法导航到用户协议页面。
	 */
	const openPrivacyContract = () => {
		uni.navigateTo({
			url: '/pages/app-pages/user/user-protocol/user-protocol',
		});
	};

	const emit = defineEmits(['reject', 'agree']);
</script>

<style lang="scss">
	@import "style.scss";
</style>