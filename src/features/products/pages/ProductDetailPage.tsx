import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader, QueryStateBoundary, StatusTag } from "@/components";
import { buildRoute, ROUTES } from "@/constants";
import { productStatusStyles } from "@/theme";
import { useGetProduct } from "../hooks/use-products";

/** Admin read-only view; editing happens on ProductFormPage. */
export const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const { data: product, isLoading, error, refetch } = useGetProduct(productId);

  return (
    <>
      <PageHeader
        title={product?.name ?? "Product"}
        actions={
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              productId && navigate(buildRoute(ROUTES.ADMIN_PRODUCT_DETAIL, { productId }))
            }
          >
            Edit
          </Button>
        }
      />

      <QueryStateBoundary isLoading={isLoading} error={error} onRetry={refetch}>
        {product ? (
          <Card>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="Category">{product.categoryName}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <StatusTag status={product.status} styles={productStatusStyles} />
              </Descriptions.Item>
              <Descriptions.Item label="Variants" span={2}>
                {product.variants.map((v) => `${v.label} — $${v.price.toFixed(2)}`).join(", ")}
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>
                {product.description}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ) : null}
      </QueryStateBoundary>
    </>
  );
};
