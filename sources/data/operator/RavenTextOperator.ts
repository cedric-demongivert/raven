import { RavenOperator } from "../../operator/RavenOperator"
import { RavenNode } from "../../tree/RavenNode"

import { RavenTextVisitor } from "../RavenTextVisitor"

/**
 * 
 */
export class RavenTextOperator<Element> implements RavenOperator<Element, Exclude<Element, RavenNode> | string> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<unknown>): IterableIterator<Exclude<Element, RavenNode> | string> {
    for (const element of selection) {
      if (RavenNode.is(element)) {
        yield RavenTextVisitor.get().visit(element)
      } else {
        yield element as Exclude<Element, RavenNode>
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
  export const INSTANCE: RavenTextOperator<any> = new RavenTextOperator()

  /**
   * 
   */
  export function apply<Element>(selection: Iterable<Element>): IterableIterator<Exclude<Element, RavenNode> | string> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get<Element>(): RavenTextOperator<Element> {
    return INSTANCE
  }
}