import { Avatar } from '@nh-kng/react-native-heroui';
import { View } from 'react-native';
import { PreviewSection } from '../preview-section';
const avatarImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==';
export function AvatarExamples() {
  return (
    <>
      <PreviewSection title="Sizes">
        <View className="flex-row gap-4">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Avatar key={size} size={size}>
              <Avatar.Fallback>MK</Avatar.Fallback>
            </Avatar>
          ))}
        </View>
      </PreviewSection>
      <PreviewSection title="Colors">
        <View className="flex-row flex-wrap gap-4">
          {(['accent', 'default', 'success', 'warning', 'danger'] as const).map((color) => (
            <Avatar key={color} color={color}>
              <Avatar.Fallback>UI</Avatar.Fallback>
            </Avatar>
          ))}
        </View>
      </PreviewSection>
      <PreviewSection title="Local image and fallback">
        <Avatar>
          <Avatar.Image src={avatarImage} alt="Example avatar" />
          <Avatar.Fallback>UI</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>AB</Avatar.Fallback>
        </Avatar>
      </PreviewSection>
    </>
  );
}
