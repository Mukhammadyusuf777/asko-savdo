// Cloudflare Pages Function: /api/clean-data
// Clears test sales and test records to start fresh

export async function onRequestGet(context) {
  const { env } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "env.DB mavjud emas" }), { status: 500 });
  }

  try {
    // 1. Delete all test sales & items
    await env.DB.prepare("DELETE FROM sale_items").run();
    await env.DB.prepare("DELETE FROM sales").run();
    await env.DB.prepare("DELETE FROM stock_transfers").run();
    await env.DB.prepare("DELETE FROM orders").run();

    // 2. Delete all demo products
    await env.DB.prepare("DELETE FROM products").run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Barcha test sotuvlari tozalandi. Tizim yangi haqiqiy sotuvlar uchun tayyor!" 
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export const onRequestPost = onRequestGet;
