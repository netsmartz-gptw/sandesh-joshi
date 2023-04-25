import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApiRequestCookie, getApiRequestCookieIdentifier } from '../model/api-request-cookie.model';

export type EntityResponseType = HttpResponse<IApiRequestCookie>;
export type EntityArrayResponseType = HttpResponse<IApiRequestCookie[]>;

@Injectable({ providedIn: 'root' })
export class ApiRequestCookieService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-request-cookies', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(apiRequestCookie: IApiRequestCookie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(apiRequestCookie);
    return this.http
      .post<IApiRequestCookie>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(apiRequestCookie: IApiRequestCookie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(apiRequestCookie);
    return this.http
      .put<IApiRequestCookie>(`${this.resourceUrl}/${getApiRequestCookieIdentifier(apiRequestCookie) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(apiRequestCookie: IApiRequestCookie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(apiRequestCookie);
    return this.http
      .patch<IApiRequestCookie>(`${this.resourceUrl}/${getApiRequestCookieIdentifier(apiRequestCookie) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IApiRequestCookie>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IApiRequestCookie[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addApiRequestCookieToCollectionIfMissing(
    apiRequestCookieCollection: IApiRequestCookie[],
    ...apiRequestCookiesToCheck: (IApiRequestCookie | null | undefined)[]
  ): IApiRequestCookie[] {
    const apiRequestCookies: IApiRequestCookie[] = apiRequestCookiesToCheck.filter(isPresent);
    if (apiRequestCookies.length > 0) {
      const apiRequestCookieCollectionIdentifiers = apiRequestCookieCollection.map(
        apiRequestCookieItem => getApiRequestCookieIdentifier(apiRequestCookieItem)!
      );
      const apiRequestCookiesToAdd = apiRequestCookies.filter(apiRequestCookieItem => {
        const apiRequestCookieIdentifier = getApiRequestCookieIdentifier(apiRequestCookieItem);
        if (apiRequestCookieIdentifier == null || apiRequestCookieCollectionIdentifiers.includes(apiRequestCookieIdentifier)) {
          return false;
        }
        apiRequestCookieCollectionIdentifiers.push(apiRequestCookieIdentifier);
        return true;
      });
      return [...apiRequestCookiesToAdd, ...apiRequestCookieCollection];
    }
    return apiRequestCookieCollection;
  }

  protected convertDateFromClient(apiRequestCookie: IApiRequestCookie): IApiRequestCookie {
    return Object.assign({}, apiRequestCookie, {
      expiryDate: apiRequestCookie.expiryDate?.isValid() ? apiRequestCookie.expiryDate.toJSON() : undefined,
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
      res.body.forEach((apiRequestCookie: IApiRequestCookie) => {
        apiRequestCookie.expiryDate = apiRequestCookie.expiryDate ? dayjs(apiRequestCookie.expiryDate) : undefined;
      });
    }
    return res;
  }
}
