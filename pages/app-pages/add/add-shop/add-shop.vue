<template>
    <view class="app-activity activity-add-shop">
        <view class="shop-form">
            <up-input v-model="shopForm.name" placeholder="请输入商品名称"
                style="background-color: #ffffff; border-radius: 10px; height: 35px; margin-bottom: 15px; padding: 5px 15px;" />
            <view class="upload-container">
                <up-textarea v-model="shopForm.description" placeholder="描述一下宝贝的相关信息，货品来源..." height="100"
                maxlength="500" style="border: unset; padding: 15px;" />
            
                <view class="upload-box">
                    <up-upload accept="image" :fileList="uploadList" name="1" multiple :previewFullImage="true"
                        :maxCount="3" @afterRead="afterRead"/>
                </view>
            </view>

            <view class="info-container">
                <view class="info-item" @tap="priceInput = ''; priceModel = true">
                    <text class="item-name">商品价格</text>
                    <view style="display: flex; align-items: center;">
                        <text class="item-data" style="color: #dd524d; font-weight: bold;">￥{{ shopForm.price }}</text>
                        <up-icon class="icon" name="arrow-right" color="#666666" size="18"></up-icon>
                    </view>
                </view>
                <view class="info-item" @tap="classModel = true" v-if="classifyList[0].length > 0">
                    <text class="item-name">商品分类</text>
                    <view style="display: flex; align-items: center; color: #666666;">
                        <text class="item-data">{{ classifyList[0].find(item => item.id === shopForm.classId).name }}</text>
                        <up-icon class="icon" name="arrow-right" color="#666666" size="18"></up-icon>
                    </view>
                </view>
            </view>
            <button class="app-btn" type="primary" @tap="createShop()">发布商品</button>
        </view>
        <up-picker :show="classModel" :columns="classifyList" keyName="name" @close="classModel = false" @cancel="classModel = false" closeOnClickOverlay confirmColor="var(--dominColor)" @confirm="onClassifyConfirm"/>
        <up-keyboard ref="uKeyboard" mode="number" :show="priceModel" @cancel="priceModel = false; priceInput = ''" @close="priceModel = false" :tips="priceInput === '' ? '输入商品价格' : `￥${priceInput}`" @change="onConfirmChange" @confirm="onConfirmClick" @backspace="onInputBackspace"/>
    </view>
</template>

