import { IApiRequest } from 'app/entities/TestOpsCtrl/api-request/model/api-request.model';
import { FormDataType } from 'app/entities/enumerations/form-data-type.model';

export interface IApiRequestFormData {
  id?: number;
  key?: string;
  value?: string | null;
  description?: string | null;
  active?: boolean;
  binaryContentType?: string | null;
  binary?: string | null;
  type?: FormDataType | null;
  urlEncode?: boolean | null;
  contentType?: string | null;
  apiRequest?: IApiRequest;
}

export class ApiRequestFormData implements IApiRequestFormData {
  constructor(
    public id?: number,
    public key?: string,
    public value?: string | null,
    public description?: string | null,
    public active?: boolean,
    public binaryContentType?: string | null,
    public binary?: string | null,
    public type?: FormDataType | null,
    public urlEncode?: boolean | null,
    public contentType?: string | null,
    public apiRequest?: IApiRequest
  ) {
    this.active = this.active ?? false;
    this.urlEncode = this.urlEncode ?? false;
  }
}

export function getApiRequestFormDataIdentifier(apiRequestFormData: IApiRequestFormData): number | undefined {
  return apiRequestFormData.id;
}
