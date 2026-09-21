import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { App, Button, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { EmptyState, PageHeader, PermissionGate, QueryStateBoundary } from "@/components";
import { PERMISSIONS } from "@/constants";
import { useTableParams } from "@/hooks";
import { CategoryFormModal } from "../components/CategoryFormModal";
import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategoriesAdmin,
  useUpdateCategory,
} from "../hooks/use-categories-admin";
import type { CategoryFormValues } from "../schemas/category.schema";
import type { CategoryDto } from "../types/categories-api.types";

export const CategoriesAdminPage = () => {
  const { message } = App.useApp();
  const { params, setParams } = useTableParams();
  const [editing, setEditing] = useState<CategoryDto | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, error, refetch } = useGetCategoriesAdmin(params);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const categories = data?.items ?? [];

  const handleSubmit = async (values: CategoryFormValues) => {
    if (editing) {
      await updateCategory.mutateAsync({ categoryId: editing.id, payload: values });
      message.success("Category updated");
    } else {
      await createCategory.mutateAsync(values);
      message.success("Category created");
    }
    setModalOpen(false);
    setEditing(undefined);
  };

  const columns: ColumnsType<CategoryDto> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Products", dataIndex: "productCount", key: "productCount" },
    {
      title: "",
      key: "actions",
      width: 96,
      render: (_, category) => (
        <>
          <Button
            type="text"
            icon={<EditOutlined />}
            aria-label="Edit category"
            onClick={() => {
              setEditing(category);
              setModalOpen(true);
            }}
          />
          <Popconfirm
            title="Delete this category?"
            onConfirm={() => deleteCategory.mutate(category.id)}
          >
            <Button type="text" danger icon={<DeleteOutlined />} aria-label="Delete category" />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Categories"
        actions={
          <PermissionGate permissions={[PERMISSIONS.CATEGORIES_MANAGE]}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditing(undefined);
                setModalOpen(true);
              }}
            >
              New category
            </Button>
          </PermissionGate>
        }
      />

      <QueryStateBoundary
        isLoading={isLoading}
        error={error}
        isEmpty={categories.length === 0}
        emptyState={<EmptyState title="No categories yet" />}
        onRetry={refetch}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={categories}
          pagination={{
            current: params.page,
            total: data?.total ?? 0,
            onChange: (page, pageSize) => setParams({ ...params, page, pageSize }),
          }}
        />
      </QueryStateBoundary>

      <CategoryFormModal
        open={modalOpen}
        category={editing}
        isSaving={createCategory.isPending || updateCategory.isPending}
        onSubmit={handleSubmit}
        onClose={() => {
          setModalOpen(false);
          setEditing(undefined);
        }}
      />
    </>
  );
};
