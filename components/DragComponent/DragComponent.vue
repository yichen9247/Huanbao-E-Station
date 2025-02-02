<template>
  <view class="floating-button" :style="buttonStyle" @touchstart="onTouchStart" @touchmove="onTouchMove"
    @touchend="onTouchEnd" @touchcancel="onTouchEnd" @click="btnEvent">
    <image :style="['width:' + width, 'height:' + height]" :src="src" mode=""></image>
  </view>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  const emits = defineEmits(['onChange'])
  const peops = defineProps({
    src: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: false,
      default: '120rpx'
    },
    height: {
      type: String,
      required: false,
      default: '120rpx'
    }
  });

  const isDragging = ref(false);
  const startX = ref(0);
  const startY = ref(0);
  const offsetX = ref(0);
  const offsetY = ref(0);
  const screenWidth = ref(0);
  const screenHeight = ref(0);
  const buttonStyle = ref({
    left: '0px', // 初始值将被修改
    top: '600px',
    transition: 'none',
  });

  const btnEvent = () => {
    emits('onChange')
  }

  const getScreenSize = () => {
    uni.getSystemInfo({
      success: (res) => {
        screenWidth.value = res.windowWidth;
        screenHeight.value = res.windowHeight;
        // 设置按钮初始位置为屏幕最右边
        buttonStyle.value.left = `${screenWidth.value - 80}px`; // 假设按钮宽度为60px
      }
    });
  };

  const onTouchStart = (event) => {
    isDragging.value = true;
    startX.value = event.touches[0].clientX;
    startY.value = event.touches[0].clientY;

    // 计算按钮的初始偏移量
    offsetX.value = parseInt(buttonStyle.value.left) - startX.value;
    offsetY.value = parseInt(buttonStyle.value.top) - startY.value;
  };

  const throttle = (func, delay) => {
    let lastTime = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastTime >= delay) {
        lastTime = now;
        return func.apply(this, args);
      }
    };
  };

  const onTouchMove = throttle((event) => {
    if (!isDragging.value) return;

    // 计算新的位置
    let moveX = event.touches[0].clientX + offsetX.value;
    let moveY = event.touches[0].clientY + offsetY.value;

    // 确保按钮不超出屏幕边界
    const buttonWidth = 60;  // 按钮宽度
    const buttonHeight = 60; // 按钮高度

    // 更新按钮位置，确保在屏幕内
    moveX = Math.max(0, Math.min(moveX, screenWidth.value - buttonWidth)); // 左右边界检查
    moveY = Math.max(0, Math.min(moveY, screenHeight.value - buttonHeight)); // 上下边界检查

    buttonStyle.value = {
      left: `${moveX}px`,
      top: `${moveY}px`,
      transition: 'none', // 拖动时不使用过渡效果
    };
  }, 16); // 约每16毫秒更新一次 (约为60fps)

  const onTouchEnd = (event) => {
    // 处理 touchend 时的点击逻辑
    if (isDragging.value) {
      isDragging.value = false;

      // 计算是否贴边
      const left = parseInt(buttonStyle.value.left);
      const snapToEdgeX = left > screenWidth.value / 2 ? screenWidth.value - 60 : 0;

      buttonStyle.value = {
        left: `${snapToEdgeX}px`,
        top: `${parseInt(buttonStyle.value.top)}px`, // 保持当前的垂直位置
        transition: 'left 0.3s, top 0.3s', // 添加平滑过渡
      };
    } else {
      // 如果没有拖动，触发点击事件
      btnEvent();
    }
  };

  onMounted(() => {
    getScreenSize(); // 获取屏幕大小
  });
</script>

<style>
  .floating-button {
    display: flex;
    font-size: 16px;
    position: fixed;
    touch-action: none;
    text-align: center;
    align-items: center;
    justify-content: center;
    /* 禁用默认的触控事件处理 */
    z-index: 999999999!important;
  }
</style>
