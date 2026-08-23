import type { ProjectSnapshot } from '../domain/projectTypes';

export interface ProjectGateway {
  chooseParentDirectory(): Promise<string | null>;
  chooseProjectDirectory(): Promise<string | null>;
  createProject(parentDir: string, folderName: string, snapshot: ProjectSnapshot): Promise<ProjectSnapshot>;
  openProject(projectDir: string): Promise<ProjectSnapshot>;
  saveProject(snapshot: ProjectSnapshot): Promise<ProjectSnapshot>;
}
