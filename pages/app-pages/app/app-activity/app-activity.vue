<template>
    <view class="app-activity activity-app-activity">
        <up-loading-page :loading="loading">
			<text style="margin-top: 20px;">正在加载中</text>
		</up-loading-page>

        <view class="activity-list" v-if="!loading">
            <view class="activity-item" v-for="(item, index) in dataList" :key="index">
                <image
                    class="item-image"
                    mode="widthFix"
                    :src="getSplitByImagelist(item.imageList)"
                />
                <view class="item-content">
                    <text class="item-name up-line-2">{{ item.name }}</text>
                    <text class="item-text up-line-2">发布时间：{{ getDateByTimeStamp(item.createTime) }}</text>
                    <text class="item-text up-line-2">活动地址：{{ item.location }}</text>
                    <text class="item-text up-line-2">活动时间：{{ getDateByTimeStamp(item.startTime) + " - " + getDateByTimeStamp(item.endTime)}}</text>
                    <text class="item-text up-line-3">活动简介：{{ item.description }}</text>
                    <view class="button-sheet">
                        <button type="default" class="app-btn" @tap="applicationStore.subNavigateTo('/pages/app-pages/detail/activity-detail/activity-detail?id=' + item.id)">查看详情</button>
                        <button type="primary" class="app-btn" @tap="applicationStore.subNavigateTo('/pages/app-pages/detail/activity-detail/activity-detail?sign=true&id=' + item.id)">报名比赛</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    import { getDateByTimeStamp } from "@/utils/utils";
    import { getSplitByImagelist } from "@/utils/utils";
    import { useApplicationStore } from "@/store/applicationStore";
    import { getCompetitionProjectList } from "@/api/competitions";

    const page = ref(1);
    const limit = ref(10);
    const loading = ref(true);
    const dataList = reactive([]);
    const applicationStore = useApplicationStore();

    onMounted(() => {
        getCompetitionProjectList({
            page: page.value,
            limit: limit.value
        }).then(response => {
            setTimeout(() => loading.value = false, 500);
            for (const element of response.data) {
                dataList.push(element);
            }
        });
    });
</script>

<style lang="scss">
    @import "style.scss";
</style>