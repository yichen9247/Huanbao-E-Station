<template>
	<view class="app-activity activity-user-signed" style="height: 100%;">
		<view class="sign-view app-card">
			<view class="data-box">
				<text class="data-text">已连续签到 <text class="data">{{ continueDays ? continueDays : 0 }}</text> 天</text>
				<view class="open-notice">开启提醒</view>
			</view>

			<!-- index < continueDays 已签到天数  -->

			<view class="date-box">
				<view class="date-item" v-for="(item, index) in dateList" :key="index" :signed="index < continueDays">
					<view class="item-content">
						<text class="item-order">{{ item.coin }}</text>
					</view>
					<text class="item-date">{{ item.days }}天</text>
				</view>
			</view>
			<button class="app-btn" :type="isLogined ? 'default' : 'primary'" @tap="userSignToDay()">立即签到</button>
		</view>

		<view class="task-view app-card">
			<TitleComponent title="今日任务" style="width: 95%;" />
			<up-list class="task-list">
				<up-list-item class="tips-list-item" v-for="(item, index) in taskList" :key="index">
					<view class="icon-box">
						<image class="icon" src="/static/icons/task/task-study.png" mode=""></image>
					</view>
					<view class="item-content">
						<text class="item-title up-line-1">{{ item.title }}</text>
						<view class="reward-box">
							<text class="reward-text">{{ item.coin }}积分&nbsp;{{ item.experience }}活跃度</text>
						</view>
					</view>
					<view class="status-box">
						<text class="status-text" :status="item.complete">{{ item.complete ? '已完成' : '前往' }}</text>
					</view>
				</up-list-item>
			</up-list>
		</view>

		<up-overlay :show="sign_card">
			<view class="signed-card-container">
				<view class="signed-card">
					<text class="tips-text">打卡成功</text>
					<image class="inser-png" src="/static/icons/signed_icon.png" mode="aspectFit"></image>

					<view class="date-box">
						<text class="date-text">{{ getWeekDay() }}</text>
						<text class="date-text" style="font-size: 18px;">{{ getDate() }}</text>
					</view>

					<view class="hito-box">
						<text class="hito-text">低碳生活</text>
						<text class="hito-text">从我做起</text>
					</view>
				</view>

				<view class="close-btn" @tap="sign_card = false">
					<up-icon class="icon" name="close" color="#ffffff" size="24"></up-icon>
				</view>
			</view>
		</up-overlay>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import {
		signList,
		sign,
		getTodayTaskList
	} from '@/api/sign';
	import {
		isSameDay,
		getWeekDay,
		getDate
	} from '@/utils/utils';

	const continueDays = ref(0);
	const sign_card = ref(false);
	const isLogined = ref(false);
	const dateList = reactive([]);
	const taskList = reactive([]);

	onMounted(() => {
		getSignList();
		getTaskList();
	});

	/**
	 * 获取任务列表
	 * 该函数用于获取任务列表，具体实现细节待补充。
	 */
	const getTaskList = () => {
		getTodayTaskList().then(response => {
			for (const element of response.data) {
				taskList.push(element);
			}
		}).catch(e => {
			uni.showToast({
				icon: 'none',
				title: e.msg
			});
		});
	}

	/**
	 * 获取签到列表并更新相关数据。
	 * 调用 signList API 获取签到数据，更新登录状态、连续签到天数以及日期列表。
	 * 如果请求失败，显示错误提示。
	 */
	const getSignList = () => {
		signList().then(res => {
			continueDays.value = res.data.continueDays;
			isLogined.value = isSameDay(res.data.updateTime);
			dateList.splice(0, dateList.length, ...res.data.userSignInIncentivesList);
		}).catch(e => {
			uni.showToast({
				icon: 'none',
				title: e.msg
			});
		});
	}

	/**
	 * 用户今日签到功能
	 * @function userSignToDay
	 * @description 调用签到接口，如果签到成功则更新签到卡片状态并获取签到列表，失败则显示错误提示。
	 */
	const userSignToDay = () => {
		sign().then(res => {
			if (res.code === 200) {
				sign_card.value = true;
				getSignList();
			}
		}).catch(e => {
			uni.showToast({
				icon: 'none',
				title: e.msg
			});
		});
	}

	/**
	 * 跳转至用户登录界面
	 */
	const userSign = () => {
		uni.navigateBack(1);
	}
</script>

<style lang="scss">
	@import "style.scss";
</style>