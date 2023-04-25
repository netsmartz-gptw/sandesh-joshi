export interface IBuildVersion {
  id?: number;
  name?: string | null;
  description?: string;
}

export class BuildVersion implements IBuildVersion {
  constructor(public id?: number, public name?: string | null, public description?: string) {}
}
