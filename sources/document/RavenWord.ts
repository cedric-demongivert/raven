import { Empty } from '@cedric-demongivert/gl-tool-utils'
import { RavenLeaf } from './RavenLeaf'
import { RavenNode } from './RavenNode'

/**
 * 
 */
export class RavenWord extends RavenLeaf {
  /**
   * 
   */
  public content: string

  /**
   * 
   */
  public constructor() {
    super()
    this.content = Empty.STRING
  }

  /**
   * 
   */
  public toString(): string {
    return `${this.constructor.name}(${this.content})`
  }
}

/**
 * 
 */
export namespace RavenWord {
  /**
   * 
   */
  export function is(node: unknown): node is RavenWord {
    return node instanceof RavenWord
  }

  /**
   * 
   */
  export function create(): RavenWord {
    return new RavenWord()
  }

  /**
   * 
   */
  export function wrap(content: string): RavenWord {
    const result: RavenWord = new RavenWord()
    result.content = content
    return result
  }
}