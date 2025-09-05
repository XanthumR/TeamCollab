import API from "./API";

export default {
    login(email: string, password: string) {
        return API.post('/login', { email, password });
    }
}  