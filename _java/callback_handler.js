// callback_handler.js
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
if (code) {
  console.log('Received code:', code);
  localStorage.setItem('authorization_code', code);
  alert('Callback received! Code: ' + code);
}
