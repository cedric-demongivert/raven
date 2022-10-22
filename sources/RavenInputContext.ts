import { Comparable } from '@cedric-demongivert/gl-tool-utils'

import { UnidocProducer } from '@cedric-demongivert/unidoc'

import { RavenInput } from './input/RavenInput'
import { RavenInputReader } from './reader/RavenInputReader'
import { RavenParser } from './parser/RavenParser'
import { RavenNode } from './tree/RavenNode'

import { RavenSelection } from './RavenSelection'


/**
 * 
 */
export class RavenInputContext implements Comparable {
  /**
   * 
   */
  public readonly blob: RavenInput

  /**
   * 
   */
  public constructor(blob: RavenInput) {
    this.blob = blob
  }

  /**
   * 
   */
  public parse(parser: RavenParser): Promise<RavenSelection<RavenNode>> {
    const stream: RavenInputReader = RavenInputReader.resolve(this.blob)

    return new Promise(function (resolve, reject) {
      let selection: RavenSelection<RavenNode> | null = null

      parser.subscribe(stream)

      parser.on(UnidocProducer.FAILURE, reject)
      parser.on(UnidocProducer.NEXT, (document: Readonly<RavenNode>) => {
        selection = RavenSelection.only(document as RavenNode)
      })
      parser.on(UnidocProducer.SUCCESS, () => resolve(selection!))

      stream.read()
    })
  }

  /**
   * 
   */
  public get(): RavenInput {
    return this.blob
  }

  /**
   * @see Comparable.equals
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof RavenInputContext) {
      return other.blob.equals(this.blob)
    }

    return false
  }
}

/**
 * 
 */
export namespace RavenInputContext {
  /**
   * 
   */
  export function create(bulk: RavenInput): RavenInputContext {
    return new RavenInputContext(bulk)
  }
}