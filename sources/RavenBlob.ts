import { Assignable, Clearable, Comparable } from "@cedric-demongivert/gl-tool-utils"
import { UnidocURI } from "@cedric-demongivert/unidoc"

/**
 * 
 */
const EMPTY_BUFFER: Buffer = Buffer.alloc(0)

/**
 * The identifier of a bunch of bytes to process.
 */
export class RavenBlob implements Comparable, Assignable<RavenBlob>, Clearable {
  /**
   * 
   */
  public buffer: Buffer

  /**
   * 
   */
  public offset: number

  /**
   * 
   */
  public readonly source: UnidocURI

  /**
   * 
   */
  public constructor() {
    this.buffer = EMPTY_BUFFER
    this.offset = 0
    this.source = new UnidocURI().asRuntime(RavenBlob)
  }

  /**
   * 
   */
  public copy(toCopy: RavenBlob): this {
    this.buffer = toCopy.buffer
    this.offset = toCopy.offset
    this.source.copy(toCopy.source)

    return this
  }

  /**
   * 
   */
  public clear(): this {
    this.buffer = EMPTY_BUFFER
    this.offset = 0
    this.source.asRuntime(RavenBlob)
    return this
  }

  /**
   * 
   */
  public setOrigin(source: UnidocURI): void {
    this.source.copy(source)
  }

  /**
   * @see Comparable.equals
   */
  public equals(other: unknown): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof RavenBlob) {
      return (
        other.buffer === this.buffer &&
        other.offset === this.offset &&
        other.source.equals(this.source)
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace RavenBlob {
  /**
   * 
   */
  export function create(): RavenBlob {
    return new RavenBlob()
  }
}