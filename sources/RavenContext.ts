import { RavenCompiler } from "./compiler"
import { RavenInput } from "./input"
import { RavenOperator } from "./operator"
import { RavenParser } from "./parser"
import { RavenSassService } from "./service/RavenSassService"
import { RavenInputContext } from "./RavenInputContext"
import { RavenNode } from "./tree"

/**
 * 
 */
export class RavenContext {
  /**
   * 
   */
  public unidoc(): RavenParser {
    return RavenParser.unidoc()
  }

  /**
   * 
   */
  public glob(pattern: string): RavenInputContext {
    return this.input(RavenInput.glob(pattern))
  }

  /**
   * 
   */
  public file(pattern: string): RavenInputContext {
    return this.input(RavenInput.file(pattern))
  }

  /**
   * 
   */
  public files(...patterns: Array<string>): RavenInputContext {
    return this.merge(...patterns.map(RavenInput.file))
  }

  /**
   * 
   */
  public input(input: RavenInput): RavenInputContext {
    return RavenInputContext.create(input)
  }

  /**
   * 
   */
  public merge(...inputs: Array<RavenInput>): RavenInputContext {
    return this.input(RavenInput.merge(inputs))
  }

  /**
   * 
   */
  public empty(): RavenInputContext {
    return this.input(RavenInput.empty())
  }

  /**
   * 
   */
  public operator(command: string): RavenOperator<RavenNode> {
    return RavenOperator.toOperator(command)
  }

  /**
   * 
   */
  public nunjucks(path: string): RavenCompiler {
    return RavenCompiler.nunjucks(path)
  }

  /**
   * 
   */
  public sass(path: string, output: string): void {
    RavenSassService.compile(path, output)
  }
}

/**
 * 
 */
export namespace RavenContext {
  /**
   * 
   */
  export function create(): RavenContext {
    return new RavenContext()
  }
}