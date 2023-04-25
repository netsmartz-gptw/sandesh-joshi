import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApiRequestFormUrlencoded, getApiRequestFormUrlencodedIdentifier } from '../model/api-request-form-urlencoded.model';

export type EntityResponseType = HttpResponse<IApiRequestFormUrlencoded>;
export type EntityArrayResponseType = HttpResponse<IApiRequestFormUrlencoded[]>;

@Injectable({ providedIn: 'root' })
export class ApiRequestFormUrlencodedService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-request-form-urlencodeds', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(apiRequestFormUrlencoded: IApiRequestFormUrlencoded): Observable<EntityResponseType> {
    return this.http.post<IApiRequestFormUrlencoded>(this.resourceUrl, apiRequestFormUrlencoded, { observe: 'response' });
  }

  update(apiRequestFormUrlencoded: IApiRequestFormUrlencoded): Observable<EntityResponseType> {
    return this.http.put<IApiRequestFormUrlencoded>(
      `${this.resourceUrl}/${getApiRequestFormUrlencodedIdentifier(apiRequestFormUrlencoded) as number}`,
      apiRequestFormUrlencoded,
      { observe: 'response' }
    );
  }

  partialUpdate(apiRequestFormUrlencoded: IApiRequestFormUrlencoded): Observable<EntityResponseType> {
    return this.http.patch<IApiRequestFormUrlencoded>(
      `${this.resourceUrl}/${getApiRequestFormUrlencodedIdentifier(apiRequestFormUrlencoded) as number}`,
      apiRequestFormUrlencoded,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApiRequestFormUrlencoded>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApiRequestFormUrlencoded[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addApiRequestFormUrlencodedToCollectionIfMissing(
    apiRequestFormUrlencodedCollection: IApiRequestFormUrlencoded[],
    ...apiRequestFormUrlencodedsToCheck: (IApiRequestFormUrlencoded | null | undefined)[]
  ): IApiRequestFormUrlencoded[] {
    const apiRequestFormUrlencodeds: IApiRequestFormUrlencoded[] = apiRequestFormUrlencodedsToCheck.filter(isPresent);
    if (apiRequestFormUrlencodeds.length > 0) {
      const apiRequestFormUrlencodedCollectionIdentifiers = apiRequestFormUrlencodedCollection.map(
        apiRequestFormUrlencodedItem => getApiRequestFormUrlencodedIdentifier(apiRequestFormUrlencodedItem)!
      );
      const apiRequestFormUrlencodedsToAdd = apiRequestFormUrlencodeds.filter(apiRequestFormUrlencodedItem => {
        const apiRequestFormUrlencodedIdentifier = getApiRequestFormUrlencodedIdentifier(apiRequestFormUrlencodedItem);
        if (
          apiRequestFormUrlencodedIdentifier == null ||
          apiRequestFormUrlencodedCollectionIdentifiers.includes(apiRequestFormUrlencodedIdentifier)
        ) {
          return false;
        }
        apiRequestFormUrlencodedCollectionIdentifiers.push(apiRequestFormUrlencodedIdentifier);
        return true;
      });
      return [...apiRequestFormUrlencodedsToAdd, ...apiRequestFormUrlencodedCollection];
    }
    return apiRequestFormUrlencodedCollection;
  }
}
