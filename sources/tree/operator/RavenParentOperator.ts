import { RavenOperator } from "../../operator/RavenOperator"
import { RavenNode } from "../RavenNode"

/**
 * 
 */
export class RavenParentOperator implements RavenOperator<unknown, RavenNode> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    for (const element of selection) {
      if (RavenNode.is(element) && element.parent) {
        yield element.parent
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

    return other instanceof RavenParentOperator
  }
}

/**
 * 
 */
export namespace RavenParentOperator {
  /**
   * 
   */
  export const INSTANCE: RavenParentOperator = new RavenParentOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenParentOperator {
    return INSTANCE
  }
}