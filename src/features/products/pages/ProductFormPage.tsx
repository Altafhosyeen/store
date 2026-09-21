import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { App, Button, Card, Form, Input, InputNumber, Select, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader, QueryStateBoundary } from "@/components";
import { ROUTES } from "@/constants";
import { useCategoryCache } from "@/hooks";
import { ApiError } from "@/services/api";
import { UNIT_OPTIONS } from "../constants/products.constants";
import { useCreateProduct, useGetProduct, useUpdateProduct } from "../hooks/use-products";
import { type ProductFormValues, productSchema } from "../schemas/product.schema";

/** Serves both create and edit; the :productId param decides which. */
export const ProductFormPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const isEdit = Boolean(productId);

  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm<ProductFormValues>();

  const categories = useCategoryCache();

  const { data: product, isLoading, error, refetch } = useGetProduct(productId);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const isSaving = createProduct.isPending || updateProduct.isPending;

  const handleFinish = (values: ProductFormValues) => {
    // Zod owns the business rules (e.g. "compare-at price must be higher")
    // that antd per-field rules cannot express.
    const parsed = productSchema.safeParse(values);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      message.error(firstIssue?.message ?? "Please correct the highlighted fields");
      return;
    }

    const onSuccess = () => {
      message.success(isEdit ? "Product updated" : "Product created");
      navigate(ROUTES.ADMIN_PRODUCTS);
    };

    const onError = (mutationError: Error) => {
      if (mutationError instanceof ApiError && mutationError.fieldErrors) {
        form.setFields(
          Object.entries(mutationError.fieldErrors).map(([name, errors]) => ({
            name: name as keyof ProductFormValues,
            errors,
          })),
        );
      }
      message.error(mutationError.message);
    };

    if (isEdit && productId) {
      updateProduct.mutate({ productId, payload: parsed.data }, { onSuccess, onError });
      return;
    }

    createProduct.mutate(parsed.data, { onSuccess, onError });
  };

  return (
    <>
      <PageHeader title={isEdit ? "Edit product" : "New product"} />

      <QueryStateBoundary isLoading={isEdit && isLoading} error={error} onRetry={refetch}>
        <Card>
          <Form<ProductFormValues>
            form={form}
            layout="vertical"
            initialValues={
              product ?? {
                images: [],
                variants: [{ label: "", size: 500, unit: "g", price: 0, stockQuantity: 0 }],
              }
            }
            onFinish={handleFinish}
          >
            <Form.Item
              name="name"
              label="Product name"
              rules={[{ required: true, message: "Enter the product name" }]}
            >
              <Input placeholder="Roasted Cashews" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Enter a description" }]}
            >
              <Input.TextArea rows={3} placeholder="Premium roasted cashews, lightly salted." />
            </Form.Item>

            <div className="grid gap-x-4 md:grid-cols-2">
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[{ required: true, message: "Select a category" }]}
              >
                <Select
                  placeholder="Select category"
                  options={categories.map((item) => ({ value: item.id, label: item.name }))}
                />
              </Form.Item>

              <Form.Item name="brandId" label="Brand">
                <Select placeholder="Select brand (optional)" allowClear options={[]} />
              </Form.Item>
            </div>

            <Form.List name="variants">
              {(fields, { add, remove }) => (
                <Form.Item label="Variants">
                  {fields.map((field) => (
                    <Space key={field.key} align="baseline" className="mb-2 flex" wrap>
                      <Form.Item
                        name={[field.name, "label"]}
                        rules={[{ required: true, message: "Variant label is required" }]}
                        noStyle
                      >
                        <Input placeholder="500g pack" className="w-40" />
                      </Form.Item>
                      <Form.Item name={[field.name, "size"]} noStyle>
                        <InputNumber min={0} placeholder="Size" className="w-24" />
                      </Form.Item>
                      <Form.Item name={[field.name, "unit"]} noStyle>
                        <Select placeholder="Unit" options={UNIT_OPTIONS} className="w-28" />
                      </Form.Item>
                      <Form.Item name={[field.name, "price"]} noStyle>
                        <InputNumber min={0} placeholder="Price" className="w-28" />
                      </Form.Item>
                      <Form.Item name={[field.name, "stockQuantity"]} noStyle>
                        <InputNumber min={0} placeholder="Stock" className="w-24" />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      ) : null}
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() =>
                      add({ label: "", size: 0, unit: "g", price: 0, stockQuantity: 0 })
                    }
                  >
                    Add variant
                  </Button>
                </Form.Item>
              )}
            </Form.List>

            <Space>
              <Button type="primary" htmlType="submit" loading={isSaving}>
                {isEdit ? "Save changes" : "Create product"}
              </Button>
              <Button onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}>Cancel</Button>
            </Space>
          </Form>
        </Card>
      </QueryStateBoundary>
    </>
  );
};
