class TypeEffect {
  constructor(text, element, options = {}) {
    if (!element) return; // 如果元素为空，直接返回

    // 设置可配置的选项，提供默认值
    const {
      typingSpeed = 150,  // 输入速度，默认 150ms
      deletingSpeed = 100,  // 删除速度，默认 100ms
      pauseTime = 500,  // 暂停时间，默认 500ms
      cursor = "|",  // 光标符号，默认 "|"
      loop = false,  // 是否循环，默认 false（只执行一次）
      loopCount = Infinity,  // 循环次数，默认无限循环
    } = options;

    this.text = text;
    this.element = element;
    this.typingSpeed = typingSpeed;
    this.deletingSpeed = deletingSpeed;
    this.pauseTime = pauseTime;
    this.cursor = cursor;
    this.loop = loop;
    this.loopCount = loopCount;
    
    this.index = 0;
    this.isDeleting = false;
    this.currentLoop = 0;  // 当前循环次数
    this.typingTimer = null;  // 用于存储定时器引用
    this.isRunning = false;  // 是否正在运行
  }

  // 初始化打字效果
  start() {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }
    
    this.index = 0;
    this.isDeleting = false;
    this.currentLoop = 0;
    this.isRunning = true;
    this.element.textContent = "";
    this.type();
  }

  // 执行打字效果
  type() {
    if (!this.element || !this.isRunning) return; // 如果元素为空或已停止，直接返回

    const displayText = this.text.slice(0, this.index) + this.cursor;
    this.element.textContent = displayText;

    if (!this.isDeleting && this.index < this.text.length) {
      // 打字阶段
      this.index++;
      this.typingTimer = setTimeout(() => this.type(), this.typingSpeed);
    } else if (this.isDeleting && this.index > 0) {
      // 删除阶段
      this.index--;
      this.typingTimer = setTimeout(() => this.type(), this.deletingSpeed);
    } else {
      // 切换模式（打字/删除）
      this.isDeleting = !this.isDeleting;
      
      // 如果是删除完成，并且需要循环
      if (this.isDeleting && this.loop && this.currentLoop < this.loopCount - 1) {
        this.currentLoop++;
        this.typingTimer = setTimeout(() => this.type(), this.pauseTime);
      } 
      // 如果不需要循环或循环次数已用完，停止
      else if (this.isDeleting && (!this.loop || this.currentLoop >= this.loopCount - 1)) {
        this.isRunning = false;
        // 显示最终文本（不带光标）
        this.element.textContent = this.text;
      }
      // 其他情况继续执行
      else {
        this.typingTimer = setTimeout(() => this.type(), this.pauseTime);
      }
    }
  }

  // 清除定时器
  stop() {
    this.isRunning = false;
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }
  }

  // 重新开始
  restart() {
    this.stop();
    this.start();
  }

  // 更新文本内容
  updateText(newText) {
    this.text = newText;
    if (this.isRunning) {
      this.restart();
    }
  }
}

export default TypeEffect;