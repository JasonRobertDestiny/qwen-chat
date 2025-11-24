/**
 * Cloudflare Pages Function - 通义千问API代理
 * 支持文本、图片、音频多模态输入
 */

export async function onRequest(context) {
    const { request, env } = context;

    // CORS设置
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // 处理OPTIONS预检请求
    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    try {
        const body = await request.json();
        const { message, imageData, audioData } = body;

        // 构建内容块
        const contentBlocks = [];

        if (message) {
            contentBlocks.push({ type: 'text', text: message });
        }

        if (imageData) {
            contentBlocks.push({
                type: 'image_url',
                image_url: { url: imageData }
            });
        }

        if (audioData && audioData.data) {
            // 确保音频数据有正确的前缀
            const dataStr = audioData.data.startsWith('data:')
                ? audioData.data
                : `data:audio/${audioData.format || 'wav'};base64,${audioData.data}`;

            contentBlocks.push({
                type: 'input_audio',
                input_audio: {
                    data: dataStr,
                    format: audioData.format || 'wav'
                }
            });
        }

        if (!contentBlocks.length) {
            return new Response(
                JSON.stringify({ error: '缺少可用的输入内容' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // API配置 - 从环境变量读取
        const API_KEY = env.QWEN_API_KEY || 'sk-5eca33a68f2d499fa09953b9b308ed0f';
        const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
        const MODEL = 'qwen3-omni-flash'; // 全模态极速版

        // 构建请求体（OpenAI兼容格式）
        const requestBody = {
            model: MODEL,
            messages: [
                {
                    role: 'user',
                    content: contentBlocks
                }
            ],
            stream: false
        };

        console.log('调用通义千问API...', JSON.stringify(requestBody).slice(0, 500));

        // 调用通义千问API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        console.log('API响应状态:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API错误:', errorText);
            return new Response(
                JSON.stringify({
                    error: `API请求失败: ${response.status}`,
                    details: errorText
                }),
                { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const data = await response.json();
        console.log('API响应:', data);

        // 解析OpenAI兼容格式响应
        if (data.choices && data.choices[0]) {
            const replyContent = data.choices[0].message.content;

            // 处理数组或字符串格式的内容
            let normalizedReply;
            if (Array.isArray(replyContent)) {
                normalizedReply = replyContent
                    .filter(item => item && (item.text || item.content))
                    .map(item => item.text || item.content)
                    .join('');
            } else {
                normalizedReply = replyContent;
            }

            // 清理和格式化文本
            normalizedReply = cleanText(normalizedReply);

            return new Response(
                JSON.stringify({
                    success: true,
                    message: normalizedReply
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        console.error('未知响应格式:', data);
        return new Response(
            JSON.stringify({
                error: '未知的API响应格式',
                data: data
            }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('服务器错误:', error);
        return new Response(
            JSON.stringify({
                error: '服务器内部错误',
                message: error.message
            }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
}

// 文本清理函数
function cleanText(text) {
    if (!text) return '';

    return text
        // 移除多余的连续空格（保留单个空格）
        .replace(/ {2,}/g, ' ')
        // 移除行首行尾空格
        .split('\n')
        .map(line => line.trim())
        .join('\n')
        // 移除3个以上的连续换行，保留最多2个（段落间隔）
        .replace(/\n{3,}/g, '\n\n')
        // 移除首尾空白
        .trim();
}
