import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApiRequestHeader, getApiRequestHeaderIdentifier } from '../model/api-request-header.model';

export type EntityResponseType = HttpResponse<IApiRequestHeader>;
export type EntityArrayResponseType = HttpResponse<IApiRequestHeader[]>;

@Injectable({ providedIn: 'root' })
export class ApiRequestHeaderService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-request-headers', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(apiRequestHeader: any): Observable<EntityResponseType> {
    return this.http.post<IApiRequestHeader>(this.resourceUrl, apiRequestHeader, { observe: 'response' });
  }

  update(apiRequestHeader: IApiRequestHeader): Observable<EntityResponseType> {
    return this.http.put<IApiRequestHeader>(
      `${this.resourceUrl}/${getApiRequestHeaderIdentifier(apiRequestHeader) as number}`,
      apiRequestHeader,
      { observe: 'response' }
    );
  }

  partialUpdate(apiRequestHeader: IApiRequestHeader): Observable<EntityResponseType> {
    return this.http.patch<IApiRequestHeader>(
      `${this.resourceUrl}/${getApiRequestHeaderIdentifier(apiRequestHeader) as number}`,
      apiRequestHeader,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApiRequestHeader>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  apiCatalogHeaderquery(id: number): Observable<EntityArrayResponseType> {
    // const options = createRequestOption(req);
    return this.http.get<IApiRequestHeader[]>(`${this.resourceUrl}?apiRequestId.equals=${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApiRequestHeader[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addApiRequestHeaderToCollectionIfMissing(
    apiRequestHeaderCollection: IApiRequestHeader[],
    ...apiRequestHeadersToCheck: (IApiRequestHeader | null | undefined)[]
  ): IApiRequestHeader[] {
    const apiRequestHeaders: IApiRequestHeader[] = apiRequestHeadersToCheck.filter(isPresent);
    if (apiRequestHeaders.length > 0) {
      const apiRequestHeaderCollectionIdentifiers = apiRequestHeaderCollection.map(
        apiRequestHeaderItem => getApiRequestHeaderIdentifier(apiRequestHeaderItem)!
      );
      const apiRequestHeadersToAdd = apiRequestHeaders.filter(apiRequestHeaderItem => {
        const apiRequestHeaderIdentifier = getApiRequestHeaderIdentifier(apiRequestHeaderItem);
        if (apiRequestHeaderIdentifier == null || apiRequestHeaderCollectionIdentifiers.includes(apiRequestHeaderIdentifier)) {
          return false;
        }
        apiRequestHeaderCollectionIdentifiers.push(apiRequestHeaderIdentifier);
        return true;
      });
      return [...apiRequestHeadersToAdd, ...apiRequestHeaderCollection];
    }
    return apiRequestHeaderCollection;
  }
}
