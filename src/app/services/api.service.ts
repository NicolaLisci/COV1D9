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

  getRegionsData(todayDate) {
    return this.httpClient.get(environment.baseUrl + environment.endpoints.regioni + '?data=' + todayDate);
  }

  getRegionsMap(todayDate) {
    return this.httpClient.get(environment.baseUrl + environment.endpoints.regioni + '?data=' + todayDate);
  }

  getProvinceData(todayDate) {
    return this.httpClient.get(environment.baseUrl + environment.endpoints.daily + '?data=' + todayDate);
  }

  getProvinceMap(todayDate) {
    return this.httpClient.get(environment.baseUrl + environment.endpoints.province + '?data=' + todayDate);
  }

}
