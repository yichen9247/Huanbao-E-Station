<template>
	<up-swiper :loading="loading" :list="list" keyName="pic" indicator indicatorMode="line" circular style="background-color: #ffffff;" @tap="onSwiperItemClick"/>
</template>

<script setup>
	import { reactive, ref } from 'vue';
	import { getSwiperList } from '@/api/swiper';
	import { getSplitByImagelist } from '@/utils/utils';
	import { useApplicationStore } from '@/store/applicationStore';
	
	const loading = ref(true);
	const list = reactive([]);
	const props = defineProps({ 
		type: String
	});
	const swiperList = reactive([]);
	const applicationStore = useApplicationStore();
	
	getSwiperList({ types: props.type }).then(response => {
		for (const element of response.data) {
			swiperList.push(element);
			list.push(getSplitByImagelist(element.pic));
		}
		loading.value = false;
	}).catch(e =>{
		return uni.showToast({
			icon:'none',
			title: e.msg
		});
	});

	/**
	 * 处理轮播图项点击事件的函数。
	 * @param {number} index - 点击的轮播图项的索引。
	 * @returns {void}
	 * 
	 * 根据点击的轮播图项类型执行不同的操作：
	 * - 如果类型为'url'，则在浏览器中打开对应的URL。
	 * - 如果类型为'customer'，则导航到咨询页面。
	 * - 如果类型为'project'，则导航到项目详情页面。
	 */
	const onSwiperItemClick = (index) => {
		const item = swiperList[index];
		if (item.type === 'url') {
			if (typeof plus === 'undefined') {
				open(item.url)
			} else plus.runtime.openWeb(item.url);
		};
		if (item.type === 'customer') applicationStore.navigateTo("/pages/app-pages/app/app-zixun/app-zixun");
		if (item.type === 'project') applicationStore.subNavigateTo("/pages/app-pages/detail/activity-detail/activity-detail?id=" + item.url);
	}
</script>