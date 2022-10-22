
/**
 * 
 */
export namespace RavenHeader {
  /**
   * 
   */
  export const LINES: Array<string> = [
    '  ________                             ',
    '___  __ \\______ ____   _______ _______ ',
    '__  /_/ /_  __ `/__ | / /_  _ \\__  __ \\',
    '_  _, _/ / /_/ / __ |/ / /  __/_  / / /',
    '/_/ |_|  \\__,_/  _____/  \\___/ /_/ /_/ '
  ]

  /**
   * 
   */
  export function log(): void {
    for (const line of LINES) {
      console.log(line)
    }
  }
}



