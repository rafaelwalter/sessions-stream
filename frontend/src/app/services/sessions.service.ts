import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GetSessionParams } from '../models/get-session-params.model';

@Injectable({
  providedIn: 'root',
})
export class SessionsService {

  private static readonly api = '/api/sessions';

  constructor(
    private readonly http: HttpClient,
  ) {}

  get(params?: GetSessionParams): Observable<[Date, number][]> {
    const httpParams = new HttpParams({ fromObject: params?.getParams() });

    return this.http.get<{ data: [string, number][] }>(SessionsService.api, { params: httpParams }).pipe(
      map(result => result.data.map(([date, count]): [Date, number] => [new Date(date), count])),
      catchError((error: HttpErrorResponse) => throwError(error.message)),
    );
  }

}
