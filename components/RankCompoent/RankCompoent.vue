<template>
    <view class="rank-component">
        <view class="data-list">
            <view class="data-item" v-for="(item, index) in dataList" :key="index">
                <image class="avatar" :src="getSplitByImagelist(item.user.userAccount.photo)"/>
                <text class="username">{{ item.user.userAccount.nickname }}</text>
                <text class="time-text">耗时 {{ item.useTime }}s</text>
            </view>
        </view>
        <view class="read-more" @tap="applicationStore.navigateTo('/pages/app-pages/other/dati-rank/dati-rank');">查看更多</view>
    </view>
</template>

<script setup>
    import { reactive, onMounted } from "vue";
    import { getSplitByImagelist } from "@/utils/utils";
    import { geyQuestionsRankList } from "@/api/questions";
    import { useApplicationStore } from "@/store/applicationStore";

    const dataList = reactive([]);
    const applicationStore = useApplicationStore();

    onMounted(() => {
        geyQuestionsRankList({
            page: 1,
            limit: 5
        }).then(response => {
            for (const element of response.data) {
                dataList.push(element);
            }
        })
    });
</script>

<style lang="scss">
    @import "style.scss";
</style>