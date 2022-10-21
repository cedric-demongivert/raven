import { UnidocProducer } from "@cedric-demongivert/unidoc"

import { RavenInput } from "../input"

import { RavenBlob } from "../RavenBlob"
import { RavenCommonInputResolver } from "./RavenCommonInputResolver"

import { RavenInputReaderState } from "./RavenInputReaderState"

/**
 * 
 */
export interface RavenInputReader extends UnidocProducer<RavenBlob> {
  /**
   * 
   */
  readonly state: RavenInputReaderState

  /**
   * 
   */
  readonly target: RavenInput

  /**
   * 
   */
  read(): void
}

/**
 * 
 */
export namespace RavenInputReader {
  /**
   * 
   */
  export const resolve = RavenCommonInputResolver.INSTANCE.resolve.bind(RavenCommonInputResolver.INSTANCE)
}