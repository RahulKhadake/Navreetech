import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseApiUrl = "http://localhost:3000/Userlist";
  constructor(private Http: HttpClient) { }

  getUserData() {
    return this.Http.get(this.baseApiUrl);
  }
  // Post API

  createUserdata(data: any) {
    return this.Http.post(this.baseApiUrl, data);
  }

  // UpdateData
  updateUserdata(id: any, data: any) {
    return this.Http.put(`${this.baseApiUrl}/${id}`, data);

  }
  // DeleteAPi
  deleteUserData(id: any) {
    return this.Http.delete(`${this.baseApiUrl}/${id}`);
  }
}
