import { UnidocProducer, UnidocPublisher } from '@cedric-demongivert/unidoc'

import { RavenBulk } from '../input'

import { RavenBlob } from '../RavenBlob'

import { RavenInputReader } from './RavenInputReader'
import { RavenInputReaderState } from './RavenInputReaderState'
import { RavenInputResolver } from './RavenInputResolver'

/**
 * 
 */
export class RavenBulkReader extends UnidocPublisher<RavenBlob> implements RavenInputReader {
  /**
   * 
   */
  public readonly target: RavenBulk

  /**
   * 
   */
  private _state: RavenInputReaderState

  /**
   * 
   */
  public get state() {
    return this._state
  }

  /**
   * 
   */
  private readonly _stack: Array<RavenInputReader>

  /**
   * 
   */
  public readonly resolver: RavenInputResolver

  /**
   * 
   */
  public constructor(target: RavenBulk, resolver: RavenInputResolver) {
    super()

    this.target = target
    this._state = RavenInputReaderState.DEFAULT
    this._stack = []

    this.handleNext = this.handleNext.bind(this)
    this.handleFailure = this.handleFailure.bind(this)

    this.resolver = resolver
  }

  /**
   * @see RavenInputReader.read
   */
  public read(): void {
    if (this._state === RavenInputReaderState.RUNNING) {
      return
    }

    this._state = RavenInputReaderState.RUNNING

    const resolver = this.resolver
    const stack = this._stack

    for (const blob of this.target.values()) {
      const stream = resolver.resolve(blob)
      stream.on(UnidocProducer.NEXT, this.output.next)
      stream.on(UnidocProducer.FAILURE, this.handleFailure)
      stream.on(UnidocProducer.SUCCESS, this.handleNext)

      stack.push(stream)
    }

    this.output.start()
    this.handleNext()
  }

  /**
   * 
   */
  private handleNext(): void {
    const next = this._stack.pop()

    if (next == null) {
      this._state = RavenInputReaderState.SUCCESS
      return this.output.success()
    }

    next.read()
  }

  /**
   * 
   */
  private handleFailure(error: Error): void {
    this._state = RavenInputReaderState.FAILURE
    this.output.failure(error)
  }
}