import axios from "axios";

const token = localStorage.getItem('@Auth:token');

export function eventsRegister(title: string, description: string, color: string, date: string) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'https://api.carpemundi.com.br/api/eventos_diarios',
            data: {
                titulo: title,
                descricao: description,
                data: date,
                cor: color
            },
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response)
                try {
                    resolve(response);
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

export function getEvents() {

    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: 'https://api.carpemundi.com.br/api/eventos_diarios',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response)
                try {
                    resolve(response);
                } catch (err) {
                    console.log(err);

                    reject(err);
                }
            })
            .catch(error => {
                //console.log(error);
                console.log(error);
            });
    });
}

export function detailsEvents(id: string) {

    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'https://api.carpemundi.com.br/api/eventos_diarios/' + id,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response)
                try {
                    resolve(response);
                } catch (err) {
                    console.log(err);

                    reject(err);
                }
            })
            .catch(error => {
                //console.log(error);
                console.log(error);
            });
    });
}

export function deleteEvents(id: number) {

    return new Promise((resolve, reject) => {
        axios({
            method: 'DELETE',
            url: 'https://api.carpemundi.com.br/api/eventos_diarios/' + id,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response)
                try {
                    resolve(response);
                } catch (err) {
                    console.log(err);

                    reject(err);
                }
            })
            .catch(error => {
                //console.log(error);
                console.log(error);
            });
    });
}

export function updateEvents(id: number, title: string, description: string, color: string, date: string) {

    return new Promise((resolve, reject) => {
        axios({
            method: 'PUT',
            url: 'https://api.carpemundi.com.br/api/eventos_diarios/' + id,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {
                titulo: title,
                descricao: description,
                data: date,
                cor: color
            },
        })
            .then(response => {
                console.log(response)
                try {
                    resolve(response);
                } catch (err) {
                    console.log(err);

                    reject(err);
                }
            })
            .catch(error => {
                //console.log(error);
                console.log(error);
            });
    });
}