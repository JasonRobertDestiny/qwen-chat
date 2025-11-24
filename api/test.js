/**
 * Vercel Serverless Function - 健康检查端点
 * 用于探测部署是否正常，避免前端探测时返回 404
 */
export default function handler(req, res) {
    // 统一设置 CORS，便于跨源探测
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理预检请求
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 仅允许 GET/HEAD，其他方法提示不支持
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 返回简洁的健康状态，供前端探测使用
    return res.status(200).json({
        success: true,
        message: '服务正常',
        timestamp: new Date().toISOString()
    });
}
