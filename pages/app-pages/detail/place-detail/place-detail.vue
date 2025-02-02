<template>
	<view class="app-activity activity-place-detail" style="height: 100%;">
		<view class="image-contianer" style="height: 35%;">
			<view class="image-box">
				<image
					mode="heightFix"
					class="trash-image"
					src="/static/images/Trash-can.jpg"
				/>
			</view>
			<text class="title-text">校门口垃圾回收点A</text>
		</view>

		<view class="classify-container">
			<view class="classify-item">
				<image
					class="icon"
					mode="scaleToFill"
					src="/static/place-detail/waste-1.png"
				/>
				<text class="value">15KG</text>
				<text class="name">可回收物</text>
			</view>

			<view class="classify-item">
				<image
					class="icon"
					mode="scaleToFill"
					src="/static/place-detail/waste-2.png"
				/>
				<text class="value">10KG</text>
				<text class="name">有害垃圾</text>
			</view>

			<view class="classify-item">
				<image
					class="icon"
					mode="scaleToFill"
					src="/static/place-detail/waste-3.png"
				/>
				<text class="value">20KG</text>
				<text class="name">干垃圾</text>
			</view>

			<view class="classify-item">
				<image
					class="icon"
					mode="scaleToFill"
					src="/static/place-detail/waste-4.png"
				/>
				<text class="value">25KG</text>
				<text class="name">湿垃圾</text>
			</view>
		</view>

		<view style="padding-bottom: 20px;">
			<view class="statics-container">
				<view class="statics-item" style="background-color: #76bfa4;">
					<text class="item-title">今日投放 <text class="value">95</text> 次</text>
					<text class="item-value">45KG</text>
				</view>
			
				<view class="statics-item" style="background-color: #d88858;">
					<text class="item-title">本周投放 <text class="value">365</text> 次</text>
					<text class="item-value">128KG</text>
				</view>
			
				<view class="statics-item" style="background-color: #f47e6d;">
					<text class="item-title">本月投放 <text class="value">1288</text> 次</text>
					<text class="item-value">532KG</text>
				</view>

				<view class="statics-item" style="background-color: #6fa4d2;">
					<text class="item-title">累计投放 <text class="value">6288</text> 次</text>
					<text class="item-value">3628800KG</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss">
	@import "style.scss";
</style>