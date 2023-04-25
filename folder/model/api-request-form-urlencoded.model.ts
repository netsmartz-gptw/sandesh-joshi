import { IApiRequest } from 'app/entities/TestOpsCtrl/api-request/model/api-request.model';

export interface IApiRequestFormUrlencoded {
  id?: number;
  key?: string;
  value?: string | null;
  description?: string | null;
  active?: boolean;
  urlEncode?: boolean | null;
  contentType?: string | null;
  apiRequest?: IApiRequest;
}

export class ApiRequestFormUrlencoded implements IApiRequestFormUrlencoded {
  constructor(
    public id?: number,
    public key?: string,
    public value?: string | null,
    public description?: string | null,
    public active?: boolean,
    public urlEncode?: boolean | null,
    public contentType?: string | null,
    public apiRequest?: IApiRequest
  ) {
    this.active = this.active ?? false;
    this.urlEncode = this.urlEncode ?? false;
  }
}

export function getApiRequestFormUrlencodedIdentifier(apiRequestFormUrlencoded: IApiRequestFormUrlencoded): number | undefined {
  return apiRequestFormUrlencoded.id;
}
