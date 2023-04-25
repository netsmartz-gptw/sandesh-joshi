import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApiRequest, getApiRequestIdentifier } from '../model/api-request.model';
import { ITestRun } from 'app/entities/UiTestController/test-run/test-run.model';
import { HttpProxy } from 'app/shared/services/http-proxy.service';
import { IAuthCatalog } from '../../auth-catalog/model/auth-catalog.model';

export type EntityResponseType = HttpResponse<IApiRequest>;
export type EntityArrayResponseType = HttpResponse<IApiRequest[]>;

@Injectable({ providedIn: 'root' })
export class ApiRequestService {
  public importId: any;
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-requests', 'testopsctrl');
  protected resourceApiUrl = this.applicationConfigService.getEndpointFor('api/api-requests/collections', 'testopsctrl');
  protected resourceCollectionApiUrl = this.applicationConfigService.getEndpointFor('api/api-collections', 'testopsctrl');
  protected resourceAuthRefreshCollectionUrl = this.applicationConfigService.getEndpointFor(
    'api/token/update/auth-catalog',
    'testopsctrl'
  );
  protected resourceImportUrl = this.applicationConfigService.getEndpointFor('api/import/api-requests', 'testopsctrl');
  protected resourceImportOpenApiUrl = this.applicationConfigService.getEndpointFor('api/import-openapi', 'testopsctrl');
  protected resourceApiExecute = this.applicationConfigService.getEndpointFor('api/execute/api-requests', 'testopsctrl');
  protected resourceExecuteUrl = this.applicationConfigService.getEndpointFor('api/execute/api-requests', 'testopsctrl');
  protected resourceGet = this.applicationConfigService.getEndpointFor('api/api-requests/get', 'testopsctrl');
  protected resourceTestRun = this.applicationConfigService.getEndpointFor('api/test-runs', 'testopsctrl');
  protected resourceTestRunResult = this.applicationConfigService.getEndpointFor('api/test-result/api-request', 'testopsctrl');
  protected resourceTestExecuteUrl = this.applicationConfigService.getEndpointFor('api/execute', 'testopsctrl');
  protected resourceTestCaseRunResult = this.applicationConfigService.getEndpointFor('/api/test-result/api-test', 'testopsctrl');
  protected testrunresourceUrl = this.applicationConfigService.getEndpointFor('api/test-runs', 'testopsctrl');
  protected generateAutoTestCaseUrl = this.applicationConfigService.getEndpointFor('api/auto-tests/generate', 'testopsctrl');
  protected resourceTestcaseExcuteUrl = this.applicationConfigService.getEndpointFor('api/test-result/api-test', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService, protected httpProxy: HttpProxy) {}

  create(apiRequest: IApiRequest): Observable<EntityResponseType> {
    return this.http.post<IApiRequest>(this.resourceUrl, apiRequest, { observe: 'response' });
  }

  execute(apiRequest: IApiRequest): Observable<HttpResponse<any>> {
    return this.http.post<IApiRequest>(this.resourceExecuteUrl, apiRequest, { observe: 'response' });
  }

  update(apiRequest: IApiRequest): Observable<EntityResponseType> {
    return this.http.put<IApiRequest>(`${this.resourceUrl}/${getApiRequestIdentifier(apiRequest) as number}`, apiRequest, {
      observe: 'response',
    });
  }

  updateCatalog(id: any, apiRequest: IApiRequest): Observable<EntityResponseType> {
    return this.http.put<IApiRequest>(`${this.resourceCollectionApiUrl}/${id}`, apiRequest, {
      observe: 'response',
    });
  }

  updateUrlCatalog(id: any, apiRequest: IApiRequest): Observable<EntityResponseType> {
    return this.http.put<IApiRequest>(`${this.resourceUrl}/${id}`, apiRequest, {
      observe: 'response',
    });
  }

  // updateAuthCatalog(id: any, apiRequest: IApiRequest): Observable<EntityResponseType> {
  //   return this.http.put<IApiRequest>(`${this.resourceUrl}/${id}`, apiRequest, {
  //     observe: 'response',
  //   });
  // }

  partialUpdate(apiRequest: IApiRequest): Observable<EntityResponseType> {
    return this.http.patch<IApiRequest>(`${this.resourceUrl}/${getApiRequestIdentifier(apiRequest) as number}`, apiRequest, {
      observe: 'response',
    });
  }

  updateAuthCatalog(id: number, json: any): Observable<EntityResponseType> {
    return this.http.put<IAuthCatalog>(`${this.resourceCollectionApiUrl}/${id}`, json, { observe: 'response' });
  }

  refreshAuth(id: any): Observable<EntityResponseType> {
    return this.http.post<IAuthCatalog>(`${this.resourceAuthRefreshCollectionUrl}/${id}`, id, { observe: 'response' });
  }

