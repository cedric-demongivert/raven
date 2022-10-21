import { RavenInput } from './RavenInput'

/**
 * 
 */
export class RavenEmpty implements RavenInput {
  /**
   * @see Comparable.equals
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    return other instanceof RavenEmpty
  }

  /**
   * 
   */
  public toString(): string {
    return `${this.constructor.name}`
  }
}

/**
 * 
 */
export namespace RavenEmpty {
  /**
   * 
   */
  export const INSTANCE: RavenEmpty = new RavenEmpty()

  /**
   * 
   */
  export function create(): RavenEmpty {
    return INSTANCE
  }
}