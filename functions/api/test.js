/**
 * Cloudflare Pages Function - 健康检查端点
 */

export async function onRequest(context) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // 处理预检请求
    if (context.request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    // 仅允许 GET/HEAD
    if (context.request.method !== 'GET' && context.request.method !== 'HEAD') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    // 返回健康状态
    return new Response(
        JSON.stringify({
            success: true,
            message: '服务正常',
            platform: 'Cloudflare Pages',
            timestamp: new Date().toISOString()
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
}
