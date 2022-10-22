import { RavenOperator } from "./RavenOperator"

/**
 * 
 */
export class RavenLastOperator<Element> implements RavenOperator<Element> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<Element>): IterableIterator<Element> {
    let result: Element
    let iterator: Iterator<Element> = selection[Symbol.iterator]()
    let iteratorResult: IteratorResult<Element> = iterator.next()

    if (iteratorResult.done) return

    do {
      result = iteratorResult.value
      iteratorResult = iterator.next()
    } while (!iteratorResult.done);

    yield result
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

    return other instanceof RavenLastOperator
  }
}

/**
 * 
 */
export namespace RavenLastOperator {
  /**
   * 
   */
  export const INSTANCE: RavenLastOperator<any> = new RavenLastOperator()

  /**
   * 
   */
  export function apply<Element>(selection: Iterable<Element>): IterableIterator<Element> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get<Element>(): RavenLastOperator<Element> {
    return INSTANCE
  }
}