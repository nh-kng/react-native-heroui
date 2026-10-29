import { Button, Label, Toast, useToast } from '@nh-kng/react-native-heroui';
import { useState } from 'react';
import { PreviewSection } from '../preview-section';
export function ToastExamples() {
  const toast = useToast();
  const [lastId, setLastId] = useState<string>();
  return (
    <>
      <PreviewSection title="Toast variants">
        {(['default', 'accent', 'success', 'warning', 'danger'] as const).map((variant) => (
          <Button
            key={variant}
            onPress={() =>
              setLastId(
                toast.show({
                  title: `${variant} notification`,
                  description: 'Your project has been updated.',
                  variant,
                })
              )
            }>
            <Button.Label>Show {variant}</Button.Label>
          </Button>
        ))}
      </PreviewSection>
      <PreviewSection title="Duration and dismissal">
        <Button
          onPress={() =>
            setLastId(
              toast.show({
                title: 'Waiting for your review',
                description: 'This stays open until dismissed.',
                duration: 0,
              })
            )
          }>
          <Button.Label>Show persistent toast</Button.Label>
        </Button>
        <Button
          isDisabled={!lastId}
          onPress={() => {
            if (lastId) toast.dismiss(lastId);
            setLastId(undefined);
          }}>
          <Button.Label>Dismiss last</Button.Label>
        </Button>
        <Button
          onPress={() => {
            toast.dismissAll();
            setLastId(undefined);
          }}>
          <Button.Label>Dismiss all</Button.Label>
        </Button>
      </PreviewSection>
    </>
  );
}
