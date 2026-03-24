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
    const rating: number = Number(ratingSelect.value); // valication.

    if (Number.isNaN(rating) || rating < 1 || rating > 5) {
      alert('Please select a valid rating between 1 and 5.');
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
