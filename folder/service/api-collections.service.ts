import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';
import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Search } from 'app/core/request/request.model';
import { IApiCollections, getApiCollectionsIdentifier } from '../model/api-collections.model';
import { SearchWithPagination } from 'app/core/request/request.model';
export type EntityResponseType = HttpResponse<IApiCollections>;
export type EntityArrayResponseType = HttpResponse<IApiCollections[]>;

@Injectable({ providedIn: 'root' })
export class ApiCollectionsService {
  public collectionObj: any;
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-collections', 'testopsctrl');
  // protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-collections', 'testopsctrl');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/api-collections', 'testopsctrl');
  protected resourceUrlCount = this.applicationConfigService.getEndpointFor('api/api-collections/count', 'testopsctrl');
  protected resourceUrlMetricsCount = this.applicationConfigService.getEndpointFor(
    'api/api-collections/dashboard/metrices',
    'testopsctrl'
  );
  protected resourceRevisionUrl = this.applicationConfigService.getEndpointFor('api/revision/api-collections/build', 'testopsctrl');
  protected resourceRevisionByIdUrl = this.applicationConfigService.getEndpointFor('api/revision/api-collections', 'testopsctrl');
  protected resourceBuildVersionUrl = this.applicationConfigService.getEndpointFor('api/build-versions', 'testopsctrl');

  protected apiCollectionByIdUrl = this.applicationConfigService.getEndpointFor('api/api-requests/collections', 'testopsctrl');
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  getCount(): Observable<any> {
    return this.http.get<any>(this.resourceUrlMetricsCount, { observe: 'response' });
  }

  // create(apiCollections: IApiCollections): Observable<EntityResponseType> {
  //   return this.http.post<IApiCollections>(this.resourceUrl, apiCollections, { observe: 'response' });
  // }
  getBuildversions(): Observable<any> {
    return this.http.get<any>(this.resourceBuildVersionUrl, { observe: 'response' });
  }
  create(json: any): Observable<EntityResponseType> {
    return this.http.post<IApiCollections>(this.resourceUrl, json, { observe: 'response' });
  }

  update(apiCollections: IApiCollections): Observable<EntityResponseType> {
    return this.http.put<IApiCollections>(`${this.resourceUrl}/${getApiCollectionsIdentifier(apiCollections) as number}`, apiCollections, {
      observe: 'response',
    });
  }

  updatePublishCollection(apiCollections: IApiCollections, id: any): Observable<EntityResponseType> {
    return this.http.put<IApiCollections>(`${this.resourceUrl}/${id}`, apiCollections, {
      observe: 'response',
    });
  }

  updateName(json: any, id: any): Observable<EntityResponseType> {
    return this.http.put<IApiCollections>(`${this.resourceUrl}/${id}`, json, {
      observe: 'response',
    });
  }

  updatePublish(json: any, id: any): Observable<EntityResponseType> {
    return this.http.put<IApiCollections>(`${this.resourceUrl}/${id}`, json, {
      observe: 'response',
    });
  }

