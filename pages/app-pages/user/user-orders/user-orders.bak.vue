<template>
    <view class="app-activity activity-user-orders" style="height: 100%;">
        <up-subsection class="tabController" :list="tabList" :current="currentTab" bgColor="#ffffff" activeColor="#ffffff" inactiveColor="#333333" @change="onTagChange"></up-subsection>

        <view class="order-list" v-if="orderList.length > 0">
            <view class="order-item userProducts" v-for="(item, index) in orderList" :key="index">
                <view class="item-head">
                    <!-- 店铺名称 -->
                    <text class="item-name">二手交易</text>
                    <!-- 订单状态 -->
                    <text class="item-status" :status="currentTab">{{ tabList[currentTab] }}</text>
                </view>
                <view class="item-content">      
                    <!-- 订单封面 imageList -->
                    <image
                        class="shop-image"
                        mode="scaleToFill"
                        :src="getSplitByImagelist(item.userProducts.imageList)"
                    />
                    <view class="detail-content">
                        <!-- 订单名称 description -->
                        <text class="shop-description up-line-2">{{ item.userProducts.description }}</text>
                        <view class="tag-box">
                            <!-- 订单标签 tag -->
                            <view class="shop-tag">七天无理由退换</view>
                        </view>
                    </view>

                    <view class="price-detail">
                        <!-- 订单价格 price -->
                        <text class="shop-price">￥{{ item.userProducts.price }}</text>
                        <!-- 订单数量 默认为1 -->
                        <text class="shop-number">数量：1</text>
                    </view>
                </view>
                <view class="button-sheet" v-if="currentTab === 1">
                    <button class="button" style="--color: #666666">取消订单</button>
                    <button class="button" style="--color: #FF7B4A">修改地址</button>
                    <button class="button" style="--color: #55AA7F" @tap="goBuyPage(item.id)">去付款</button>
                </view>
                <view class="button-sheet" v-if="currentTab === 2">
                    <button class="button" style="--color: #666666">取消订单</button>
                    <button class="button" style="--color: #FF7B4A">申请退款</button>
                    <button class="button" style="--color: #55AA7F">催发货</button>
                </view>
            </view>
        </view>
        <view class="order-none" v-else>当前类型订单为空</view>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from 'vue';
    import { getProductsOrderList } from '@/api/order';
    import { getSplitByImagelist } from "@/utils/utils";

    const currentTab = ref(0);
    const orderList = reactive([]);
	const tabList = reactive(['已完成', '待支付', '待发货', '待收货']);

    onMounted(() => {
        getOrderByCode(4);
    });

    /**
     * 根据订单代码获取订单详情，并更新图片列表和订单列表。
     * @param {string} code - 订单代码。
     * @returns {Promise<void>} - 返回一个 Promise，当数据获取并处理完成后 resolve。
     */
    const getOrderByCode = (code) => {
        orderList.length = 0;
        
        getProductsOrderList({ code: code }).then(response => {
            for (const element of response.data) {
                orderList.push(element);
            }
        });
    }

    /**
     * 根据传入的标签ID切换订单查询条件。
     * @param {number} id - 标签ID，用于确定查询哪种类型的订单。
     * - 0: 查询已完成订单。
     * - 1: 查询待支付订单。
     * - 2: 查询已支付订单。
     * - 3: 查询已取消订单。
     */
    const onTagChange = (id) => {
        if (currentTab.value === id) return;
        currentTab.value = id;
        switch (id) {
            case 0: 
                getOrderByCode(4);
                break;
            case 1:
                getOrderByCode(0);
                break;
            case 2:
                getOrderByCode(1);
                break;
            case 3:
                getOrderByCode(3);
                break;
        }
    }

    /**
     * 跳转到购买页面
     * @param {number} id - 订单ID
     * 该函数用于通过uni.navigateTo方法导航到订单详情页面，并将订单ID作为参数传递。
     */
    const goBuyPage = (id) => {
        uni.navigateTo({
			url: "/pages/app-pages/detail/order-detail/order-detail?orderId=" + id
		});
    }
</script>

<style lang="style.scss">
    @import "style.scss";
</style>