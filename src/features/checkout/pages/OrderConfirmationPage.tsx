import { CheckCircleFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/constants";
import { brandColors, brandFontFamily } from "@/theme";

export const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-[70vh] items-center justify-center py-16"
      style={{ background: brandColors.cream }}
    >
      <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
        <CheckCircleFilled style={{ fontSize: 56, color: brandColors.leaf }} />
        <h1
          className="mt-6 text-2xl font-bold sm:text-3xl"
          style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
        >
          Order Placed
        </h1>
        <p className="mt-3" style={{ color: brandColors.cocoa }}>
          Order #{orderId} has been received. We&apos;ll be in touch to confirm delivery details.
        </p>
        <button
          type="button"
          onClick={() => navigate(ROUTES.SHOP)}
          className="mt-8 rounded-full px-8 py-3 font-semibold text-white"
          style={{ background: brandColors.walnutDark }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
