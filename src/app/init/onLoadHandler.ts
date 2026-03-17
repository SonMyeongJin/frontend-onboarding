import { setupBattle } from '../../organisms/battle/setupBattle';
import { setupFooterSubmit } from '../../organisms/footer-submit/setupFooterSubmit';
import { setupGuessFavorite } from '../../organisms/guess-favorite/setupGuessFavorite';
import { setupGuessRandom } from '../../organisms/guess-random/setupGuessRandom';

function onLoadHandler() {
  setupFooterSubmit();
  setupGuessFavorite();
  setupGuessRandom();
  setupBattle();
}

export { onLoadHandler };
