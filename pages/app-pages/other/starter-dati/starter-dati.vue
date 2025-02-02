<template>
    <view class="app-activity activity-starter-dati" style="height: 100%;">
        <view class="review-box app-card">
            <text class="review-name">{{ startStatus ? '正在答题' : '等待开始' }}</text>
            <up-count-down class="review-time" :time="allTime" format="HH:mm:ss" @finish="timeFinish()"></up-count-down>
        </view>

        <view class="dati-detail app-card" v-if="topicList.length > 0">
            <view class="head-box">
                <text class="dati-type">{{ topicType[topicList[topicIndex].questionType] }}</text>
                <text class="dati-number">{{ `${topicIndex + 1}/${topicList.length}` }}</text>
            </view>
            <view class="content-box">
                <text class="topic-name">{{ topicList[topicIndex].questionText }}</text>
                <view class="select-box">
                    <up-radio-group v-model="selectValue" placement="column">
                        <up-radio v-for="(item, index) in topicList[topicIndex].userQuestionsChoices" :key="index" :name="item.choiceLabel" :label="`${choiceType[item.choiceLabel]}.${item.choiceText}`" activeColor="var(--dominColor)"/>
                    </up-radio-group>
                </view>
            </view>
            <view class="button-box">
                <button type="default" class="app-btn" @tap="prevTopic()">上一题</button>
                <button type="primary" class="app-btn" @tap="nextTopic()">{{ topicIndex + 1 === topicList.length ? '完成答题' : '下一题' }}</button>
            </view>
        </view>

        <view class="dati-detail" v-else style="height: 200px; color: #666666; display: grid;">
            <text class="no-topic" style="margin: auto; font-size: 20px;">题目列表为空</text>
        </view>

        <view class="dati-rules app-card">
            <TitleComponent title="答题规则" style="width: 100%;"/>
            <view class="content-box">
                <text class="rule-text" v-for="(item, index) in dati_rules" :key="index">{{ `${index + 1}.${item}` }}</text>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from 'vue';
    import { useApplicationStore } from '@/store/applicationStore';
    import { getQuestionsList, recordQuestionRankings } from '@/api/questions';
    
    const allTime = ref(0);
    const topicIndex = ref(0);
    const selectValue = ref(null);
    const topicList = reactive([]);
    const startStatus = ref(false);
    const answerDatas = reactive([]);
    const applicationStore = useApplicationStore();

    let startTime = new Date().getTime();

    const topicType = {
        multiple_choice: '单选题'
    }

    const choiceType = {
        1: 'A', 2: 'B', 3: 'C', 4: 'D'
    }

    const dati_rules = [
        '用户如被发现存在作、抄袭等违规行为，将被取消其答题成绩和奖励资格。',
        '用户未在在规定时间内阅读题目并作出选择，超时未作答将视为放弃答题。',
        '答题结束后，系统将根据用户的答案和评分标准给出最终得分。',
        '答题评分将根据题目的难度、正确率等因素综合确定。'
    ]

    onMounted(() => {
        getQuestionsList(1, 10).then(response => {
            topicList.splice(0, topicList.length, ...response.data);
            for (const element of topicList) {
                answerDatas.push({
                    id: element.id,
                    choice: null,
                    isCorrect: false,
                    score: element.score
                });
                element.questionText = element.questionText.replace(/\$\{(.*?)\}/g, '______');
            }
            startStatus.value = true;
            startTime = new Date().getTime();
            allTime.value = 1 * 10 * 60 * 1000;
        });
    });

    /**
     * 计算从开始时间到当前时间的总秒数。
     * @returns {number} 返回总时间（秒）。
     */
    const calculateTotalTime = () => {
        const endTime = new Date().getTime();
        const totalTime = (endTime - startTime) / 1000;
        return totalTime;
    };

    /**
     * 切换到上一题
     * 如果当前是第一题，则显示提示信息；否则将题目索引减一。
     */
    const prevTopic = () => {
        if (topicIndex.value === 0) {
            uni.showToast({
                icon: 'none',
                title: "这是第一题哦"
            });
        } else topicIndex.value--;
    }

    /**
     * 当答案选项改变时触发的函数。
     * 该函数会根据当前选择的值更新答案数据，并检查答案是否正确。
     * @param {Object} topicList - 主题列表
     * @param {Object} topicIndex - 当前主题索引
     * @param {Array} answerDatas - 答案数据数组
     * @param {Object} choiceType - 选项类型映射
     * @param {Object} selectValue - 当前选择的值
     */
    const onAnswerChange = () => {
        const model = topicList[topicIndex.value];
        const answer = answerDatas.find(item => item.id === model.id);
        answer.choice = choiceType[selectValue.value];
        answer.isCorrect = model.userQuestionsChoices.find(item => item.isCorrect === 1).choiceLabel == selectValue.value;
    }
    
    /**
     * 分析并存储用户的答题数据。
     * 该函数计算用户答对的题目数量，并根据题目总数计算得分。
     * 最后，将得分、用户答案和题目列表存储到本地存储中。
     * @returns {Promise<void>} 异步函数，无返回值。
     */
    const analysisAnswer = async () => {
        uni.showLoading({
		    title: "正在判题中"
		});
        let points = 0;
        const date = new Date();
        const totalTime = Math.floor(calculateTotalTime());
        const correctAnswersCount = answerDatas.filter(answer => answer.isCorrect).length;
        const notCorrectAnswersCount = answerDatas.filter(answer => !answer.isCorrect).length;
        const score = correctAnswersCount / topicList.length * 100;

        for (const element of answerDatas.filter(answer => !answer.isCorrect)) {
            let cuotiList = uni.getStorageSync('cuotiList') || [];
            if (!Array.isArray(cuotiList)) cuotiList = [];
            const existing = cuotiList.find(h => h.some(item => item.id === element.id));
            if (!existing) cuotiList.push(topicList.filter(item => item.id === element.id));
            uni.setStorageSync('cuotiList', cuotiList);
        }

        for (const element of answerDatas) {
            if (element.isCorrect) {
                points += element.score;
            }
        }

        recordQuestionRankings({
            useTime: totalTime,
            success: correctAnswersCount,
            error: notCorrectAnswersCount
        }).catch(e => {
            uni.showToast({
	        	icon: 'none',
	        	title: "答题成绩上报失败"
	        });
        }).finally(() => {
            applicationStore.setUserDatiStorage({
                score: score,
                points: points,
                answer: answerDatas,
                totalTime: totalTime,
                topicList: topicList,
                correctAnswersCount: correctAnswersCount,
                notCorrectAnswersCount: notCorrectAnswersCount
            });
            uni.setStorageSync('dati_date', `${date.getFullYear()} - ${date.getMonth() + 1} ${date.getDate()}`);
        });
    }

    /**
     * 处理下一题逻辑的函数。
     * @returns {Promise<void>} 返回一个Promise对象，表示异步操作完成。
     * @throws {Error} 如果当前题目未选择答案，则抛出提示信息。
     * @throws {Error} 如果题目类型为多选题，则在完成答题后进行答案分析，并跳转到成绩页面。
     * @throws {Error} 如果还有下一题，则重置选择值并更新题目索引。
     */
    const nextTopic = async () => {
        if (!selectValue.value) return uni.showToast({
	    	icon: 'none',
	    	title: "请先答完这题"
	    });
        if (topicList[topicIndex.value].questionType === "multiple_choice") {
            onAnswerChange();
            if (topicIndex.value + 1 === topicList.length) {
                await analysisAnswer().then(() => setTimeout(() => {
                    uni.hideLoading();
                    uni.redirectTo({
		            	url: "/pages/app-pages/other/dati-score/dati-score"
		            });
                }, 1000));
            } else {
                selectValue.value = null;
                topicIndex.value++;
            }
        }
    }

    /**
     * 时间结束函数，用于在答题开始状态下显示提示信息。
     * @returns {void}
     */
    const timeFinish = () => {
        if (startStatus.value) {
            uni.showToast({
                icon: 'none',
                title: "时间到，答题结束"
            });
        }
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>