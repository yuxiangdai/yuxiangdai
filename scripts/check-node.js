const requiredMajor = 18
const currentVersion = process.versions.node
const currentMajor = Number(currentVersion.split('.')[0])

if (currentMajor !== requiredMajor) {
  console.error(
    [
      `This Gatsby site must run on Node ${requiredMajor}.x.`,
      `Current runtime: ${process.version}.`,
      ``,
      `Fix:`,
      `  nvm use`,
      ``,
      `The repo includes .nvmrc pinned to 18.16.0 so the correct version can be selected automatically.`,
    ].join('\n')
  )
  process.exit(1)
}
