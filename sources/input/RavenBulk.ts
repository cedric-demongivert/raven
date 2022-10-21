import { RavenInput } from './RavenInput'

/**
 * A bag of sources.
 */
export interface RavenBulk extends RavenInput, Iterable<RavenInput> {
  /**
   * @return The number of sources in the bag.
   */
  get size(): number

  /**
   * @return An iterator over the sources stored into this bag.
   */
  values(): IterableIterator<RavenInput>
}