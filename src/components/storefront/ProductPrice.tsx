import { Flex, Typography } from "antd";
import { CURRENCY } from "@/constants";
import { colors } from "@/theme";

const { Text } = Typography;

interface ProductPriceProps {
  price: number;
  compareAtPrice?: number;
}

const format = (value: number): string => `${CURRENCY.SYMBOL}${value.toFixed(2)}`;

/** Shows the current price, and a struck-through original price when discounted. */
export const ProductPrice = ({ price, compareAtPrice }: ProductPriceProps) => {
  const isDiscounted = compareAtPrice !== undefined && compareAtPrice > price;

  return (
    <Flex align="baseline" gap={8}>
      <Text strong style={{ fontSize: 18, color: isDiscounted ? colors.error : undefined }}>
        {format(price)}
      </Text>
      {isDiscounted ? (
        <Text delete type="secondary" style={{ fontSize: 13 }}>
          {format(compareAtPrice)}
        </Text>
      ) : null}
    </Flex>
  );
};
