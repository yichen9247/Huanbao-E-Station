<template>
    <view class="app-activity activity-app-cuoti">
        <view class="cuoti-list">
            <view class="dati-detail app-card" v-for="(item, index) in cuotiList" :key="index">
                <view class="head-box">
                    <text class="dati-type">{{ topicType[item[0].questionType] }}</text>
                    <text class="dati-number">正确答案：{{ choiceType[item[0].userQuestionsChoices.find(item => item.isCorrect === 1).choiceLabel] }}</text>
                </view>
                <view class="content-box">
                    <text class="topic-name">{{ item[0].questionText }}</text>
                    <view class="select-box">
                        <up-radio-group placement="column">
                            <up-radio v-for="(item, index) in item[0].userQuestionsChoices" :key="index" :name="item.choiceLabel" :label="`${choiceType[item.choiceLabel]}.${item.choiceText}`" activeColor="var(--dominColor)"/>
                        </up-radio-group>
                    </view>
                </view>
            </view>
        </view>
        <view class="app-card" v-if="cuotiList.length < 1" style="margin-top: unset;">
            <up-empty style="padding-bottom: 25px;" text="暂无数据" icon="/static/app-empty/list.png"/>
        </view>
    </view>
</template>

<script setup>
    import { reactive } from 'vue';
    const cuotiList = reactive(uni.getStorageSync('cuotiList') || []);

    const topicType = {
        multiple_choice: '单选题'
    }

    const choiceType = {
        1: 'A', 2: 'B', 3: 'C', 4: 'D'
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>