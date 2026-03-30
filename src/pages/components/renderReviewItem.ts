import { getReviews } from 'src/features/getReviews';
import { postReviewLike } from 'src/features/postReviewLike';

const getReviewRequest = {
  pageNumber: 1,
  perPage: 10,
  productId: '1234',
};

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: test
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
    countLike.classList.add('like-count-text');
    countLike.textContent = 'いいね数:';
    reviewDiv.appendChild(countLike);

    const countLikeValue = document.createElement('span');
    countLikeValue.classList.add('like-count');
    const likeCount = item.likeCount;
    countLikeValue.textContent = likeCount.toString();
    countLike.appendChild(countLikeValue);

    const likeButton = addLikeButton();
    reviewDiv.appendChild(likeButton);
    likeButton.onclick = async () => {
      const successLike = await postReviewLike(item.reviewId, '2');
      if (successLike) {
        console.log(`Liked review ${item.reviewId}`);

        likeButton.classList.add('btn', 'btn-warning', 'btn-sm', 'mt-2');

        // 에니메이션 실행 (0.5초)
        countLikeValue.classList.add('like-animation');
        // 0.25 초 뒤에 좋아요수 증가
        setTimeout(() => {
          countLikeValue.textContent = (likeCount + 1).toString();
        }, 250);
        // 남은 0.25초 뒤에 에니메이션 제거
      }
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
