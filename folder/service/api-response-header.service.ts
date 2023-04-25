import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApiResponseHeader, getApiResponseHeaderIdentifier } from '../model/api-response-header.model';

export type EntityResponseType = HttpResponse<IApiResponseHeader>;
export type EntityArrayResponseType = HttpResponse<IApiResponseHeader[]>;

@Injectable({ providedIn: 'root' })
export class ApiResponseHeaderService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-response-headers', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(apiResponseHeader: IApiResponseHeader): Observable<EntityResponseType> {
    return this.http.post<IApiResponseHeader>(this.resourceUrl, apiResponseHeader, { observe: 'response' });
  }

  update(apiResponseHeader: IApiResponseHeader): Observable<EntityResponseType> {
    return this.http.put<IApiResponseHeader>(
      `${this.resourceUrl}/${getApiResponseHeaderIdentifier(apiResponseHeader) as number}`,
      apiResponseHeader,
      { observe: 'response' }
    );
  }

  partialUpdate(apiResponseHeader: IApiResponseHeader): Observable<EntityResponseType> {
    return this.http.patch<IApiResponseHeader>(
      `${this.resourceUrl}/${getApiResponseHeaderIdentifier(apiResponseHeader) as number}`,
      apiResponseHeader,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApiResponseHeader>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApiResponseHeader[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addApiResponseHeaderToCollectionIfMissing(
    apiResponseHeaderCollection: IApiResponseHeader[],
    ...apiResponseHeadersToCheck: (IApiResponseHeader | null | undefined)[]
  ): IApiResponseHeader[] {
    const apiResponseHeaders: IApiResponseHeader[] = apiResponseHeadersToCheck.filter(isPresent);
    if (apiResponseHeaders.length > 0) {
      const apiResponseHeaderCollectionIdentifiers = apiResponseHeaderCollection.map(
        apiResponseHeaderItem => getApiResponseHeaderIdentifier(apiResponseHeaderItem)!
      );
      const apiResponseHeadersToAdd = apiResponseHeaders.filter(apiResponseHeaderItem => {
        const apiResponseHeaderIdentifier = getApiResponseHeaderIdentifier(apiResponseHeaderItem);
        if (apiResponseHeaderIdentifier == null || apiResponseHeaderCollectionIdentifiers.includes(apiResponseHeaderIdentifier)) {
          return false;
        }
        apiResponseHeaderCollectionIdentifiers.push(apiResponseHeaderIdentifier);
        return true;
      });
      return [...apiResponseHeadersToAdd, ...apiResponseHeaderCollection];
    }
    return apiResponseHeaderCollection;
  }
}
