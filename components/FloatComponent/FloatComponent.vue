<template>
    <DragComponent src="/static/images/e-bot.png" @tap="applicationStore.navigateTo('/pages/app-pages/app/app-zixun/app-zixun')"/>
</template>

<script setup>
    import { ref } from 'vue';
    import { useApplicationStore } from "@/store/applicationStore";

    const applicationStore = useApplicationStore();
    const bottom = ref(typeof plus === 'undefined' ? '10vh' : '2vh');
</script>

<style lang="scss">
    @import "style.scss";
</style>
