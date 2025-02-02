<template>
    <view class="app-activity activity-votask-detail">
        <up-loading-page :loading="loading">
			<text style="margin-top: 20px;">正在加载中</text>
		</up-loading-page>

        <view class="iamge-box" v-if="!loading">
            <image
                class="image"
                :src="getSplitByImagelist(taskInfo.imageList)"
                mode="widthFix"
            />
        </view>

        <view style="padding-bottom: 65px;" v-if="!loading">
            <view class="main-container" style="margin-top: unset;">
                <TitleComponent title="项目详情" style="width: 100%;"/>
                <text class="item-text">项目名称：{{ taskInfo.title }}</text>
                <text class="item-text">项目地址：{{ taskInfo.address }}</text>
                <text class="item-text">报名人数：{{ taskInfo.enlistsNumber }}/{{ taskInfo.number }} 人</text>
                <text class="item-text">项目期限：{{ getDateByTimeStamp(taskInfo.startTime) }} 至 {{ getDateByTimeStamp(taskInfo.endTime) }}</text>
            </view>

            <view class="main-container">
                <TitleComponent title="项目简介" style="width: 100%;"/>
                <text class="item-text">{{ taskInfo.describes }}</text>
            </view>
        </view>

        <view class="foot-container">
            <button class="app-btn" type="primary" @tap="exangeStatus = true">我要报名</button>
        </view>
        <up-modal :show="exangeStatus" title="确认报名" content="是否确认报名该项目，参与报名后将不可再次报名" @close="exitModelStatus = false" closeOnClickOverlay showCancelButton @confirm="signUpVolunteer()" @cancel="exangeStatus = false"></up-modal>
    </view>
</template>

<script setup>
    import { onMounted, defineProps, ref } from 'vue';
    import { getSplitByImagelist, getDateByTimeStamp } from '@/utils/utils';
    import { getVolunteerTaskDetail, signUpVlounteerTask } from '@/api/volunteers';

    const taskInfo = ref(null);
    const loading = ref(true);
    const exangeStatus = ref(false);
    const props = defineProps({
		id: String
	});

    onMounted(() => {
        getVolunteerTaskDetail({ id: props.id }).then(response => {
            taskInfo.value = response.data;
            setTimeout(() => loading.value = false, 500);
        });
    });

    /**
     * 报名成为志愿者的函数。
     * 调用 signUpVlounteerTask API 来报名指定的任务，并根据响应显示相应的提示信息。
     * @param {Object} props - 包含任务ID的props对象。
     * @returns {Promise<void>} - 返回一个Promise对象，表示报名操作的异步结果。
     */
    const signUpVolunteer = () => {
        signUpVlounteerTask({ taskId: props.id }).then(response => {
            uni.showToast({
		    	icon: 'success',
		    	title: "报名成功"
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