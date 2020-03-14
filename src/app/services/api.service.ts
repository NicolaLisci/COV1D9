import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) {
  }


  getDailyRecords() {
    return this.httpClient.get(environment.baseUrl + environment.endpoints.daily);
  }

  getDailyRecord(todayDate: string) {
    return this.httpClient.get(environment.baseUrl + environment.endpoints.daily + '?data=' + todayDate);
  }

}
