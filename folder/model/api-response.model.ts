import { IApiRequest } from 'app/entities/TestOpsCtrl/api-request/model/api-request.model';

export interface IApiResponse {
  id?: number;
  body?: string | null;
  responseCode?: string | null;
  apiRequest?: IApiRequest | null;
}

export class ApiResponse implements IApiResponse {
  constructor(
    public id?: number,
    public body?: string | null,
    public responseCode?: string | null,
    public apiRequest?: IApiRequest | null
  ) {}
}

export function getApiResponseIdentifier(apiResponse: IApiResponse): number | undefined {
  return apiResponse.id;
}
