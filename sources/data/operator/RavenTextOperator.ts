import { RavenOperator } from "../../operator/RavenOperator"
import { RavenNode } from "../../tree/RavenNode"

import { RavenTextVisitor } from "../RavenTextVisitor"

/**
 * 
 */
export class RavenTextOperator implements RavenOperator<unknown, string> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<string> {
    for (const element of selection) {
      if (RavenNode.is(element)) {
        yield RavenTextVisitor.get().visit(element)
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

    return other instanceof RavenTextOperator
  }
}

/**
 * 
 */
export namespace RavenTextOperator {
  /**
   * 
   */
  export const INSTANCE: RavenTextOperator = new RavenTextOperator()

  /**
   * 
   */
  export function apply(selection: Iterable<unknown>): IterableIterator<string> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get(): RavenTextOperator {
    return INSTANCE
  }
}