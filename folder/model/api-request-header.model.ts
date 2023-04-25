import { IApiRequest } from 'app/entities/TestOpsCtrl/api-request/model/api-request.model';

export interface IApiRequestHeader {
  id?: number;
  key?: string;
  value?: string | null;
  description?: string | null;
  active?: boolean;
  apiRequest?: IApiRequest;
}

export class ApiRequestHeader implements IApiRequestHeader {
  constructor(
    public id?: number,
    public key?: string,
    public value?: string | null,
    public description?: string | null,
    public active?: boolean,
    public apiRequest?: IApiRequest
  ) {
    this.active = this.active ?? false;
  }
}

export function getApiRequestHeaderIdentifier(apiRequestHeader: IApiRequestHeader): number | undefined {
  return apiRequestHeader.id;
}
