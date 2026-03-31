import type { registerReviewRequest } from 'src/domain/dto/registerReviewRequest';
import type { registerReviewResponse } from 'src/domain/dto/registerReviewResponse';

async function registerReview(
  registerReviewRequest: registerReviewRequest,
): Promise<registerReviewResponse> {
  const url = new URL('http://localhost:5001/review/register');

  const response = await fetch(url, {
    body: JSON.stringify(registerReviewRequest),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).catch((error) => {
    //　cors error , network error
    throw new Error(`Failed to register review: ${error.message}`);
  });

  // fetch の結果は Response オブジェクトとして生成され、HTTP 通信が成功したかどうかは response.ok で確認できる。
  // HTTP 通信は成功したが、サーバーがエラーを返した場合の処理
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error(`Bad Request: ${response.statusText}`);
      case 401:
        throw new Error(`Unauthorized: ${response.statusText}`);
      case 403:
        throw new Error(`Forbidden: ${response.statusText}`);
      case 404:
        throw new Error(`Not Found: ${response.statusText}`);
      case 500:
        throw new Error(`Internal Server Error: ${response.statusText}`);
      default:
        throw new Error(`Failed to register review: ${response.statusText}`);
    }
  }

  const responseData: registerReviewResponse = await response.json();
  return responseData;
}

export { registerReview };

// Request
// curl -X 'POST' \
//   'http://localhost:5001/review/register' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "productId": "1",
//   "customerId": "2",
//   "rating": 3,
//   "content": "test review content"
// }'

// Response
// { "reviewId": "0ba729db-75ef-4261-93b2-c08d4f2ffe2f" }

// validation
// 1. rating 1-5
// rating=0 -> 선택해주세여
// rating>5 -> 유효한 점수가 아닙니다.
// 2. content not empty
// 3. contend length < 10
