import {
  RavenInput,
  RavenFile,
  RavenGlob,
  RavenMerge,
  RavenBulk
} from "../input"

import { RavenInputReader } from "./RavenInputReader"
import { RavenInputResolver } from "./RavenInputResolver"

import { RavenBulkReader } from "./RavenBulkReader"
import { RavenFileReader } from "./RavenFileReader"

/**
 * 
 */
export class RavenCommonInputResolver implements RavenInputResolver {
  /**
   * @see RavenInputResolver.resolve
   */
  public resolve(blob: RavenFile): RavenFileReader
  /**
   * @see RavenInputResolver.resolve
   */
  public resolve(blob: RavenBulk): RavenBulkReader
  /**
   * @see RavenInputResolver.resolve
   */
  public resolve(blob: RavenInput): RavenInputReader
  /**
   * @see RavenInputResolver.resolve
   */
  public resolve(blob: RavenInput): RavenInputReader {
    if (blob instanceof RavenFile) {
      return new RavenFileReader(blob)
    }

    if (blob instanceof RavenMerge) {
      return new RavenBulkReader(blob, this)
    }

    if (blob instanceof RavenGlob) {
      return new RavenBulkReader(blob, this)
    }

    throw new Error(`Unable to resolve blob ${blob.toString()} as a common blob.`)
  }
}

/**
 * 
 */
export namespace RavenCommonInputResolver {
  /**
   * 
   */
  export const INSTANCE: RavenCommonInputResolver = new RavenCommonInputResolver()

  /**
   * 
   */
  export function get(): RavenCommonInputResolver {
    return INSTANCE
  }
}