<template>
	<view class="app-activity activity-app-kefu">
		<view class="action-view">
			<!-- <view class="question-box">
				<view class="question-list">
					<view class="question-item" v-for="(item, index) in question_list" :key="index"
						@tap="sendQuestion(item)">{{ item }}</view>
				</view>
			</view> -->

			<view class="input-box">
				<up-input class="input-model" placeholder="输入消息..." border="surround" v-model="input_value"
					style="height: 26px;" color="#666666" />
				<button class="app-btn" type="primary" @tap="sendMessage()">发送</button>
			</view>
		</view>
		<view ref="messageBody" class="content-view">
			<view class="message-view" style="margin-top: unset;">
				<view class="avatar-box">
					<image class="avatar" src="../../../static/icons/dt-wing.png" mode=""></image>
				</view>

				<view class="content-box question-list" style="flex: 1; margin-left: 15px; max-width: 80%;">
					<view class="box-item" style="background-color: #ffffff!important;">
						<text style="color: var(--dominColor)">猜你想问</text>
						<text style="color: #666666">换一换</text>
					</view>
					<view class="box-item" v-for="(item, index) in question_list" :key="index"
						@tap="sendQuestion(item)">
						<text>{{ item }}</text>
						<up-icon name="arrow-right" color="#dddddd" size="16"></up-icon>
					</view>
				</view>
			</view>

			<view class="message-view" v-for="(item, index) in messageList" :key="index"
				:style="{ justifyContent: item.type === 'kefu' ? 'flex-start' : 'flex-end' }">
				<view class="content-box text"
					style="margin-right: 15px; background-color: var(--dominColor); color: #ffffff"
					v-if="item.type === 'user'">{{ item.content }}</view>

				<view class="avatar-box">
					<image class="avatar"
						:src="item.type === 'kefu' ? '../../../static/icons/dt-wing.png' : '../../../static/avatar-default.png'"
						mode=""></image>
				</view>
				<ua-markdown class="content-box text" style="margin-left: 15px; font-size: 16px;"
					v-if="item.type === 'kefu'" :source="item.content" />
			</view>

		</view>
		<view class="loading-text"></view>
	</view>
</template>

<script setup>
	import { reactive, ref, onMounted } from 'vue';
	import { aiKefuChat, createConversation } from '../../../api/aiKefu';

	const flag = ref(false);
	const input_value = ref("");
	const messageBody = ref(null);
	const messageList = reactive([]);

	onMounted(() => {
		createConversation().then(response => {
            uni.setStorageSync('conversationId', response.data);
            sendChat("你好");
        });
	});


	/**
	 * 滚动到页面中指定的元素位置。
	 * 使用 uni-app 的 pageScrollTo 方法实现平滑滚动。
	 * @param {Object} options - 滚动选项对象。
	 * @param {number} options.duration - 滚动动画持续时间，单位为毫秒。
	 * @param {string} options.selector - 需要滚动到的目标元素的选择器。
	 */
	const scrollTo = () => {
		uni.pageScrollTo({
			duration: 0,
			selector: ".loading-text",
		});
	}

	/**
	 * 发送聊天消息的函数。
	 * @param {string} query - 用户输入的查询消息。
	 * 该函数首先将一条表示正在回复中的消息添加到消息列表中。
	 * 然后通过递归函数typeWriter逐字显示AI客服的回复，并在每次添加字符后滚动到消息列表的底部。
	 * 最后，通过调用aiKefuChat API获取AI客服的回复，并将回复内容传递给typeWriter函数进行显示。
	 */
	const sendChat = (query) => {
		flag.value = true;
		messageList.push({
			type: 'kefu',
			content: "正在思考中"
		});
		setTimeout(() => scrollTo());
		
		const lastMessage = messageList[messageList.length - 1];
		const typeWriter = (content) => {
			if (content.length > 0) {
				lastMessage.content += content[0];
				setTimeout(() => typeWriter(content.slice(1)), 10);
			}
			setTimeout(() => scrollTo());
		};

		aiKefuChat({
			query: query
		}).then(response => {
			lastMessage.content = "";
			typeWriter(response.data);
		}).catch(e => {
			lastMessage.content = "";
			typeWriter(e.msg);
		}).finally(() => {
			flag.value = false;
		});
	}

	/**
	 * 推荐的问题列表
	 */
	const question_list = reactive([
		'怎么回收', '如何获得积分', '新人回收常见问题', '如何查看回收状态'
	]);

	/**
	 * 发送消息的函数。
	 * 如果输入框为空，则显示提示信息。
	 * 否则，将用户输入的内容添加到消息列表，并调用获取机器人回复的函数。
	 */
	const sendMessage = () => {
		if (input_value.value === "") return uni.showToast({
			icon: 'none',
			title: '请输入内容'
		});
		if (flag.value) return uni.showToast({
			icon: 'none',
			title: '正在回复中'
		});
		messageList.push({
			type: 'user',
			content: input_value.value
		});
		getAiRequest();
	}

	/**
	 * 获取机器人回复并滚动到页面底部
	 * 此函数首先等待100毫秒后滚动到页面底部，然后等待500毫秒发送聊天消息，最后清空输入框。
	 * @param {Object} input_value - 输入框的Vue引用
	 */
	const getAiRequest = () => {
		scrollTo();
		setTimeout(() => {
			uni.pageScrollTo({
				duration: 0,
				selector: ".loading-text"
			})
		})
		const query = input_value.value;
		setTimeout(() => sendChat(query), 500);
		input_value.value = "";
	}

	/**
	 * 发送问题到消息列表，并触发获取客服回复的函数。
	 * @param {string} question - 用户输入的问题。
	 * @returns {void}
	 */
	const sendQuestion = (question) => {
		input_value.value = question;
		messageList.push({
			type: 'user',
			content: input_value.value
		});
		getAiRequest();
	}
</script>

<style lang="scss">
	@import "style.scss";
</style>