import { useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { useCSSVariable, useUniwind } from 'uniwind';

import {
  markdownCellText,
  markdownColumnWidths,
  markdownTableMeasurementKey,
} from './table-layout.js';
import { markdownClass } from '../../../../../components/markdown/markdown-presentation.js';
import type { MarkdownClassNames } from '../../../../../components/markdown/markdown.types.js';
import { Typography } from '../../../../../components/typography/typography.native.js';
import type { ASTNode } from '../markdown.types.js';

type TableProps = {
  node: ASTNode;
  classNames?: MarkdownClassNames;
  renderCell: (node: ASTNode) => ReactNode;
};

function rows(node: ASTNode): ASTNode[] {
  return node.children.flatMap((child) => (child.type === 'tr' ? [child] : rows(child)));
}
function MeasuredRows({
  node,
  classNames,
  renderCell,
  viewport,
  measurementKey,
}: TableProps & { viewport: number; measurementKey: string }) {
  const tableRows = rows(node);
  const [cache, setMeasurements] = useState<{ key: string; values: Record<string, number> }>({
    key: measurementKey,
    values: {},
  });
  const activeKey = useRef(measurementKey);
  useLayoutEffect(() => {
    activeKey.current = measurementKey;
  }, [measurementKey]);
  const measurements = cache.key === measurementKey ? cache.values : {};
  const widths = markdownColumnWidths(
    tableRows.map((row) => row.children.map((cell) => measurements[cell.key] ?? 0)),
    viewport
  );
  return (
    <>
      <View
        key={measurementKey}
        pointerEvents="none"
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ position: 'absolute', opacity: 0, alignItems: 'flex-start', width: 100000 }}>
        {tableRows.flatMap((row) =>
          row.children.map((cell) => (
            <View
              key={cell.key}
              className={markdownClass(
                cell.type === 'th' ? 'tableHeader' : 'tableCell',
                classNames
              )}
              style={{ alignSelf: 'flex-start' }}
              onLayout={({ nativeEvent: { layout } }) => {
                const width = Math.ceil(layout.width);
                setMeasurements((current) => {
                  if (activeKey.current !== measurementKey) return current;
                  const values = current.key === measurementKey ? current.values : {};
                  return values[cell.key] === width
                    ? current
                    : { key: measurementKey, values: { ...values, [cell.key]: width } };
                });
              }}>
              <Typography.Paragraph weight={cell.type === 'th' ? 'semibold' : undefined}>
                {markdownCellText(cell)}
              </Typography.Paragraph>
            </View>
          ))
        )}
      </View>
      {tableRows.map((row) => (
        <View
          key={row.key}
          className={markdownClass('tableRow', classNames)}
          style={{ flexDirection: 'row' }}>
          {row.children.map((cell, column) => (
            <View
              key={cell.key}
              className={markdownClass(
                cell.type === 'th' ? 'tableHeader' : 'tableCell',
                classNames
              )}
              style={{ width: widths[column], flexShrink: 0 }}>
              {renderCell(cell)}
            </View>
          ))}
        </View>
      ))}
    </>
  );
}
export function MarkdownTable(props: TableProps) {
  const [viewport, setViewport] = useState(0);
  const { fontScale } = useWindowDimensions();
  const { theme } = useUniwind();
  const metrics = useCSSVariable([
    '--text-base',
    '--text-base--line-height',
    '--font-sans',
    '--spacing',
  ]);
  const key = markdownTableMeasurementKey(
    props.node.revision,
    viewport,
    fontScale,
    JSON.stringify([props.classNames, metrics, theme])
  );
  return (
    <View className={markdownClass('table', props.classNames)}>
      <ScrollView
        horizontal
        nestedScrollEnabled
        onLayout={({ nativeEvent: { layout } }) => setViewport(layout.width)}
        contentContainerStyle={{ minWidth: '100%' }}>
        <View>
          <MeasuredRows measurementKey={key} {...props} viewport={viewport} />
        </View>
      </ScrollView>
    </View>
  );
}
