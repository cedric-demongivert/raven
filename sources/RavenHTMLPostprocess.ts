import jsBeautify from 'js-beautify'

/**
 * 
 */
const BEAUTIFY_OPTIONS = {
  'eol': '\r\n',
  'preserve_newlines': false,
  'indent_inner_html': true,
  'wrap_line_length': 100
}

/**
 * 
 */
export namespace RavenHTMLPostprocess {
  /**
   * 
   */
  export function apply(source: string): string {
    return jsBeautify.html(source, BEAUTIFY_OPTIONS)
  }
}