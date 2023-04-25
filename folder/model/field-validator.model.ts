import { IStep } from 'app/entities/TestOpsCtrl/api-test/model/step.model';
import { IApiRequest } from 'app/entities/TestOpsCtrl/api-request/model/api-request.model';
import { IFieldInput } from 'app/entities/TestOpsCtrl/api-request/model/field-input.model';
import { IApiResponse } from 'app/entities/TestOpsCtrl/api-request/model/api-response.model';
import { DrivenType } from 'app/entities/enumerations/driven-type.model';
import { DataSources } from 'app/entities/enumerations/data-sources.model';

export interface IFieldValidator {
  id?: number;
  fieldName?: string | null;
  fieldValue?: string | null;
  jsonPath?: string | null;
  type?: DrivenType | null;
  sources?: DataSources | null;
  sourceField?: string | null;
  step?: IStep | null;
  apiRequest?: IApiRequest | null;
  fieldInput?: IFieldInput | null;
  apiResponse?: IApiResponse | null;
}

export class FieldValidator implements IFieldValidator {
  constructor(
    public id?: number,
    public fieldName?: string | null,
    public fieldValue?: string | null,
    public jsonPath?: string | null,
    public type?: DrivenType | null,
    public sources?: DataSources | null,
    public sourceField?: string | null,
    public step?: IStep | null,
    public apiRequest?: IApiRequest | null,
    public fieldInput?: IFieldInput | null,
    public apiResponse?: IApiResponse | null
  ) {}
}

export function getFieldValidatorIdentifier(fieldValidator: IFieldValidator): number | undefined {
  return fieldValidator.id;
}
