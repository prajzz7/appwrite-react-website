import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite) // Your API Endpoint
            .setProject(conf.appwriteProjectId);               // Your project ID
        this.account = new Account()
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique, email, password, name);
            if (userAccount) {
                //Account successful creation method
                return this.login({ email, password })
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log('EROR GETCURRENTUSER', error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log('ERRORLOG OUT ');
        }
    }

}

const authService = new AuthService

export default authService