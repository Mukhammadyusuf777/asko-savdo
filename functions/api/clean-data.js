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

    // 2. Reset standard tire products to full clean quantities
    await env.DB.prepare(`
      UPDATE products SET quantity = CASE 
        WHEN code = 'SHN0613' THEN 44
        WHEN code = 'AF0007' THEN 30
        WHEN code = 'SHN0955' THEN 24
        WHEN code = 'SHN0798' THEN 20
        WHEN code = 'SHN0206' THEN 20
        WHEN code = 'SHN1181' THEN 20
        WHEN code = 'SHN0956' THEN 20
        WHEN code = 'SHN0951' THEN 20
        WHEN code = 'AF0003' THEN 18
        WHEN code = 'SHN0949' THEN 18
        ELSE quantity
      END
    `).run();

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
