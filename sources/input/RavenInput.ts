import { Comparable } from "@cedric-demongivert/gl-tool-utils"
import { RavenEmpty } from "./RavenEmpty"
import { RavenFile } from "./RavenFile"
import { RavenGlob } from "./RavenGlob"
import { RavenMerge } from "./RavenMerge"

/**
 * The identifier of a source of bytes to process.
 */
export interface RavenInput extends Comparable {

}

/**
 * 
 */
export namespace RavenInput {
  /**
   * 
   */
  export const file = RavenFile.create

  /**
   * 
   */
  export const glob = RavenGlob.create

  /**
   * 
   */
  export const merge = RavenMerge.create

  /**
   * 
   */
  export const empty = RavenEmpty.create
}
