interface StarRatingProps {
  rating: number;
  className?: string;
}

/** Five Font Awesome stars with half-star support, in the storefront's star gold. */
export const StarRating = ({ rating, className = "" }: StarRatingProps) => (
  <span className={`star-g ${className}`} role="img" aria-label={`Rated ${rating} out of 5`}>
    {[1, 2, 3, 4, 5].map((step) => {
      const icon =
        rating >= step
          ? "fa-solid fa-star"
          : rating >= step - 0.5
            ? "fa-solid fa-star-half-stroke"
            : "fa-regular fa-star";
      return <i key={step} className={icon} />;
    })}
  </span>
);
