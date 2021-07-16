import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  serverApiUrl = "../assets/data.json";

  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get(this.serverApiUrl)
  }

}