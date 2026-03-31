// from server response
type ReviewItem = {
  reviewId: string;
  customerId: string;
  rating: number;
  content: string;
  reviewImages: string[];
  reviewTnImages: string[];
  likeCount: number;
  reviewerName: string;
  reviewerImagePath: string;
  reviewerPostCount: number;
  officialReviewer: boolean;
  registerDate: string;
  shopComment: {
    shopCommentBody: string;
    commentVisibility: string;
    defectFormGuide: string;
  };
};

type getReviewResponse = {
  productId: string;
  reviews: ReviewItem[];
  ratingAverage: number;
  reviewCount: number;
};

export type { getReviewResponse, ReviewItem };
