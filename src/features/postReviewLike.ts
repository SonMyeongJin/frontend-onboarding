function postReviewLike(reviewId: string, custermerId: string) {
  const url = `http://localhost:5001/review/${reviewId}/like`;

  return fetch(url, {
    body: JSON.stringify({ like: true }),
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      'login-customer-id': custermerId,
    },
    method: 'POST',
  })
    .catch(() => {
      console.error(
        `Failed to like review ${reviewId} by customer ${custermerId}`,
      );
      return false;
    })
    .then(() => {
      console.log(`Liked review ${reviewId} by customer ${custermerId}`);
      return true;
    });
}

export { postReviewLike };
// curl -X 'POST' \
//   'http://localhost:5001/review/{reviewId}/like' \
//   -H 'accept: */*' \
//   -H 'login-customer-id: 3' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "like": true
// }'
