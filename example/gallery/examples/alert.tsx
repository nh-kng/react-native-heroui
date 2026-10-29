import { Alert, Description } from '@nh-kng/react-native-heroui';
import { PreviewSection } from '../preview-section';
export function AlertExamples() {
  return (
    <PreviewSection title="Statuses">
      {(['default', 'accent', 'success', 'warning', 'danger'] as const).map((status) => (
        <Alert key={status} status={status}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{status}</Alert.Title>
            <Alert.Description>Your changes are saved locally in this example.</Alert.Description>
          </Alert.Content>
        </Alert>
      ))}
    </PreviewSection>
  );
}
