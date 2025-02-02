<template>
    <view class="app-activity activity-order-detail" style="height: 100%;">
        <view class="main" v-if="pageStatus === 'SHOP'">
            <view class="recipient-view" v-if="productsOrderAddress.length > 0">
                <view class="icon-box" v-html="icons.order_address"></view>

                <view class="content-box">
                    <text class="address up-line-1">{{ productsOrderAddress[defaultAdressSelect].address }}</text>
                    <text class="user-info">{{ `${productsOrderAddress[defaultAdressSelect].name} ${productsOrderAddress[defaultAdressSelect].phoneNumber}` }}</text>
                </view>

                <view class="button-box">
                    <text class="button-text" @tap="editAddressModel = true;">修改地址</text>
                </view>
            </view>

            <button v-else class="order-button" @tap="addAddressModel = true">新增订单地址</button>

            <view class="shop-detail" v-if="shopDetail">
                <view class="shop-trade">
                    <image
                        class="shop-image"
                        mode="scaleToFill"
                        :src="getSplitByImagelist(shopDetail.imageList)"
                    />
                    <view class="detail-content">
                        <text class="shop-name up-line-2">{{ shopDetail.description }}</text>
                        <view class="tag-box">
                            <view class="shop-tag">{{ '七天无理由退换' }}</view>
                        </view>
                    </view>

                    <view class="price-detail">
                        <text class="shop-price">￥{{ shopDetail.price }}</text>
                        <text class="shop-number">数量：{{ 1 }}</text>
                    </view>
                </view>

                <view class="price-content">
                    <view class="price-item">
                        <text class="item-name">商品总额</text>
                        <text class="item-price">￥{{ shopDetail.price }}</text>
                    </view>

                    <view class="price-item">
                        <text class="item-name">运费价格</text>
                        <text class="item-price">￥{{ '0' }}</text>
                    </view>

                    <view class="price-item" style="margin-top: 25px;">
                        <text class="item-name">实际付款</text>
                        <text class="item-price" style="font-weight: bold;">￥{{ shopDetail.price }}</text>
                    </view>
                </view>
            </view>

            <view class="foot-view" v-if="shopDetail && pageStatus === 'SHOP'">
                <button type="default" class="app-btn" @tap="back()">返回页面</button>
                <button type="primary" class="app-btn" @tap="createOrder()">创建订单</button>
            </view>
        </view>

        <view class="main" v-if="pageStatus === 'ORDER'">
            <view class="recipient-view" v-if="productsOrderAddress.length > 0">
                <view class="icon-box" v-html="icons.order_address"></view>

                <view class="content-box">
                    <text class="address up-line-1">{{ productsOrderAddress[defaultAdressSelect].address }}</text>
                    <text class="user-info">{{ `${productsOrderAddress[defaultAdressSelect].name} ${productsOrderAddress[defaultAdressSelect].phoneNumber}` }}</text>
                </view>

                <view class="button-box">
                    <text class="button-text" @tap="editAddressModel = true;">修改地址</text>
                </view>
            </view>

            <view class="shop-detail" v-if="shopDetail">
                <view class="shop-trade">
                    <image
                        class="shop-image"
                        mode="scaleToFill"
                        :src="getSplitByImagelist(shopDetail.imageList)"
                    />
                    <view class="detail-content">
                        <text class="shop-name up-line-2">{{ shopDetail.description }}</text>
                        <view class="tag-box">
                            <view class="shop-tag">{{ '七天无理由退换' }}</view>
                        </view>
                    </view>

                    <view class="price-detail">
                        <text class="shop-price">￥{{ shopDetail.price }}</text>
                        <text class="shop-number">数量：{{ 1 }}</text>
                    </view>
                </view>

                <view class="price-content">
                    <view class="price-item">
                        <text class="item-name">商品总额</text>
                        <text class="item-price">￥{{ shopDetail.price }}</text>
                    </view>

                    <view class="price-item">
                        <text class="item-name">运费价格</text>
                        <text class="item-price">￥{{ '0' }}</text>
                    </view>

                    <view class="price-item" style="margin-top: 25px;">
                        <text class="item-name">实际付款</text>
                        <text class="item-price" style="font-weight: bold;">￥{{ shopDetail.price }}</text>
                    </view>
                </view>
            </view>

            <view class="payment-view" v-if="shopDetail">
                <up-radio-group 
                    v-model="selectMent"
                    iconPlacement="right">
                	<up-radio class="pay-item" v-for="(item, index) in pay_ment" :key="index" activeColor="var(--dominColor)" labelSize="16" :label="item.name" :name="item.id"/>
                </up-radio-group>
            </view>

            <view class="foot-view" v-if="shopDetail && pageStatus === 'ORDER'">
                <button type="default" class="app-btn" @tap="back()">取消订单</button>
                <button type="primary" class="app-btn" @tap="createPayment()">立即付款</button>
            </view>
        </view>

        <up-action-sheet class="edit-address-model" title="修改地址" :show="editAddressModel" round="20" closeOnClickOverlay @close="editAddressModel = false">
            <view class="address-list">
                <view class="address-item" v-for="(item, index) in productsOrderAddress" :key="index">
                    <view class="icon-box" v-html="icons.order_address"></view>

                    <view class="content-box">
                        <text class="address up-line-1">{{ item.address }}</text>
                        <text class="user-info">{{ `${item.name} ${item.phoneNumber}` }}</text>
                    </view>

                    <view class="button-box">
                        <text class="button-text" @tap="editAddress(index)">选择</text>
                    </view>
                </view>
            </view>
            <button class="app-btn" type="primary" @tap="editAddressModel = false; addAddressModel = true;">新建地址</button>
        </up-action-sheet>

        <up-action-sheet class="edit-address-model" title="创建地址" :show="addAddressModel" round="20" closeOnClickOverlay @close="addAddressModel = false">
            <view class="box-contianer">
                <up-form class="address-form">
                    <up-form-item>
                        <up-input placeholder="请输入姓名" border="surround" v-model="addressForm.name"/>
                    </up-form-item>

                    <up-form-item>
                        <up-input type="number" maxlength="11" placeholder="请输入手机号" border="surround" v-model="addressForm.phoneNumber"/>
                    </up-form-item>

                    <up-form-item>
                        <!-- <up-input  placeholder="请选择收货地址" border="surround" v-model="addressForm.cityName"/> -->
                        <view class="view-input" @tap="citySelectShow = true">{{ addressForm.cityName === '' ? '请选择收货地址' : addressForm.cityName }}</view>
                    </up-form-item>

                    <up-form-item>
                        <up-textarea placeholder="请输入详细地址"  v-model="addressForm.address"/>
                    </up-form-item>
                    <button class="app-btn" type="primary" @tap="handleCreateAddress()">确认创建</button>
                </up-form>
                <up-picker :show="citySelectShow" ref="uPickerRef" :columns="cityData" @cancel="citySelectShow = false" @change="changeHandler" closeOnClickOverlay confirmColor="var(--dominColor)" @confirm="onCityConfirm"></up-picker>
            </view>
        </up-action-sheet>
    </view>
