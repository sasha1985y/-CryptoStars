const Urls = {
  GET: 'https://cryptostar.grading.pages.academy/contractors',
  POST: 'https://cryptostar.grading.pages.academy/'
};

const sendRequest = (onSuccess, onError, method, body) => {
  fetch(
    Urls[method],
    {
      method: method,
      body,
    },
  ).then((response) => response.json())
  .then((data) => {
    onSuccess(data)
  })  
  .catch((error) => {
    onError(error);
  });
};

const Url = {
  GET: 'https://cryptostar.grading.pages.academy/user'
}

const sendUserRequest = (onUserSuccess, onError, method, body) => {
  fetch(
    Url[method],
    {
      method: method,
      body,
    },
  ).then((response) => response.json())
  .then((data) => {
    onUserSuccess(data)
  })  
  .catch((error) => {
    onError(error);
  });
};

export {sendRequest, sendUserRequest};