import { RavenOperator } from "../../operator/RavenOperator"
import { RavenNode } from "../RavenNode"

/**
 * 
 */
export class RavenNextOperator<Element> implements RavenOperator<Element, Element | RavenNode> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<Element>): IterableIterator<Element | RavenNode> {
    for (const element of selection) {
      if (RavenNode.is(element) && element.next) {
        yield element.next
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

    return other instanceof RavenNextOperator
  }
}

/**
 * 
 */
export namespace RavenNextOperator {
  /**
   * 
   */
  export const INSTANCE: RavenNextOperator<any> = new RavenNextOperator()

  /**
   * 
   */
  export function apply<Element>(selection: Iterable<Element>): IterableIterator<Element | RavenNode> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get<Element>(): RavenNextOperator<Element> {
    return INSTANCE
  }
}