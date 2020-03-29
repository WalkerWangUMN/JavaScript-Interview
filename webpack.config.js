const path = require('path')

module.exports = {
    mode: 'development', // production
    entry: path.join(__dirname, 'src', 'JS Interview.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    }
}