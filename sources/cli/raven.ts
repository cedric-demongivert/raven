import { program } from 'commander'
import process from 'process'

import { RavenModulePath } from './RavenModulePath'
import { RavenModule } from './RavenModule'


program.name('raven')
  .description('A code over configuration, reactive, and data centric static site generator')
  .version('0.0.1')
  .argument('[path]', 'path to the configuration file to process', RavenModulePath.DEFAULT)

program.parse(process.argv)

RavenModule.run(RavenModulePath.resolve(program.args[0])).catch(console.error)