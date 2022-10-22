import { RavenOperator } from "../../operator/RavenOperator"
import { RavenNode } from "../RavenNode"

/**
 * 
 */
export class RavenParentsOperator<Element> implements RavenOperator<Element, Element | RavenNode> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<Element>): IterableIterator<Element | RavenNode> {
    for (const element of selection) {
      if (RavenNode.is(element)) {
        yield* element.parents()
      } else {
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
  export const INSTANCE: RavenParentsOperator<any> = new RavenParentsOperator()

  /**
   * 
   */
  export function apply<Element>(selection: Iterable<Element>): Iterable<Element | RavenNode> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get<Element>(): RavenParentsOperator<Element> {
    return INSTANCE
  }
}