import type { BillingProvider, CheckoutInput, CheckoutResult } from './types';

export function createPayPalProvider(values: Record<string, string | undefined>): BillingProvider {
  const clientId = values.PAYPAL_CLIENT_ID;
  const clientSecret = values.PAYPAL_CLIENT_SECRET;
  const environment = values.PAYPAL_ENVIRONMENT === 'live' ? 'live' : 'sandbox';

  return {
    async createCheckout(_input: CheckoutInput): Promise<CheckoutResult> {
      if (!clientId || !clientSecret) throw new Error('PayPal credentials are not configured.');
      throw new Error('PayPal checkout adapter requires a configured product/order flow.');
    },
    async verifyWebhook(_request: Request) {
      if (!clientId || !clientSecret) throw new Error('PayPal credentials are not configured.');
      throw new Error(`PayPal ${environment} webhook verification is not configured yet.`);
    },
  };
}
