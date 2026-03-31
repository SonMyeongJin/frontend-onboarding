import type { ReviewItem } from 'src/domain/dto/getReviewResponse';
import { getReviews } from 'src/features/getReviews';
import { postReviewLike } from 'src/features/postReviewLike';

const getReviewRequest = {
  pageNumber: 1,
  perPage: 10,
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
    reviewUl.appendChild(createReviewArticle(item));
  });
  reviewSection.innerHTML = '';
  reviewSection.appendChild(reviewUl);
}

function createReviewArticle(item: ReviewItem) {
  const reviewArticle = document.createElement('article');
  const reviewerDiv = createReviewerDiv();
  const reviewDiv = createReviewDiv();

  reviewerDiv.appendChild(
    createReviewerImg(item.reviewerImagePath, item.reviewerName),
  );
  reviewerDiv.appendChild(createReviewerName(item.reviewerName));

  reviewDiv.appendChild(createReviewRating(item.rating));
  reviewDiv.appendChild(createReviewContent(item.content));

  const countLikeValue = createLikeCountValue(item.likeCount);
  reviewDiv.appendChild(createLikeCount(countLikeValue));

  const likeButton = addLikeButton();
  bindLikeButton(likeButton, countLikeValue, item);
  reviewDiv.appendChild(likeButton);

  reviewArticle.appendChild(reviewerDiv);
  reviewArticle.appendChild(reviewDiv);

  const hr = document.createElement('hr');
  reviewArticle.appendChild(hr);

  return reviewArticle;
}

function createReviewerDiv() {
  const reviewerDiv = document.createElement('div');
  reviewerDiv.classList.add('reviewer-info');
  return reviewerDiv;
}

function createReviewDiv() {
  const reviewDiv = document.createElement('div');
  return reviewDiv;
}

function createReviewerImg(imagePath: string, reviewerName: string) {
  const reviewerImg = document.createElement('img');
  reviewerImg.classList.add('reviewer-profile');
  reviewerImg.src = imagePath;
  reviewerImg.alt = `${reviewerName}'s profile picture`;
  return reviewerImg;
}

function createReviewerName(reviewerName: string) {
  const reviewerNameElement = document.createElement('p');
  reviewerNameElement.textContent = reviewerName;
  return reviewerNameElement;
}

function createReviewRating(rating: number) {
  const reviewRating = document.createElement('p');
  reviewRating.textContent = '★'.repeat(rating);
  reviewRating.classList.add('review-rating');
  return reviewRating;
}

function createReviewContent(content: string) {
  const reviewContent = document.createElement('p');
  reviewContent.textContent = content;
  reviewContent.classList.add('review-content');
  return reviewContent;
}

function createLikeCount(countLikeValue: HTMLSpanElement) {
  const countLike = document.createElement('p');
  countLike.classList.add('like-count-text');
  countLike.textContent = 'いいね数:';

  countLike.appendChild(countLikeValue);
  return countLike;
}

function createLikeCountValue(likeCount: number) {
  const countLikeValue = document.createElement('span');
  countLikeValue.classList.add('like-count');
  countLikeValue.textContent = likeCount.toString();
  return countLikeValue;
}
function changeLiked(likeButton: HTMLButtonElement) {
  likeButton.classList.add('liked');
}
function changeUnliked(likeButton: HTMLButtonElement) {
  likeButton.classList.remove('liked');
}
function startLoading(likeButton: HTMLButtonElement) {
  likeButton.classList.add('loading');
}
function completeLoading(likeButton: HTMLButtonElement) {
  likeButton.classList.remove('loading');
}

function bindLikeButton(
  likeButton: HTMLButtonElement,
  countLikeValue: HTMLSpanElement,
  item: ReviewItem,
) {
  let currentLikeCount = item.likeCount;

  likeButton.onclick = async () => {
    startLoading(likeButton);
    const successLike = await postReviewLike(item.reviewId, '2').finally(() => {
      completeLoading(likeButton);
    });

    if (successLike) {
      changeLiked(likeButton);
    } else {
      changeUnliked(likeButton);
    }

    currentLikeCount += 1;

    // boot strap
    likeButton.classList.add('btn', 'btn-warning', 'btn-sm', 'mt-2');

    countLikeValue.getBoundingClientRect();
    countLikeValue.classList.add('like-animation');
    setTimeout(() => {
      countLikeValue.textContent = currentLikeCount.toString();
    }, 250);
    setTimeout(() => {
      likeButton.classList.remove(
        'like-animation,btn',
        'btn-warning',
        'btn-sm',
        'mt-2',
      );
    }, 1000);
  };
}

function addLikeButton() {
  const reviewButton = document.createElement('button');
  reviewButton.textContent = 'いいね';
  reviewButton.classList.add('like-button');
  return reviewButton;
}

export default renderReviewItem;