<script setup>
    import config from "@/config";
    import { decrypt } from "@/utils/ajax";
    import { createProducts } from "@/api/products";
    import { ref, reactive, onMounted, defineProps } from "vue";
    import { getProductsClassityList, getProductsListID } from "@/api/products";
    
    const priceInput = ref("");
    const classModel = ref(false);
    const priceModel = ref(false);
    const uploadList = reactive([]);
    const classifyList = reactive([[]]);

    const props = defineProps({
		shopId: String
	});

    const shopForm = reactive({
        name: "",
        price: "0",
        classId: 1,
        quantity: 1,
        imageList: "",
        description: '',
    });

    onMounted(() => {
        getProductsClassityList().then(response => {
            for (const element of response.data) {
                classifyList[0].push(element);
            }
        });

        if (props.shopId !== undefined) {
            getProductsListID({
			    productId: props.shopId
		    }).then(response => {
                shopForm.name = response.data.name;
                shopForm.price = response.data.price;
                shopForm.description = response.data.description;
                shopForm.classId = response.data.productsCategories[0].categoryId;
		    });
        }
    });

    /**
     * 确认点击事件处理函数。
     * 当用户点击确认按钮时，此函数会被触发。
     * 它将关闭价格模型（priceModel），并将输入的价格（priceInput）赋值给商店表单的价格字段（shopForm.price）。
     */
    const onConfirmClick = () => {
        priceModel.value = false;
        if (priceInput.value !== '') shopForm.price = priceInput.value;
    }

    /**
     * 当确认更改时调用的函数，用于更新价格输入框的值。
     * @param {number} data - 要添加到价格输入框的值。
     */
    const onConfirmChange = (data) => {
        priceInput.value += data;
    }

    /**
     * 处理输入框退格键事件的函数。
     * 当用户在价格输入框中按下退格键时，如果输入框内有内容，则删除最后一个字符。
     * @function onInputBackspace
     */
    const onInputBackspace = () => {
        if (priceInput.value.length > 0) {
            priceInput.value = priceInput.value.slice(0, -1);
        }
    }

    /**
     * 处理文件上传后的逻辑
     * @param {Object} event - 文件选择事件对象
     * @returns {Promise<void>} - 异步处理上传后的文件状态
     * 
     * 该函数用于处理文件选择后的上传逻辑，将选中的文件添加到上传列表中，并更新每个文件的状态。
     * 文件上传成功后，会更新文件的状态为 'success' 并附带上传后的 URL。
     */
    const afterRead = async (event) => {
        let lists = [].concat(event.file);
        let fileListLen = uploadList.length;
        lists.map((item) => {
            uploadList.push({
                ...item,
                status: 'uploading',
                message: '上传中',
            });
        });
        for (let i = 0; i < lists.length; i++) {
            const result = await uploadFilePromise(lists[i].url);
            let item = uploadList[fileListLen];
            uploadList.splice(fileListLen, 1, {
                ...item,
                status: 'success',
                message: '',
                url: result,
            });
            fileListLen++;
        }
    };

    /**
     * 上传文件的函数，返回一个Promise对象。
     * @param {string} url - 需要上传的文件路径。
     * @returns {Promise} - 返回一个Promise对象，成功时解析为上传文件的数据。
     * 该函数使用uni.uploadFile方法上传文件到服务器，并在成功后处理响应数据。
     * 如果shopForm.imageList为空，则直接添加解密后的数据；否则，在现有数据后追加解密后的数据。
     * 使用setTimeout模拟异步操作，1秒后解析Promise。
     */
    const uploadFilePromise = (url) => {
        return new Promise((resolve, reject) => {
            uni.uploadFile({
                url: config.baseUrl + "/upload/image",
                filePath: url,
                name: 'file',
                header: {
                    token: uni.getStorageSync("token")
                },
                success: (response) => {
                    if (shopForm.imageList === "") {
                        shopForm.imageList += decrypt(JSON.parse(response.data)).data.path;
                    } else shopForm.imageList += `,${decrypt(JSON.parse(response.data)).data.path}`;
                    setTimeout(() => {
                        resolve(response.data.data);
                    }, 1000);
                }
            });
        });
    };

    /**
     * 创建商品的函数。
     * 检查商店表单的名称和描述是否填写完整，如果不完整则显示提示信息。
     * 如果填写完整，则调用createProducts API创建商店，并根据响应显示成功或失败的提示信息。
     * 成功后，延迟1秒返回上一页面。
     * @param {Object} shopForm - 包含商店信息的表单对象。
     * @returns {void}
     */
    const createShop = () => {
        if (shopForm.name === "" || shopForm.description === "" || Number(shopForm.price) <= 0 || shopForm.imageList === "") return uni.showToast({
            icon: 'none',
            title: '请填写完整的商品信息'
        });
        if (uploadList.every(file => file.status === 'success')) {
            createProducts({ data: shopForm }).then(response => {
                uni.showToast({
    	        	icon: 'success',
    	        	title: "发布成功"
    	        });
                setTimeout(() => openShopDetail(response.data.id), 1000);
            }).catch(e => {
                uni.showToast({
    	        	icon: 'none',
    	        	title: e.msg
    	        });
            });
            
        } else uni.showToast({
    		icon: 'none',
    		title: "请等待文件上传"
    	});
    }

    /**
	 * 打开商品详情页
	 * @param {number} id - 店铺的唯一标识符
	 */
	const openShopDetail = (shopId) => {
		uni.redirectTo({
			url: "/pages/app-pages/detail/product-detail/product-detail?shopId=" + shopId
		});
	}

    /**
     * 确认分类选择
     * @param {Object} item - 选择的分类项
     * @description 当用户确认分类选择时，此函数会被触发。它会关闭分类选择模型，并将选中的分类ID赋值给商店表单的classId字段。
     */
    const onClassifyConfirm = (item) => {
        classModel.value = false;
        shopForm.classId = item.value[0].id;
    }
</script>

<style lang="scss">
    @import "style.scss";

    .u-upload__button,.u-upload__wrap__preview {
        margin-bottom: 0!important;
    }
</style>