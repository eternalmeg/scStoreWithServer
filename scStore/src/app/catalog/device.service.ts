import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Device} from "../types/device";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) {
  }



  api = 'http://localhost:3000'


  createDevice(brand: 'string', model: 'string', image: 'string', description: 'string', price: 'number') {
    return this.http.post<Device>(`${this.api}/devices/create`, {brand, model, image,description,price})
  }

  getLatestDevices() {
    return this.http.get<Device[]>(`${this.api}/devices/latest`);
  }

  getAllDevices() {
    return this.http.get<Device[]>(`${this.api}/devices/catalog`);
  }

  deleteDevice(deviceId: string) {
    return this.http.delete<Device>(`${this.api}/devices/${deviceId}`, {});
  }

  getDevice(id: string) {
    return this.http.get<Device>(`${this.api}/devices/${id}/details`)
  }

  editDevice(id: string, brand: string, model: string, image: string, description: string, price: number) {
    return this.http.put<Device>(`${this.api}/devices/${id}`, {brand, model, image, description, price})
  }

  buyDevice(deviceId: string) {
    return this.http.get<Device>(`${this.api}/devices/${deviceId}`)
  }

  deleteMultipleDevices(deviceIds: (string | undefined)[]) {
    return this.http.post<{ message: string }>(`${this.api}/devices/delete-multiple`, { deviceIds });
  }

  searchDevice(brand: string) {
    return this.http.get<Device[]>(`${this.api}/devices/search/${brand}`, {})
  }

  cancelPrefer(deviceId: string) {
    return this.http.post<{message: string}>(`${this.api}/devices/cancel/${deviceId}`, {});
  }


}
