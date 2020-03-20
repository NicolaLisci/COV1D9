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

  getCountriesData() {
    return this.httpClient.get(environment.API.world.baseUrl + environment.API.world.endpoints.countries);
  }

}
