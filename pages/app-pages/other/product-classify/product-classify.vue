<template>
    <view class="app-activity activity-product-classify">
        <view style="padding-bottom: 20px;">
			<view class="store-view app-card" style="margin-top: 0;margin-bottom: 0;">
				<StoreComponent style="padding-bottom: 20px;" :classId="props.classId"/>
			</view>
		</view>
    </view>
</template>

<script setup>
    import { defineProps, onMounted } from 'vue';

    const props = defineProps({
		classId: String,
        className: String
	});

    onMounted(() => {
        uni.setNavigationBarTitle({
        	title: props.className
        });
    });
</script>

<style lang="scss">

</style>