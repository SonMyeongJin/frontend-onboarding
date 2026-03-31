// DomLoaderによって呼ばれるとき（一回だけ）呼ばれる。
function setupFooterSubmit() {
  // as HTMLFormElement : 使わない方が安全　なぜなら、もしHTMLFormElementじゃなかったらエラーになるから
  // Id=form要素を持ってきてform変数に入れる。形はHTMLFormElement！
  const form = document.getElementById('form'); // as HTMLFormElement;
  // instead of using "as HTMLFormElemnet"
  // falsy : false ぽっい値
  if (!(form instanceof HTMLFormElement)) {
    console.error('Form element not found or not a form');
    return;
  }
  // formにsubmitイベントが起きたら、非同期関数を実行する。
  form.addEventListener('submit', onSubmitHandler);
}

function onSubmitHandler(_e: SubmitEvent) {
  const input = document.getElementById('inputid');
  if (!(input instanceof HTMLInputElement)) {
    console.error('Input element not found or not an input');
    return;
  }

  console.log(input.value);

  const message =
    'Thnakyou for 応援！！このメッセージはテレパシーで伝えられました！(実際に渡されたかどうかは誰も知らない)';
  const messageElement = document.getElementById('footer-submit-message');
  if (messageElement) {
    messageElement.textContent = message;
  } else {
    console.info(message);
  }
}

export { setupFooterSubmit };
