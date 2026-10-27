export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type ParagraphType = 'body' | 'body-sm' | 'body-xs';

export function headingTypeToLevel(type: HeadingType): 1 | 2 | 3 | 4 | 5 | 6 {
  const levels: Record<HeadingType, 1 | 2 | 3 | 4 | 5 | 6> = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    h5: 5,
    h6: 6,
  };
  return levels[type];
}

export function paragraphTypeToSize(type: ParagraphType): 'base' | 'sm' | 'xs' {
  if (type === 'body-sm') return 'sm';
  if (type === 'body-xs') return 'xs';
  return 'base';
}