  // find(id: number): Observable<EntityResponseType> {
  //   return this.http.get<IApiRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  // }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApiRequest>(`${this.resourceApiUrl}/${id}`, { observe: 'response' });
  }

  getExecute(id: number, prjId: number, envId: number): Observable<any> {
    return this.http.get<any>(`${this.resourceApiExecute}?apiRequestIds=${id}&projectId=${prjId}&environmentId=${envId}`, {
      observe: 'response',
    });
  }

  findTestRun(id: number): Observable<EntityResponseType> {
    return this.http.get<ITestRun>(`${this.testrunresourceUrl}/${id}`, { observe: 'response' });
    //.pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  setId(id: number) {
    this.importId = id;
    // console.log('check',importId);
  }

  getId(): any {
    return this.importId;
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApiRequest[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getApisByCollection(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IApiRequest[]>(`${this.resourceUrl}/collections/${id}`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  fetch(req?: any): Promise<IApiRequest[]> {
    const options = createRequestOption(req);
    return this.http
      .get<any[]>(this.resourceUrl, { params: options, observe: 'response' })
      .toPromise()
      .then((res: EntityArrayResponseType | undefined) => (res?.body ? res.body : []));
  }

  executeApi(reqId: string, projectId: string): Observable<any> {
    return this.http.get<any>(`${this.resourceApiExecute}?apiRequestIds=${reqId}&projectId=${projectId}`, { observe: 'response' });
  }

  executeTestApi(reqId: string, projectId: string, environmentId: any): Observable<any> {
    return this.http.post<any>(`${this.resourceTestExecuteUrl}?apiTestIds=${reqId}&projectId=${projectId}&environmentId=${environmentId}`, {
      observe: 'response',
    });
  }

  getTestCaseRunResultDetails(testRunId: string, reqId: string): Observable<any> {
    return this.http.get<any>(`${this.resourceTestCaseRunResult}/${testRunId}/${reqId}`);
  }

  getTestRunDetails(testRunId: string): Observable<any> {
    return this.http.get<any>(`${this.resourceTestRun}/${testRunId}`);
  }

  getTestRunResultDetails(testRunId: string, reqId: string): Observable<any> {
    return this.http.get<any>(`${this.resourceTestRunResult}/${testRunId}/${reqId}`, { observe: 'response' });
  }

  getTestRunResultDetailsByTestId(testRunId: string, reqId: string): Observable<any> {
    return this.http.get<any>(`${this.resourceTestcaseExcuteUrl}/${testRunId}/${reqId}`, { observe: 'response' });
  }

  getIds(params: string): Observable<HttpResponse<{}>> {
    return this.http.get<IApiRequest[]>(`${this.resourceGet}?id=${params}`, { observe: 'response' });
  }

  generateAutoTestCase(id: number, buildId: any): Observable<any> {
    return this.http.get<any>(`${this.generateAutoTestCaseUrl}?apiCollectionIds=${id}&buildId=${buildId}`);
  }

  addApiRequestToCollectionIfMissing(
    apiRequestCollection: IApiRequest[],
    ...apiRequestsToCheck: (IApiRequest | null | undefined)[]
  ): IApiRequest[] {
    const apiRequests: IApiRequest[] = apiRequestsToCheck.filter(isPresent);
    if (apiRequests.length > 0) {
      const apiRequestCollectionIdentifiers = apiRequestCollection.map(apiRequestItem => getApiRequestIdentifier(apiRequestItem)!);
      const apiRequestsToAdd = apiRequests.filter(apiRequestItem => {
        const apiRequestIdentifier = getApiRequestIdentifier(apiRequestItem);
        if (apiRequestIdentifier == null || apiRequestCollectionIdentifiers.includes(apiRequestIdentifier)) {
          return false;
        }
        apiRequestCollectionIdentifiers.push(apiRequestIdentifier);
        return true;
      });
      return [...apiRequestsToAdd, ...apiRequestCollection];
    }
    return apiRequestCollection;
  }

  addToPet(obj: any): Observable<any> {
    return this.http.post('https://petstore.swagger.io/v2/pet', obj);
  }

  catalogImport(files: any, projectId: any, buildVersion: any, projectName?: any): Observable<HttpResponse<any>> {
    const formData = new FormData();
    // for (const file of files) {
    formData.append('files', files, files.name);
    // }
    //formData.append('apiSpecification', apiSpecification);
    formData.append('projectId', projectId);
    formData.append('buildVersionName', buildVersion);
    formData.append('projectName', projectName);
    return this.http.post(this.resourceImportUrl, formData, { observe: 'response' });
  }

  import(files: any, projectId: any, buildVersion: any, name?: any): Observable<HttpResponse<any>> {
    const formData = new FormData();
    for (const file of files.sourceValue) {
      formData.append('files', file, file.name);
    }
    // formData.append('apiSpecification', apiSpecification);
    formData.append('projectId', projectId);
    formData.append('buildVersionName', buildVersion);
    // formData.append('projectName', projectName);
    // formData.append('name', name);

    return this.http.post(this.resourceImportUrl, formData, { observe: 'response' });
  }

  importOpenApi(openApiUrl: any, projectId: any): Observable<any> {
    return this.http.post(`${this.resourceImportOpenApiUrl}?openApiUrl=${openApiUrl}&projectId=${projectId}`, { observe: 'response' });
  }

  importCatalogOpenApi(openApiUrl: any, projectId: any): Observable<any> {
    return this.http.post(`${this.resourceImportOpenApiUrl}?openApiUrl=${openApiUrl}&projectId=${projectId}`, { observe: 'response' });
  }

  searchApis(obj: any): Observable<EntityArrayResponseType> {
    return this.http.get<IApiRequest[]>(`${this.resourceApiUrl}?sort=id,desc&page=${obj.page}&size=20&name.contains=${obj.query}`, {
      observe: 'response',
    });
  }

  queryApis(obj?: any): Observable<EntityArrayResponseType> {
    return this.http.get<IApiRequest[]>(`${this.resourceApiUrl}?sort=id,desc&page=${obj.page}&size=20`, {
      observe: 'response',
    });
  }

  getLocalAPI(url: any, params?: any): Observable<any> {
    return this.httpProxy.getAsync(url, params);
  }

  postLocalAPI(url: any, params?: any): Observable<any> {
    return this.httpProxy.postAsync(url, params);
  }

  putLocalAPI(url: any, params?: any): Observable<any> {
    return this.httpProxy.putAsync(url, params);
  }

  deleteLocalAPI(url: any, params?: any): Observable<any> {
    return this.httpProxy.deleteAsync(url, params);
  }
}
