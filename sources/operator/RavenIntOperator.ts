import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenIntOperator<Element> implements RavenOperator<Element, Exclude<Element, string> | number> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<Element>): IterableIterator<Exclude<Element, string> | number> {
    for (const element of selection) {
      if (typeof element === 'string') {
        yield parseInt(element)
      } else {
        yield element as Exclude<Element, string>
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
  export const INSTANCE: RavenIntOperator<any> = new RavenIntOperator()

  /**
   * 
   */
  export function apply<Element>(selection: Iterable<Element>): IterableIterator<Exclude<Element, string> | number> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get<Element>(): RavenIntOperator<Element> {
    return INSTANCE
  }
}