export type AppendGood<TObj extends Record<string, any>> = {
    [k in keyof TObj as k extends string ? `good_${k}` : never]:TObj[k];
};
