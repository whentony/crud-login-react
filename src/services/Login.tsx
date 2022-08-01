import axios from 'axios';

function Login(email: string, password: string) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'https://api.carpemundi.com.br/api/login/adm',
      data: {
        email: email,
        password: password,
      },
    })
      .then(response => {
        console.log(response)
        try {
          resolve(response.data);
        } catch (err) {
          console.log(err);

          reject(err);
        }
      })
      .catch(error => {
        //console.log(error);
        resolve(error)
        console.log(error);
      });
  });
}
export default Login;