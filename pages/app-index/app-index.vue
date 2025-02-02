<template>
    <view class="app-index">
        <view class="image-container">
            <image
                class="image"
                mode="scaleToFill"
                src="/static/app-index/booting-1.png"
            />
        </view>

        <view class="main-container">
            <view class="main-box">
                <image
                    class="logo"
                    src="/static/logo.png"
                    mode="scaleToFill"
                />
                <view class="content">
                    <text class="name">{{ config.name }}</text>
                    <text class="desc">{{ config.description }}</text>
                </view>
            </view>
            <!-- <text class="status-text">正在加载用户数据</text> -->
        </view>
        <PrivacyComponent :show="policyShow" @reject="onPolicyReject" @agree="onPolicyAgree"/>
		<!-- <button class="app-btn" type="primary">端口设置</button> -->
    </view>
</template>

<script setup>
    import { ref } from "vue";
	import config from "@/config";
    import { onShow } from "@dcloudio/uni-app";
    import { getUserMyInfo } from "@/api/user";
    import { useApplicationStore } from "@/store/applicationStore";

    const policyShow = ref(false);
    const applicationStore = useApplicationStore();
    
    onShow(() => {
        getUserMyInfo().then(response => {
            if (response.code === 200) {
                applicationStore.setUserInfo(response.data.userAccount);
                applicationStore.setUserAuthorities({
                    volunteer: response.data.volunteer
                });
            } else applicationStore.resetUserInfo();
        }).catch(e => {
            applicationStore.resetUserInfo();
        }).finally(() => {
            applicationStore.setStarted(true);
            if (uni.getStorageSync('policy') === 'agreed') {
                setTimeout(() => {
                    uni.reLaunch({
			    		url: "/pages/app-frame/frame-home/frame-home"
			    	});
                }, 500);
            } else setTimeout(() => policyShow.value = true, 500);
        });
    });

    /**
     * 处理用户拒绝策略的操作。
     * 当用户拒绝策略时，此函数会隐藏策略弹窗。
     * 如果运行环境不是原生应用（plus未定义），则会在500毫秒后重新显示策略弹窗。
     * 如果是原生应用环境，则会调用plus.runtime.quit()退出应用。
     */
    const onPolicyReject = () => {
        policyShow.value = false;
        if (typeof plus === 'undefined') {
            setTimeout(() => policyShow.value = true, 500);
        } else plus.runtime.quit();
    }

    /**
     * 用户同意政策后的处理函数。
     * 该函数将隐藏政策显示，存储用户同意的状态，并在短暂延迟后重新加载到主页。
     * @returns {void}
     */
    const onPolicyAgree = () => {
        policyShow.value = false;
        uni.setStorageSync('policy', 'agreed');
        setTimeout(() => {
            uni.reLaunch({
				url: "/pages/app-frame/frame-home/frame-home"
			});
        }, 500);
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>