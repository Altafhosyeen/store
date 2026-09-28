import almonds from "./almonds.jpg";
import apricots from "./apricots.jpg";
import cashews from "./cashews.jpg";
import chilgoza from "./chilgoza.jpg";
import dates from "./dates.jpg";
import driedMango from "./dried-mango.jpg";
import figs from "./figs.jpg";
import giftbox from "./giftbox.jpg";
import hazelnut from "./hazelnut.jpg";
import heroDryFruits from "./hero-dry-fruits.jpg";
import makhana from "./makhana.jpg";
import mix from "./mix.jpg";
import pistachios from "./pistachios.jpg";
import raisins from "./raisins.jpg";
import seeds from "./seeds.jpg";
import walnuts from "./walnuts.jpg";

/** The storefront's photography, keyed by subject. Vite fingerprints each file at build time. */
export const STORE_IMAGES = {
  almonds,
  apricots,
  cashews,
  chilgoza,
  dates,
  driedMango,
  figs,
  giftbox,
  hazelnut,
  hero: heroDryFruits,
  makhana,
  mix,
  pistachios,
  raisins,
  seeds,
  walnuts,
} as const;

export type StoreImageKey = keyof typeof STORE_IMAGES;
