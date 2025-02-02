<template>
    <view class="app-activity activity-detail">
        <up-loading-page :loading="loading">
            <text style="margin-top: 20px;">正在加载中</text>
        </up-loading-page>

        <view style="padding-bottom: 20px;">
            <view class="main-container" v-if="!loading">
                <view class="card-box">
                    <image class="image" mode="scaleToFill" :src="getSplitByImagelist(activityDetail.imageList)" />

                    <view class="content-box">
                        <text class="title">{{ activityDetail.name }}</text>
                        <text class="info-text">{{ activityDetail.location }}</text>
                    </view>
                </view>

                <view class="info-box">
                    <text class="info-text up-line-2">开始时间：{{ getDateByTimeStamp(activityDetail.startTime) }}</text>
                    <text class="info-text up-line-2">结束时间：{{ getDateByTimeStamp(activityDetail.endTime) }}</text>
                    <text class="info-text up-line-2">活动简介：{{ activityDetail.description }}</text>
                </view>

                <view class="button-box">
                    <button class="app-btn" type="default" @tap="signModel = true">立即报名</button>
                    <button class="app-btn" type="primary" @tap="applicationStore.navigateTo('/pages/app-pages/add/add-artwork/add-artwork?id=' + props.id)">提交作品</button>
                </view>

                <TitleComponent title="热门作品"/>

                <view class="answer-list">
                    <view class="answer-item" v-for="(item, index) in hotArtwork" :key="index" @tap="applicationStore.subNavigateTo('/pages/app-pages/detail/artwork-detail/artwork-detail?id=' + item.id)">
                        <view class="image-box">
                            <up-lazy-load class="image" width="120" :image="getSplitByImagelist(item.imageList)" img-mode="widthFix" loading-img="" error-img=""/>
                            <view class="content-box">
                                <text class="title">{{ item.votesNumber }} 票</text>
                            </view>
                        </view>
                        <view class="content-desc">
                            <text class="item-name up-line-1">{{ item.name }}</text>
                            <text class="item-desc up-line-1">{{ item.description }}</text>
                        </view>
                    </view>
                </view>

                <TitleComponent title="作品列表"/>

                <view class="answer-list">
                    <view class="answer-item" v-for="(item, index) in artworkList" :key="index" @tap="applicationStore.subNavigateTo('/pages/app-pages/detail/artwork-detail/artwork-detail?id=' + item.id)">
                        <view class="image-box">
                            <up-lazy-load class="image" width="120" :image="getSplitByImagelist(item.imageList)" img-mode="widthFix" loading-img="" error-img=""/>
                            <view class="content-box">
                                <text class="title">{{ item.votesNumber }} 票</text>
                            </view>
                        </view>
                        <view class="content-desc">
                            <text class="item-name up-line-1">{{ item.name }}</text>
                            <text class="item-desc up-line-1">{{ item.description }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <up-action-sheet class="sign-competition" title="报名比赛" :show="signModel" round="20" closeOnClickOverlay @close="signModel = false">
            <up-form class="sign-form">
                <up-form-item>
                    <up-input placeholder="请输入选手姓名" border="surround" v-model="signForm.name"/>
                </up-form-item>

                <up-form-item>
                    <up-input placeholder="请输入班级" border="surround" v-model="signForm.squad"/>
                </up-form-item>

                <up-form-item>
                    <up-input placeholder="请输入系部" border="surround" v-model="signForm.sector"/>
                </up-form-item>

                <up-form-item>
                    <up-input type="number" placeholder="请输入手机号" border="surround" v-model="signForm.phoneNumber" maxlength="11"/>
                </up-form-item>

                <up-form-item>
                    <up-input placeholder="请输入指导教师姓名" border="surround" v-model="signForm.directiveTeacher" maxLength="11" typr="phone"/>
                </up-form-item>
                <button class="app-btn" type="primary" @tap="submitSignCompetition()">提交信息</button>
            </up-form>
        </up-action-sheet>
    </view>
</template>

<script setup>
    import { onReachBottom } from '@dcloudio/uni-app';
    import { ref, onMounted, defineProps, reactive } from "vue";
    import { useApplicationStore } from '@/store/applicationStore';
    import { getSplitByImagelist, getDateByTimeStamp } from "@/utils/utils";
    import { getCompetitionProjectDetail, getCompetitionHotArtworkList, getCompetitionArtworkList, signUpCompetitionProject } from '@/api/competitions';

    const page = ref(1);
    const limit = ref(10);
    const loading = ref(true);
    const signModel = ref(false);
    const hotArtwork = reactive([]);
    const artworkList = reactive([]);
    const activityDetail = ref(null);
    const applicationStore = useApplicationStore();

    const props = defineProps({
        id: String,
        sign: String
    });

    const signForm = reactive({
        name: "",
        squad: "",
        sector: "",
        projectId: null,
        phoneNumber: "",
        directiveTeacher: ""
    });

    /**
     * 获取竞赛艺术品列表
     * @function getCompetitionArtworkList
     * @description 通过调用API获取竞赛艺术品列表，并将结果添加到artworkList数组中
     * @param {Object} props - 组件属性，包含竞赛项目的ID
     * @param {Object} page - 分页信息，包含当前页码
     * @param {Object} limit - 分页信息，包含每页显示的数量
     * @returns {Promise<void>} - 返回一个Promise对象，表示异步操作的完成
     */
     const getArtworkList = () => {
        getCompetitionArtworkList({
            page: page.value,
            limit: limit.value,
            projectId: props.id
        }).then(response => {
            for (const element of response.data) {
                artworkList.push(element);
            }
        });
    }

    onMounted(() => {
        signForm.projectId = props.id;
        getCompetitionProjectDetail({ id: props.id }).then(response => {
            activityDetail.value = response.data;
            setTimeout(() => {
                loading.value = false;
                signModel.value = props.sign === "true";
            }, 500);
        });

        getCompetitionHotArtworkList({ projectId: props.id }).then(response => {
            for (const element of response.data) {
                hotArtwork.push(element);
            }
        });
        getArtworkList();
    });

    onReachBottom(() => {
        page.value += 1;
        getArtworkList();
    });

    /**
     * 提交报名竞赛的函数。
     * 检查报名表单的所有必填字段是否已填写，如果未填写则显示提示信息。
     * 如果所有字段都已填写，则发送报名请求，并根据响应结果显示相应的提示信息。
     * @returns {void}
     */
    const submitSignCompetition = () => {
        if (!signForm.name || !signForm.squad || !signForm.sector || !signForm.phoneNumber || !signForm.directiveTeacher) return uni.showToast({
	    	icon: 'none',
	    	title: "请填写完整的报名信息"
	    });
        signUpCompetitionProject({ data: signForm }).then(response => {
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
            signModel.value = false;
        });
    }
</script>

<style lang="scss">
    @import "style.scss";

    .u-input {
        padding: 8px 10px!important;
    }
</style>