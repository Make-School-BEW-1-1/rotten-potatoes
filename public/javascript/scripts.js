axios.get('https://httpbin.org/get')
  .then(function (response) {
    // handle success
    alert(response.headers.Host);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
