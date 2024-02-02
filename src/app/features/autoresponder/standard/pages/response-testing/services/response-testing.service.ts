import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBody } from '../models/test-body.model';
import { TestResult } from '../models/test-result.model';

@Injectable({
  providedIn: 'root'
})
export class ResponseTestingService {

  constructor(private httpClient : HttpClient) { }

  create(body : TestBody){
    const path = "api/v1/autoresponder/standard/response";

    return this.httpClient.post<TestResult>(path, body);
  }
}
