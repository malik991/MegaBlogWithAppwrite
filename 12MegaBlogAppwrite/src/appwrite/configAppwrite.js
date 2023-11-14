import conf from "../config/conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class DbServices {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.apwriteUrl).setProject(conf.apwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.apwriteDatabaseId,
        conf.apwriteCollectionId,
        slug, //ID.unique(), // or we can use slug as well
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  // update post , here first we need document Id which id.unique
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      console.log("slug value", slug);
      return await this.databases.updateDocument(
        conf.apwriteDatabaseId,
        conf.apwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Update Post error:: ", error);
      return false;
    }
  }

  //delete document
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.apwriteDatabaseId,
        conf.apwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("error in delete Post:: ", error);
      return false;
    }
  }

  // get one document
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.apwriteDatabaseId,
        conf.apwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error in get Post:: ", error);
      return false;
    }
  }

  // get all documetns
  async getAllPosts() {
    try {
      return await this.databases.listDocuments(
        conf.apwriteDatabaseId,
        conf.apwriteCollectionId,
        // but we do not want all type of docs where docs which are inactive will also come
        // so use Query, these are the indexes on apwrite
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Error in Get ALl Posts:: ", error);
      return false;
    }
  }

  // get specific user posts
  async getUserPosts(userId) {
    try {
      return await this.databases.listDocuments(
        conf.apwriteDatabaseId,
        conf.apwriteCollectionId,
        // but we do not want all type of docs where docs which are inactive will also come
        // so use Query, these are the indexes on apwrite
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log("Error in Get ALl Posts:: ", error);
      return false;
    }
  }

  // file upload servies/method

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.apwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error in Upload FIle:: ", error);
      return false;
    }
  }

  // delete file
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.apwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Eror in Delete File:: ", error);
      return false;
    }
  }

  // file preview , it is very fast so no need of any promise or async
  filePreview(fileId) {
    try {
      return this.storage.getFilePreview(conf.apwriteBucketId, fileId);
    } catch (error) {
      console.log("error in File preview:: ", error);
      return false;
    }
  }
}

const dbServiceObj = new DbServices();
export default dbServiceObj;
