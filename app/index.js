var generators = require('yeoman-generator');
var chalk = require('chalk');

var dir;

module.exports = generators.Base.extend({

	prompting: function () {
		var done = this.async();

		this.prompt({
			type: 'input',
			name: 'name',
			message: 'Directory name',
			default: 'basos-framework',
			required: true
		}).then(function (answers) {
			console.log(chalk.bold.yellow('\n\nPulling Basos from Github.\n\n'));

			this.remote('losbeekos', 'basos', function(err, remote) {
				remote.bulkDirectory('.', '' + answers.name);
				dir = answers.name;
				done();
			});
		}.bind(this));
	},

	install: function () {
		var done = this.async();
		var projectDir = process.cwd() + '/' + dir + '/';

		console.log(chalk.bold.yellow('\n\nInstalling NPM & Bower dependencies.\n\n'));

		process.chdir(projectDir);
		this.npmInstall();
		this.bowerInstall();
		done();
	},

	end: function() {
		console.log(chalk.bold.green('\n\nAll finished. Have a good one!\n'));
		console.log(chalk.bold.yellow('Your project is created in: "' + dir + '"\n\n'));
	}

});

