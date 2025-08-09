
/**
 * Vue3 点击外部区域指令
 * 指令名称: v-click-out
 * 功能: 检测点击元素外部区域时执行指定的回调函数
 */

const clickOutside = {
  // 指令挂载时
  mounted(el, binding) {
    // 确保绑定值是一个函数
    if (typeof binding.value !== 'function') {
      console.warn('v-click-out 指令的值必须是一个函数');
      return;
    }

    // 创建点击事件处理函数
    const clickHandler = (event) => {
      // 检查点击的目标是否在元素内部
      // 使用 contains 方法判断点击位置是否在当前元素内
      if (!el.contains(event.target)) {
        // 如果点击在元素外部，执行绑定的回调函数
        binding.value(event);
      }
    };

    // 将事件处理函数存储到元素上，便于后续移除
    el._clickOutsideHandler = clickHandler;
    
    // 添加全局点击事件监听器
    // 使用 capture 阶段确保在其他事件之前捕获
    document.addEventListener('click', clickHandler, true);
  },

  // 指令更新时（当绑定值发生变化）
  updated(el, binding) {
    // 如果绑定值改变了，需要更新处理函数
    if (binding.value !== binding.oldValue) {
      // 移除旧的事件监听器
      if (el._clickOutsideHandler) {
        document.removeEventListener('click', el._clickOutsideHandler, true);
      }
      
      // 重新挂载新的处理函数
      if (typeof binding.value === 'function') {
        const clickHandler = (event) => {
          if (!el.contains(event.target)) {
            binding.value(event);
          }
        };
        
        el._clickOutsideHandler = clickHandler;
        document.addEventListener('click', clickHandler, true);
      }
    }
  },

  // 指令卸载时
  unmounted(el) {
    // 移除事件监听器，防止内存泄漏
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler, true);
      // 清理引用
      delete el._clickOutsideHandler;
    }
  }
};

// 导出指令对象
export default clickOutside;