import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

//we create class for quality code when object create than it will create the client and resources
export class AuthService {
  client = new Client();
  account;

  // now we call the constrcutor when obj create it call constractor
  constructor() {
    //console.log(conf.apwriteUrl + ": " + conf.apwriteProjectId);
    this.client.setEndpoint(conf.apwriteUrl).setProject(conf.apwriteProjectId);
    this.account = new Account(this.client);
  }

  // now we will use another method which use under the hood appwrite method or your own api
  // we will use async and wait rather than promise however both are same
  // destrcutre the parameter to get the values
  async createAccount({ email, password, name }) {
    try {
      // erad docs where it get an unique id also, this ID import above
      console.log(`name: ${name}: password: ${password}`);
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // than perform the login also or just return userAccount and than on
        // frontend u will redirect to login page but here we allow him to logged in also
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("error in create Account appwrite: ", error);
      throw error;
    }
  }

  // login method of appwrite
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // check user is exist or login or not
  async checkUser() {
    try {
      const userStatus = await this.account.get();
      if (userStatus) {
        return userStatus;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Eror in :: checkUser() :: error: ", error);
    }
  }

  // logout
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error in logOut:: ", error);
    }
  }
}

// obj of an class
const authServieObj = new AuthService();

export default authServieObj;
