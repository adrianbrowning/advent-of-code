export type RemoveNaughtyChildren<TObj> = Omit<TObj, `naughty_${string}`>;
