import { RavenNode } from "../document"
import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenParentsOperator implements RavenOperator<unknown, RavenNode> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<RavenNode> {
    for (const element of selection) {
      if (element instanceof RavenNode) {
        yield* element.parents()
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

    return other instanceof RavenParentsOperator
  }
}

/**
 * 
 */
export namespace RavenParentsOperator {
  /**
   * 
   */
  export const INSTANCE: RavenParentsOperator = new RavenParentsOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): Iterable<RavenNode> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenParentsOperator {
    return INSTANCE
  }
}