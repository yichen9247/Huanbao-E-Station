<template>
    <view class="app-activity activity-policy-detail">
        <up-loading-page :loading="loading">
			<text style="margin-top: 20px;">正在加载中</text>
		</up-loading-page>

        <view class="main" v-if="tipsDetail && !loading">
            <view class="title-view">
                <text class="title up-line-2">{{ tipsDetail.title }}</text>
                <view class="info-box">
                    <text class="tips-author">国家政策</text>
                    <text class="tips-date">{{ getDateByTimeStamp(tipsDetail.updateTime) }}</text>
                </view>
            </view>

            <view class="content-view">
                <ua-markdown class="content" :source="tipsDetail.markdownContent" />
            </view>
        </view>
    </view>
</template>

<script setup>
    import config from "@/config";
    import { getPolicyNews } from '@/api/policy';
    import { onMounted, defineProps, ref } from 'vue';
    import { getDateByTimeStamp } from "@/utils/utils";

    const loading = ref(true);
    const tipsDetail = ref(null);
    const props = defineProps({
		id: String
	});

    onMounted(() => {
        getPolicyNews({ id: props.id }).then(responose => {
            tipsDetail.value = responose.data;
            saveHistory();
            setTimeout(() => loading.value = false, 500);
            if (tipsDetail.value && tipsDetail.value.markdownContent) {
                tipsDetail.value.markdownContent = tipsDetail.value.markdownContent.replace(/!\[.*?\]\((.*?)\)/g, (match, p1) => {
                    return `![](${config.baseUrl}${p1})`;
                });
            }
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
            type: 'policy',
            title: tipsDetail.value.title,
            content: tipsDetail.value.textContent,
            imageList: tipsDetail.value.imageUrls.split(',')
        });
        uni.setStorageSync('browseHistory', history);
    };
</script>

<style lang="scss">
    @import "style.scss";

    h1,h2,h3,h4,h5,h6 {
        font-size: 18px!important;
    }

    img {
        width: 100%;
        margin-bottom: 10px;
        display: block!important;
        max-width: 100%!important;
        border-radius: 10px!important;
    }
</style>