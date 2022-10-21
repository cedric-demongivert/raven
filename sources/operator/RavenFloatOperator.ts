import { RavenOperator } from "./RavenOperator"
import { RavenTextOperator } from "./RavenTextOperator"

/**
 * 
 */
export class RavenFloatOperator implements RavenOperator<unknown, number> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<number> {
    for (const word of RavenTextOperator.apply(selection)) {
      yield parseFloat(word)
    }
  }

  /**
   * 
   */
  public toString(): string {
    return this.constructor.name
  }

  /**
   * 
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    return other instanceof RavenFloatOperator
  }
}

/**
 * 
 */
export namespace RavenFloatOperator {
  /**
   * 
   */
  export const INSTANCE: RavenFloatOperator = new RavenFloatOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): IterableIterator<number> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenFloatOperator {
    return INSTANCE
  }
}