import { RavenInput } from '../input/RavenInput'
import { RavenInputReader } from './RavenInputReader'

/**
 * 
 */
export interface RavenInputResolver {
  /**
   * 
   */
  resolve(blob: RavenInput): RavenInputReader
}