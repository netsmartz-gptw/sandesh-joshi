import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IOperations, getOperationsIdentifier } from '../model/operations.model';

export type EntityResponseType = HttpResponse<IOperations>;
export type EntityArrayResponseType = HttpResponse<IOperations[]>;

@Injectable({ providedIn: 'root' })
export class OperationsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/operations', 'testopsctrl');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/operations', 'testopsctrl');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(operations: IOperations): Observable<EntityResponseType> {
    return this.http.post<IOperations>(this.resourceUrl, operations, { observe: 'response' });
  }

  update(operations: IOperations): Observable<EntityResponseType> {
    return this.http.put<IOperations>(`${this.resourceUrl}/${getOperationsIdentifier(operations) as number}`, operations, {
      observe: 'response',
    });
  }

  partialUpdate(operations: IOperations): Observable<EntityResponseType> {
    return this.http.patch<IOperations>(`${this.resourceUrl}/${getOperationsIdentifier(operations) as number}`, operations, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOperations>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOperations[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOperations[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addOperationsToCollectionIfMissing(
    operationsCollection: IOperations[],
    ...operationsToCheck: (IOperations | null | undefined)[]
  ): IOperations[] {
    const operations: IOperations[] = operationsToCheck.filter(isPresent);
    if (operations.length > 0) {
      const operationsCollectionIdentifiers = operationsCollection.map(operationsItem => getOperationsIdentifier(operationsItem)!);
      const operationsToAdd = operations.filter(operationsItem => {
        const operationsIdentifier = getOperationsIdentifier(operationsItem);
        if (operationsIdentifier == null || operationsCollectionIdentifiers.includes(operationsIdentifier)) {
          return false;
        }
        operationsCollectionIdentifiers.push(operationsIdentifier);
        return true;
      });
      return [...operationsToAdd, ...operationsCollection];
    }
    return operationsCollection;
  }
}
