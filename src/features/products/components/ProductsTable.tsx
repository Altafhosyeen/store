import { EditOutlined } from "@ant-design/icons";
import { Button, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { StatusTag } from "@/components/common/StatusTag";
import { buildRoute, PAGINATION, ROUTES } from "@/constants";
import type { TableParams } from "@/hooks/use-table-params";
import { productStatusStyles } from "@/theme";
import type { ProductDto } from "../types/products-api.types";

interface ProductsTableProps {
  products: ProductDto[];
  total: number;
  params: TableParams;
  isLoading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
}

export const ProductsTable = ({
  products,
  total,
  params,
  isLoading,
  onPageChange,
}: ProductsTableProps) => {
  const navigate = useNavigate();

  const columns: ColumnsType<ProductDto> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "categoryName", key: "categoryName" },
    {
      title: "Variants",
      key: "variants",
      render: (_, product) => product.variants.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <StatusTag status={status} styles={productStatusStyles} />,
    },
    {
      title: "",
      key: "actions",
      width: 56,
      render: (_, product) => (
        <Tooltip title="Edit product">
          <Button
            type="text"
            icon={<EditOutlined />}
            aria-label="Edit product"
            onClick={() =>
              navigate(buildRoute(ROUTES.ADMIN_PRODUCT_DETAIL, { productId: product.id }))
            }
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={products}
      loading={isLoading}
      pagination={{
        current: params.page,
        pageSize: params.pageSize ?? PAGINATION.DEFAULT_PAGE_SIZE,
        total,
        pageSizeOptions: [...PAGINATION.PAGE_SIZE_OPTIONS],
        showSizeChanger: true,
        onChange: onPageChange,
      }}
    />
  );
};
