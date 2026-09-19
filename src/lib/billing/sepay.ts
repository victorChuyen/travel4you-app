import type { BillingProvider, CheckoutInput, CheckoutResult } from './types';

export function createSepayProvider(values: Record<string, string | undefined>): BillingProvider {
  const account = values.SEPAY_ACCOUNT_NUMBER;
  const bank = values.SEPAY_BANK_CODE || 'BIDV';
  const webhookSecret = values.SEPAY_WEBHOOK_SECRET;

  return {
    async createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
      if (!account) throw new Error('SEPAY_ACCOUNT_NUMBER is not configured.');
      const params = new URLSearchParams({
        acc: account,
        bank,
        amount: String(Math.round(input.amount)),
        des: input.reference,
      });
      return {
        provider: 'sepay',
        qrUrl: `https://vietqr.app/img?${params.toString()}`,
        externalReference: input.reference,
      };
    },
    async verifyWebhook(request: Request) {
      if (!webhookSecret) throw new Error('SEPAY_WEBHOOK_SECRET is not configured.');
      const supplied = request.headers.get('x-webhook-secret');
      if (!supplied || supplied !== webhookSecret) throw new Error('Invalid SePay webhook secret.');
      const payload = await request.json();
      const eventId = String(payload?.id || payload?.transaction_id || '');
      if (!eventId) throw new Error('SePay webhook is missing an event identifier.');
      return { eventId, eventType: String(payload?.type || 'payment.received'), payload };
    },
  };
}
