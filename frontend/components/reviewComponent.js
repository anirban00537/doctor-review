import React from "react";

const reviews = [
  { stars: 5, comment: "Excellent product, highly recommended!" },
  { stars: 4, comment: "Good quality, but could be better." },
  { stars: 3, comment: "Average product, nothing special." },
  { stars: 2, comment: "Not very satisfied with the purchase." },
  { stars: 1, comment: "Terrible product, waste of money." },
];

const ReviewList = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="text-yellow-500">
              {Array.from({ length: review.stars }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ))}
            </div>
            <p className="ml-2 text-gray-700">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
