import type MarkdownIt from 'markdown-it';

export function mathPlugin(parser: MarkdownIt) {
  parser.inline.ruler.before('escape', 'math_inline', (state, silent) => {
    if (state.src.slice(state.pos, state.pos + 2) !== '$$' || state.src[state.pos + 2] === '$' || state.src[state.pos - 1] === '$') return false;
    let end = state.src.indexOf('$$', state.pos + 2);
    while (end >= 0 && (state.src[end - 1] === '$' || state.src[end + 2] === '$')) end = state.src.indexOf('$$', end + 2);
    if (end < 0 || state.src.slice(state.pos + 2, end).includes('\n')) return false;
    if (!silent) {
      const token = state.push('math_inline', 'math', 0);
      const content = state.src.slice(state.pos + 2, end);
      token.content = content.startsWith(' ') && content.endsWith(' ') && /[^ ]/.test(content)
        ? content.slice(1, -1)
        : content;
      token.markup = '$$';
    }
    state.pos = end + 2;
    return true;
  });
  parser.block.ruler.before('fence', 'math_block', (state, startLine, endLine, silent) => {
    if (state.sCount[startLine] - state.blkIndent >= 4) return false;
    const begin = state.bMarks[startLine] + state.tShift[startLine];
    const first = state.src.slice(begin, state.eMarks[startLine]);
    const marker = /^(\${2,})\s*$/.exec(first);
    if (!marker) return false;
    if (silent) return true;
    let next = startLine + 1;
    let closed = false;
    for (; next < endLine; next++) {
      const line = state.src.slice(state.bMarks[next] + state.tShift[next], state.eMarks[next]);
      if (new RegExp(`^\\${marker[1][0]}{${marker[1].length},}\\s*$`).test(line)) { closed = true; break; }
    }
    const token = state.push('math_block', 'math', 0);
    token.block = true;
    token.markup = marker[1];
    token.content = state.getLines(startLine + 1, next, state.blkIndent, false);
    token.map = [startLine, closed ? next + 1 : next];
    token.meta = { closed };
    state.line = closed ? next + 1 : next;
    return true;
  }, { alt: ['paragraph', 'reference', 'blockquote', 'list'] });
}
