import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, InputNumber, Typography } from "antd";
import { CURRENCY } from "@/constants";
import type { CartLine } from "@/store";

const { Text } = Typography;

interface CartLineItemProps {
  line: CartLine;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export const CartLineItem = ({ line, onQuantityChange, onRemove }: CartLineItemProps) => (
  <Flex align="center" gap="middle" className="border-hairline-light border-b py-4">
    {line.imageUrl ? (
      <img src={line.imageUrl} alt={line.name} className="h-16 w-16 rounded object-cover" />
    ) : null}
    <div className="min-w-0 flex-1">
      <Text strong className="block">
        {line.name}
      </Text>
      {line.variantLabel ? (
        <Text type="secondary" className="text-sm">
          {line.variantLabel}
        </Text>
      ) : null}
    </div>
    <InputNumber
      min={1}
      value={line.quantity}
      onChange={(value) => value && onQuantityChange(value)}
      className="w-20"
    />
    <Text strong className="w-20 text-right">
      {CURRENCY.SYMBOL}
      {(line.unitPrice * line.quantity).toFixed(2)}
    </Text>
    <Button
      type="text"
      danger
      icon={<DeleteOutlined />}
      aria-label="Remove item"
      onClick={onRemove}
    />
  </Flex>
);
