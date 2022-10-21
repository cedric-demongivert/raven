import paths from 'path'

import { RavenInput } from './RavenInput'

/**
 * 
 */
export class RavenFile implements RavenInput {
  /**
   * 
   */
  public readonly path: string

  /**
   * 
   */
  public constructor(path: string) {
    this.path = paths.resolve(path)
  }

  /**
   * @see Comparable.equals
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof RavenFile) {
      return other.path === this.path
    }

    return false
  }

  /**
   * 
   */
  public toString(): string {
    return `${this.constructor.name} file://${this.path}`
  }
}

/**
 * 
 */
export namespace RavenFile {
  /**
   * 
   */
  export function create(path: string): RavenFile {
    return new RavenFile(path)
  }
}