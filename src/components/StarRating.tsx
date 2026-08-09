"use client";

export default function StarRating({
  rating,
  count,
  size = "sm",
}: {
  rating: number;
  count?: number;
  size?: "xs" | "sm" | "md";
}) {
  const sizes = { xs: "text-xs", sm: "text-sm", md: "text-base" };
  return (
    <div className={`flex items-center gap-1 ${sizes[size]}`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-yellow-500 font-semibold">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-gray-500">({count})</span>
      )}
    </div>
  );
}
