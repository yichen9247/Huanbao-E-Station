<template>
    <view class="app-activity activity-user-browse" style="height: 100%;">
        <view style="padding-bottom: 20px">
            <up-list class="history-list">
			    <up-list-item class="tips-list-item" v-for="(item, index) in browseHistory" :key="index" @tap="onHistoryItemClick(item)">
			    	<up-lazy-load class="item-image" width="120" :image="getSplitByImagelist(item.imageList[0])" img-mode="widthFix" loading-img="" error-img=""/>
			    	<view class="item-content">
			    		<text class="item-title up-line-1">{{ item.title }}</text>
			    		<text class="item-descs up-line-2">{{ item.content }}</text>
			    	</view>
			    </up-list-item>
				<up-empty style="padding-bottom: 25px;" text="暂无数据" v-if="browseHistory.length < 1"
				    icon="/static/app-empty/list.png">
				</up-empty>
		    </up-list>
        </view>
    </view>
</template>

<script setup>
    import { onMounted, reactive } from "vue";
    import { getSplitByImagelist } from "@/utils/utils";

    const browseHistory = reactive([]);

    onMounted(() => {
		const history = uni.getStorageSync('browseHistory') || [];
		for (const element of history.reverse()) {
			browseHistory.push(element);
		}
	});

    /**
	 * 处理历史记录项点击事件。
	 * 根据点击项的类型，导航到相应的详情页面。
	 * @param {Object} item - 点击的历史记录项。
	 * @param {string} item.type - 历史记录项的类型，可以是 'tips' 或 'policy'。
	 * @param {number} item.id - 历史记录项的ID。
	 */
	const onHistoryItemClick = (item) => {
		if (item.type === "tips") {
			uni.navigateTo({
				url: "/pages/app-pages/detail/tips-detail/tips-detail?id=" + item.id
			});
		}

		if (item.type === "policy") {
			uni.navigateTo({
				url: "/pages/app-pages/detail/policy-detail/policy-detail?id=" + item.id
			});
		}
	}
</script>

<style lang="scss">
    @import "style.scss";
</style>