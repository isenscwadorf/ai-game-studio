export class RequestGuard {
  private activeRequest: number | null = null;
  private generation = 0;

  begin(): number | null {
    if (this.activeRequest !== null) {
      return null;
    }
    this.generation += 1;
    this.activeRequest = this.generation;
    return this.activeRequest;
  }

  isCurrent(request: number): boolean {
    return this.activeRequest === request && this.generation === request;
  }

  finish(request: number): boolean {
    if (!this.isCurrent(request)) {
      return false;
    }
    this.activeRequest = null;
    return true;
  }

  invalidate(): void {
    this.generation += 1;
    this.activeRequest = null;
  }
}
