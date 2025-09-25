export class SSEClient {
  /**
   * 初始化SSE客户端
   * @param {string} url - SSE服务端点
   * @param {Object} options - 配置项
   * @param {Object} options.headers - 请求头
   * @param {boolean} options.withCredentials - 是否携带凭证
   * @param {number} options.reconnectInterval - 重连间隔(ms)，默认3000
   * @param {Function} options.onMessage - 消息处理函数
   * @param {Function} options.onOpen - 连接打开回调
   * @param {Function} options.onError - 错误处理回调
   * @param {Object} options.eventHandlers - 自定义事件处理器
   */
  constructor(url, options = {}) {
    this.url = "http://loaclhost:8080/api"+url;
    this.options = {
      reconnectInterval: 3000,
      headers: {},
      withCredentials: false,
      ...options
    };
    
    this.sse = null;
    this.isConnected = false;
    this.reconnectTimer = null;
    
    // 初始化事件处理器
    this.eventHandlers = {
      ...options.eventHandlers
    };
  }

  /**
   * 建立连接
   */
  connect() {
    // 关闭现有连接
    if (this.sse) {
      this.sse.close();
    }

    // 创建SSE实例
    this.sse = new SSE(this.url, {
      headers: this.options.headers,
      withCredentials: this.options.withCredentials
    });

    // 监听连接打开
    this.sse.addEventListener('open', (event) => {
      this.isConnected = true;
      this.clearReconnectTimer();
      if (this.options.onOpen) {
        this.options.onOpen(event);
      }
    });

    // 监听默认消息
    this.sse.addEventListener('message', (event) => {
      if (this.options.onMessage) {
        try {
          // 尝试自动解析JSON
          const data = JSON.parse(event.data);
          this.options.onMessage(data, event);
        } catch (e) {
          // 解析失败直接返回原始数据
          this.options.onMessage(event.data, event);
        }
      }
    });

    // 注册自定义事件处理器
    Object.entries(this.eventHandlers).forEach(([eventName, handler]) => {
      this.sse.addEventListener(eventName, (event) => {
        try {
          const data = JSON.parse(event.data);
          handler(data, event);
        } catch (e) {
          handler(event.data, event);
        }
      });
    });

    // 监听错误
    this.sse.addEventListener('error', (event) => {
      this.isConnected = false;
      if (this.options.onError) {
        this.options.onError(event);
      }
      // 自动重连
      this.scheduleReconnect();
    });
  }

  /**
   * 安排重连
   */
  scheduleReconnect() {
    if (this.reconnectTimer) return;
    
    this.reconnectTimer = setTimeout(() => {
      if (!this.isConnected) {
        this.connect();
      }
    }, this.options.reconnectInterval);
  }

  /**
   * 清除重连定时器
   */
  clearReconnectTimer() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  /**
   * 添加自定义事件监听
   * @param {string} eventName - 事件名
   * @param {Function} handler - 事件处理器
   */
  on(eventName, handler) {
    this.eventHandlers[eventName] = handler;
    
    // 如果已连接，立即注册事件
    if (this.sse) {
      this.sse.addEventListener(eventName, (event) => {
        try {
          const data = JSON.parse(event.data);
          handler(data, event);
        } catch (e) {
          handler(event.data, event);
        }
      });
    }
  }

  /**
   * 关闭连接
   */
  close() {
    this.clearReconnectTimer();
    if (this.sse) {
      this.sse.close();
      this.sse = null;
    }
    this.isConnected = false;
  }

  /**
   * 更新请求头
   * @param {Object} headers - 新的请求头
   */
  updateHeaders(headers) {
    this.options.headers = {
      ...this.options.headers,
      ...headers
    };
    
    // 重新连接以应用新的请求头
    if (this.isConnected) {
      this.connect();
    }
  }
}
