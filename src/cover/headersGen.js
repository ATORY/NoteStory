export default function headersGen(cfg = { token: '' }) {
  const authorization = localStorage.getItem('token')
    ? `Bearer ${
        // process.env.NODE_ENV === 'development' || process.browser
        cfg.token || localStorage.getItem('token')
        // : req.cookies.token
      }`
    : '';
  const headers = {
    'Content-Type': 'application/json',
    'x-client-name': `${process.env.REACT_APP_NAME}@electron}`,
    'x-client-version': process.env.NOTESTORY_APP_VERSION
  };
  if (authorization) {
    headers.authorization = authorization;
  }
  return headers;
}
