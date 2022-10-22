import { Constructor, Empty } from "@cedric-demongivert/gl-tool-utils"
import { RavenHypertextOperator } from "./hypertext/RavenHypertextOperator"
import { RavenNodeOperators } from "./tree/operator/RavenNodeOperators"
import { RavenDataOperators } from "./data/operator/RavenDataOperators"
import { RavenOperator } from "./operator/RavenOperator"

import { RavenNode } from "./tree/RavenNode"
import { RavenTag } from "./data/RavenTag"
import { RavenSlugifyOperator } from "./service/operator/RavenSlugifyOperator"

/**
 * 
 */
export class RavenSelection<Element> {
  /**
   * 
   */
  public readonly elements: Array<Element>

  /**
   * 
   */
  public get size(): number {
    return this.elements.length
  }

  /**
   * 
   */
  public constructor(elements: Iterable<Element> = Empty.ARRAY) {
    this.elements = [...elements]
  }

  /**
   * 
   */
  public select<Output>(operator: RavenOperator<RavenNode, Output> | string): RavenSelection<Output> {
    return new RavenSelection(RavenOperator.toOperator(operator).apply(
      RavenNodeOperators.all().apply(this.elements)
    ))
  }

  /**
   * 
   */
  public apply<Output>(operator: RavenOperator<Element, Output> | string): RavenSelection<Output> {
    return new RavenSelection(RavenOperator.toOperator(operator).apply(this.elements))
  }

  /**
   * 
   */
  public join(glue: string): string {
    return this.elements.join(glue)
  }

  /**
   * 
   */
  public parent(): RavenSelection<Element | RavenNode> {
    return this.apply(RavenNodeOperators.parent())
  }

  /**
   * 
   */
  public next(): RavenSelection<Element | RavenNode> {
    return this.apply(RavenNodeOperators.next())
  }

  /**
   * 
   */
  public previous(): RavenSelection<Element | RavenNode> {
    return this.apply(RavenNodeOperators.previous())
  }

  /**
   * 
   */
  public children(): RavenSelection<Element | RavenNode> {
    return this.apply(RavenNodeOperators.children())
  }

  /**
   * 
   */
  public parents(): RavenSelection<Element | RavenNode> {
    return this.apply(RavenNodeOperators.parents())
  }

  /**
   * 
   */
  public * each(): IterableIterator<RavenSelection<Element>> {
    //const selection: RavenSelection<Element> = new RavenSelection()

    for (const element of this.elements) {
      //selection.elements[0] = element
      yield RavenSelection.only(element)
    }
  }

  /**
   * 
   */
  public all(): RavenSelection<Element | RavenNode> {
    return this.apply(RavenNodeOperators.all())
  }

  /**
   * 
   */
  public forward(): RavenSelection<Element | RavenNode> {
    return this.apply(RavenNodeOperators.forward())
  }

  /**
   * 
   */
  public backward(): RavenSelection<Element | RavenNode> {
    return this.apply(RavenNodeOperators.backward())
  }

  /**
   * 
   */
  public first(): RavenSelection<Element> {
    const result: RavenSelection<Element> = new RavenSelection<Element>()

    if (this.elements.length > 0) {
      result.elements.push(this.elements[0])
    }

    return result
  }

  /**
   * 
   */
  public last(): RavenSelection<Element> {
    const result: RavenSelection<Element> = new RavenSelection<Element>()

    if (this.elements.length > 0) {
      result.elements.push(this.elements[this.elements.length - 1])
    }

    return result
  }

  /**
   * 
   */
  public text(): RavenSelection<Exclude<Element, RavenNode> | string> {
    return this.apply(RavenDataOperators.text())
  }

  /**
   * 
   */
  public ints(): RavenSelection<Exclude<Element, string> | number> {
    return this.apply(RavenOperator.int())
  }

  /**
   * 
   */
  public floats(): RavenSelection<Exclude<Element, string> | number> {
    return this.apply(RavenOperator.float())
  }

  /**
   * 
   */
  public hypertext(): RavenSelection<string> {
    return this.apply(RavenHypertextOperator.INSTANCE)
  }

  /**
   * 
   */
  public slugify(): RavenSelection<Element | string> {
    return this.apply(RavenSlugifyOperator.get())
  }

  /**
   * 
   */
  public clazz(identifier: string): RavenSelection<Element | RavenTag> {
    return this.apply(RavenDataOperators.clazz(identifier))
  }

  /**
   * 
   */
  public identifier(identifier: string): RavenSelection<Element | RavenTag> {
    return this.apply(RavenDataOperators.identifier(identifier))
  }

  /**
   * 
   */
  public tag(identifier: string): RavenSelection<Element | RavenTag> {
    return this.apply(RavenDataOperators.tag(identifier))
  }

  /**
   * 
   */
  public instanceOf<Output>(type: Constructor<Output>): RavenSelection<Output> {
    return this.apply(RavenOperator.instanceOf(type))
  }

  /**
   * 
   */
  public none<Output>(): RavenSelection<Output> {
    return new RavenSelection()
  }

  /**
   * @see Sequence.has
   */
  public has(element: Element): boolean {
    return this.elements.indexOf(element) >= 0
  }

  /**
   * @see Sequence.values
   */
  public values(): IterableIterator<Element> {
    return this.elements.values()
  }

  /**
   * @see Iterable
   */
  public [Symbol.iterator](): IterableIterator<Element> {
    return this.elements.values()
  }

  /**
   * @see Sequence.get
   */
  public get(index: number = 0): Element {
    return this.elements[index]
  }

  /**
   * @see Comparable.equals
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof RavenSelection) {
      if (other.elements.length !== this.elements.length) return false

      for (let index = 0, size = this.elements.length; index < size; ++index) {
        if (other.elements[index] !== this.elements[index]) return false
      }

      return true
    }

    return false
  }
}

/**
 * 
 */
export namespace RavenSelection {
  /**
   * 
   */
  export function create<Element>(elements: Iterable<Element>): RavenSelection<Element> {
    return new RavenSelection(elements)
  }

  /**
   * 
   */
  export function empty<Element>(): RavenSelection<Element> {
    return new RavenSelection()
  }

  /**
   * 
   */
  export function only<Element>(element: Element): RavenSelection<Element> {
    const selection: RavenSelection<Element> = new RavenSelection()
    selection.elements.push(element)
    return selection
  }
}