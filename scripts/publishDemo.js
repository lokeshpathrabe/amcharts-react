const path = require('path');
const { NodeSSH } = require('node-ssh');
const chalk = require('chalk');
const readline = require('readline-sync');
const versions = require(path.resolve(__dirname, './../versions.json'));

const log = {
  info: msg => console.log(chalk.blue(msg)),
  error: msg => console.log(chalk.red(msg)),
  warning: msg => console.log(chalk.yellow(msg)),
  success: msg => console.log(chalk.green(msg)),
};

const ssh = new NodeSSH();
const username = 'ubuntu';
const chartsDir = '/home/ubuntu/public/charts';
const version = versions.latest;

(async () => {
  const password = await getInput(
    `Enter password for ${username}@${CHARTS_DEMO_HOST}: `,
  );

  try {
    await ssh.connect({
      host: CHARTS_DEMO_HOST,
      username,
      password,
    });

    if (ssh.isConnected()) {
      const versionDirExists = await dirExists(`${chartsDir}/${version}`);
      if (versionDirExists) {
        const del = await getInput(
          `Folder ${chartsDir}/${version} exists. Do you want to Delete (yes | no)? `,
        );
        if (
          typeof del === 'string' &&
          (del.toLowerCase() === 'yes' || del.toLowerCase() === 'y')
        ) {
          await ssh.execCommand(`rm -rf ${chartsDir}/${version}`);
        } else {
          exit();
        }
      }
      await ssh.mkdir(`${chartsDir}/${version}`);

      //Move build folder to remote
      const from = path.resolve(__dirname, '../build');
      const to = path.join(chartsDir, version);
      await uploadDir(from, to);

      // Move the versions.json to /charts directory
      const versionsFileExists = await fileExists(`${chartsDir}/versions.json`);
      if (versionsFileExists) {
        await ssh.execCommand(`rm -f ${chartsDir}/versions.json`);
      }

      await uploadFile(
        path.resolve(__dirname, '../versions.json'),
        path.join(chartsDir, 'versions.json'),
      );
    } else {
      exit();
    }
    exit();
  } catch (error) {
    log.error(error.message);
    exit();
  }
})();

async function fileExists(path) {
  const result = await ssh.execCommand(`test -f ${path} && echo 1`);
  return result.stdout || 0;
}

async function dirExists(path) {
  const result = await ssh.execCommand(`test -d ${path} && echo 1`);
  return result.stdout || 0;
}

async function uploadFile(fromPath, toPath) {
  try {
    log.info(`Moving file from ${fromPath} to ${toPath} ...`);
    await ssh.putFile(fromPath, toPath);
    log.success(`Successfully moved ${fromPath} to ${toPath}`);
  } catch (error) {
    log.error(`Failed to move ${fromPath}`);
    exit();
  }
}

async function uploadDir(fromPath, toPath) {
  try {
    log.info(`Moving folder from ${fromPath} to ${toPath} ...`);
    const status = await ssh.putDirectory(fromPath, toPath, {
      recursive: true,
    });
    if (status) {
      log.success(`Successfully moved ${fromPath} to ${toPath}`);
    } else {
      throw Error(status);
    }
  } catch (error) {
    log.error(`Failed to move ${fromPath}`);
    exit();
  }
}

async function getInput(question) {
  return new Promise((resolve, reject) => {
    const answer = readline.question(question);
    resolve(answer);
  });
}

function exit() {
  ssh.dispose();
  process.exit();
}
