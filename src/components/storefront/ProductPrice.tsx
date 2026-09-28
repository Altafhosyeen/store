import { Flex, Typography } from "antd";
import { formatCurrency } from "@/lib/currency";
import { colors } from "@/theme";

const { Text } = Typography;

interface ProductPriceProps {
  price: number;
  compareAtPrice?: number;
}

/** Shows the current price, and a struck-through original price when discounted. */
export const ProductPrice = ({ price, compareAtPrice }: ProductPriceProps) => {
  const isDiscounted = compareAtPrice !== undefined && compareAtPrice > price;

  return (
    <Flex align="baseline" gap={8}>
      <Text strong style={{ fontSize: 18, color: isDiscounted ? colors.error : undefined }}>
        {formatCurrency(price)}
      </Text>
      {isDiscounted ? (
        <Text delete type="secondary" style={{ fontSize: 13 }}>
          {formatCurrency(compareAtPrice)}
        </Text>
      ) : null}
    </Flex>
  );
};
