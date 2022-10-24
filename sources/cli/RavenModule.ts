import process from 'process'
import paths from 'path'

import { RavenContext } from '../RavenContext'

/**
 * 
 */
declare var __non_webpack_require__: Function

/**
 * 
 */
export namespace RavenModule {
  /**
   * 
   */
  export type Configurator = (context: RavenContext) => void

  /**
   * 
   */
  export async function run(path: string, context: RavenContext = new RavenContext()): Promise<void> {
    console.log(`Executing module "${path}"...`)
    console.log()

    const oldDirectory: string = process.cwd()
    process.chdir(paths.dirname(path))

    try {
      const configurator: unknown = __non_webpack_require__(path)

      if (typeof configurator !== 'function') {
        throw new Error(
          'Unable to run the requested configuration : the given configurator is not a function, received instance of ' +
          `${typeof configurator} instead. The configurator must be a function, please export a function as a default ` +
          'if your configurator comes from a javascript module.'
        )
      }

      await configurator(context)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to execute module "${path}" : ${error.message} (\r\n    ${error.stack?.replaceAll('    ', '        ')}\r\n)`)
      } else {
        throw new Error(`Failed to execute module "${path}" : ${error}`)
      }
    } finally {
      process.chdir(oldDirectory)
    }
  }
}