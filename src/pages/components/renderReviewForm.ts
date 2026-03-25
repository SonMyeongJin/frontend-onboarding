import type { registerReviewRequest } from 'src/domain/dto/registerReviewRequest';
import { registerReview } from 'src/features/registerReview';

function renderReviewForm() {
  const reviewForm = document.getElementById('review-form');
  if (!reviewForm) {
    return;
  }

  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const scoreInput = target.querySelector('#score') as HTMLSelectElement;
    console.log(scoreInput.value);

    const ratingSelect = document.getElementById('score') as HTMLSelectElement;
    const rating: number = Number(ratingSelect.value);
    // validation
    const errorSelect = document.getElementById(
      'score-error',
    ) as HTMLParagraphElement;
    if (ratingSelect.value === '0') {
      //alert('Please select a rating.');
      errorSelect.textContent = 'おい、評価は入れない？';
      return;
    }
    if (Number.isNaN(rating) || rating < 1 || rating > 5) {
      alert('おい、ちょっと問題がありそう。評価は1から5の間で選んでよ。');
      console.error('Invalid rating value:', rating);
      return;
    }

    const commentTextarea = document.getElementById(
      'comment-textarea',
    ) as HTMLTextAreaElement;
    const content: string = commentTextarea.value;
    console.log(content, rating);
    const request: registerReviewRequest = {
      content,
      customerId: '2',
      productId: '1',
      rating,
    };
    //validation
    const errorContent = document.getElementById(
      'comment-error',
    ) as HTMLParagraphElement;
    if (content === '') {
      errorContent.textContent = 'おい、コメント入れてよ';
      return;
    }

    // server にリクエストを送る
    registerReview(request)
      .then((response) => {
        console.log('Review registered successfully:', response);
      })
      .catch((error) => {
        console.error('Error registering review:', error);
        alert('Failed to register review. Please try again later.');
      });
  });
}

export default renderReviewForm;
