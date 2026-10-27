import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { root, walk } from './upstream-baselines.mjs';
import { verifyUpstream } from './verify-upstream.mjs';

verifyUpstream();
const output = path.join(root, 'build/baselines');
rmSync(output, { recursive: true, force: true });
for (const platform of ['web', 'native']) {
  execFileSync(process.execPath, [path.join(root, 'node_modules/typescript/bin/tsc'), '-p', `tsconfig.baselines.${platform}.json`], { cwd: root, stdio: 'inherit' });
}

for (const file of walk('build/baselines').filter((file) => file.endsWith('.jsx'))) {
  const absolute = path.join(root, file);
  const result = ts.transpileModule(readFileSync(absolute, 'utf8'), { fileName: file, compilerOptions: { target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX } });
  writeFileSync(absolute.slice(0, -4) + '.js', result.outputText);
  rmSync(absolute);
}

function outputTarget(specifier, file) {
  let target;
  if (specifier === '@heroui/styles') target = path.join(output, 'heroui-react/packages/styles/src/index');
  else if (specifier.startsWith('@heroui/styles/')) target = path.join(output, 'heroui-react/packages/styles/src', specifier.slice('@heroui/styles/'.length));
  else if (specifier.startsWith('@/')) target = path.join(output, 'heroui-react/packages/react/src', specifier.slice(2));
  else if (specifier === 'heroui-native') target = path.join(output, 'heroui-native/src/index');
  else if (specifier.startsWith('heroui-native/')) throw new Error(`Unmapped Native subpath: ${specifier}`);
  else if (specifier.startsWith('@heroui/')) throw new Error(`Unowned upstream import: ${specifier}`);
  else if (specifier.startsWith('.')) target = path.resolve(path.dirname(file), specifier);
  else return specifier;
  const resolved = [target, `${target}.js`, path.join(target, 'index.js')].find((candidate) => candidate.endsWith('.js') && existsSync(candidate));
  assert.ok(resolved, `Unresolved emitted import ${specifier} in ${file}`);
  let relative = path.relative(path.dirname(file), resolved).split(path.sep).join('/');
  if (!relative.startsWith('.')) relative = `./${relative}`;
  return relative;
}

for (const file of walk('build/baselines').filter((file) => file.endsWith('.js') || file.endsWith('.d.ts'))) {
  const absolute = path.join(root, file);
  let source = readFileSync(absolute, 'utf8');
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const replacements = [];
  function visit(node) {
    if (ts.isStringLiteralLike(node)) {
      const parent = node.parent;
      const isModule = ((ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) && parent.moduleSpecifier === node)
        || (ts.isCallExpression(parent) && parent.arguments[0] === node && (parent.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(parent.expression) && parent.expression.text === 'require')))
        || (ts.isLiteralTypeNode(parent) && ts.isImportTypeNode(parent.parent));
      if (isModule) {
        const replacement = outputTarget(node.text, absolute);
        if (replacement !== node.text) replacements.push({ start: node.getStart(ast), end: node.end, text: JSON.stringify(replacement) });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) source = source.slice(0, replacement.start) + replacement.text + source.slice(replacement.end);
  writeFileSync(absolute, source);
}

const webStyles = path.join(output, 'heroui-react/packages/styles');
for (const directory of ['base', 'components', 'themes', 'utilities', 'variants']) cpSync(path.join(root, 'baselines/heroui-react/packages/styles', directory), path.join(webStyles, directory), { recursive: true });
cpSync(path.join(root, 'baselines/heroui-react/packages/styles/index.css'), path.join(webStyles, 'index.css'));
cpSync(path.join(root, 'baselines/heroui-native/src/styles'), path.join(output, 'heroui-native/src/styles'), { recursive: true });
const reactCss = path.join(output, 'heroui-react/packages/react/src/styles.css');
writeFileSync(reactCss, '@import "../../styles/index.css";\n');
const smoke = path.join(output, 'smoke');
mkdirSync(smoke, { recursive: true });
writeFileSync(path.join(smoke, 'web.css'), '@import "../heroui-react/packages/react/src/styles.css";\n@source "../../../baselines/heroui-react/packages/react/src";\n');
writeFileSync(path.join(smoke, 'native.css'), '@import "tailwindcss";\n@import "uniwind";\n@import "../heroui-native/src/styles/index.css";\n@source "../../../baselines/heroui-native/src";\n');
for (const platform of ['web', 'native']) execFileSync(path.join(root, 'node_modules/.bin/tailwindcss'), ['-i', path.join(smoke, `${platform}.css`), '-o', path.join(smoke, `${platform}.compiled.css`), '--minify'], { cwd: root, stdio: 'inherit' });
console.log('Built owned JavaScript, declarations, and stylesheet smoke artifacts under build/baselines.');
