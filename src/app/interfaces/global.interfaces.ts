export interface GlobalInterface {
  locale?: TLocale;
  t?: TLocalization;
}

export type TLocale = "en" | "ar";
export type TLocalization = (arg0: string, arg1?: any) => any;
