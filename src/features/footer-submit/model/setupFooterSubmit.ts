import { getPokemon } from '../../../entities/pokemon/api';

function setupFooterSubmit() {
  // as HTMLFormElement : 使わない方が安全　なぜなら、もしHTMLFormElementじゃなかったらエラーになるから
  // Id=form要素を持ってきてform変数に入れる。形はHTMLFormElement！
  const form = document.getElementById('form'); // as HTMLFormElement;
  const input = document.getElementById('inputid'); // as HTMLInputElement;
  // instead of using "as HTMLFormElemnet"
  // falsy : false ぽっい値
  if (!(form instanceof HTMLFormElement)) {
    console.error('Form element not found or not a form');
    return;
  }
  if (!(input instanceof HTMLInputElement)) {
    console.error('Input element not found or not an input');
    return;
  }
  // formにsubmitイベントが起きたら、非同期関数を実行する。
  form.addEventListener('submit', onSubmitHandler);
}

async function onSubmitHandler(e: SubmitEvent) {
  e.preventDefault();
  const input = document.getElementById('inputid') as HTMLInputElement;
  console.log(input.value);

  const pk = await getPokemon(input.value);
  console.log(pk.id, pk.name);
}

export { setupFooterSubmit };
