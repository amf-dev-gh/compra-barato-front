import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WhatsAppRequest } from '../interfaces/whatsappRequest.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  private apiUrl: string = 'http://localhost:8080/api/v1/whatsapp';

  constructor(private http: HttpClient) { }

  sendListMessage(request: WhatsAppRequest): Observable<any> {
    return this.http.post(this.apiUrl + '/send', request);
  }
}
