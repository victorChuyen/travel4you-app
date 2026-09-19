export type BillingProviderName = 'paypal' | 'sepay';

export interface CheckoutInput {
  workspaceId: string;
  planCode: string;
  currency: string;
  amount: number;
  reference: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  provider: BillingProviderName;
  checkoutUrl?: string;
  qrUrl?: string;
  externalReference: string;
}

export interface BillingProvider {
  createCheckout(input: CheckoutInput): Promise<CheckoutResult>;
  verifyWebhook(request: Request): Promise<{ eventId: string; eventType: string; payload: unknown }>;
}
