import { App, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { ApiError } from "@/services/api";
import { type CategoryFormValues, categorySchema } from "../schemas/category.schema";
import type { CategoryDto } from "../types/categories-api.types";

interface CategoryFormModalProps {
  open: boolean;
  category?: CategoryDto;
  isSaving: boolean;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
  onClose: () => void;
}

export const CategoryFormModal = ({
  open,
  category,
  isSaving,
  onSubmit,
  onClose,
}: CategoryFormModalProps) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<CategoryFormValues>();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(category ?? { name: "", description: "", imageUrl: "" });
    }
  }, [category, form, open]);

  const handleFinish = async (values: CategoryFormValues) => {
    const parsed = categorySchema.safeParse(values);
    if (!parsed.success) {
      message.error(parsed.error.issues[0]?.message ?? "Please correct the highlighted fields");
      return;
    }

    try {
      await onSubmit(parsed.data);
    } catch (error) {
      if (error instanceof ApiError && error.fieldErrors) {
        form.setFields(
          Object.entries(error.fieldErrors).map(([name, errors]) => ({
            name: name as keyof CategoryFormValues,
            errors,
          })),
        );
      }
      message.error(error instanceof ApiError ? error.message : "Something went wrong");
    }
  };

  return (
    <Modal
      title={category ? "Edit category" : "New category"}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={isSaving}
      destroyOnClose
    >
      <Form<CategoryFormValues> form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Enter a name" }]}>
          <Input placeholder="Cashews" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={2} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
