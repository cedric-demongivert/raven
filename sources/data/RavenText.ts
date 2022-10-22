import { RavenLeaf } from '../tree/RavenLeaf'
import { RavenData } from './RavenData'

/**
 * 
 */
export class RavenText extends RavenLeaf implements RavenData {
  /**
   * 
   */
  public readonly words: Array<string>

  /**
   * 
   */
  public margin: boolean

  /**
   * 
   */
  public constructor() {
    super()
    this.words = []
    this.margin = false
  }

  /**
   * 
   */
  public toString(): string {
    return `${this.constructor.name}(${this.words.join(', ')}, ${this.margin})`
  }
}

/**
 * 
 */
export namespace RavenText {
  /**
   * 
   */
  export function is(node: unknown): node is RavenText {
    return node instanceof RavenText
  }

  /**
   * 
   */
  export function create(): RavenText {
    return new RavenText()
  }
}