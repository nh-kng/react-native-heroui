import type { Root } from 'mdast';
import type { Construct, State, Token, TokenizeContext } from 'micromark-util-types';
import type { Processor } from 'unified';
import { visit } from 'unist-util-visit';

const bracketMath: Construct = {
  name: 'markdownBracketMath',
  tokenize(effects, ok, nok) {
    let close = 41;
    let display = false;
    let escaped = false;
    let dataOpen = false;
    let candidate: Token;
    const start: State = (code) => {
      effects.enter('mathText');
      effects.enter('mathTextSequence');
      effects.consume(code);
      return opening;
    };
    const opening: State = (code) => {
      if (code !== 40 && code !== 91) return nok(code);
      display = code === 91;
      close = display ? 93 : 41;
      effects.consume(code);
      effects.exit('mathTextSequence');
      return content;
    };
    const content: State = (code) => {
      if (code === null || (!display && code < -2)) return nok(code);
      if (code < -2) {
        if (dataOpen) effects.exit('mathTextData');
        dataOpen = false;
        effects.enter('lineEnding');
        effects.consume(code);
        effects.exit('lineEnding');
        escaped = false;
        return content;
      }
      if (code === 92 && !escaped) {
        if (dataOpen) effects.exit('mathTextData');
        dataOpen = false;
        candidate = effects.enter('mathTextSequence');
        effects.consume(code);
        return closing;
      }
      if (!dataOpen) {
        effects.enter('mathTextData');
        dataOpen = true;
      }
      effects.consume(code);
      escaped = code === 92 && !escaped;
      return content;
    };
    const closing: State = (code) => {
      if (code === close) {
        effects.consume(code);
        effects.exit('mathTextSequence');
        effects.exit('mathText');
        return ok;
      }
      candidate.type = 'mathTextData';
      effects.exit('mathTextData');
      escaped = true;
      return content(code);
    };
    return start;
  },
  previous(this: TokenizeContext, code) {
    return code !== 92 || this.events.at(-1)?.[1].type === 'characterEscape';
  },
};

export default function remarkDelimiters(this: Processor) {
  (this.data().micromarkExtensions ??= []).push({ text: { 92: bracketMath } });
}

export function normalizeBracketMath(tree: Root, source: string) {
  visit(tree, 'paragraph', (paragraph, index, parent) => {
    const child = paragraph.children[0];
    if (
      paragraph.children.length !== 1 ||
      child?.type !== 'inlineMath' ||
      index === undefined ||
      !parent
    )
      return;
    const start = child.position?.start.offset;
    const end = child.position?.end.offset;
    if (start === undefined || end === undefined || !source.slice(start, end).startsWith('\\['))
      return;
    const value = source.slice(start + 2, end - 2).replace(/^\r?\n|\r?\n$/g, '');
    parent.children[index] = {
      type: 'math',
      meta: null,
      value,
      position: child.position,
      data: {
        hName: 'pre',
        hChildren: [
          {
            type: 'element',
            tagName: 'code',
            properties: { className: ['language-math', 'math-display'] },
            children: [{ type: 'text', value }],
          },
        ],
      },
    };
  });
}
