import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmptyState, PageHeader, PermissionGate, QueryStateBoundary } from "@/components";
import { PERMISSIONS, ROUTES } from "@/constants";
import { useCategoryCache, useDebouncedValue, useTableParams } from "@/hooks";
import { ProductsTable } from "../components/ProductsTable";
import { useGetProducts } from "../hooks/use-products";
import type { ProductStatus } from "../types/products-api.types";

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

/** Thin page: it orchestrates hooks and components, holding no business logic. */
export const ProductsListPage = () => {
  const navigate = useNavigate();
  const { params, setParams } = useTableParams();

  const [searchInput, setSearchInput] = useState(params.search ?? "");
  const debouncedSearch = useDebouncedValue(searchInput);

  // Reads the session-wide cache; the first screen needing categories pays for
  // the single fetch.
  const categories = useCategoryCache();

  const { data, isLoading, error, refetch } = useGetProducts({
    ...params,
    search: debouncedSearch || undefined,
  });

  const products = data?.items ?? [];

  return (
    <>
      <PageHeader
        title="Products"
        description="Manage the catalog customers see in the storefront."
        actions={
          <PermissionGate permissions={[PERMISSIONS.PRODUCTS_CREATE]}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate(ROUTES.ADMIN_PRODUCT_NEW)}
            >
              New product
            </Button>
          </PermissionGate>
        }
      >
        <Space wrap>
          <Input.Search
            allowClear
            placeholder="Search products"
            className="w-64"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Select
            allowClear
            placeholder="Category"
            className="w-48"
            options={categories.map((category) => ({ value: category.id, label: category.name }))}
            onChange={(categoryId?: string) => setParams({ ...params, page: 1, categoryId })}
          />
          <Select
            allowClear
            placeholder="Status"
            className="w-40"
            options={STATUS_OPTIONS}
            onChange={(status?: ProductStatus) => setParams({ ...params, page: 1, status })}
          />
        </Space>
      </PageHeader>

      <QueryStateBoundary
        isLoading={isLoading}
        error={error}
        isEmpty={products.length === 0}
        emptyState={
          <EmptyState
            title="No products found"
            description="There are no products matching your current filters."
            action={
              <PermissionGate permissions={[PERMISSIONS.PRODUCTS_CREATE]}>
                <Button type="primary" onClick={() => navigate(ROUTES.ADMIN_PRODUCT_NEW)}>
                  Create product
                </Button>
              </PermissionGate>
            }
          />
        }
        onRetry={refetch}
      >
        <ProductsTable
          products={products}
          total={data?.total ?? 0}
          params={params}
          isLoading={isLoading}
          onPageChange={(page, pageSize) => setParams({ ...params, page, pageSize })}
        />
      </QueryStateBoundary>
    </>
  );
};
