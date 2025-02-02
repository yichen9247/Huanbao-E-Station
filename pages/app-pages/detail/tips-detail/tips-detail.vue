<template>
    <view class="app-activity activity-tips-detail">
        <up-loading-page :loading="loading">
			<text style="margin-top: 20px;">正在加载中</text>
		</up-loading-page>

        <view class="main" v-if="tipsDetail && !loading">
            <view class="title-view">
                <text class="title">{{ tipsDetail.title }}</text>
            </view>

            <view class="content-view">
                <image class="image" mode="widthFix" :src="getSplitByImagelist(tipsDetail.imageList)" @tap="previewImage([getSplitByImagelist(tipsDetail.imageList)], 0)"/>
                <text class="content">{{ tipsDetail.content }}</text>
                <view class="info-box">
                    <text class="tips-author">低碳小贴士</text>
                    <text class="tips-date">{{ getDateByTimeStamp(tipsDetail.updateTime) }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { getSplitByImagelist } from "@/utils/utils";
    import { getGreenestTips } from '@/api/greenestTips';
    import { onMounted, defineProps, ref, reactive } from 'vue';
    import { getDateByTimeStamp, previewImage } from "@/utils/utils";

    const loading = ref(true);
    const tipsDetail = ref(null);
    const props = defineProps({
        id: String
	});

    onMounted(() => {
        getGreenestTips({ id: props.id }).then(response => {
            tipsDetail.value = response.data;
            setTimeout(() => loading.value = false, 500);
            saveHistory();
        });
    });

    /**
     * 保存浏览历史记录到本地存储。
     * 如果已存在相同ID的记录，则先移除旧记录。
     * @param {Object} props - 包含当前项ID的属性对象。
     * @param {Object} tipsDetail - 包含标题、内容和图片列表的对象。
     */
    const saveHistory = () => {
        let history = uni.getStorageSync('browseHistory') || [];
        let isExist = history.some(item => item.id === props.id);
        if (isExist) history = history.filter(item => item.title !== tipsDetail.value.title);
        history.push({
            id: props.id,
            type: 'tips',
            title: tipsDetail.value.title,
            content: tipsDetail.value.content,
            imageList: tipsDetail.value.imageList.split(',')
        });
        uni.setStorageSync('browseHistory', history);
    };
</script>

<style lang="scss">
    @import "style.scss";
</style>