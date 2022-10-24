import fileSystem from 'fs'
import path from 'path'
import sass from 'sass'

/**
 * 
 */
const MKDIR_OPTIONS = {
  recursive: true
}

/**
 * 
 */
export namespace RavenSassService {
  /**
   * 
   */
  export function compile(input: string, output: string): void {
    const result = sass.compile(input)
    fileSystem.mkdirSync(path.dirname(output), MKDIR_OPTIONS)
    fileSystem.writeFileSync(output, result.css)
  }
}