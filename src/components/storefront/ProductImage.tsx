import { GiftOutlined } from "@ant-design/icons";
import { brandColors } from "@/theme";

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
}

/** Product/category image with a branded placeholder — never a blank gap when there's no image. */
export const ProductImage = ({ src, alt, className = "" }: ProductImageProps) => {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ background: brandColors.sand, color: brandColors.goldDark }}
      >
        <GiftOutlined style={{ fontSize: 32 }} />
      </div>
    );
  }

  return <img src={src} alt={alt} className={`object-cover ${className}`} />;
};
