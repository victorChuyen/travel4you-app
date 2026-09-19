function formatAmount(amount, currency) {
  return `${new Intl.NumberFormat('vi-VN').format(Number(amount))} ${currency}`;
}

export async function sendPaymentSuccessNotification(env, payment) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.warn('Telegram payment notification skipped: missing configuration');
    return { sent: false, skipped: true };
  }

  const metadata = payment.raw_metadata_json || {};
  const planCode = metadata.plan_code || 'unknown';
  const message = [
    '✅ THANH TOÁN THÀNH CÔNG',
    '',
    `Mã giao dịch: ${payment.external_payment_id}`,
    `Mã đơn: ${payment.order_reference}`,
    `Số tiền: ${formatAmount(payment.amount, payment.currency)}`,
    `Gói: ${planCode}`,
    `Thời gian: ${new Date(payment.paid_at).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`,
    '',
    'Travel4You SaaS Billing',
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text: message,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Telegram notification failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const result = await response.json();
  if (!result.ok) throw new Error('Telegram notification returned an unsuccessful response');
  return { sent: true };
}
