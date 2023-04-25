import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApiResponseCookie, getApiResponseCookieIdentifier } from '../model/api-response-cookie.model';

export type EntityResponseType = HttpResponse<IApiResponseCookie>;
export type EntityArrayResponseType = HttpResponse<IApiResponseCookie[]>;

@Injectable({ providedIn: 'root' })
export class ApiResponseCookieService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-response-cookies', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(apiResponseCookie: IApiResponseCookie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(apiResponseCookie);
    return this.http
      .post<IApiResponseCookie>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(apiResponseCookie: IApiResponseCookie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(apiResponseCookie);
    return this.http
      .put<IApiResponseCookie>(`${this.resourceUrl}/${getApiResponseCookieIdentifier(apiResponseCookie) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(apiResponseCookie: IApiResponseCookie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(apiResponseCookie);
    return this.http
      .patch<IApiResponseCookie>(`${this.resourceUrl}/${getApiResponseCookieIdentifier(apiResponseCookie) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IApiResponseCookie>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IApiResponseCookie[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addApiResponseCookieToCollectionIfMissing(
    apiResponseCookieCollection: IApiResponseCookie[],
    ...apiResponseCookiesToCheck: (IApiResponseCookie | null | undefined)[]
  ): IApiResponseCookie[] {
    const apiResponseCookies: IApiResponseCookie[] = apiResponseCookiesToCheck.filter(isPresent);
    if (apiResponseCookies.length > 0) {
      const apiResponseCookieCollectionIdentifiers = apiResponseCookieCollection.map(
        apiResponseCookieItem => getApiResponseCookieIdentifier(apiResponseCookieItem)!
      );
      const apiResponseCookiesToAdd = apiResponseCookies.filter(apiResponseCookieItem => {
        const apiResponseCookieIdentifier = getApiResponseCookieIdentifier(apiResponseCookieItem);
        if (apiResponseCookieIdentifier == null || apiResponseCookieCollectionIdentifiers.includes(apiResponseCookieIdentifier)) {
          return false;
        }
        apiResponseCookieCollectionIdentifiers.push(apiResponseCookieIdentifier);
        return true;
      });
      return [...apiResponseCookiesToAdd, ...apiResponseCookieCollection];
    }
    return apiResponseCookieCollection;
  }

  protected convertDateFromClient(apiResponseCookie: IApiResponseCookie): IApiResponseCookie {
    return Object.assign({}, apiResponseCookie, {
      expiryDate: apiResponseCookie.expiryDate?.isValid() ? apiResponseCookie.expiryDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.expiryDate = res.body.expiryDate ? dayjs(res.body.expiryDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((apiResponseCookie: IApiResponseCookie) => {
        apiResponseCookie.expiryDate = apiResponseCookie.expiryDate ? dayjs(apiResponseCookie.expiryDate) : undefined;
      });
    }
    return res;
  }
}
