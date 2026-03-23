import { getReviews } from './reviewController';

document.addEventListener('DOMContentLoaded', onPageLoad);

function onPageLoad() {
  addReview();
}

async function addReview() {
  const reviewSection = document.getElementById('review-list');
  if (!reviewSection) {
    return;
  }

  try {
    const reviews = await getReviews('1234', 10, 1);
    const reviewUl = document.createElement('ul');

    reviews.forEach((item) => {
      const reviewLi = document.createElement('li');

      const reviewerName = document.createElement('p');
      reviewerName.textContent = item.reviewerName;

      const reviewRating = document.createElement('p');
      reviewRating.textContent = '★'.repeat(item.reviewRating);

      const reviewContent = document.createElement('p');
      reviewContent.textContent = item.reviewContent;

      reviewLi.appendChild(reviewerName);
      reviewLi.appendChild(reviewRating);
      reviewLi.appendChild(reviewContent);
      reviewUl.appendChild(reviewLi);
    });

    reviewSection.innerHTML = '';
    reviewSection.appendChild(reviewUl);
  } catch (error) {
    console.error(error);
    reviewSection.textContent = 'error -> check console';
  }
}
