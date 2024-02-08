import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(endpoint: string, body: {}, id: string = '') {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    if (id)
      return this.http.post(this.getUrl(endpoint) + `/${id}`, body);
    else
      return this.http.post(this.getUrl(endpoint), body, { headers });
  }

  get(endpoint: string, params?: HttpParams) {
    return this.http.get(this.getUrl(endpoint), { params: params });
  }

  get_by_id(endpoint: string, id: string) {
    return this.http.get(this.getUrl(endpoint) + `/${id}`)
  }

  get_json(endpoint: string) {
    return this.http.get(endpoint)
  }

  put(endpoint: string, body: {}, id: string) {
    return this.http.put(this.getUrl(endpoint) + `/${id}`, body);
  }

  patch(endpoint: string, body: {}, id: string) {
    return this.http.patch(this.getUrl(endpoint) + `/${id}/`, body);
  }

  delete(endpoint: string, id: string) {
    return this.http.delete(this.getUrl(endpoint) + `/${id}`)
  }

  getUrl(endpoint: string): string {
    return `${environment.api_base_url}/${endpoint}`;
  }
}
