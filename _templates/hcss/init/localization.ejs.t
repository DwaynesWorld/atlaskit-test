---
to: src/localization/index.ts
---
import LocalizedStrings from "react-localization";
import { en } from "./english";

export type IStrings = typeof en;

export const strings = new LocalizedStrings({
  en
}) as IStrings;
