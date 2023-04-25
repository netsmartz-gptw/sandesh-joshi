import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IApiResponseHar, getApiResponseHarIdentifier } from '../model/api-response-har.model';

export type EntityResponseType = HttpResponse<IApiResponseHar>;
export type EntityArrayResponseType = HttpResponse<IApiResponseHar[]>;

@Injectable({ providedIn: 'root' })
export class ApiResponseHarService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-response-hars', 'testopsctrl');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/api-response-hars', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(apiResponseHar: IApiResponseHar): Observable<EntityResponseType> {
    return this.http.post<IApiResponseHar>(this.resourceUrl, apiResponseHar, { observe: 'response' });
  }

  update(apiResponseHar: IApiResponseHar): Observable<EntityResponseType> {
    return this.http.put<IApiResponseHar>(`${this.resourceUrl}/${getApiResponseHarIdentifier(apiResponseHar) as number}`, apiResponseHar, {
      observe: 'response',
    });
  }

  partialUpdate(apiResponseHar: IApiResponseHar): Observable<EntityResponseType> {
    return this.http.patch<IApiResponseHar>(
      `${this.resourceUrl}/${getApiResponseHarIdentifier(apiResponseHar) as number}`,
      apiResponseHar,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApiResponseHar>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApiResponseHar[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApiResponseHar[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addApiResponseHarToCollectionIfMissing(
    apiResponseHarCollection: IApiResponseHar[],
    ...apiResponseHarsToCheck: (IApiResponseHar | null | undefined)[]
  ): IApiResponseHar[] {
    const apiResponseHars: IApiResponseHar[] = apiResponseHarsToCheck.filter(isPresent);
    if (apiResponseHars.length > 0) {
      const apiResponseHarCollectionIdentifiers = apiResponseHarCollection.map(
        apiResponseHarItem => getApiResponseHarIdentifier(apiResponseHarItem)!
      );
      const apiResponseHarsToAdd = apiResponseHars.filter(apiResponseHarItem => {
        const apiResponseHarIdentifier = getApiResponseHarIdentifier(apiResponseHarItem);
        if (apiResponseHarIdentifier == null || apiResponseHarCollectionIdentifiers.includes(apiResponseHarIdentifier)) {
          return false;
        }
        apiResponseHarCollectionIdentifiers.push(apiResponseHarIdentifier);
        return true;
      });
      return [...apiResponseHarsToAdd, ...apiResponseHarCollection];
    }
    return apiResponseHarCollection;
  }
}
