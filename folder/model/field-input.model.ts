import { IStep } from 'app/entities/TestOpsCtrl/api-test/model/step.model';
import { IApiRequest } from 'app/entities/TestOpsCtrl/api-request/model/api-request.model';
import { InputType } from 'app/entities/enumerations/input-type.model';
import { DataSources } from 'app/entities/enumerations/data-sources.model';

export interface IFieldInput {
  id?: number;
  fieldName?: string | null;
  fieldValue?: string | null;
  jsonPath?: string | null;
  type?: InputType | null;
  sources?: DataSources | null;
  isFeed?: boolean | null;
  apiName?: string | null;
  step?: IStep | null;
  apiRequest?: IApiRequest | null;
}

export class FieldInput implements IFieldInput {
  constructor(
    public id?: number,
    public fieldName?: string | null,
    public fieldValue?: string | null,
    public jsonPath?: string | null,
    public type?: InputType | null,
    public sources?: DataSources | null,
    public isFeed?: boolean | null,
    public apiName?: string | null,
    public step?: IStep | null,
    public apiRequest?: IApiRequest | null
  ) {
    this.isFeed = this.isFeed ?? false;
  }
}

export function getFieldInputIdentifier(fieldInput: IFieldInput): number | undefined {
  return fieldInput.id;
}
