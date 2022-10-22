import { RavenOperator } from "../../operator/RavenOperator"
import { RavenSlugifyService } from "../RavenSlugifyService"

/**
 * 
 */
export class RavenSlugifyOperator<Element> implements RavenOperator<Element, Element | string> {
  /**
   * @see RavenOperator.apply
   */
  public * apply(selection: Iterable<Element>): IterableIterator<Element | string> {
    for (const element of selection) {
      if (typeof element === 'string') {
        yield RavenSlugifyService.map(element)
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

    return other instanceof RavenSlugifyOperator
  }
}

/**
 * 
 */
export namespace RavenSlugifyOperator {
  /**
   * 
   */
  export const INSTANCE: RavenSlugifyOperator<any> = new RavenSlugifyOperator()

  /**
   * 
   */
  export function apply<Element>(selection: Iterable<Element>): IterableIterator<Exclude<Element, string> | number> {
    return INSTANCE.apply(selection)
  }

  /**
   * 
   */
  export function get<Element>(): RavenSlugifyOperator<Element> {
    return INSTANCE
  }
}