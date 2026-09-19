export type EntitlementValue = boolean | number | string | Record<string, unknown>;

export type WorkspaceEntitlements = Record<string, EntitlementValue>;

export function canUse(entitlements: WorkspaceEntitlements, code: string, quantity = 1) {
  const value = entitlements[code];
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value >= quantity;
  return Boolean(value);
}
