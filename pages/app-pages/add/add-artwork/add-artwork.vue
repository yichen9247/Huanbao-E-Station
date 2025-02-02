<template>
    <view class="app-activity activity-add-artwork">
        <view class="artwork-form">
            <up-input v-model="editForm.name" placeholder="请输入作品名称"
                style="background-color: #ffffff; border-radius: 10px; height: 35px; margin-bottom: 15px; padding: 5px 15px;" />
                <view class="upload-container">
                    <up-textarea v-model="editForm.description" placeholder="描述一下作品的相关信息，创作灵感..." height="100"
                    maxlength="500" style="border: unset; padding: 15px;" />
                    
                    <view class="upload-box">
                        <up-upload accept="image" :fileList="uploadList" name="1" multiple :previewFullImage="true"
                            :maxCount="3" @afterRead="afterRead"/>
                </view>
            </view>
            <button class="app-btn" type="primary" @tap="submitArtwork()">提交作品</button>
        </view>
    </view>
</template>

<script setup>
    import config from "@/config";
    import { decrypt } from "@/utils/ajax";
    import { reactive, onMounted, defineProps } from "vue";
    import { submitCompetitionArtwork } from "@/api/competitions";

    const uploadList = reactive([]);
    const props = defineProps({
		id: String
	});

    const editForm = reactive({
        name: "",
        imageList: "",
        projectId: null,
        description: ""
    });

    onMounted(() => {
        editForm.projectId = props.id;
    });

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
                    if (editForm.imageList === "") {
                        editForm.imageList += decrypt(JSON.parse(response.data)).data.path;
                    } else editForm.imageList += `,${decrypt(JSON.parse(response.data)).data.path}`;
                    setTimeout(() => {
                        resolve(response.data.data);
                    }, 1000);
                }
            });
        });
    };

    /**
     * 提交艺术作品的函数。
     * 检查表单字段是否完整，如果文件上传未完成则提示用户等待。
     * 如果所有检查通过，则提交作品信息，并在成功后显示提示并返回上一页面。
     * 如果提交失败，则显示错误信息。
     */
    const submitArtwork = () => {
        if (editForm.name === "" || editForm.description === "" || editForm.imageList === "") return uni.showToast({
            icon: 'none',
            title: '请填写完整的作品信息'
        });
        if (uploadList.every(file => file.status === 'success')) {
            submitCompetitionArtwork({ data: editForm }).then(response => {
                uni.showToast({
		        	icon: 'success',
		        	title: "提交成功"
		        });
                setTimeout(() => {
			    	uni.navigateBack();
			    }, 1000);
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
    };
</script>

<style scoped>
    @import "style.scss";
</style>