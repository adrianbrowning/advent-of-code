export type Address = { address: string; city: string };
export type PresentDeliveryList<T extends Record<string, unknown >> = T extends Record<infer Names, unknown > ? Record<Names, Address> : never;
