import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenFloatOperator<Element> implements RavenOperator<Element, Exclude<Element, string> | number> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<Element>): IterableIterator<Exclude<Element, string> | number> {
    for (const element of selection) {
      if (typeof element === 'string') {
        yield parseFloat(element)
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

    return other instanceof RavenFloatOperator
  }
}

/**
 * 
 */
export namespace RavenFloatOperator {
  /**
   * 
   */
  export const INSTANCE: RavenFloatOperator<any> = new RavenFloatOperator()

  /**
   * 
   */
  export function apply<Element>(selection: Iterable<Element>): IterableIterator<Exclude<Element, string> | number> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get<Element>(): RavenFloatOperator<Element> {
    return INSTANCE
  }
}