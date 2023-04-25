import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ILogDetails, getLogDetailsIdentifier } from '../model/log-details.model';

export type EntityResponseType = HttpResponse<ILogDetails>;
export type EntityArrayResponseType = HttpResponse<ILogDetails[]>;

@Injectable({ providedIn: 'root' })
export class LogDetailsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/log-details', 'testopsctrl');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/log-details', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(logDetails: ILogDetails): Observable<EntityResponseType> {
    return this.http.post<ILogDetails>(this.resourceUrl, logDetails, { observe: 'response' });
  }

  update(logDetails: ILogDetails): Observable<EntityResponseType> {
    return this.http.put<ILogDetails>(`${this.resourceUrl}/${getLogDetailsIdentifier(logDetails) as number}`, logDetails, {
      observe: 'response',
    });
  }

  partialUpdate(logDetails: ILogDetails): Observable<EntityResponseType> {
    return this.http.patch<ILogDetails>(`${this.resourceUrl}/${getLogDetailsIdentifier(logDetails) as number}`, logDetails, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILogDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILogDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILogDetails[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addLogDetailsToCollectionIfMissing(
    logDetailsCollection: ILogDetails[],
    ...logDetailsToCheck: (ILogDetails | null | undefined)[]
  ): ILogDetails[] {
    const logDetails: ILogDetails[] = logDetailsToCheck.filter(isPresent);
    if (logDetails.length > 0) {
      const logDetailsCollectionIdentifiers = logDetailsCollection.map(logDetailsItem => getLogDetailsIdentifier(logDetailsItem)!);
      const logDetailsToAdd = logDetails.filter(logDetailsItem => {
        const logDetailsIdentifier = getLogDetailsIdentifier(logDetailsItem);
        if (logDetailsIdentifier == null || logDetailsCollectionIdentifiers.includes(logDetailsIdentifier)) {
          return false;
        }
        logDetailsCollectionIdentifiers.push(logDetailsIdentifier);
        return true;
      });
      return [...logDetailsToAdd, ...logDetailsCollection];
    }
    return logDetailsCollection;
  }
}
