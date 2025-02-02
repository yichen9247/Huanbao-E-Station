<template>
    <view class="app-activity activity-artwork-detail">
        <up-loading-page :loading="loading">
            <text style="margin-top: 20px;">正在加载中</text>
        </up-loading-page>
        
        <view class="image-box" v-if="!loading">
            <up-swiper class="image" height="200px" :loading="loading" :list="getSplitListByImagelist(artworkInfo.imageList)" keyName="pic" indicator indicatorMode="line" circular style="background-color: #ffffff;" @tap="previewImage(getSplitListByImagelist(artworkInfo.imageList), index)"/>
            <text class="artwork-number">{{ artworkInfo.votesNumber }} 票</text>
        </view>

        <view style="padding-bottom: 65px;" v-if="!loading">
            <view class="main-container" style="margin-top: unset;">
                <TitleComponent title="作品信息" style="width: 100%;"/>
                <text class="item-text">作品名称：{{ artworkInfo.name }}</text>
                <text class="item-text">投稿时间：{{ getDateByTimeStamp(artworkInfo.updateTime) }}</text>
                
            </view>

            <view class="main-container">
                <TitleComponent title="作品简介" style="width: 100%;"/>
                <text class="item-text">{{ artworkInfo.description }}</text>
            </view>
        </view>

        <view class="foot-container" v-if="!loading">
            <button class="app-btn" type="primary" @tap="exangeStatus = true">参与投票</button>
        </view>
        <up-modal :show="exangeStatus" title="确认投票" content="是否确认投票该作品，参与投票后将不可再次投票" @close="exitModelStatus = false" closeOnClickOverlay showCancelButton @confirm="votingThisArtwork()" @cancel="exangeStatus = false"></up-modal>
    </view>
</template>

<script setup>
    import { ref, onMounted, defineProps } from "vue";
    import { getDateByTimeStamp, getSplitListByImagelist, previewImage } from "@/utils/utils";
    import { getCompetitionArtworkDetail, votingCompetitionArtwork } from '@/api/competitions';

    const loading = ref(true);
    const artworkInfo = ref(null);
    const exangeStatus = ref(false);

    const props = defineProps({
        id: String
    });

    onMounted(() => {
        getCompetitionArtworkDetail({ id: props.id }).then(response => {
            artworkInfo.value = response.data;
            setTimeout(() => loading.value = false, 500);
        });
    });

    /**
     * 投票当前艺术品
     * @function votingThisArtwork
     * @description 调用投票竞赛艺术品接口，成功后显示投票成功的提示，失败则显示错误信息。
     * @param {Object} props - 包含艺术品ID的props对象
     * @returns {Promise<void>} - 返回一个Promise对象，表示投票操作的异步结果
     */
    const votingThisArtwork = () => {
        votingCompetitionArtwork({ id: props.id }).then(response => {
            uni.showToast({
		    	icon: 'success',
		    	title: "投票成功"
		    });
        }).catch(e => {
            uni.showToast({
		    	icon: 'none',
		    	title: e.msg
		    });
        }).finally(() => {
            exangeStatus.value = false;
        });
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>
