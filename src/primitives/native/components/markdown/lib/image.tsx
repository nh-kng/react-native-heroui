import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

import { isNativeMarkdownUrl } from '../../../../../components/markdown/markdown-policy.js';

export function MarkdownImage({ source, alt }: { source: string; alt: string }) {
  const [size, setSize] = useState<{ source: string; ratio: number }>();
  const [failed, setFailed] = useState<string>();
  useEffect(() => {
    let active = true;
    if (isNativeMarkdownUrl(source, true)) {
      Image.getSize(source, (width, height) => {
        if (active && width > 0 && height > 0) setSize({ source, ratio: width / height });
      }, () => { if (active) setFailed(source); });
    }
    return () => { active = false; };
  }, [source]);
  if (!isNativeMarkdownUrl(source, true) || failed === source) return <Text>{alt}</Text>;
  return (
    <View style={{ width: '100%', maxWidth: '100%' }}>
      <Image source={{ uri: source }} accessibilityLabel={alt} accessible={!!alt}
        resizeMode="contain" style={{ width: '100%', aspectRatio: size?.source === source ? size.ratio : 1 }}
        onError={() => setFailed(source)} />
    </View>
  );
}
