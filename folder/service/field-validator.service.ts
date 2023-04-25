import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Search } from 'app/core/request/request.model';
import { IFieldValidator, getFieldValidatorIdentifier } from '../model/field-validator.model';

export type EntityResponseType = HttpResponse<IFieldValidator>;
export type EntityArrayResponseType = HttpResponse<IFieldValidator[]>;

@Injectable({ providedIn: 'root' })
export class FieldValidatorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/field-validators', 'testopsctrl');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/field-validators', 'testopsctrl');
  protected findFieldValidatorsByStepUrl = this.applicationConfigService.getEndpointFor('api/field-validators/step', 'testopsctrl');
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  // create(fieldValidator: IFieldValidator): Observable<EntityResponseType> {
  //   return this.http.post<IFieldValidator>(this.resourceUrl, fieldValidator, { observe: 'response' });
  // }

  create(fieldValidator: any): Observable<EntityResponseType> {
    return this.http.post(this.resourceUrl, fieldValidator, { observe: 'response' });
  }

  // create(fieldInput: any): Observable<EntityResponseType> {
  //   return this.http.post(this.resourceFieldInputUrl, fieldInput, { observe: 'response' });
  // }

  update(fieldValidator: any): Observable<EntityResponseType> {
    return this.http.put<IFieldValidator>(`${this.resourceUrl}/${getFieldValidatorIdentifier(fieldValidator) as number}`, fieldValidator, {
      observe: 'response',
    });
  }

  partialUpdate(fieldValidator: IFieldValidator): Observable<EntityResponseType> {
    return this.http.patch<IFieldValidator>(
      `${this.resourceUrl}/${getFieldValidatorIdentifier(fieldValidator) as number}`,
      fieldValidator,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFieldValidator>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFieldValidator[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFieldValidator[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  putFieldValidators(fieldInput: any): Observable<EntityResponseType> {
    return this.http.put(`${this.resourceUrl}/${fieldInput.id}`, fieldInput, { observe: 'response' });
  }

  getFieldValidatorsDetailsByStep(id: number): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}?stepId.equals=${id}`, { observe: 'response' });
  }

  getFieldValidatorsDetailsByRequest(obj: any): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}?stepId.equals=${obj.stepID}&apiRequestId.equals=${obj.apiID}`, { observe: 'response' });
  }

  addFieldValidatorToCollectionIfMissing(
    fieldValidatorCollection: IFieldValidator[],
    ...fieldValidatorsToCheck: (IFieldValidator | null | undefined)[]
  ): IFieldValidator[] {
    const fieldValidators: IFieldValidator[] = fieldValidatorsToCheck.filter(isPresent);
    if (fieldValidators.length > 0) {
      const fieldValidatorCollectionIdentifiers = fieldValidatorCollection.map(
        fieldValidatorItem => getFieldValidatorIdentifier(fieldValidatorItem)!
      );
      const fieldValidatorsToAdd = fieldValidators.filter(fieldValidatorItem => {
        const fieldValidatorIdentifier = getFieldValidatorIdentifier(fieldValidatorItem);
        if (fieldValidatorIdentifier == null || fieldValidatorCollectionIdentifiers.includes(fieldValidatorIdentifier)) {
          return false;
        }
        fieldValidatorCollectionIdentifiers.push(fieldValidatorIdentifier);
        return true;
      });
      return [...fieldValidatorsToAdd, ...fieldValidatorCollection];
    }
    return fieldValidatorCollection;
  }
}
