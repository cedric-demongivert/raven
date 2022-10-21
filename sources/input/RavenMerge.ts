import { Sequence } from '@cedric-demongivert/gl-tool-collection'
import { Empty } from '@cedric-demongivert/gl-tool-utils'

import { RavenInput } from './RavenInput'
import { RavenBulk } from './RavenBulk'

/**
 * 
 */
export class RavenMerge implements RavenBulk {
  /**
   * 
   */
  public readonly blobs: Sequence<RavenInput>

  /**
   * 
   */
  public constructor(blobs: Iterable<RavenInput>) {
    this.blobs = Sequence.array([...blobs])
  }

  /**
   * @see RavenBulk.size
   */
  public get size(): number {
    return this.blobs.size
  }

  /**
   * @see RavenBulk.values
   */
  public * values(): IterableIterator<RavenInput> {
    return this.blobs.values()
  }

  /**
   * @see Iterable[Symbol.iterator]
   */
  public [Symbol.iterator](): IterableIterator<RavenInput> {
    return this.blobs.values()
  }

  /**
   * @see RavenBulk.equals
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof RavenMerge) {
      return this.blobs.equals(other.blobs)
    }

    return false
  }

  /**
   * @see Object.toString
   */
  public toString(): string {
    return `${this.constructor.name} [${this.blobs.size} sources]`
  }
}

/**
 * 
 */
export namespace RavenMerge {
  /**
   * 
   */
  export const EMPTY: RavenMerge = new RavenMerge(Empty.ARRAY)

  /**
   * 
   */
  export function empty(): RavenMerge {
    return EMPTY
  }

  /**
   * 
   */
  export function create(blobs: Iterable<RavenInput>): RavenMerge {
    return new RavenMerge(blobs)
  }

  /**
   * 
   */
  export function of(...blobs: Array<RavenInput>): RavenMerge {
    return new RavenMerge(blobs)
  }
}