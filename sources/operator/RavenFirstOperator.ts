import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenFirstOperator<Element> implements RavenOperator<Element> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<Element>): IterableIterator<Element> {
    for (const element of selection) {
      yield element
      return
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

    return other instanceof RavenFirstOperator
  }
}

/**
 * 
 */
export namespace RavenFirstOperator {
  /**
   * 
   */
  export const INSTANCE: RavenFirstOperator<any> = new RavenFirstOperator()

  /**
   * 
   */
  export function apply<Input, Output>(selection: Iterable<Input>): IterableIterator<Output> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get<Element>(): RavenFirstOperator<Element> {
    return INSTANCE
  }
}