import fileSystem from 'fs'
import path from 'path'

import { RavenCompiler } from "./compiler/RavenCompiler"
import { RavenNode } from "./document/RavenNode"
import { RavenSelection } from "./document/RavenSelection"
import { RavenTag } from "./document/RavenTag"
import { RavenWord } from './document/RavenWord'
import { RavenOperator } from "./operator/RavenOperator"
import { RavenHTMLPostprocess } from './RavenHTMLPostprocess'

/**
 * 
 */
const MKDIR_OPTIONS = {
  recursive: true
}

/**
 * 
 */
export class RavenSelectionContext<Element> {
  /**
   * 
   */
  public readonly selection: RavenSelection<Element>

  /**
   * 
   */
  public constructor(selection: RavenSelection<Element>) {
    this.selection = selection
  }


  /**
   * 
   */
  public select<Output>(operator: RavenOperator<RavenNode, Output> | string): RavenSelectionContext<Output> {
    return new RavenSelectionContext(this.selection.select(operator))
  }

  /**
   * 
   */
  public apply<Output>(operator: RavenOperator<Element, Output> | string): RavenSelectionContext<Output> {
    return new RavenSelectionContext(this.selection.apply(operator))
  }

  /**
   * 
   */
  public join(glue: string): string {
    return this.selection.join(glue)
  }

  /**
   * 
   */
  public parent(): RavenSelectionContext<RavenNode> {
    return this.select(RavenOperator.parent())
  }

  /**
   * 
   */
  public next(): RavenSelectionContext<RavenNode> {
    return this.select(RavenOperator.next())
  }

  /**
   * 
   */
  public previous(): RavenSelectionContext<RavenNode> {
    return this.select(RavenOperator.previous())
  }

  /**
   * 
   */
  public children(): RavenSelectionContext<RavenNode> {
    return this.select(RavenOperator.children())
  }

  /**
   * 
   */
  public parents(): RavenSelectionContext<RavenNode> {
    return this.select(RavenOperator.parents())
  }

  /**
   * 
   */
  public * each(): IterableIterator<RavenSelectionContext<Element>> {
    for (const subSelection of this.selection.each()) {
      yield new RavenSelectionContext(subSelection)
    }
  }

  /**
   * 
   */
  public all(): RavenSelectionContext<RavenNode> {
    return this.select(RavenOperator.all())
  }

  /**
   * 
   */
  public forward(): RavenSelectionContext<RavenNode> {
    return this.select(RavenOperator.forward())
  }

  /**
   * 
   */
  public backward(): RavenSelectionContext<RavenNode> {
    return this.select(RavenOperator.backward())
  }

  /**
   * 
   */
  public first(): RavenSelectionContext<Element> {
    return new RavenSelectionContext(this.selection.first())
  }

  /**
   * 
   */
  public last(): RavenSelectionContext<Element> {
    return new RavenSelectionContext(this.selection.last())
  }

  /**
   * 
   */
  public words(): RavenSelectionContext<RavenWord> {
    return new RavenSelectionContext(this.selection.words())
  }

  /**
   * 
   */
  public text(): RavenSelectionContext<string> {
    return new RavenSelectionContext(this.selection.text())
  }

  /**
   * 
   */
  public ints(): RavenSelectionContext<number> {
    return new RavenSelectionContext(this.selection.ints())
  }

  /**
   * 
   */
  public floats(): RavenSelectionContext<number> {
    return new RavenSelectionContext(this.selection.floats())
  }

  /**
   * 
   */
  public hypertext(): RavenSelectionContext<string> {
    return new RavenSelectionContext(this.selection.hypertext())
  }

  /**
   * 
   */
  public slug(): string | undefined {
    return this.selection.slug()
  }

  /**
   * 
   */
  public tags(): RavenSelectionContext<RavenTag> {
    return this.select(RavenOperator.tags())
  }

  /**
   * 
   */
  public clazz(identifier: string): RavenSelectionContext<RavenTag> {
    return this.select(RavenOperator.clazz(identifier))
  }

  /**
   * 
   */
  public identifier(identifier: string): RavenSelectionContext<RavenTag> {
    return this.select(RavenOperator.identifier(identifier))
  }

  /**
   * 
   */
  public tag(identifier: string): RavenSelectionContext<RavenTag> {
    return this.select(RavenOperator.tag(identifier))
  }

  /**
   * @see Sequence.has
   */
  public has(element: Element): boolean {
    return this.selection.has(element)
  }

  /**
   * @see Sequence.values
   */
  public values(): IterableIterator<Element> {
    return this.selection.values()
  }

  /**
   * @see Iterable
   */
  public [Symbol.iterator](): IterableIterator<Element> {
    return this.selection.values()
  }

  /**
   * @see Sequence.get
   */
  public get(index: number = 0): Element {
    return this.selection.get(index)
  }

  /**
   * 
   */
  public compile(compiler: RavenCompiler, output: string): void {
    const source: string = RavenHTMLPostprocess.apply(compiler.compile(this.selection))
    fileSystem.mkdirSync(path.dirname(output), MKDIR_OPTIONS)
    fileSystem.writeFileSync(output, source)
  }
}

/**
 * 
 */
export namespace RavenSelectionContext {
  /**
   * 
   */
  export function create<Element>(selection: RavenSelection<Element>): RavenSelectionContext<Element> {
    return new RavenSelectionContext(selection)
  }
}