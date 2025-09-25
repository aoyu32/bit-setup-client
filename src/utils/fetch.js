export const fetchReq = async (url, method, content) => {
    const options = {
        method: method.toUpperCase(), // 规范化方法名
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // 仅对 POST、PUT 等方法添加 body
    if (['POST', 'PUT', 'PATCH'].includes(options.method)) {
        options.body = JSON.stringify({ content });
    }

    const resp = await fetch(url, options);

    if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
    }

    return  resp; // 解析 JSON 数据
};