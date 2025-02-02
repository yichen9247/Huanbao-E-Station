<template>
    <view class="app-page app-page-login">
        <view class="head-view">
            <text class="head-title">您好，</text>
            <text class="head-description">欢迎使用低碳E站</text>
        </view>

        <view class="main-view">
            <view class="main-container">
                <up-form class="main-form" :model="formData" ref="form">
                    <text class="form-label">手机号</text>
				    <up-form-item borderBottom labelPosition="top">
					    <up-input class="input-model" placeholder="请输入手机号" border="bottom" v-model="formData.username"
						    style="height: 26px;" prefixIcon="phone" maxlength="11"  type="number"
						    prefixIconStyle="font-size: 22px;color: #909399"></up-input>
				    </up-form-item>

                    <text class="form-label">密码</text>
				    
                    <up-form-item borderBottom labelPosition="top" style="margin-top: 10px;">
					    <up-input type="password" class="input-model" placeholder="请输入密码" border="bottom" v-model="formData.password"
						    style="height: 26px;" prefixIcon="lock" maxlength="20"
						    prefixIconStyle="font-size: 22px;color: #909399"></up-input>
				    </up-form-item>

				    <view class="main-policy">
						<up-checkbox usedAlone v-model:checked="formData.agreedPolicy" label="" label-color="#ffffff" active-color="#55aa7f"></up-checkbox>
				    	<text class="sub-title">我已阅读并同意
                            <text class="url" @tap="openProtocol">《用户隐私政策》</text>
                        </text>
				    </view>
				    <button class="app-btn" type="primary" style="margin-top: 20px;" @tap="submitLoginRequest">登录</button>

				    <view class="main-help">
					    <a class="app-link" @tap="openRegister()">立即注册</a>
					    <a class="app-link" @tap="openForgetPage()">忘记密码</a>
				    </view>
			    </up-form>

                <view class="other-method">
                    <text class="title-text">使用第三方登录</text>
                    <view class="method-list">
                        <view class="method-item" v-for="(item, index) in loginMethod" :key="index">
                            <image
                                class="icon"
                                :src="item.icon"
                                mode="scaleToFill"
                            />
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
	import { reactive } from "vue";
	import { test } from 'uview-plus';
	import { login } from "../../api/user";

	const formData = reactive({
		agreedPolicy: false,
		username: uni.getStorageSync("username"),
		password: uni.getStorageSync("password"),
	});

    const loginMethod = reactive([
        {
            name: 'wechat',
            icon: '/static/login-method/wechat.png'
        },{
            name: 'tencent',
            icon: '/static/login-method/tencent.png'
        },{
            name: 'weibo',
            icon: '/static/login-method/weibo.png'
        }
    ]);

	/**
	 * 提交登录请求的函数。
	 * 该函数首先验证用户名是否为正确的手机号，密码长度是否在6-12位之间。
	 * 如果验证通过，显示加载提示，并发送登录请求。
	 * 登录成功后，保存token、用户名和密码到本地存储，并跳转到首页。
	 * 如果登录失败，显示错误信息。
	 * 无论登录成功还是失败，最后都会隐藏加载提示。
	 */
	const submitLoginRequest = () => {
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
		uni.showLoading({ title: "登录中" });
		login({
			username: formData.username,
			password: formData.password
		}).then(res => {
			uni.showToast({
				icon: 'success',
				title: '登录成功'
			});
			uni.setStorageSync("token", res.data)
			uni.setStorageSync("username", formData.username)
			uni.setStorageSync("password", formData.password)
			setTimeout(() => {
				uni.reLaunch({
					url: "/pages/app-index/app-index"
				});
			}, 1000);
		}).catch(e => {
			uni.showToast({
				icon: 'none',
				title: e.msg
			});
		}).finally(() => uni.hideLoading());
	}

	/**
	 * 打开用户协议页面
	 * 使用 `uni.navigateTo` 方法导航到用户协议页面。
	 */
	const openProtocol = () => {
		uni.navigateTo({
			url: '/pages/app-pages/user/user-protocol/user-protocol',
		});
	}

	/**
	 * 打开忘记密码页面
	 * 使用 `uni.navigateTo` 方法导航到忘记密码页面。
	 */
	const openForgetPage = () => {
		uni.navigateTo({
			url: '/pages/app-account/app-forget'
		});
	}

	/**
	 * 打开注册页面的函数。
	 * 使用 `uni.navigateTo` 方法导航到注册页面。
	 */
	const openRegister = () => {
		uni.navigateTo({
			url: '/pages/app-account/app-register'
		});
	}
</script>

<style lang="scss">
    @import "style.scss";

    .u-input {
        padding-left: 0!important;
    }
</style>