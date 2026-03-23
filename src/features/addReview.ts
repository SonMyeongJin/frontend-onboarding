import { getReviews } from 'src/features/reviewController';

async function addReview() {
  const reviewSection = document.getElementById('review-list');
  if (!reviewSection) {
    return;
  }

  try {
    const reviews = await getReviews('1234', 10, 1);
    const reviewUl = document.createElement('ul');

    reviews.forEach((item) => {
      const reviewarticle = document.createElement('article');

      const reviewerDiv = document.createElement('div');
      reviewerDiv.classList.add('reviewer-info');

      const reviewerImg = document.createElement('img');
      reviewerImg.classList.add('reviewer-profile');
      reviewerImg.src = item.reviewerProfileUrl;
      reviewerImg.alt = `${item.reviewerName}'s profile picture`;
      reviewerDiv.appendChild(reviewerImg);

      const reviewerName = document.createElement('p');
      reviewerName.textContent = item.reviewerName;
      reviewerDiv.appendChild(reviewerName);

      const reviewDiv = document.createElement('div');

      const reviewRating = document.createElement('p');
      reviewRating.textContent = '★'.repeat(item.reviewRating);
      reviewRating.classList.add('review-rating');
      reviewDiv.appendChild(reviewRating);

      const reviewContent = document.createElement('p');
      reviewContent.textContent = item.reviewContent;
      reviewContent.classList.add('review-content');
      reviewDiv.appendChild(reviewContent);

      reviewarticle.appendChild(reviewerDiv);
      reviewarticle.appendChild(reviewDiv);

      const hr = document.createElement('hr');
      reviewarticle.appendChild(hr);

      reviewUl.appendChild(reviewarticle);
    });

    reviewSection.innerHTML = '';
    reviewSection.appendChild(reviewUl);
  } catch (error) {
    console.error(error);
    reviewSection.textContent = 'error -> check console';
  }
}

export default addReview;
