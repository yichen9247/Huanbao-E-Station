<template>
    <view class="app-page app-page-login">
        <view class="head-view">
            <text class="head-title">重置，</text>
            <text class="head-description">您的低碳E站账号</text>
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

                    <text class="form-label">新密码</text>
                    <up-form-item borderBottom labelPosition="top" style="margin-top: 10px;">
					    <up-input type="password" class="input-model" placeholder="请输入新密码" border="bottom" v-model="formData.password"
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
				    <button class="app-btn" type="primary" style="margin-top: 20px;" @tap="submitForgetRequest">重置</button>

				    <view class="main-help" style="justify-content: flex-end;">
					    <a class="app-link" @tap="openLogin()">已有账号？去登录</a>
				    </view>
			    </up-form>
            </view>
        </view>
    </view>
</template>

<script setup>
	import { reactive, ref } from "vue";
	import { test, random } from 'uview-plus';
	import { forgetPassword } from "@/api/user";
	
	const formData = reactive({
        username: '',
		password: '',
		verityCode: '',
		agreedPolicy: false
	});
    const isVerifyCode = ref(false);

	/**
	 * 获取验证码
	 * 检查用户输入的手机号是否正确，如果正确则模拟发送验证码，并显示发送成功的提示。
	 * @returns {void}
	 */
	const getVerifyCode = () => {
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
		
		uni.showLoading({
			title: "发送中"
		});
	
		setTimeout(() => {
			uni.showToast({ title: '发送成功' });
			formData.verityCode = random(100000, 999999)
			uni.hideLoading();
			isVerifyCode.value = true
		}, 2500);
	}


	/**
	 * 提交忘记密码请求的函数。
	 * 该函数首先验证用户输入的手机号和密码是否符合要求，并检查是否已获取验证码。
	 * 如果所有验证通过，则显示加载提示并发送重置密码请求。
	 * 根据请求结果，显示相应的提示信息，并在成功后跳转到登录页面。
	 * @param {Object} formData - 包含用户名和密码的对象。
	 * @returns {void}
	 */
	const submitForgetRequest = () => {
		if(!test.mobile(formData.username)) {
			return uni.showToast({
				icon: 'none',
				title: '请输入正确的手机号'
			});
		}
		if (!test.rangeLength(formData.username, [6, 12])) {
			return uni.showToast({
				icon:'none',
				title: '密码在6-12位之间'
			});
		}
		if(!isVerifyCode.value) {
			return uni.showToast({
				icon:'none',
				title: '请先获取验证码'
			});
		}
		uni.showLoading({ title: "提交中" });
		forgetPassword({ username:formData.username, password:formData.password}).then(res =>{
			uni.showToast({
				icon:'success',
				title: '重置成功'
			});
			setTimeout(() => uni.navigateBack(), 1000);
		}).catch(e =>{
			return uni.showToast({icon:'none',title: e.msg});
		}).finally(() => uni.hideLoading());
	}


	/**
	 * 打开用户协议页面
	 * 使用 `uni.navigateTo` 方法导航到用户协议页面。
	 */
	const openProtocol = () => {
		uni.navigateTo({
			url: '/pages/user-protocol/user-protocol',
		});
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