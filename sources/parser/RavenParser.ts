import { UnidocConsumer, UnidocFunction, UnidocProducer } from "@cedric-demongivert/unidoc"

import { RavenNode } from "../document"

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