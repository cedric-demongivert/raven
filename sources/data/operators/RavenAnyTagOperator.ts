import { RavenNode, RavenTag } from "../document"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenAnyTagOperator implements RavenOperator<unknown, RavenTag> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<RavenTag> {
    for (const element of selection) {
      if (element instanceof RavenTag) {
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

    return other instanceof RavenAnyTagOperator
  }
}

/**
 * 
 */
export namespace RavenAnyTagOperator {
  /**
   * 
   */
  export const INSTANCE: RavenAnyTagOperator = new RavenAnyTagOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenAnyTagOperator {
    return INSTANCE
  }
}