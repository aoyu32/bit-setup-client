/**
 * 简化版流式处理器 - 一行代码搞定
 * @param {Response} response - 响应对象
 * @param {Function} onUpdate - 更新回调 (chunk, fullText) => void
 * @returns {Promise<string>} 完整的文本内容
 */
export const processStream = async (response, onUpdate) => {

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullText = '';

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            fullText += chunk;
            onUpdate?.(chunk, fullText);
        }
    } finally {
        reader.releaseLock();
    }

    return fullText;
};