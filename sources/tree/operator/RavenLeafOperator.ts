import { RavenOperator } from "../../operator/RavenOperator"
import { RavenLeaf } from "../RavenLeaf"

/**
 * 
 */
export class RavenLeafOperator implements RavenOperator<unknown, RavenLeaf> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<RavenLeaf> {
    for (const element of selection) {
      if (RavenLeaf.is(element)) {
        yield element
      }
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

    return other instanceof RavenLeafOperator
  }
}

/**
 * 
 */
export namespace RavenLeafOperator {
  /**
   * 
   */
  export const INSTANCE: RavenLeafOperator = new RavenLeafOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): IterableIterator<RavenLeaf> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenLeafOperator {
    return INSTANCE
  }
}