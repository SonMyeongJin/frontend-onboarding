import renderReviewForm from 'src/pages/components/renderReviewForm';
import renderReviewItem from 'src/pages/components/renderReviewItem';

function onPageLoad() {
  renderReviewItem();
  renderReviewForm();
}

export { onPageLoad };
