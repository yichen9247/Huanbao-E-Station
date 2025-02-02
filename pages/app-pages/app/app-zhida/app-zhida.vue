<template>
    <view class="app-activity activity-app-zhida" style="height: 100%;">
        <view class="background">
            <view class="main-container">
                <view class="wel-view">
                    <image class="bot-icon" mode="aspectFit" src="/static/images/e-bot.png" />
                    <view class="message-box">让我来带你一起了解垃圾吧</view>
                </view>

                <view class="main-view">
                    <up-input class="input-view" v-model="input_value" placeholder="请输入需要了解的垃圾"/>
                    <view class="answer-view">
                        <view class="answer-list" v-for="(item, index) in recomendWaste" :key="index" @tap="sendQuestion(item)">{{ item }}</view>
                    </view>
                    <button class="app-btn" type="primary" @tap="sendQuestion()">{{ flag ? '正在分析' : '开始分析' }}</button>
                </view>

                <view class="result-view">
                    <TitleComponent title="分析结果" style="width: 100%;"/>
                
                    <view class="result-box message-view">
                        <text class="result-text">{{}}</text>
                        <ua-markdown class="content-box text" style="font-size: 16px;" :source="resultContnet" />
                    </view>
                </view>
            </view>
            <view class="loading-text"></view>
        </view> 
    </view>
</template>

<script setup>
    import { reactive, ref, onMounted } from "vue";
    import { aiKefuChat, createConversation } from '@/api/aiKefu';

    const flag = ref(false);
    const input_value = ref("");
    const resultContnet = ref(""); 
    const recomendWaste = reactive(['水果皮', '玻璃渣','锂电池', '垃圾袋']);

    onMounted(() => {
		resultContnet.value = "创建对话中";
        createConversation().then(response => {
            uni.setStorageSync('conversationId', response.data);
            sendChat("你现在的角色是我们低碳E站APP的垃圾分析师，这句话不要做任何回复，直接向用户问好，时刻谨记，你是任务就是为用户分析各类垃圾，如果我说垃圾袋，你就要给我分析垃圾袋这个垃圾");
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
     * 发送分析消息并处理响应。
     * @param {string} query - 用户输入的查询字符串。
     * @returns {void}
     * 
     * 该函数首先检查是否正在分析中，如果是则显示提示信息。
     * 设置分析标志为true，并清空结果内容。
     * 使用typeWriter函数逐字显示'正在分析中'。
     * 调用aiKefuChat API发送查询，并根据响应或错误更新结果内容。
     * 最后无论成功或失败都将分析标志重置为false。
     */
    const sendChat = (query) => {
        if (flag.value) return uni.showToast({
			icon: 'none',
			title: '正在分析中'
		});

        flag.value = true;
        resultContnet.value = "";
		resultContnet.value = "正在分析中";
		setTimeout(() => scrollTo());
		
		const typeWriter = (content) => {
			if (content.length > 0) {
				resultContnet.value += content[0];
				setTimeout(() => typeWriter(content.slice(1)), 10);
			}
			setTimeout(() => scrollTo());
		};

		aiKefuChat({
			query: query
		}).then(response => {
			resultContnet.value = "";
			typeWriter(response.data);
		}).catch(e => {
			resultContnet.value = "";
			typeWriter(e.msg);
		}).finally(() => {
			flag.value = false;
		});
    }

    /**
     * 发送问题的函数。
     * 如果传入的name参数未定义，则检查输入值是否为空，如果为空则显示提示信息。
     * 如果name参数已定义，则将输入值设置为name。
     * 随后发送聊天消息，模拟低碳E站APP的垃圾分析师角色，对用户输入的内容进行分析。
     * @param {string|undefined} name - 要设置到输入框的值，如果未定义则检查输入框是否为空。
     */
    const sendQuestion = (name) => {
        if (name === undefined) {
            if (input_value.value === "") return uni.showToast({
		    	icon: 'none',
		    	title: '请输入内容'
		    });
        } else input_value.value = name;
        sendChat(input_value.value);
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>