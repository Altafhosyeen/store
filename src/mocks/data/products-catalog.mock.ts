import { CATALOG_PART_1 } from "./products-catalog-part-1.mock";
import { CATALOG_PART_2 } from "./products-catalog-part-2.mock";
import { CATALOG_PART_3 } from "./products-catalog-part-3.mock";
import { CATALOG_PART_4 } from "./products-catalog-part-4.mock";

export type { CatalogEntry } from "./products-catalog.types";

/** The full 67-product reference catalogue behind MOCK_PRODUCTS, in storefront order. */
export const CATALOG = [...CATALOG_PART_1, ...CATALOG_PART_2, ...CATALOG_PART_3, ...CATALOG_PART_4];
