function postReviewPhoto(formData: FormData, reviewId: string) {
  const url = new URL(`http://localhost:5001/review/${reviewId}/image/1`);

  fetch(url, {
    body: formData,
    method: 'POST',
  }).catch((error) => {
    //　cors error , network error
    throw new Error(`Failed to post review photo: ${error.message}`);
  });
}

export { postReviewPhoto };

// 이미지 업로드 테스트를 위한 curl 명령어 예시
//    curl -X 'POST' \
//   'http://localhost:5001/review/1/image/1' \
//   -H 'accept: */*' \
//   -H 'Content-Type: multipart/form-data' \
//   -F 'image=@2026年1月キッチンカー.png;type=image/png'
