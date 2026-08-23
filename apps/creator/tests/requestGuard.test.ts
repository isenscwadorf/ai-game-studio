import { describe, expect, it } from 'vitest';
import { RequestGuard } from '../src/state/requestGuard';

function deferred<T>() {
  let resolve: (value: T) => void = () => undefined;
  const promise = new Promise<T>((next) => { resolve = next; });
  return { promise, resolve };
}

describe('request guard', () => {
  it('marks a deferred completion stale after unmount invalidation and accepts the next request', async () => {
    const guard = new RequestGuard();
    const stale = guard.begin();
    const staleResult = deferred<'stale'>();
    const currentResult = deferred<'current'>();

    guard.invalidate();
    const current = guard.begin();
    staleResult.resolve('stale');
    await staleResult.promise;

    expect(guard.isCurrent(stale!)).toBe(false);
    currentResult.resolve('current');
    await currentResult.promise;
    expect(guard.isCurrent(current!)).toBe(true);
  });
});
