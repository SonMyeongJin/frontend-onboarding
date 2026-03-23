import type { review } from '../domain/reivew';

type ReviewApiItem = {
  reviewerName: string;
  reviewerImagePath: string;
  rating: number;
  content: string;
};

type ReviewApiResponse = {
  reviews: ReviewApiItem[];
};

async function getReviews(
  productId: string,
  perPage: number,
  pageNumber: number,
): Promise<review[]> {
  const url = new URL(
    `http://localhost:5001/review/search/product/${productId}/reviews`,
  );
  url.searchParams.set('perPage', String(perPage));
  url.searchParams.set('pageNumber', String(pageNumber));

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch reviews: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as ReviewApiResponse;

  return data.reviews.map(
    (item): review => ({
      reviewContent: item.content,
      reviewerName: item.reviewerName,
      reviewerProfileUrl: item.reviewerImagePath,
      reviewRating: item.rating,
    }),
  );
}

export { getReviews };

//    curl -X 'GET' \
//   `http://localhost:5001/review/search/product/${productId}/reviews?perPage=${perPage}&pageNumber=${pageNumber}` \
//    -H 'accept: */*'

// {
//   "productId": "1234",
//   "reviews": [
//     {
//       "reviewId": "dd08d64b-9f8d-4d1c-a91d-92642769ba70",
//       "customerId": "9876",
//       "rating": 2,
//       "content": "i'm a superman",
//       "reviewImages": [],
//       "reviewTnImages": [],
//       "likeCount": 0,
//       "reviewerName": "モアコンユーザーの声",
//       "reviewerImagePath": "https://d28qg0el9tv5wv.cloudfront.net/data/img/review/review14.jpg",
//       "reviewerPostCount": 1,
//       "officialReviewer": false,
//       "registerDate": "2026-03-23T15:14:48",
//       "shopComment": {
//         "shopCommentBody": "",
//         "commentVisibility": "非表示",
//         "defectFormGuide": "非表示"
//       }
//     },
//     {
//       "reviewId": "a372271a-cdab-4bf5-88aa-70a0b1b2a307",
//       "customerId": "2222",
//       "rating": 3,
//       "content": "this is soso review ",
//       "reviewImages": [],
//       "reviewTnImages": [],
//       "likeCount": 0,
//       "reviewerName": "モアコンユーザーの声",
//       "reviewerImagePath": "https://d28qg0el9tv5wv.cloudfront.net/data/img/review/review12.jpg",
//       "reviewerPostCount": 1,
//       "officialReviewer": false,
//       "registerDate": "2026-03-23T15:14:23",
//       "shopComment": {
//         "shopCommentBody": "",
//         "commentVisibility": "非表示",
//         "defectFormGuide": "非表示"
//       }
//     },
//     {
//       "reviewId": "023a49e1-269c-4767-aeeb-c9046776b65e",
//       "customerId": "1",
//       "rating": 5,
//       "content": "this is 5 score review",
//       "reviewImages": [],
//       "reviewTnImages": [],
//       "likeCount": 0,
//       "reviewerName": "モアコンユーザーの声",
//       "reviewerImagePath": "https://d28qg0el9tv5wv.cloudfront.net/data/img/review/review01.jpg",
//       "reviewerPostCount": 1,
//       "officialReviewer": false,
//       "registerDate": "2026-03-23T15:13:37",
//       "shopComment": {
//         "shopCommentBody": "",
//         "commentVisibility": "非表示",
//         "defectFormGuide": "非表示"
//       }
//     },
//     {
//       "reviewId": "60c10fd7-1849-4ea8-a9cc-5a089e96bdec",
//       "customerId": "1111",
//       "rating": 1,
//       "content": "what the hell !",
//       "reviewImages": [],
//       "reviewTnImages": [],
//       "likeCount": 0,
//       "reviewerName": "モアコンユーザーの声",
//       "reviewerImagePath": "https://d28qg0el9tv5wv.cloudfront.net/data/img/review/review08.jpg",
//       "reviewerPostCount": 1,
//       "officialReviewer": false,
//       "registerDate": "2026-03-23T14:28:26",
//       "shopComment": {
//         "shopCommentBody": "",
//         "commentVisibility": "非表示",
//         "defectFormGuide": "非表示"
//       }
//     },
//     {
//       "reviewId": "13ccce54-2269-44be-822e-113fb028a4b0",
//       "customerId": "2",
//       "rating": 4,
//       "content": "test reivew contents test reivew contents",
//       "reviewImages": [],
//       "reviewTnImages": [],
//       "likeCount": 0,
//       "reviewerName": "モアコンユーザーの声",
//       "reviewerImagePath": "https://d28qg0el9tv5wv.cloudfront.net/data/img/review/review02.jpg",
//       "reviewerPostCount": 1,
//       "officialReviewer": false,
//       "registerDate": "2026-03-23T14:27:40",
//       "shopComment": {
//         "shopCommentBody": "",
//         "commentVisibility": "非表示",
//         "defectFormGuide": "非表示"
//       }
//     }
//   ],
//   "ratingAverage": 3,
//   "reviewCount": 5
// }
