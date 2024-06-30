module.exports = {
  ruby: {
    extension: 'rb',
    compiler: 'ruby',
    execute: (filename) => `ruby ${filename}`,
  },
  go: {
    extension: 'go',
    compiler: 'go',
    execute: (filename) => `go run ${filename}`,
  },
  rust: {
    extension: 'rs',
    compiler: 'rustc',
    execute: (filename) => `rustc ${filename} && ./${filename.split('.')[0]}`,
  },
  // You can add existing language specifications here if you find them in other files
};