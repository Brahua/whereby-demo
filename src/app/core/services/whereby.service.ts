import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMeeting, IResponseWhereby, Meeting } from '../interfaces/whereby.interface';
import { Observable } from 'rxjs';
import { IRespuesta } from '../interfaces/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class WherebyService {

  constructor(private http: HttpClient) { }

  createMeeting(meeting: IMeeting): Observable<IRespuesta<IResponseWhereby>> {
    return this.http.post<IRespuesta<IResponseWhereby>>(environment.API_URL_BASE, meeting);
  }

  getMeeting(meetingId: number): Observable<IRespuesta<IResponseWhereby>> {
    return this.http.get<IRespuesta<IResponseWhereby>>(`${environment.API_URL_BASE}/${meetingId}`);
  }

  deleteMeeting(meetingId: string) {
    return this.http.delete<IRespuesta<any>>(`${environment.API_URL_BASE}/${meetingId}`);
  }

  getMeetingData() {
    const meetings: Meeting[] = JSON.parse(localStorage.getItem('meetings'));
    return meetings ? meetings : [];
  }

  persistData(meetings: Meeting[]) {
    localStorage.setItem('meetings', JSON.stringify(meetings));
  }
}
