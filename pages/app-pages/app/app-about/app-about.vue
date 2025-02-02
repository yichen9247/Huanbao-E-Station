<template>
    <view class="app-activity activity-app-about">
        <view class="logo-container">
            <image
                src="/static/logo.png"
                class="logo-image"
                mode="scaleToFill"
            />
            <text class="text">{{ config.name }}</text>
            <text class="text" style="color: #333333; font-size: 14px;">{{ config.version }}（{{ config.vercode }}）</text>
        </view>

        <view class="list-container">
            <view class="list-item">
                <text class="item-name">访问官网</text>
                <up-icon name="arrow-right" color="#333333" size="20"></up-icon>
            </view>

            <view class="list-item" @tap="applicationStore.subNavigateTo('/pages/app-pages/user/user-protocol/user-protocol')">
                <text class="item-name">用户协议</text>
                <up-icon name="arrow-right" color="#333333" size="20"></up-icon>
            </view>
            <view class="list-item">
                <text class="item-name">服务热线</text>
                <up-icon name="arrow-right" color="#333333" size="20"></up-icon>
            </view>
        </view>
    </view>
</template>

<script setup>
    import config from "@/config";
    import { useApplicationStore } from "@/store/applicationStore";

    const applicationStore = useApplicationStore();
</script>

<style lang="scss">
    @import "style.scss";
</style>