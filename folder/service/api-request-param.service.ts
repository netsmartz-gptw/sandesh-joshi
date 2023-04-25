import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';
import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApiRequestParam, getApiRequestParamIdentifier } from '../model/api-request-param.model';

export type EntityResponseType = HttpResponse<IApiRequestParam>;
export type EntityArrayResponseType = HttpResponse<IApiRequestParam[]>;

@Injectable({ providedIn: 'root' })
export class ApiRequestParamService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-request-params', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(apiRequestParam: any): Observable<EntityResponseType> {
    return this.http.post<IApiRequestParam>(this.resourceUrl, apiRequestParam, { observe: 'response' });
  }

  update(apiRequestParam: IApiRequestParam): Observable<EntityResponseType> {
    return this.http.put<IApiRequestParam>(
      `${this.resourceUrl}/${getApiRequestParamIdentifier(apiRequestParam) as number}`,
      apiRequestParam,
      { observe: 'response' }
    );
  }

  partialUpdate(apiRequestParam: IApiRequestParam): Observable<EntityResponseType> {
    return this.http.patch<IApiRequestParam>(
      `${this.resourceUrl}/${getApiRequestParamIdentifier(apiRequestParam) as number}`,
      apiRequestParam,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApiRequestParam>(`${this.resourceUrl}?apiRequestId.equals=${id}`, { observe: 'response' });
  }

  // query(req?: any): Observable<EntityArrayResponseType> {
  //   const options = createRequestOption(req);
  //   return this.http.get<IApiRequestParam[]>(this.resourceUrl, { params: options, observe: 'response' });
  // }

  apiCatalogParamquery(id: number): Observable<EntityArrayResponseType> {
    // const options = createRequestOption(req);
    return this.http.get<IApiRequestParam[]>(`${this.resourceUrl}?apiRequestId.equals=${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApiRequestParam[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addApiRequestParamToCollectionIfMissing(
    apiRequestParamCollection: IApiRequestParam[],
    ...apiRequestParamsToCheck: (IApiRequestParam | null | undefined)[]
  ): IApiRequestParam[] {
    const apiRequestParams: IApiRequestParam[] = apiRequestParamsToCheck.filter(isPresent);
    if (apiRequestParams.length > 0) {
      const apiRequestParamCollectionIdentifiers = apiRequestParamCollection.map(
        apiRequestParamItem => getApiRequestParamIdentifier(apiRequestParamItem)!
      );
      const apiRequestParamsToAdd = apiRequestParams.filter(apiRequestParamItem => {
        const apiRequestParamIdentifier = getApiRequestParamIdentifier(apiRequestParamItem);
        if (apiRequestParamIdentifier == null || apiRequestParamCollectionIdentifiers.includes(apiRequestParamIdentifier)) {
          return false;
        }
        apiRequestParamCollectionIdentifiers.push(apiRequestParamIdentifier);
        return true;
      });
      return [...apiRequestParamsToAdd, ...apiRequestParamCollection];
    }
    return apiRequestParamCollection;
  }
}
