import type { registerReviewRequest } from 'src/domain/dto/registerReviewRequest';
import { postReviewPhoto } from 'src/features/postReviewPhoto';
import { registerReview } from 'src/features/registerReview';

async function renderReviewForm() {
  const reviewForm = document.getElementById('review-form');
  if (!reviewForm) {
    return;
  }
  const content = comment();
  if (!content) {
    return;
  }
  const rating = score();
  if (!rating) {
    return;
  }
  const formData = await photo();
  if (!formData) {
    return;
  }
  // DTO を作成
  const request: registerReviewRequest = {
    content,
    customerId: '2',
    productId: '1',
    rating,
  };

  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // server にリクエストを送る
    registerReview(request)
      .then((response) => {
        console.log('Review registered successfully:', response);
        // Server に写真を送る
        postReviewPhoto(formData, response.reviewId);
      })
      .catch((error) => {
        console.error('Error registering review:', error);
        alert('Failed to register review. Please try again later.');
      });
  });
}

function score() {
  const ratingSelect = document.getElementById('score') as HTMLSelectElement;
  const rating: number = Number(ratingSelect.value);
  // validation
  const errorSelect = document.getElementById(
    'score-error',
  ) as HTMLParagraphElement;
  if (ratingSelect.value === '0') {
    //alert('Please select a rating.');
    errorSelect.textContent = '評価を入れてください';
    return;
  }
  if (Number.isNaN(rating) || rating < 1 || rating > 5) {
    // biome-ignore lint/suspicious/noAlert: test
    alert('おい、ちょっと問題がありそう。評価は1から5の間で選んでよ。');
    console.error('Invalid rating value:', rating);
    return;
  }
  return rating;
}

function comment() {
  const commentTextarea = document.getElementById(
    'comment-textarea',
  ) as HTMLTextAreaElement;
  const content: string = commentTextarea.value;

  //validation
  const errorContent = document.getElementById(
    'comment-error',
  ) as HTMLParagraphElement;

  if (content === '') {
    errorContent.textContent = 'コメントも入れてください';
    return;
  }

  return content;
}

async function photo() {
  const imageInput = document.getElementById('photo') as HTMLInputElement;
  // input type에 files함수 호출하면 list 를 반환한다.
  const files = imageInput.files;
  // validation
  if (!files || files.length === 0) {
    alert('おい、写真も入れない？');
    return;
  }

  // FileReader 함수를 사용해서 파일을 읽고 Base64로 변환
  // Promise 생성자에 콜백(executor)을 전달. resolve가 호출되면 Promise가 완료된다.
  const imageData = await new Promise<string | ArrayBuffer | null>(
    (resolve, reject) => {
      // 파일을 읽기 위한 FileReader 인스턴스 생성
      const reader = new FileReader();
      // files[0] (첫 번째 파일)을 Base64 형식의 Data URL로 읽기 시작 (비동기)
      reader.readAsDataURL(files[0]);
      // 파일 읽기가 완료되면 onload 콜백이 실행된다
      reader.onload = () => {
        // reader.result에 Base64 Data URL이 담겨있고, 이걸 resolve로 넘겨서 Promise를 완료시킨다
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
    },
  );
  console.log('Base64 Image Data Object:', imageData);

  // Base64로 변환된 이미지 데이터를 img 요소에 설정하여 페이지에 표시
  const img = document.createElement('img');
  img.src = imageData?.toString() || '';
  // CSS 때문에 class="loaded-image" 추가
  img.classList.add('loaded-image');
  document.getElementById('test-photo')?.appendChild(img);

  // FormData 객체를 생성하여 이미지 데이터를 서버로 전송할 준비
  const formData = new FormData();
  // string($binary) 스펙은 multipart 파트에 파일 바이너리를 담아 전송하면 된다.
  formData.append('image', files[0], files[0].name);

  console.log('FormData with image:', formData);
  // 이제 서버로 송신하자
  return formData;
}

export default renderReviewForm;
