<template>
    <view class="app-activity activity-vonews-detail">
        <up-loading-page :loading="loading">
			<text style="margin-top: 20px;">正在加载中</text>
		</up-loading-page>

        <view class="iamge-box" v-if="!loading">
            <image
                class="image"
                :src="getSplitByImagelist(newsInfo.imageList)"
                mode="widthFix"
                @tap="previewImage([getSplitByImagelist(tipsDetail.imageList)], 0)"
            />
        </view>

        <view style="padding-bottom: 20px;" v-if="!loading">
            <view class="main-container">
                <text class="item-text">{{ newsInfo.title }}</text>
                <text class="item-text" style="color: #666666;">{{ getDateByTimeStamp(newsInfo.updateTime) }}</text>
            </view>

            <view class="main-container">
                <text class="item-text">{{ newsInfo.content }}</text>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { onMounted, defineProps, ref } from 'vue';
    import { getVolunteerNewsDetail } from '@/api/volunteers';
    import { getSplitByImagelist, getDateByTimeStamp, previewImage } from '@/utils/utils';

    const loading = ref(true);
    const newsInfo = ref(null);

    const props = defineProps({
		id: String
	});

    onMounted(() => {
        getVolunteerNewsDetail({ id: props.id }).then(response => {
            newsInfo.value = response.data;
            setTimeout(() => loading.value = false, 500);
        });
    });

    // 无网络页面
</script>

<style lang="scss">
    @import "style.scss";
</style>