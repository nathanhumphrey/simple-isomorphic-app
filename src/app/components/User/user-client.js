const getData = async (url = '', data = {}) => {
  return await (
    await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // !! required to store the cookie from the response
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
  ).json();
};

const postData = async (url = '', data = {}) => {
  return await (
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // !! required to store the cookie from the response
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
  ).json();
};

const userSignin = async (user) => {
  return await postData('/api/signin', user);
};

const userSignout = async () => {
  return await getData('/api/signout');
};

const userSignup = async (user) => {
  return await postData('/api/signup', user);
};

const userView = async (user) => {
  return await getData(`/api/users/${user.id}`);
};

const userClient = { userSignin, userSignout, userSignup, userView };

export { userClient };
