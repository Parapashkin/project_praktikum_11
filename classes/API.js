class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
    this.requests = config.requests;
  }

  getUserData = () => {
    return fetch(`${this.url}/${this.requests[0]}`, {
      headers: this.headers
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })
  }


  changeUserInfo = (userName, userInfo) => {
    console.log("changeUserInfo")
    return fetch(`${this.url}/${this.requests[0]}`, {
      method: 'PATCH',
      headers: this.headers
      ,
      body: JSON.stringify({
        name: userName,
        about: userInfo
      })
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })

  }



  getInitialCards = () => {
    return fetch(`${this.url}/${this.requests[1]}`, {
      headers: this.headers
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })
  }

  postNewCards = (cardName, cadrLink) => {
    return fetch(`${this.url}/${this.requests[1]}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardName,
        link: cadrLink,
      })
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })
  }





}

