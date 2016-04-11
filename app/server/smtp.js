
Meteor.startup(function () {
  var fs = Npm.require('fs');
  var github_creds = YAML.safeLoad(fs.readFileSync(process.env.PWD + '/.smtp', 'utf8'));
  console.log('path to smtp creds:',process.env.PWD + '/.smtp');
  process.env.MAIL_URL = 'smtp://${smtp.url}:587';
});
