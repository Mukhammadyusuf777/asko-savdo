// Cloudflare Pages Function: /api/sales

export async function onRequestGet(context) {
  const { env } = context;

  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 ma'lumotlar bazasi ulanmagan" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { results: sales } = await env.DB.prepare("SELECT * FROM sales ORDER BY rowid DESC").all();
    const { results: items } = await env.DB.prepare("SELECT * FROM sale_items").all();

    // Map items to sales
    const fullSales = sales.map(s => ({
      ...s,
      totalAmount: s.total_amount,
      paidAmount: s.paid_amount,
      remainingAmount: s.remaining_amount,
      carNumber: s.car_number,
      carModel: s.car_model,
      staffName: s.staff_name,
      paymentMethod: s.payment_method,
      items: items.filter(it => it.sale_id === s.id)
    }));

    return new Response(JSON.stringify(fullSales), {
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 ma'lumotlar bazasi ulanmagan" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const sale = await request.json();

    // 1. Insert sale
    await env.DB.prepare(`
      INSERT INTO sales (id, client, phone, car_number, car_model, merchant, payment_method, date, time, total_amount, paid_amount, remaining_amount, status, role, staff_name, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      sale.id,
      sale.client,
      sale.phone || '',
      sale.carNumber || '',
      sale.carModel || '',
      sale.merchant || '',
      sale.paymentMethod || 'naqd',
      sale.date,
      sale.time || '',
      sale.totalAmount || 0,
      sale.paidAmount || 0,
      sale.remainingAmount || 0,
      sale.status || 'To\'landi',
      sale.role, // 'sotuvchi', 'administrator', 'vulkanizator'
      sale.staffName,
      sale.notes || ''
    ).run();

    // 2. Insert items and deduct stock
    if (sale.items && sale.items.length > 0) {
      for (const item of sale.items) {
        await env.DB.prepare(`
          INSERT INTO sale_items (sale_id, product_id, code, name, quantity, price, total, is_service)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          sale.id,
          item.id || '',
          item.code || '',
          item.name,
          item.quantity || 1,
          item.price || 0,
          item.total || (item.quantity * item.price) || 0,
          item.isService ? 1 : 0
        ).run();

        // Deduct inventory if not service
        if (!item.isService && item.id) {
          await env.DB.prepare(`
            UPDATE products 
            SET quantity = MAX(0, quantity - ?) 
            WHERE id = ? OR code = ?
          `).bind(item.quantity, item.id, item.code || '').run();
        }
      }
    }

    return new Response(JSON.stringify({ success: true, id: sale.id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
