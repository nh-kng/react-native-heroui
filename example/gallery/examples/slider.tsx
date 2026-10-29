import { Slider, Typography } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function SliderExamples() {
  const [value, setValue] = useState<number | number[]>(35);
  const [range, setRange] = useState<number | number[]>([20, 70]);
  return (
    <>
      <PreviewSection title="Controlled value">
        <Slider
          value={value}
          onChange={setValue}
          minValue={0}
          maxValue={100}
          step={5}
          webProps={{ 'aria-label': 'Volume' }}>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
        <Typography.Paragraph>Volume: {String(value)}</Typography.Paragraph>
      </PreviewSection>
      <PreviewSection title="Range">
        <Slider value={range} onChange={setRange} webProps={{ 'aria-label': 'Price range' }}>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb index={0} />
            <Slider.Thumb index={1} />
          </Slider.Track>
        </Slider>
        <Typography.Paragraph>Range: {String(range)}</Typography.Paragraph>
      </PreviewSection>
      <PreviewSection title="Disabled">
        <Slider isDisabled defaultValue={50} webProps={{ 'aria-label': 'Locked volume' }}>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
      </PreviewSection>
    </>
  );
}
