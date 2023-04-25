import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApiRequestFormData, getApiRequestFormDataIdentifier } from '../model/api-request-form-data.model';

export type EntityResponseType = HttpResponse<IApiRequestFormData>;
export type EntityArrayResponseType = HttpResponse<IApiRequestFormData[]>;

@Injectable({ providedIn: 'root' })
export class ApiRequestFormDataService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-request-form-data', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(apiRequestFormData: IApiRequestFormData): Observable<EntityResponseType> {
    return this.http.post<IApiRequestFormData>(this.resourceUrl, apiRequestFormData, { observe: 'response' });
  }

  update(apiRequestFormData: IApiRequestFormData): Observable<EntityResponseType> {
    return this.http.put<IApiRequestFormData>(
      `${this.resourceUrl}/${getApiRequestFormDataIdentifier(apiRequestFormData) as number}`,
      apiRequestFormData,
      { observe: 'response' }
    );
  }

  partialUpdate(apiRequestFormData: IApiRequestFormData): Observable<EntityResponseType> {
    return this.http.patch<IApiRequestFormData>(
      `${this.resourceUrl}/${getApiRequestFormDataIdentifier(apiRequestFormData) as number}`,
      apiRequestFormData,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApiRequestFormData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApiRequestFormData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addApiRequestFormDataToCollectionIfMissing(
    apiRequestFormDataCollection: IApiRequestFormData[],
    ...apiRequestFormDataToCheck: (IApiRequestFormData | null | undefined)[]
  ): IApiRequestFormData[] {
    const apiRequestFormData: IApiRequestFormData[] = apiRequestFormDataToCheck.filter(isPresent);
    if (apiRequestFormData.length > 0) {
      const apiRequestFormDataCollectionIdentifiers = apiRequestFormDataCollection.map(
        apiRequestFormDataItem => getApiRequestFormDataIdentifier(apiRequestFormDataItem)!
      );
      const apiRequestFormDataToAdd = apiRequestFormData.filter(apiRequestFormDataItem => {
        const apiRequestFormDataIdentifier = getApiRequestFormDataIdentifier(apiRequestFormDataItem);
        if (apiRequestFormDataIdentifier == null || apiRequestFormDataCollectionIdentifiers.includes(apiRequestFormDataIdentifier)) {
          return false;
        }
        apiRequestFormDataCollectionIdentifiers.push(apiRequestFormDataIdentifier);
        return true;
      });
      return [...apiRequestFormDataToAdd, ...apiRequestFormDataCollection];
    }
    return apiRequestFormDataCollection;
  }
}
