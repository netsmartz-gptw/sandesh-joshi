import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IFieldInput, getFieldInputIdentifier } from '../model/field-input.model';

export type EntityResponseType = HttpResponse<IFieldInput>;
export type EntityArrayResponseType = HttpResponse<IFieldInput[]>;

@Injectable({ providedIn: 'root' })
export class FieldInputService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/field-input', 'testopsctrl');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/field-inputs', 'testopsctrl');
  protected resourceFieldInputUrlByApiReqId = this.applicationConfigService.getEndpointFor('api/field-inputs/api-request', 'testopsctrl');
  protected resourceFieldInputUrlByStepId = this.applicationConfigService.getEndpointFor('api/field-inputs/step', 'testopsctrl');
  protected resourceFieldInputUrlByRequestId = this.applicationConfigService.getEndpointFor('api/field-inputs', 'testopsctrl');
  protected resourceFieldInputUrl = this.applicationConfigService.getEndpointFor('api/field-inputs', 'testopsctrl');
  protected resourceFieldsUrl = this.applicationConfigService.getEndpointFor('api/fields', 'testopsctrl');
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  // create(fieldInput: IFieldInput): Observable<EntityResponseType> {
  //   return this.http.post<IFieldInput>(this.resourceUrl, fieldInput, { observe: 'response' });
  // }

  create(fieldInput: any): Observable<EntityResponseType> {
    return this.http.post(this.resourceFieldInputUrl, fieldInput, { observe: 'response' });
  }

  createNew(obj: any, id: number): Observable<EntityResponseType> {
    return this.http.post<IFieldInput>(`${this.resourceFieldInputUrl}`, obj, { observe: 'response' });
  }

  /// Use json save data call

  createAdd(obj: any): Observable<EntityResponseType> {
    return this.http.post(this.resourceFieldInputUrl, obj, { observe: 'response' });
  }

  /// Use save data call

  update(fieldInput: any): Observable<EntityResponseType> {
    return this.http.put<IFieldInput>(`${this.resourceFieldInputUrl}/${getFieldInputIdentifier(fieldInput) as number}`, fieldInput, {
      observe: 'response',
    });
  }

  partialUpdate(fieldInput: IFieldInput): Observable<EntityResponseType> {
    return this.http.patch<IFieldInput>(`${this.resourceUrl}/${getFieldInputIdentifier(fieldInput) as number}`, fieldInput, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFieldInput>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFieldInput[]>(this.resourceFieldInputUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFieldInput[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getFieldInputDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.resourceFieldInputUrlByApiReqId}/${id}`, { observe: 'response' });
  }

  getFieldInputDetailsByStep(id: number): Observable<any> {
    return this.http.get<any>(`${this.resourceFieldInputUrlByStepId}/${id}`, { observe: 'response' });
  }

  getFieldInputDetailsByRequest(obj: any): Observable<any> {
    return this.http.get<any>(`${this.resourceFieldInputUrlByRequestId}?stepId.equals=${obj.stepID}&apiRequestId.equals=${obj.apiID}`, {
      observe: 'response',
    });
  }

  createFieldInputs(fieldInput: any): Observable<EntityResponseType> {
    return this.http.put(`${this.resourceFieldInputUrl}`, fieldInput, { observe: 'response' });
  }

  createFields(obj: any): Observable<any> {
    return this.http.post(`${this.resourceFieldsUrl}`, obj, { observe: 'response' });
  }

  deleteFieldInputs(id: any): Observable<any> {
    return this.http.delete(`${this.resourceFieldInputUrl}/${id}`, { observe: 'response' });
  }

  addFieldInputToCollectionIfMissing(
    fieldInputCollection: IFieldInput[],
    ...fieldInputsToCheck: (IFieldInput | null | undefined)[]
  ): IFieldInput[] {
    const fieldInputs: IFieldInput[] = fieldInputsToCheck.filter(isPresent);
    if (fieldInputs.length > 0) {
      const fieldInputCollectionIdentifiers = fieldInputCollection.map(fieldInputItem => getFieldInputIdentifier(fieldInputItem)!);
      const fieldInputsToAdd = fieldInputs.filter(fieldInputItem => {
        const fieldInputIdentifier = getFieldInputIdentifier(fieldInputItem);
        if (fieldInputIdentifier == null || fieldInputCollectionIdentifiers.includes(fieldInputIdentifier)) {
          return false;
        }
        fieldInputCollectionIdentifiers.push(fieldInputIdentifier);
        return true;
      });
      return [...fieldInputsToAdd, ...fieldInputCollection];
    }
    return fieldInputCollection;
  }
}