</template>

<script setup>    
    import config from "@/config";
    import icons from '@/utils/icons';
    import cityList from "@/utils/city-data-3"
    import { getProductsListID } from '@/api/products';
    import { getSplitByImagelist } from "@/utils/utils";
    import { reactive, ref, onMounted, defineProps } from 'vue';
    import { createProductsOrder, createProductsOrderAddress, getProductsOrders, getProductsOrderAddressList, paymentProductsOrder } from '@/api/order';

    const selectMent = ref(1); // 选择项，默认为1
    const pageStatus = ref(null); // 页面状态
    const shopDetail = ref(null); // 商店详情
    const imageList = reactive([]); // 图片列表
    const defaultAdressSelect = ref(0); // 默认地址选择，默认为0
    const addAddressModel = ref(false); // 添加地址模型，默认为false
    const editAddressModel = ref(false); // 编辑地址模型，默认为false
    const productsOrderAddress = reactive([]); // 产品订单地址列表


    const cityOne = ref(0); // 第一级城市索引，默认为0
    const uPickerRef = ref(null); // 城市选择器引用
    const citySelectShow = ref(false); // 城市选择器是否显示，默认为false
    const cityData = reactive([[], [], []]); // 城市数据，结构为[[], [], []]，用于存储处理后的城市数据
    
    /**
     * 处理城市数据的函数，将城市列表中的数据按照层级结构填充到cityData数组中。
     * @param {Array} cityList - 城市列表数据，包含多层级的城市信息。
     * @param {Array} cityData - 用于存储处理后的城市数据的数组，结构为[[], [], []]。
     * @returns {void}
     */
    const handleCityData = () => {
        for (let i = 0; i < cityList.length; i++) {
            cityData[0].push(cityList[i].text);
        }

        for(let i = 0; i < cityList[0].children.length; i++) {
            cityData[1].push(cityList[0].children[i].text);
        }

        if (cityList[0].children[0].children === undefined || !cityList[0].children[0].children) {
            cityData[2].push(cityList[0].children[0].text);
            return;
        };

        for(let i = 0; i < cityList[0].children[0].children.length; i++) {
            cityData[2].push(cityList[0].children[0].children[i].text);
        }
    }

    /**
     * 处理城市选择变化的函数。
     * 当用户在第一列或第二列改变选择时，此函数会更新相应的城市数据。
     * 如果选择的项有子项，则子项也会被添加到城市数据中。
     * @param {Object} e - 事件对象，包含columnIndex和index属性。
     */
    const changeHandler = (e) => {
        const { columnIndex, index } = e;

        if (columnIndex === 0) {
            cityOne.value = index;
            cityData[1].length = 0;
            for(let i = 0; i < cityList[index].children.length; i++) {
                cityData[1].push(cityList[index].children[i].text);
            }

            cityData[2].length = 0;
            if (cityList[cityOne.value].children[0].children === undefined || !cityList[cityOne.value].children[0].children) {
                cityData[2].push(cityList[cityOne.value].children[0].text);
                return;
            };

            for(let i = 0; i < cityList[cityOne.value].children[0].children.length; i++) {
                cityData[2].push(cityList[cityOne.value].children[0].children[i].text);
            }
        }

        if (columnIndex === 1) {
            cityData[2].length = 0;
            if (cityList[cityOne.value].children[index].children === undefined || !cityList[cityOne.value].children[index].children) {
                cityData[2].push(cityList[cityOne.value].children[index].text);
                return;
            }

            for(let i = 0; i < cityList[cityOne.value].children[index].children.length; i++) {
                cityData[2].push(cityList[cityOne.value].children[index].children[i].text);
            }
        }
    };

    const addressForm = reactive({
        phoneNumber: '',
        address: '',
        name: '',
        province: '',
        city: '',
        cityName: ''
    });

    /**
     * 当城市选择确认时触发的函数。
     * @param {Object} data - 包含城市选择数据的对象。
     * @param {Array} data.value - 包含省市区三级数据的数组，其中 data.value[0] 是省份，data.value[1] 是城市，data.value[2] 是区域。
     * @function onCityConfirm
     */
    const onCityConfirm = (data) => {
        citySelectShow.value = false;
        addressForm.city = data.value[1];
        addressForm.province = data.value[0];
        addressForm.cityName = data.value[0] + "/" + data.value[1] + "/" + data.value[2];
    }

    /**
     * 处理创建地址的函数。
     * 在用户点击创建地址按钮时调用，首先检查地址表单是否填写完整，
     * 如果不完整则显示提示信息。如果完整则调用创建地址的API，
     * 成功后显示成功提示并刷新地址列表，最后关闭添加地址的弹窗。
     * @returns {void}
     */
    const handleCreateAddress = () => {
        if (!addressForm.phoneNumber || !addressForm.address || !addressForm.name || !addressForm.province || !addressForm.city) {
            uni.showToast({
                icon: 'none',
                title: '请填写完整的地址信息'
            });
            return;
        }

        createProductsOrderAddress({ data: addressForm }).then(response => {
            console.log(response)
            if (response.code === 200) {
                uni.showToast({
                    icon: 'success',
                    title: '创建成功'
                });
                getProductsAddressList();
            }
        }).finally(() => {
            addAddressModel.value = false;
        });
    }

    const pay_ment = reactive([{
        id: 1,
        name: "支付宝",
        value: 'alipay'
    }, {
        id: 2,
        name: "微信支付",
        value: 'weixin'
    }, {
        id: 3,
        name: "银行卡支付",
        value: 'cardpay'
    }]);

    const props = defineProps({
		shopId: String,
        orderId: String
    });

    /**
     * 获取产品地址列表
     * 该函数清空现有的产品订单地址列表，并从后端获取最新的地址列表数据，
     * 然后将这些数据添加到产品订单地址列表中。
     */
    const getProductsAddressList = () => {
        productsOrderAddress.length = 0;
        getProductsOrderAddressList().then(response => {
            for (const element of response.data) {
                productsOrderAddress.push(element);
            }
        });
    }

    onMounted(() => {
        handleCityData();
        if (props.shopId !== undefined) {
            pageStatus.value = "SHOP";
            getProductsAddressList();
            getProductsListID({
		    	productId: props.shopId
		    }).then(response => {
		    	shopDetail.value = response.data;
		    });
        } else 
        if (props.orderId !== undefined) {
            pageStatus.value = "ORDER";

            getProductsOrders({ orderId: props.orderId }).then(response => {
                shopDetail.value = response.data.userProducts;
                productsOrderAddress.push(response.data.userOrdersAddress);
            });
        }
    });

    /**
     * 编辑地址函数，用于设置当前选中的地址索引，并关闭编辑地址模型。
     * @param {number} index - 要编辑的地址在列表中的索引。
     */
    const editAddress = (index) => {
        editAddressModel.value = false;
        defaultAdressSelect.value = index;
    }

    const back = () => uni.navigateBack(1);

    /**
     * 创建订单的方法。
     * 显示加载提示，调用创建订单的API，成功后跳转到订单详情页面，失败则显示错误信息。
     * 无论成功或失败，最后都会隐藏加载提示。
     * @param {Object} props - 包含商店ID的属性对象。
     * @param {Array} productsOrderAddress - 包含地址信息的数组。
     * @param {Object} defaultAdressSelect - 默认地址选择对象。
     */
    const createOrder = () => {
        uni.showLoading({
		    title: "创建订单中"
		});
		console.log(productsOrderAddress);
		if(!productsOrderAddress[defaultAdressSelect.value]){
			uni.showToast({
				icon:"none",
				title: "请选择订单地址"
			});
			addAddressModel.value = true
			return void 0;
		}
		createProductsOrder({ productsId: props.shopId, quantity: 1, addressId: productsOrderAddress[defaultAdressSelect.value].id }).then(response => {
            uni.redirectTo({
		    	url: "/pages/app-pages/detail/order-detail/order-detail?orderId=" + response.data.id
		    });
		}).catch((e) => {
            uni.showToast({
	        	icon: 'none',
	        	title: e.msg
	        });
        }).finally(() => {
			uni.hideLoading();
		});
    }

    /**
     * 创建支付流程
     * 显示加载提示，调用支付接口，并根据结果展示相应的提示信息。
     * 支付成功后，延迟1秒返回上一页面。
     * @param {Object} props - 组件属性，包含 orderId
     * @param {Object} selectMent - 支付方式选择
     * @param {Object} pay_ment - 支付方式配置
     */
    const createPayment = () => {
        uni.showLoading({
		    title: "正在付款中"
		});

        paymentProductsOrder({ orderId: props.orderId, mode: pay_ment[selectMent.value].value }).then(response => {
            uni.showToast({
	        	icon: 'success',
	        	title: "支付成功"
	        });
            setTimeout(() => uni.navigateBack(1), 1000);
        }).catch((e) => {
            uni.showToast({
	        	icon: 'none',
	        	title: e.msg
	        });
        }).finally(() => {
            uni.hideLoading();
        });
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>