import { UnidocFunction } from "@cedric-demongivert/unidoc"

import { RavenNode } from "../tree/RavenNode"

import { RavenBlob } from "../RavenBlob"

import { RavenUnidocParser } from "./RavenUnidocParser"

/**
 * 
 */
export interface RavenParser extends UnidocFunction<RavenBlob, RavenNode> {

}

/**
 * 
 */
export namespace RavenParser {
  /**
   * 
   */
  export const unidoc = RavenUnidocParser.create
}