import { Empty } from '@cedric-demongivert/gl-tool-utils'
import { RavenLeaf } from './RavenLeaf'

/**
 * 
 */
export class RavenWhitespace extends RavenLeaf {
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
export namespace RavenWhitespace {
  /**
   * 
   */
  export function is(node: unknown): node is RavenWhitespace {
    return node instanceof RavenWhitespace
  }

  /**
   * 
   */
  export function create(): RavenWhitespace {
    return new RavenWhitespace()
  }

  /**
   * 
   */
  export function wrap(content: string): RavenWhitespace {
    const result: RavenWhitespace = new RavenWhitespace()
    result.content = content
    return result
  }
}