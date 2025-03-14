const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
if (code) {
  console.log('Received code:', code);
  localStorage.setItem('authorization_code', code);

  // 发送授权码到后端服务器
  fetch('https://your-server.com/callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Server response:', data);
    if (data.access_token) {
      // 使用访问令牌调用腾讯文档API
      fetch('https://api.tencent.com/v1/documents/12345', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${data.access_token}` }
      })
      .then(response => response.json())
      .then(docData => console.log('Document data:', docData))
      .catch(error => console.error('Error:', error));
    }
  })
  .catch(error => console.error('Error:', error));
}
