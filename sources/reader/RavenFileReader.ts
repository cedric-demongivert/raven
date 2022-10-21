import fileSystem from 'fs'

import { UnidocPublisher } from '@cedric-demongivert/unidoc'

import { RavenFile } from '../input'

import { RavenBlob } from '../RavenBlob'

import { RavenInputReader } from './RavenInputReader'
import { RavenInputReaderState } from './RavenInputReaderState'

import { RavenNodeStreamEvent } from './RavenNodeStreamEvent'

/**
 * 
 */
export class RavenFileReader extends UnidocPublisher<RavenBlob> implements RavenInputReader {
  /**
   * 
   */
  public readonly target: RavenFile

  /**
   * 
   */
  private _state: RavenInputReaderState

  /**
   * 
   */
  private readonly _blob: RavenBlob

  /**
   * 
   */
  private _currentStream: fileSystem.ReadStream | null

  /**
   * 
   */
  public get state() {
    return this._state
  }

  /**
   * 
   */
  public constructor(target: RavenFile) {
    super()
    this.target = target
    this._state = RavenInputReaderState.DEFAULT
    this._blob = RavenBlob.create()
    this._currentStream = null

    this.handleNext = this.handleNext.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleFailure = this.handleFailure.bind(this)
  }

  /**
   * @see RavenInputReader.read
   */
  public read(): void {
    if (this._state === RavenInputReaderState.RUNNING) {
      return
    }

    this._state = RavenInputReaderState.RUNNING
    this._blob.source.asFile(this.target.path)
    this._blob.offset = 0

    const readStream: fileSystem.ReadStream = fileSystem.createReadStream(this.target.path)

    readStream.on(RavenNodeStreamEvent.DATA, this.handleNext)
    readStream.on(RavenNodeStreamEvent.READY, this.output.start)
    readStream.on(RavenNodeStreamEvent.CLOSE, this.handleSuccess)
    readStream.on(RavenNodeStreamEvent.ERROR, this.handleFailure)

    this._currentStream = readStream

    readStream.read()
  }

  /**
   * 
   */
  private handleNext(buffer: Buffer): void {
    this._blob.buffer = buffer
    this.output.next(this._blob)
    this._blob.offset = this._currentStream!.bytesRead
  }

  /**
   * 
   */
  private handleSuccess(): void {
    this._state = RavenInputReaderState.SUCCESS
    this.output.success()
    this._currentStream = null
  }

  /**
   * 
   */
  private handleFailure(error: Error): void {
    this._state = RavenInputReaderState.FAILURE
    this.output.failure(error)
    this._currentStream = null
  }
}