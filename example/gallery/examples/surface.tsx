import { Surface, Typography } from '@nh-kng/react-native-heroui';
import { PreviewSection } from '../preview-section';
export function SurfaceExamples() {
  return (
    <>
      <PreviewSection title="Surface variants">
        {(['default', 'secondary', 'tertiary', 'transparent'] as const).map((variant) => (
          <Surface key={variant} variant={variant} className="rounded-2xl p-5">
            <Typography.Paragraph>{variant} surface</Typography.Paragraph>
          </Surface>
        ))}
      </PreviewSection>
    </>
  );
}
