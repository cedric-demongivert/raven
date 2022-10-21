import glob from 'glob'

import { RavenBulk } from './RavenBulk'
import { RavenFile } from './RavenFile'

/**
 * 
 */
const OPTIONS: Readonly<glob.IOptions> = {
  nosort: true,
  nodir: true
}

/**
 * 
 */
export class RavenGlob implements RavenBulk {
  /**
   * 
   */
  public readonly pattern: string

  /**
   * 
   */
  public constructor(pattern: string) {
    this.pattern = pattern
  }

  /**
   * @see RavenBulk.size
   */
  public get size(): number {
    return glob.sync(this.pattern, OPTIONS).length
  }

  /**
   * @see RavenBulk.values
   */
  public values(): IterableIterator<RavenFile> {
    return glob.sync(this.pattern, OPTIONS).map(RavenFile.create).values()
  }

  /**
   * @see Iterable[Symbol.iterator]
   */
  public [Symbol.iterator](): IterableIterator<RavenFile> {
    return this.values()
  }

  /**
   * @see RavenBulk.equals
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof RavenGlob) {
      return other.pattern === this.pattern
    }

    return false
  }

  /**
   * @see Object.toString
   */
  public toString(): string {
    return `${this.constructor.name} ${this.pattern} [${this.size} sources]`
  }
}

/**
 * 
 */
export namespace RavenGlob {
  /**
   * 
   */
  export function create(pattern: string): RavenGlob {
    return new RavenGlob(pattern)
  }
}