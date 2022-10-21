import { Empty } from '@cedric-demongivert/gl-tool-utils'
import { RavenNode } from './RavenNode'

/**
 * 
 */
export class RavenTag extends RavenNode {
  /**
   * 
   */
  public tag: string

  /**
   * 
   */
  public identifier: string | null

  /**
   * 
   */
  public readonly classes: Set<string>

  /**
   * 
   */
  public constructor() {
    super()

    this.tag = RavenTag.DEFAULT_TAG
    this.identifier = null
    this.classes = new Set()
  }

  /**
   * 
   */
  public hasAllClass(classes: Iterable<string>): boolean {
    for (const clazz of classes) {
      if (!this.classes.has(clazz)) return false
    }

    return true
  }

  /**
   * 
   */
  public signature(): string {
    let result: string = '\\'
    result += this.tag

    if (this.identifier) {
      result += '#'
      result += this.identifier
    }

    for (const clazz of this.classes) {
      result += '.'
      result += clazz
    }

    return result
  }

  /**
   * 
   */
  public toString(): string {
    return `${this.constructor.name}(${this.signature()}, [${[...this.children()].map(x => x.toString()).join(', ')}])`
  }
}

/**
 * 
 */
export namespace RavenTag {
  /**
   * 
   */
  export function is(node: unknown): node is RavenTag {
    return node instanceof RavenTag
  }

  /**
   * 
   */
  export const DEFAULT_TAG: string = 'block'

  /**
   * 
   */
  export function create(): RavenTag {
    return new RavenTag()
  }
}