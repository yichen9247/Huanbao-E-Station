<template>
    <view class="app-activity activity-app-volunteer">
        <view class="input-box">
            <up-input class="input-model" placeholder="请输入搜索内容" border="surround" v-model="search_value"
			style="height: 26px;" color="#666666" prefixIcon="search"
			prefixIconStyle="font-size: 22px; color: var(--dominColor)" />
        </view>

        <view class="service-view">
            <view class="service-item" v-for="(item, index) in serviceList" :key="index" @tap="item.click">
                <image
                    :src="item.icon"
                    class="item-icon"
                    mode="scaleToFill"
                />
                <text class="item-name">{{ item.text }}</text>
            </view>
        </view>

        <view class="notice-view">
            <up-notice-bar :text="notice_text" color="var(--dominColor)"/>
        </view>

        <view class="list-view app-card" style="margin-bottom: 0;">
            <TitleComponent title="志愿项目" style="width: 100%;" />

            <up-empty style="padding-bottom: 25px;" text="请先成为志愿者" v-if="!applicationStore.userAuthorities.volunteer"
			    icon="/static/app-empty/permission.png">
			</up-empty>

            <up-list class="collect-list" v-else>
				<up-list-item class="tips-list-item" v-for="(item, index) in taskList" :key="index" @tap="applicationStore.navigateTo('/pages/app-pages/detail/votask-detail/votask-detail?id=' + item.id)">
					<up-lazy-load class="item-image" width="120" :image="getSplitByImagelist(item.imageList)" img-mode="widthFix" loading-img="" error-img=""/>
					<view class="item-content">
						<text class="item-title up-line-1">{{ item.title }}</text>
						<text class="item-descs up-line-2">{{ item.describes }}</text>
					</view>
				</up-list-item>
			</up-list>
        </view>

        <view class="list-view app-card" style="margin-bottom: 0;">
            <TitleComponent title="志愿新闻" style="width: 100%;" />

            <up-empty style="padding-bottom: 25px;" text="请先成为志愿者" v-if="!applicationStore.userAuthorities.volunteer"
			    icon="/static/app-empty/permission.png">
			</up-empty>

            <up-list class="collect-list" v-else>
				<up-list-item class="tips-list-item" v-for="(item, index) in newsList" :key="index" @tap="applicationStore.navigateTo('/pages/app-pages/detail/vonews-detail/vonews-detail?id=' + item.id)">
					<up-lazy-load class="item-image" width="120" :image="getSplitByImagelist(item.imageList)" img-mode="widthFix" loading-img="" error-img=""/>
					<view class="item-content">
						<text class="item-title up-line-1">{{ item.title }}</text>
						<text class="item-descs up-line-2">{{ item.content }}</text>
					</view>
				</up-list-item>
			</up-list>
        </view>

        <up-action-sheet class="sign-volunteer" title="志愿报名" :show="signModel" round="20" closeOnClickOverlay @close="signModel = false">
            <up-form class="sign-form">
                <up-form-item>
                    <up-input placeholder="请输入姓名" border="surround" v-model="signForm.name"/>
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
                <button class="app-btn" type="primary" @tap="submitSignVolunteer()">提交信息</button>
            </up-form>
        </up-action-sheet>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    import { useApplicationStore } from "@/store/applicationStore";
    import { getSplitByImagelist, getDateByTimeStamp } from "@/utils/utils";
    import { getVolunteerTaskList, signUpVlunteer, getVolunteerNewsList } from "@/api/volunteers";

    const signModel = ref(false);
    const search_value = ref('');
    const newsList = reactive([]);
    const taskList = reactive([]);
    const serviceList = reactive([{
        text: "志愿项目",
		path: "/pages/app-pages/",
        click: () => {},
		icon: "/static/app-volunteer/v2/service-1.png"
    },{
        text: "志愿培训",
		path: "/pages/app-pages/",
        click: () => {},
		icon: "/static/app-volunteer/v2/service-2.png"
    },{
        text: "志愿风采",
		path: "/pages/app-pages/",
        click: () => {},
		icon: "/static/app-volunteer/v2/service-3.png"
    },{
        text: "志愿报名",
		path: "/pages/app-pages/",
        click: () => signVoluteer(),
		icon: "/static/app-volunteer/v2/service-4.png"
    }]);

    const signForm = reactive({
        name: "",
        squad: "",
        sector: "",
        phoneNumber: ""
    });

    const applicationStore = useApplicationStore();
    const notice_text = ref('同学们，让我们携手为校园添绿！现招募拔草志愿者，一起参与美化校园环境。不论你是热爱自然的环保小卫士，还是想要在课余时间做些有意义的事情，我们都欢迎你的加入。快来加入我们，一起让校园的每一个角落都充满生机吧！');  

    onMounted(() => {
        if (!applicationStore.userAuthorities.volunteer) return;
        getVolunteerTaskList().then(response => {
            for (const element of response.data) {
                taskList.push(element);
            }
        });
        getVolunteerNewsList().then(response => {
            for (const element of response.data) {
                newsList.push(element);
            }
        });
    });

    /**
     * 检查用户是否已经是志愿者，并根据情况显示提示或打开报名表单。
     * 如果用户已经是志愿者，则显示“你已是志愿者”的提示信息。
     * 否则，将报名表单的状态设置为可见。
     */
    const signVoluteer = () => {
        if (applicationStore.userAuthorities.volunteer) {
            uni.showToast({
	        	icon: 'none',
	        	title: "你已是志愿者"
	        });
        } else signModel.value = true;
    }

    /**
     * 提交志愿者报名信息的函数。
     * 检查报名表单是否填写完整，如果不完整则显示提示信息。
     * 如果填写完整，则发送报名请求，并根据响应结果显示相应的提示信息。
     * 无论请求成功或失败，最后都会关闭报名弹窗。
     */
    const submitSignVolunteer = () => {
        if (!signForm.name || !signForm.squad || !signForm.sector || !signForm.phoneNumber) return uni.showToast({
	    	icon: 'none',
	    	title: "请填写完整的报名信息"
	    });
        signUpVlunteer({ data: signForm }).then(response => {
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

    .u-notice-bar {
        background-color: transparent!important;
    }
</style>