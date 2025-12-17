const HEAD_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const request = async (route, method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, {
    method,
    body
  });

  if (!response.ok) {
    throw new Error(ErrorText[method === Method.GET ? 'GET_DATA' : 'SEND_DATA']);
  }

  return response.json();
};

const getData = () => request(Route.GET_DATA);

const sendData = (formData) => request(Route.SEND_DATA, Method.POST, formData);

export { getData, sendData };
