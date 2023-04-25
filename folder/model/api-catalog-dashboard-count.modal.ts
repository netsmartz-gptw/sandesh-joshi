export interface IApiCatalogDashboard {
  total?: number;
  totalCatelog?: number;
  active?: number;
  inActive?: number;
  ageing?: number;
}

export class ApiCatalogDashboard implements IApiCatalogDashboard {
  constructor(
    public total?: number,
    public totalCatelog?: number,
    public active?: number,
    public inActive?: number,
    public ageing?: number
  ) {}
}

// export function getApiCollectionsIdentifier(apiCollections: IApiCatalogDashboard): number | undefined {
//   return apiCollections.id;
// }
