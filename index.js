var inquirer = require('inquirer-bluebird');
var prompt = inquirer.prompt;

inquirer.prompt = function(params, cb) {
  if (!Array.isArray(params) && (typeof params.choices === 'object') && !Array.isArray(params.choices)) {
    params.name = 'x';

    var choices = params.choices;

    params.choices = Object.keys(choices).map(function(key) {
      var val = choices[key];
      return {
        name: key,
        value: key
      };
    });

    return prompt(params, cb).then(function(answers) {
      return choices[answers.x]();
    });
  } else {
    return prompt(params, cb);
  }
};

module.exports = inquirer;
