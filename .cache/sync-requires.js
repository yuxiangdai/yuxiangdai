const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/yuxiangdai/dev/site/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/yuxiangdai/dev/site/src/pages/404.js"))),
  "component---src-pages-elsewhere-js": hot(preferDefault(require("/Users/yuxiangdai/dev/site/src/pages/elsewhere.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/yuxiangdai/dev/site/src/pages/index.js"))),
  "component---src-pages-projects-js": hot(preferDefault(require("/Users/yuxiangdai/dev/site/src/pages/projects.js"))),
  "component---src-pages-resume-js": hot(preferDefault(require("/Users/yuxiangdai/dev/site/src/pages/resume.js")))
}

