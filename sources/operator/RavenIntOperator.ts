import { RavenOperator } from "./RavenOperator"
import { RavenTextOperator } from "./RavenTextOperator"

/**
 * 
 */
export class RavenIntOperator implements RavenOperator<unknown, number> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<number> {
    for (const word of RavenTextOperator.apply(selection)) {
      yield parseInt(word)
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

    return other instanceof RavenIntOperator
  }
}

/**
 * 
 */
export namespace RavenIntOperator {
  /**
   * 
   */
  export const INSTANCE: RavenIntOperator = new RavenIntOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): IterableIterator<number> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenIntOperator {
    return INSTANCE
  }
}