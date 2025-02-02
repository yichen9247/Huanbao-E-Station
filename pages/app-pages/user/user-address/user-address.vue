<template>
    <view class="app-activity activity-user-address" style="height: 100%;">
        <view class="address-list">
            <view class="address-item" v-for="(item, index) in productsOrderAddress" :key="index">
                <view class="icon-box" v-html="icons.order_address"></view>

                <view class="content-box">
                    <text class="address up-line-1">{{ item.address }}</text>
                    <text class="user-info">{{ `${item.name} ${item.phoneNumber}` }}</text>
                </view>

                <view class="button-box">
                    <text class="button-text">修改</text>
                </view>
            </view>
        </view>

        <button type="primary" class="add-btn app-btn" @tap="addAddressModel = true">新建地址</button>
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
    import icons from '@/utils/icons';
    import cityList from "@/utils/city-data-3"
    import { ref, reactive, onMounted } from 'vue';
    import { getProductsOrderAddressList, createProductsOrderAddress } from '@/api/order';

    const cityOne = ref(0); // 第一级城市索引，默认为0
    const uPickerRef = ref(null); // 城市选择器引用
    const citySelectShow = ref(false); // 城市选择器是否显示，默认为false
    const cityData = reactive([[], [], []]); // 城市数据，结构为[[], [], []]，用于存储处理后的城市数据

    const addAddressModel = ref(false);
    const productsOrderAddress = reactive([]);

    const addressForm = reactive({
        phoneNumber: '',
        address: '',
        name: '',
        province: '',
        city: '',
        cityName: ''
    });

    onMounted(() => {
        getProductsAddressList();
    });

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
     * 获取产品地址列表
     * 该函数清空现有的产品订单地址列表，并从后端获取最新的地址列表数据，
     * 然后将这些数据添加到产品订单地址列表中。
     */
     const getProductsAddressList = () => {
        handleCityData();
        productsOrderAddress.length = 0;
        getProductsOrderAddressList().then(response => {
            for (const element of response.data) {
                productsOrderAddress.push(element);
            }
        });
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>