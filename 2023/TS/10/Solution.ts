export type StreetSuffixTester<TAddress extends string, TTest extends string> = TAddress extends `${string} ${TTest}` ? true : false;
