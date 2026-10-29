import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import ts from 'typescript';

const root = new URL('../', import.meta.url);

async function loadTypeScript(path) {
  const source = await readFile(new URL(path, root), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}

const { docsExamples } = await loadTypeScript('example/gallery/docs-examples/catalog.ts');
const { limitations } = await loadTypeScript('example/gallery/docs-examples/limitations.ts');
const docsRoot = new URL('upstream/heroui-react/apps/docs/content/docs/en/react/components/', root);
const files = await readdir(docsRoot, { recursive: true });

test('every implemented React component accounts for all official previews in page order', async () => {
  const navigation = await readFile(new URL('example/gallery/navigation.tsx', root), 'utf8');
  const names = [...navigation.matchAll(/^  '([^']+)',$/gm)].map((match) => match[1]);
  assert.deepEqual(
    Object.keys(docsExamples).sort(),
    names.filter((name) => name !== 'PressableFeedback').sort()
  );
  const ids = new Set();
  for (const [name, page] of Object.entries(docsExamples)) {
    const sourcePath = files.find((path) => path.endsWith(`/${page.slug}.mdx`));
    assert.ok(sourcePath, `${name} has an official documentation page`);
    const source = (await readFile(new URL(sourcePath, docsRoot), 'utf8')).split(
      '## Styling Reference'
    )[0];
    let title = 'Usage';
    const expected = [];
    for (const match of source.matchAll(/^#{2,3} (.+)|<ComponentPreview\b([\s\S]*?)\/>/gm)) {
      if (match[1]) title = match[1];
      else {
        const id = match[2].match(/name="([^"]+)"/)?.[1];
        if (id) expected.push({ id, title });
      }
    }
    assert.deepEqual(
      page.examples,
      expected,
      `${name} preserves every official preview ID and heading`
    );
    for (const { id } of page.examples) {
      assert.ok(!ids.has(id), `${id} is unique`);
      ids.add(id);
    }
  }
  for (const [id, reason] of Object.entries(limitations)) {
    assert.ok(ids.has(id), `${id} is a current upstream preview`);
    assert.ok(reason.length > 30, `${id} explains the missing public API`);
  }
});

test('gallery examples consume public exports without upstream or private component imports', async () => {
  const folder = new URL('example/gallery/docs-examples/', root);
  for (const path of await readdir(folder)) {
    if (!path.endsWith('.tsx')) continue;
    const source = await readFile(new URL(path, folder), 'utf8');
    for (const match of source.matchAll(/from ['"]([^'"]+)['"]/g)) {
      assert.ok(
        !/@heroui\/react|heroui-native|upstream\/|src\/|primitives\//.test(match[1]),
        `${join('docs-examples', path)} imports only the public adapter`
      );
    }
  }
});
