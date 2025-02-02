<template>
    <view class="app-page app-page-login">
        <view class="head-view">
            <text class="head-title">欢迎，</text>
            <text class="head-description">注册低碳E站账号</text>
        </view>

        <view class="main-view">
            <view class="main-container">
                <up-form class="main-form" :model="formData" ref="form">
                    <text class="form-label">手机号</text>
				    <up-form-item borderBottom labelPosition="top">
					    <up-input class="input-model" placeholder="请输入手机号" border="bottom" v-model="formData.username"
						    style="height: 26px;" prefixIcon="phone" maxlength="11" type="number"
						    prefixIconStyle="font-size: 22px;color: #909399"></up-input>
				    </up-form-item>

                    <text class="form-label">密码</text>
                    <up-form-item borderBottom labelPosition="top" style="margin-top: 10px;">
					    <up-input class="input-model" placeholder="请输入密码" border="bottom" v-model="formData.password"
						    style="height: 26px;" prefixIcon="lock" maxlength="20"
						    prefixIconStyle="font-size: 22px;color: #909399"></up-input>
				    </up-form-item>
                
                    <text class="form-label">验证码</text>
				    <view class="verity-box" style="margin-top: 5px;">
				    	<up-form-item borderBottom labelPosition="top" style="flex: 1;">
				    		<up-input class="input-model" placeholder="请输入验证码" border="bottom" v-model="formData.verityCode"
                                style="height: 26px;" prefixIcon="chat" maxlength="6"
                                prefixIconStyle="font-size: 22px;color: #909399"></up-input>
				    	</up-form-item>
                    
				    	<text class="code-button" type="primary" @tap="getVerifyCode">获取验证码</text>
				    </view>

				    <view class="main-policy">
						<up-checkbox usedAlone v-model:checked="formData.agreedPolicy" label="" label-color="#ffffff" active-color="#55aa7f"></up-checkbox>
				    	<text class="sub-title">我已阅读并同意
                            <text class="url" @tap="openProtocol">《用户隐私政策》</text>
                        </text>
				    </view>
				    <button class="app-btn" type="primary" style="margin-top: 20px;" @tap="submitRegisterRequest">注册</button>

				    <view class="main-help" style="justify-content: flex-end;">
					    <a class="app-link" @tap="openLogin()">已有账号？去登录</a>
				    </view>
			    </up-form>
            </view>
        </view>
    </view>
</template>

<script setup>
	import { test } from "uview-plus";
	import { random } from 'uview-plus';
	import { reactive, ref } from "vue";
	import { register } from "@/api/user";

	const formData = reactive({
        username: '',
		password: '',
		verityCode: '',
		agreedPolicy: false
	});
    const isVerifyCode = ref(false);

	/**
	 * 打开用户协议页面
	 * 使用 `uni.navigateTo` 方法导航到用户协议页面。
	 */
	const openProtocol = () => {
		uni.navigateTo({
			url: '/pages/app-account/app-register',
		});
	}

	/**
	 * 获取验证码函数
	 * 检查用户输入的手机号是否正确
	 * 如果条件满足，则模拟发送验证码并显示发送成功的提示。
	 * @returns {void}
	 */
	const getVerifyCode = () => {
		if (!test.mobile(formData.username)) {
			return uni.showToast({
				icon: 'none',
				title: '请输入正确的手机号'
			});
		}
		uni.showLoading({ title: "发送中" });
		setTimeout(() => {
			uni.showToast({ title: '发送成功' });
			formData.verityCode = random(100000, 999999)
			uni.hideLoading()
			isVerifyCode.value = true
		}, 2500);
	}

	/**
	 * 提交注册请求的函数。
	 * 该函数首先进行一系列参数验证，包括手机号格式、密码长度、两次输入密码是否一致、是否获取验证码以及是否同意用户隐私政策。
	 * 验证通过后，显示加载提示，并调用注册接口进行注册。
	 * 注册成功后显示提示信息，并返回上一页面；注册失败则显示错误信息。
	 * 无论注册成功与否，最后都会隐藏加载提示。
	 * @returns {void}
	 */
	const submitRegisterRequest = async () => {
		if (!test.mobile(formData.username)) return uni.showToast({
			icon: 'none',
			title: '请输入正确的手机号'
		});
		if (!test.rangeLength(formData.username, [6, 12])) return uni.showToast({
			icon: 'none',
			title: '密码在6-12位之间'
		});
		if (!formData.agreedPolicy) return uni.showToast({
			icon: 'none',
			title: '请先同意隐私政策'
		});
		if (!isVerifyCode) return uni.showToast({
				icon: 'none',
				title: '请先获取验证码'
		});
		uni.showLoading({ title: "注册中" });
		register({
			username: formData.username,
			password: formData.password,
			email: ''
		}).then(res => {
			uni.showToast({
				icon: 'success',
				title: '注册成功'
			});
			setTimeout(() => {
				uni.navigateBack();
			}, 1000);
		}).catch(e => {
			uni.showToast({
				icon: "none",
				title: e.msg
			});
		}).finally(() => uni.hideLoading());
	}

    /**
	 * 打开登录页面
	 * 通过调用uni.navigateBack()方法，返回到上一个页面，通常是登录页面。
	 */
	const openLogin = () => uni.navigateBack();
</script>

<style lang="scss">
    @import "style.scss";

    .u-input {
        padding-left: 0!important;
    }
</style>