import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AlertService} from '../alert-service/alert.service';
import {Image} from '../../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient, private alertService: AlertService) { }

  getImageIDs(limit: number, start: number = 0): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.httpClient.get(`${environment.apiUrl}/images/${start}/${limit}`).toPromise().then((value: any) => {
        console.log(value.idList);
        resolve(value.idList);
      }).catch((err) => {
        this.alertService.addAlert({type: 'danger', message: err.message});
        reject();
      });
    });
  }

  getImage(imageID: string): Promise<Image> {
    return new Promise<Image>((resolve, reject) => {
      this.httpClient.get(`${environment.apiUrl}/image/${imageID}`).toPromise().then((value: any) => {
        resolve(value.image);
      }).catch((err) => {
        this.alertService.addAlert({type: 'danger', message: err.message});
        reject();
      });
    });
  }

  getTestImage(): Promise<Image>{
    return new Promise<Image>((resolve, reject) => {
      const b64Data = '/* TEST DATA GOES HERE */';
      const image = new Image('Kentravyon', 'Felix', 'Münscher', new Date(), 'We two ❤', b64Data);
      resolve(image);
    });
  }
}
