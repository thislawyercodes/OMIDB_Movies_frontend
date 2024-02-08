import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpService, private httpClient: HttpClient) { }

  getMovieDetail(data: { i: string; t: string }) {
    let params = new HttpParams().set("i", data.i).set("t", data.t)
    return this.http.get('movies/detail',  params );
  }

}