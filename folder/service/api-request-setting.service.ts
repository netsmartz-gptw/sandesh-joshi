import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApiRequestSetting, getApiRequestSettingIdentifier } from '../model/api-request-setting.model';

export type EntityResponseType = HttpResponse<IApiRequestSetting>;
export type EntityArrayResponseType = HttpResponse<IApiRequestSetting[]>;

@Injectable({ providedIn: 'root' })
export class ApiRequestSettingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-request-settings', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(apiRequestSetting: IApiRequestSetting): Observable<EntityResponseType> {
    return this.http.post<IApiRequestSetting>(this.resourceUrl, apiRequestSetting, { observe: 'response' });
  }

  update(apiRequestSetting: IApiRequestSetting): Observable<EntityResponseType> {
    return this.http.put<IApiRequestSetting>(
      `${this.resourceUrl}/${getApiRequestSettingIdentifier(apiRequestSetting) as number}`,
      apiRequestSetting,
      { observe: 'response' }
    );
  }

  partialUpdate(apiRequestSetting: IApiRequestSetting): Observable<EntityResponseType> {
    return this.http.patch<IApiRequestSetting>(
      `${this.resourceUrl}/${getApiRequestSettingIdentifier(apiRequestSetting) as number}`,
      apiRequestSetting,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApiRequestSetting>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApiRequestSetting[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addApiRequestSettingToCollectionIfMissing(
    apiRequestSettingCollection: IApiRequestSetting[],
    ...apiRequestSettingsToCheck: (IApiRequestSetting | null | undefined)[]
  ): IApiRequestSetting[] {
    const apiRequestSettings: IApiRequestSetting[] = apiRequestSettingsToCheck.filter(isPresent);
    if (apiRequestSettings.length > 0) {
      const apiRequestSettingCollectionIdentifiers = apiRequestSettingCollection.map(
        apiRequestSettingItem => getApiRequestSettingIdentifier(apiRequestSettingItem)!
      );
      const apiRequestSettingsToAdd = apiRequestSettings.filter(apiRequestSettingItem => {
        const apiRequestSettingIdentifier = getApiRequestSettingIdentifier(apiRequestSettingItem);
        if (apiRequestSettingIdentifier == null || apiRequestSettingCollectionIdentifiers.includes(apiRequestSettingIdentifier)) {
          return false;
        }
        apiRequestSettingCollectionIdentifiers.push(apiRequestSettingIdentifier);
        return true;
      });
      return [...apiRequestSettingsToAdd, ...apiRequestSettingCollection];
    }
    return apiRequestSettingCollection;
  }
}
