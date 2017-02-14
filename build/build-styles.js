const postcss = require('postcss')
const syntax = require('postcss-less')
const path = require('path')
const fs = require('fs')
const less = require('less')
const shell = require('shelljs')

const distPath = path.resolve(__dirname, `../dist/styles/`)
shell.rm('-rf', distPath)
shell.mkdir('-p', distPath)

var pkg = require(path.join(__dirname, '../package.json'))

const p = path.resolve(__dirname, '../src/styles/')

fs.readdir(p, function (err, files) {
  if (err) {
    throw err
  }
  files.filter(function (file) {
    return !fs.statSync(path.join(p, file)).isDirectory() && /less/.test(file) && !/index|variable|theme/.test(file)
  }).forEach(function (file) {
    parse(file)
  })
})

const getPath = function (name) {
  return path.resolve(__dirname, `../dist/styles/${name}`)
}

function parse (file) {
  var code = fs.readFileSync(path.resolve(__dirname, `../src/styles/${file}`), 'utf-8')
  less.render(code, {
    compress: true,
    paths: [path.resolve(__dirname, '../src/styles')]
  },function (e, output) {
    if (e) {
      throw e
    } else {
      postcss([require('autoprefixer')(['last 2 versions'])])
      .process(output.css, {
        syntax: syntax
      })
      .then(function (result) {
        const dist = getPath(file.replace('less', 'css'));
        fs.writeFileSync(dist, result.css);
      })
      .catch(function(e){
        console.log(e)
      })
    }
  })
<<<<<<< 9a97fa54b01ee056bf9e25efd00bcf79b1225032
}
=======
}
>>>>>>> style: import reset.less instead of copying from WeUI
