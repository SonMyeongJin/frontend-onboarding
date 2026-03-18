import { setupBattle } from 'src/widgets/battle/setupBattle';
import { setupFooterSubmit } from '../../features/footer-submit/model/setupFooterSubmit';
import { setupGuessFavorite } from '../../features/guess-favorite/model/setupGuessFavorite';
import { setupGuessRandom } from '../../features/guess-random/model/setupGuessRandom';

function onLoadHandler() {
  setupFooterSubmit();
  setupGuessFavorite();
  setupGuessRandom();
  setupBattle();
}

export { onLoadHandler };
