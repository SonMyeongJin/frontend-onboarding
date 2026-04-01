import renderReviewForm from 'src/pages/components/renderReviewForm';
import renderReviewItem from 'src/pages/components/renderReviewItem';

// DomLoad에서 호출되는 함수
function onPageLoad() {
  renderReviewItem();
  renderReviewForm();
}

export { onPageLoad };
