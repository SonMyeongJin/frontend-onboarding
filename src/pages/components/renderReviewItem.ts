import { getReviews } from 'src/features/getReviews';
import { postReviewLike } from 'src/features/postReviewLike';

const getReviewRequest = {
  pageNumber: 1,
  perPage: 15,
  productId: '1234',
};

async function renderReviewItem() {
  const reviewSection = document.getElementById('review-list');
  if (!reviewSection) {
    return;
  }

  const data = await getReviews(getReviewRequest);
  const reviewUl = document.createElement('ul');

  data.reviews.forEach((item) => {
    const reviewarticle = document.createElement('article');
    const reviewerDiv = document.createElement('div');
    reviewerDiv.classList.add('reviewer-info');
    const reviewerImg = document.createElement('img');
    reviewerImg.classList.add('reviewer-profile');
    reviewerImg.src = item.reviewerImagePath;
    reviewerImg.alt = `${item.reviewerName}'s profile picture`;
    reviewerDiv.appendChild(reviewerImg);

    const reviewerName = document.createElement('p');
    reviewerName.textContent = item.reviewerName;
    reviewerDiv.appendChild(reviewerName);

    const reviewDiv = document.createElement('div');
    const reviewRating = document.createElement('p');
    reviewRating.textContent = '★'.repeat(item.rating);
    reviewRating.classList.add('review-rating');
    reviewDiv.appendChild(reviewRating);

    const reviewContent = document.createElement('p');
    reviewContent.textContent = item.content;
    reviewContent.classList.add('review-content');
    reviewDiv.appendChild(reviewContent);

    reviewarticle.appendChild(reviewerDiv);
    reviewarticle.appendChild(reviewDiv);
    const hr = document.createElement('hr');
    reviewarticle.appendChild(hr);
    reviewUl.appendChild(reviewarticle);

    const countLike = document.createElement('p');
    countLike.textContent = `いいね数: ${item.likeCount}`;
    reviewDiv.appendChild(countLike);

    const likeButton = addLikeButton();
    reviewDiv.appendChild(likeButton);
    likeButton.onclick = () => {
      postReviewLike(item.reviewId, '2');
      console.log(`Liked review ${item.reviewId}`);
    };
  });
  reviewSection.innerHTML = '';
  reviewSection.appendChild(reviewUl);
}

function addLikeButton() {
  const reviewButton = document.createElement('button');
  reviewButton.textContent = 'いいね';
  reviewButton.classList.add('like-button');
  return reviewButton;
}

export default renderReviewItem;
