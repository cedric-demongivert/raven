import { UnidocURI } from '@cedric-demongivert/unidoc'
import { RavenNode } from '../tree/RavenNode'

/**
 * 
 */
export class RavenSource extends RavenNode {
  /**
   * 
   */
  public readonly uri: UnidocURI

  /**
   * 
   */
  public constructor() {
    super()
    this.uri = new UnidocURI()
  }

  /**
   * 
   */
  public toString(): string {
    return `${this.constructor.name}(${this.uri.toString()}, [${[...this.children()].map(x => x.toString()).join(', ')}])`
  }
}

/**
 * 
 */
export namespace RavenSource {
  /**
   * 
   */
  export function is(node: unknown): node is RavenSource {
    return node instanceof RavenSource
  }

  /**
   * 
   */
  export function create(): RavenSource {
    return new RavenSource()
  }
}