export interface CreatorWindowGateway {
  onCloseRequested(handler: () => void): Promise<() => void>;
  forceClose(): Promise<void>;
}
