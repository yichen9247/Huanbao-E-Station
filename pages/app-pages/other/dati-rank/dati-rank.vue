<template>
    <view class="app-activity activity-dati-ranking" style="height: 100%;">
		<view class="background"></view>
		<view class="header">
			<view class="header-title">
				<image src="/static/icons/trophy.png"></image>
				<text>&nbsp;积分挑战赛</text>
			</view>
			<text class="header-date">-- {{ getTodayDate() }} --</text>
		</view>
		<view class="ranking">
			<view class="rangking-title">
				<text>排名</text>
				<text>昵称</text>
				<text>耗时</text>
			</view>
			<view class="ranking-list">
				<view class="ranking-list-item" v-for="(item, key) in dataList" :key="key">
					<view v-if="key < 3" class="ranking-list-number">
						<image :src="'/static/app-ranking/' + (key + 1) + '.png'"></image>
					</view>
					<view v-else class="ranking-list-number">
						<text>{{key + 1}}</text>
					</view>
					<view class="ranking-list-nickname">
						<image :src="getSplitByImagelist(item.user.userAccount.photo)"></image>
						<text>{{ item.user.userAccount.nickname }}</text>
					</view>
					<text class="ranking-list-score">{{ item.useTime }}s</text>
				</view>
			</view>
		</view>
		<text class="fixed-text">每1小时更新一次</text>
	</view>
</template>

<script setup>
    import { reactive, onMounted } from "vue";
    import { geyQuestionsRankList } from "@/api/questions";
    import { getTodayDate, getSplitByImagelist } from "@/utils/utils";

    const dataList = reactive([]);

    onMounted(() => {
        geyQuestionsRankList({
            page: 1,
            limit: 5
        }).then(response => {
            for (const element of response.data) {
                dataList.push(element);
            }
        });
    });
</script>

<style lang="scss">
    @import "style.scss";
</style>