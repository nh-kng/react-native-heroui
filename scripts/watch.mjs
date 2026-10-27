import { spawn } from 'node:child_process';

const compiler = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const watchers = ['web', 'native'].map((platform) =>
  spawn(compiler, ['exec', 'tsc', '-p', `tsconfig.${platform}.json`, '--watch'], { stdio: 'inherit' }),
);

const stop = () => watchers.forEach((watcher) => watcher.kill('SIGINT'));
process.on('SIGINT', stop);
process.on('SIGTERM', stop);

for (const watcher of watchers) {
  watcher.on('exit', (code) => {
    if (code !== 0 && code !== null) process.exitCode = code;
    if (code !== null) stop();
  });
}
