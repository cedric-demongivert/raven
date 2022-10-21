import paths from 'path'
import fileSystem from 'fs'

/**
 * 
 */
export namespace RavenModulePath {
  /**
   * 
   */
  export const DEFAULT: string = './raven.js'

  /**
   * 
   */
  export function resolve(argument: string | undefined): string {
    if (argument == null) {
      console.log(
        'No module path specified, trying to resolve ' +
        `the default module path "${DEFAULT}"...`
      )
    }

    const givenPath: string = argument || DEFAULT
    const absolutePath: string = paths.resolve(givenPath)

    if (!fileSystem.existsSync(absolutePath)) {
      throw new Error(
        `Unable to find the requested module : the given path "${givenPath}" resolved as ` +
        `"${absolutePath}" does not point to an existing file, directory or symbolic link.`
      )
    }

    const stat = fileSystem.lstatSync(absolutePath)

    if (stat.isFile()) {
      return absolutePath
    }

    if (stat.isSymbolicLink()) {
      console.log(
        `The given path "${argument}" resolved as "${absolutePath}" point ` +
        'to a symbolic link. Following the link...'
      )

      return resolve(fileSystem.readlinkSync(absolutePath))
    }

    if (stat.isDirectory()) {
      console.log(
        `The given path "${argument}" resolved as "${absolutePath}" point ` +
        `to a directory. Searching for a "${DEFAULT}" configuration file...`
      )

      return resolve(paths.resolve(absolutePath, DEFAULT))
    }

    throw new Error(
      `Unable to find the requested module : the given path "${argument}" resolved as "${absolutePath}" ` +
      'does not point to a file, a directory, nor to a symbolic link to a file.'
    )
  }
}