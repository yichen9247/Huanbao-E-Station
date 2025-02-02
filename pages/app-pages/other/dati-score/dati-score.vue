<template>
    <view class="app-activity activity-dati-score">
        <view class="view-box score-view app-card">
            <view class="score-box">
                <text class="score-text">{{ applicationStore.userDatiStorage.score.toFixed(1) }}分</text>
            </view>
            <view class="static-box">
                <view class="static-item">
                    <text class="item-name">题目个数</text>
                    <text class="item-value">{{ applicationStore.userDatiStorage.topicList.length }}</text>
                </view>
                <view class="static-item">
                    <text class="item-name">答对题数</text>
                    <text class="item-value">{{ applicationStore.userDatiStorage.correctAnswersCount }}</text>
                </view>
                <view class="static-item">
                    <text class="item-name">答错题数</text>
                    <text class="item-value">{{ applicationStore.userDatiStorage.notCorrectAnswersCount }}</text>
                </view>
                <view class="static-item">
                    <text class="item-name">答题时间</text>
                    <text class="item-value">{{ applicationStore.userDatiStorage.totalTime }}秒</text>
                </view>
            </view>
        </view>

        <view class="view-box reward-view app-card">
            <text class="view-title">奖励积分</text>
            <view class="view-content">
                <text class="point-value">{{ applicationStore.userDatiStorage.points }}</text>
                <view class="icon-box" v-html="icons.dati_points"></view>
            </view>
        </view>

        <view class="view-box topic-view app-card">
            <text class="view-title">题目统计</text>
            <view class="view-content">
                <view class="topic-item" v-for="(item, index) in applicationStore.userDatiStorage.answer" :key="index">
                    <text class="item-id">{{ item.id }}</text>
                    <text class="item-status" :status="item.isCorrect">{{ item.choice }}</text>
                </view>
            </view>
        </view>

        <view style="padding-bottom: 20px;">
            <button class="app-btn sheet-btn" type="primary" @tap="back()">返回首页</button>
        </view>
    </view>
</template>

<script setup>
    import icons from '@/utils/icons';
    import { useApplicationStore } from "@/store/applicationStore";

    const back = () => uni.navigateBack(1);
    const applicationStore = useApplicationStore();
</script>

<style lang="scss">
    @import "style.scss";
</style>