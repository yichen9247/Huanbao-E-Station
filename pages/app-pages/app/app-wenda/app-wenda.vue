<template>
    <view class="app-activity activity-app-wenda" style="height: 100%;">
        <view class="background">
            <view class="main-container">
                <view class="wel-view">
                    <view class="message-box">欢迎各位环保小卫士前来挑战</view>
					<image class="bot-icon" mode="aspectFit" src="/static/images/e-bot.png" />
                </view>

                <view class="task-view app-card">
                    <view class="left-box" @tap="applicationStore.navigateTo('/pages/app-pages/other/dati-rank/dati-rank');">
                        <image class="icon-box" mode="aspectFit" style="width: 75%; height: 100px;"
                            src="/static/images/zhihui-paihang.png" />
                        <text class="box-name">排行榜</text>
                    </view>
                    <view class="right-box">
                        <view class="btn-box" @tap="startDati()">
                            <image class="icon-box" mode="scaleToFill" style="transform: scale(0.95);"
                                src="/static/images/zhihui-task.png" />
                            <text class="box-name">每日问答</text>
                        </view>

                        <view class="btn-box" @tap="applicationStore.navigateTo('/pages/app-pages/app/app-cuoti/app-cuoti');">
                            <image class="icon-box" mode="scaleToFill" src="/static/images/zhihui-cuoti.png"/>
                            <text class="box-name">错题集锦</text>
                        </view>
                    </view>
                </view>

                <view style="padding-bottom: 20px;">
                    <view class="activity-view app-card">
                        <TitleComponent title="趣味挑战" style="width: 100%;" />
                        <view class="activity-box">
                            <view class="left-box">
                                <image class="icon-box" mode="aspectFit" style="width: 100%; height: 135px;"
                                    src="/static/images/zhihui-jiangpai.png" />
                                <text class="box-name">校园排位赛</text>
                            </view>
                            <view class="right-box">
                                <view class="btn-box" style="height: 75px; background-color: rgba(85, 170, 127, 0.25);">
                                    <image class="icon-box" mode="scaleToFill"
                                        src="/static/icons/jhk-1733969298451.png" />
                                    <text class="box-name">积分奖励</text>
                                </view>
                                <view class="btn-box"
                                    style="height: 175px; background-color: #E3DCFF; flex-direction: column; justify-content: center;">
                                    <image class="icon-box" mode="aspectFit" src="/static/icons/jhk-1733921428484.png"
                                        style="width: 72px; height: 72px; transform: scale(1.65);" />
                                    <text class="box-name" style="margin-left: unset; margin-top: 15px;">双人对战</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref } from 'vue';
    import { useApplicationStore } from "@/store/applicationStore";

    const date = new Date();
    const applicationStore = useApplicationStore();
    const dati_status = ref(`${date.getFullYear()} - ${date.getMonth() + 1} ${date.getDate()}` === uni.getStorageSync('dati_date'))

    /**
     * 检查是否已开始答题，并根据状态进行相应操作。
     * 如果今日已经答题过，则显示提示信息；否则，导航到答题起始页面。
     */
    const startDati = () => {
        if (dati_status.value) return uni.showToast({
            icon: 'none',
            title: "今日已经答题过了"
        });
        applicationStore.navigateTo("/pages/app-pages/other/starter-dati/starter-dati");
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>