  partialUpdate(apiCollections: IApiCollections): Observable<EntityResponseType> {
    return this.http.patch<IApiCollections>(
      `${this.resourceUrl}/${getApiCollectionsIdentifier(apiCollections) as number}`,
      apiCollections,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApiCollections>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApiCollections[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryCtalog(obj?: any): Observable<any> {
    let url = `${this.resourceUrl}?sort=id,desc&page=${obj.page}&size=${obj.size}&isPublished.equals=false`;
    if (obj['isFavourite.equals'] != null) {
      url = `${url}+&isFavourite.equals=${obj['isFavourite.equals']}`;
    }
    return this.http.get<any>(url, {
      observe: 'response',
    });
  }

  queryPublishCtalog(obj?: any): Observable<any> {
    let url = `${this.resourceUrl}?sort=id,desc&page=${obj.page}&size=${obj.size}&isPublished.equals=true`;

    if (obj['isFavourite.equals'] != null) {
      url = `${url}+&isFavourite.equals=${obj['isFavourite.equals']}`;
    }
    return this.http.get<any>(url, {
      observe: 'response',
    });
  }

  updateCollectionCaseRequest(apiCollections: IApiCollections): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(apiTest);
    return this.http.put<IApiCollections>(`${this.resourceUrl}/${getApiCollectionsIdentifier(apiCollections) as number}`, apiCollections, {
      observe: 'response',
    });
  }
  apiCatelogRevisionById(catalogId?: any): Observable<any> {
    return this.http.get<any>(`${this.resourceRevisionByIdUrl}/${catalogId}`, {
      observe: 'response',
    });
  }
  apiCatelogRevision(catelogId?: any, build?: any): Observable<any> {
    return this.http.get<any>(`${this.resourceRevisionUrl}/${catelogId}/${build}`, {
      observe: 'response',
    });
  }
  searchCollection(obj: any): Observable<EntityArrayResponseType> {
    let url = `${this.resourceUrl}?sort=id,desc&page=${obj.page}&size=${obj.size}&isPublished.equals=${obj.isPublish}`;
    if (obj['isFavourite.equals'] != null && obj.query === '') {
      url = `${url}+&isFavourite.equals=${obj['isFavourite.equals']}`;
    } else if (obj['isFavourite.equals'] != null && obj.query !== '') {
      url = `${url}+&isFavourite.equals=${obj['isFavourite.equals']}&name.contains=${obj.query}`;
    } else if (obj.query !== '') {
      url = `${url}&name.contains=${obj.query}`;
    }
    return this.http.get<IApiCollections[]>(url, {
      observe: 'response',
    });
    // .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  searchCollectionWithoutPagenations(obj: any): Observable<EntityArrayResponseType> {
    //const options = createRequestOption(obj);
    return this.http.get<IApiCollections[]>(`${this.resourceUrl}?name.contains=${obj.query}&sort=id,desc`, {
      observe: 'response',
    });
    // .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  deleteCollectionRequest(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.apiCollectionByIdUrl}/${id}`, { observe: 'response' });
  }

  // search(req: Search): Observable<EntityArrayResponseType> {
  //   const options = createRequestOption(req);
  //   return this.http.get<IApiCollections[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  // }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IApiCollections[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  getAPICollectionsById(id: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiCollectionByIdUrl}/${id}`, { observe: 'response' });
  }

  addApiCollectionsToCollectionIfMissing(
    apiCollectionsCollection: IApiCollections[],
    ...apiCollectionsToCheck: (IApiCollections | null | undefined)[]
  ): IApiCollections[] {
    const apiCollections: IApiCollections[] = apiCollectionsToCheck.filter(isPresent);
    if (apiCollections.length > 0) {
      const apiCollectionsCollectionIdentifiers = apiCollectionsCollection.map(
        apiCollectionsItem => getApiCollectionsIdentifier(apiCollectionsItem)!
      );
      const apiCollectionsToAdd = apiCollections.filter(apiCollectionsItem => {
        const apiCollectionsIdentifier = getApiCollectionsIdentifier(apiCollectionsItem);
        if (apiCollectionsIdentifier == null || apiCollectionsCollectionIdentifiers.includes(apiCollectionsIdentifier)) {
          return false;
        }
        apiCollectionsCollectionIdentifiers.push(apiCollectionsIdentifier);
        return true;
      });
      return [...apiCollectionsToAdd, ...apiCollectionsCollection];
    }
    return apiCollectionsCollection;
  }

  collectionsetId(obj: any) {
    this.collectionObj = obj;
    // console.log('check',importId);
  }

  collectiongetId(): any {
    return this.collectionObj;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((apiCollection: IApiCollections) => {
        apiCollection.lastExecutionDate = apiCollection.lastExecutionDate ? dayjs(apiCollection.lastExecutionDate) : undefined;
        apiCollection.lastUpdated = apiCollection.lastUpdated ? dayjs(apiCollection.lastUpdated) : undefined;
      });
    }
    return res;
  }
}
