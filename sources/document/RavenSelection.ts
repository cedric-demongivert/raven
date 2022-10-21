import { Empty } from "@cedric-demongivert/gl-tool-utils"
import { RavenHypertextOperator } from "../hypertext/RavenHypertextOperator"
import { RavenOperator } from "../operator/RavenOperator"
import { RavenSlugifier } from "../RavenSlugifier"

import { RavenNode } from "./RavenNode"
import { RavenTag } from "./RavenTag"
import { RavenWord } from "./RavenWord"

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
      RavenOperator.all().apply(this.elements)
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
  public parent(): RavenSelection<RavenNode> {
    return this.select(RavenOperator.parent())
  }

  /**
   * 
   */
  public next(): RavenSelection<RavenNode> {
    return this.select(RavenOperator.next())
  }

  /**
   * 
   */
  public previous(): RavenSelection<RavenNode> {
    return this.select(RavenOperator.previous())
  }

  /**
   * 
   */
  public children(): RavenSelection<RavenNode> {
    return this.select(RavenOperator.children())
  }

  /**
   * 
   */
  public parents(): RavenSelection<RavenNode> {
    return this.select(RavenOperator.parents())
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
  public all(): RavenSelection<RavenNode> {
    return this.select(RavenOperator.all())
  }

  /**
   * 
   */
  public forward(): RavenSelection<RavenNode> {
    return this.select(RavenOperator.forward())
  }

  /**
   * 
   */
  public backward(): RavenSelection<RavenNode> {
    return this.select(RavenOperator.backward())
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
  public words(): RavenSelection<RavenWord> {
    return this.select(RavenOperator.word())
  }

  /**
   * 
   */
  public text(): RavenSelection<string> {
    return this.select(RavenOperator.text())
  }

  /**
   * 
   */
  public ints(): RavenSelection<number> {
    return this.select(RavenOperator.int())
  }

  /**
   * 
   */
  public floats(): RavenSelection<number> {
    return this.select(RavenOperator.float())
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
  public slug(): string | undefined {
    const iterator: Iterator<string> = RavenOperator.text().apply(this.elements)
    let iteratorResult: IteratorResult<string> = iterator.next()

    if (iteratorResult.done) {
      return undefined
    }

    let result: string = iteratorResult.value
    iteratorResult = iterator.next()

    while (!iteratorResult.done) {
      result += '-'
      result += iteratorResult.value
      iteratorResult = iterator.next()
    }

    return RavenSlugifier.map(result)
  }


  /**
   * 
   */
  public tags(): RavenSelection<RavenTag> {
    return this.select(RavenOperator.tags())
  }

  /**
   * 
   */
  public clazz(identifier: string): RavenSelection<RavenTag> {
    return this.select(RavenOperator.clazz(identifier))
  }

  /**
   * 
   */
  public identifier(identifier: string): RavenSelection<RavenTag> {
    return this.select(RavenOperator.identifier(identifier))
  }

  /**
   * 
   */
  public tag(identifier: string): RavenSelection<RavenTag> {
    return this.select(RavenOperator.tag(identifier))
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
  export function only<Element>(element: Element): RavenSelection<Element> {
    const selection: RavenSelection<Element> = new RavenSelection()
    selection.elements.push(element)
    return selection
  }
}