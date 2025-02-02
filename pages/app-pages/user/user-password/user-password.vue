<template>
    <view class="app-activity activity-user-password" style="height: 100%;">
        <up-form class="password-form">
            <text class="form-label">旧密码</text>
            <up-form-item class="form-item">
                <up-input class="input-model" placeholder="请输入旧密码" border="surround" v-model="passwordForm.oldPassword" type="password"
					style="height: 26px;" maxlength="11" max="11" :customStyle="{ background: '#ffffff', padding: '10px' }"></up-input>
            </up-form-item>

            <text class="form-label">新密码</text>
            <up-form-item class="form-item">
                <up-input class="input-model" placeholder="请输入新密码" border="surround" v-model="passwordForm.newPassword" type="password"
					style="height: 26px;" maxlength="11" max="11" :customStyle="{ background: '#ffffff', padding: '10px' }"></up-input>
            </up-form-item>

            <text class="form-label">再次输入新密码</text>
            <up-form-item class="form-item">
                <up-input class="input-model" placeholder="请再次输入新密码" border="surround" v-model="passwordForm.newPasswords" type="password"
					style="height: 26px;" maxlength="11" max="11" :customStyle="{ background: '#ffffff', padding: '10px' }"></up-input>
            </up-form-item>
            <button class="app-btn" type="primary" @tap="onUpdatePassword()">确认修改</button>
        </up-form>
    </view>
</template>

<script setup>
    import { reactive } from "vue";
    import { updatePassword } from "@/api/user";
    
    const passwordForm = reactive({
        oldPassword: '',
        newPassword: '',
        newPasswords: ''
    });

    /**
     * 更新用户密码的函数。
     * - 检查旧密码、新密码和确认新密码是否都已填写。
     * - 验证新密码与确认新密码是否一致。
     * - 确认新密码与旧密码不同。
     * - 调用更新密码的API，并根据响应显示相应的提示信息。
     * @param {Object} passwordForm - 包含旧密码、新密码和确认新密码的对象。
     */
    const onUpdatePassword = () => {
        if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.newPasswords) return uni.showToast({
            icon: 'none',
            title: '请填写完整信息'
        });

        if (passwordForm.newPassword !== passwordForm.newPasswords) return uni.showToast({
            icon: 'none',
            title: '两次密码不一致'
        });

        if (passwordForm.newPassword === passwordForm.oldPassword) return uni.showToast({
            icon: 'none',
            title: '新旧密码相同'
        });

        updatePassword({ data: passwordForm }).then(response => {
            uni.showToast({
	        	icon: 'success',
	        	title: "修改密码成功"
	        });
        }).catch(e => {
            uni.showToast({
	        	icon: 'none',
	        	title: e.msg
	        });
        });
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>
