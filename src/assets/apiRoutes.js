let env = "dev"
let api = {}
if (env === "dev") {
    api = {
        profile: "http://localhost:8080/api/users/6016606379d90398eb11d0ee",
        name: "http://localhost:8080/api/users/6016606379d90398eb11d0ee/name",
        surname: "http://localhost:8080/api/users/6016606379d90398eb11d0ee/surname",
        gender: "http://localhost:8080/api/users/6016606379d90398eb11d0ee/gender",
        email: "http://localhost:8080/api/users/6016606379d90398eb11d0ee/email",
        phone: "http://localhost:8080/api/users/6016606379d90398eb11d0ee/phone",
        bio: "http://localhost:8080/api/users/6016606379d90398eb11d0ee/bio",
        CV: "http://localhost:8080/api/users/6016606379d90398eb11d0ee/cv",
        user: "http://localhost:8080/api/users/6016606379d90398eb11d0ee",
        users: "http://localhost:8080/api/users",

        vacancies: "http://localhost:8080/api/vacancies"
    } 
} 
if (env === "prod") {
    api = {
        profile: "https://api-quasapp.herokuapp.com/api/users/6016606379d90398eb11d0ee",
        name: "https://api-quasapp.herokuapp.com/api/users/6016606379d90398eb11d0ee/name",
        surname: "https://api-quasapp.herokuapp.com/api/users/6016606379d90398eb11d0ee/surname",
        gender: "https://api-quasapp.herokuapp.com/api/users/6016606379d90398eb11d0ee/gender",
        email: "https://api-quasapp.herokuapp.com/api/users/6016606379d90398eb11d0ee/email",
        phone: "https://api-quasapp.herokuapp.com/api/users/6016606379d90398eb11d0ee/phone",
        CV: "https://api-quasapp.herokuapp.com/api/users/6016606379d90398eb11d0ee/cv",
        user: "https://api-quasapp.herokuapp.com/api/users/6016606379d90398eb11d0ee",
        users: "https://api-quasapp.herokuapp.com/api/users",

        vacancies: "https://api-quasapp.herokuapp.com/api/vacancies"
    }
}

export { api }