import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protocol = 'https';
  host = 'api.oasdiff.com';
  endpoint = `${this.protocol}://${this.host}`

  constructor(private http: HttpClient) { }
  sendBreakingChanges(original: string, revision: string) {
    let body = new URLSearchParams();
    body.set('base', original);
    body.set('revision', revision);
    
    return this.http.post(`${this.endpoint}/breaking-changes`, body,
        {headers: {'Content-Type':  'application/x-www-form-urlencoded', responseType: 'text'}})
          // responseType: 'text'}});
  }
}
