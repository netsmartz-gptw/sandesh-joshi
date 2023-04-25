import { DevelopmentStrategy } from 'app/entities/enumerations/development-strategy.model';
import { PrimaryTechnology } from 'app/entities/enumerations/primary-technology.model';
import { ApplicationType } from 'app/entities/enumerations/application-type.model';

export interface IProject {
  id?: number;
  name?: string;
  description?: string | null;
  developmentStrategy?: DevelopmentStrategy | null;
  primaryTechnology?: PrimaryTechnology | null;
  applicationType?: ApplicationType | null;
}

export class Project implements IProject {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public developmentStrategy?: DevelopmentStrategy | null,
    public primaryTechnology?: PrimaryTechnology | null,
    public applicationType?: ApplicationType | null
  ) {}
}

export function getProjectIdentifier(project: IProject): number | undefined {
  return project.id;
}
