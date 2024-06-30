const { exec } = require('child_process');

const executeRuby = (script, callback) => {
  const command = `ruby languages/ruby/execute.rb "${script}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      callback(stderr, null);
    } else {
      callback(null, stdout);
    }
  });
};

const executeGo = (script, callback) => {
  const command = `go run languages/go/execute.go "${script}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      callback(stderr, null);
    } else {
      callback(null, stdout);
    }
  });
};

const executePHP = (script, callback) => {
  const command = `php languages/php/execute.php "${script}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      callback(stderr, null);
    } else {
      callback(null, stdout);
    }
  });
};

const languageHandlers = {
    nodejs: executeNodeJS,
    python: executePython,
    java: executeJava,
    c: executeC,
    cpp: executeCpp,
    ruby: executeRuby,
    go: executeGo,
    php: executePHP,
  };
  

module.exports = { languageHandlers };

