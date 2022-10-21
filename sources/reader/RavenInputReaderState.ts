/**
 * 
 */
export type RavenInputReaderState = (
  RavenInputReaderState.READY |
  RavenInputReaderState.RUNNING |
  RavenInputReaderState.SUCCESS |
  RavenInputReaderState.FAILURE
)

/**
 * 
 */
export namespace RavenInputReaderState {
  /**
   * 
   */
  export type READY = 0

  /**
   * 
   */
  export const READY: READY = 0

  /**
   * 
   */
  export type RUNNING = 1

  /**
   * 
   */
  export const RUNNING: RUNNING = 1

  /**
   * 
   */
  export type SUCCESS = 2

  /**
   * 
   */
  export const SUCCESS: SUCCESS = 2

  /**
   * 
   */
  export type FAILURE = 3

  /**
   * 
   */
  export const FAILURE: FAILURE = 3

  /**
   * 
   */
  export const DEFAULT = READY

  /**
   * 
   */
  export const ALL = [
    READY,
    RUNNING,
    SUCCESS,
    FAILURE
  ]

  /**
   * 
   */
  export function toString(state: RavenInputReaderState): string | undefined {
    switch (state) {
      case READY: return 'READY'
      case RUNNING: return 'RUNNING'
      case SUCCESS: return 'SUCCESS'
      case FAILURE: return 'FAILURE'
      default: return undefined
    }
  }

  /**
   * 
   */
  export function toDebugString(state: RavenInputReaderState): string {
    return `RavenInputReaderState #${state} (${toString(state) || 'undefined '})`
  }

  /**
   * 
   */
  export function throwUnhandled(state: RavenInputReaderState): never {
    throw new Error(`Unhandled ${toDebugString(state)}.`)
  }
}