import React from 'react';
import { Screen } from '../../components/Screen';
import { ListTile } from '../../components/ListTile';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';

export interface InvocationEventsScreenProp {
  selectedEvents: string[];
  setSelectedEvents: (events: string[]) => void;
}

export const InvocationEventsScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'InvocationEvents'>
> = ({ route }) => {
  const { selectedEvents, setSelectedEvents } = route.params;

  const isSelected = (events: string[]) => {
    return (
      events.length === selectedEvents.length &&
      events.every((event) => selectedEvents.includes(event))
    );
  };

  return (
    <Screen>
      <ListTile
        title="Floating Button"
        onPress={() => setSelectedEvents(['floatingButton'])}
        testID="id_floating_button"
        subtitle={isSelected(['floatingButton']) ? 'Selected' : undefined}
      />

      <ListTile
        title="Two Fingers Swipe"
        onPress={() => setSelectedEvents(['twoFingersSwipe'])}
        testID="id_two_fingers_swipe"
        subtitle={isSelected(['twoFingersSwipe']) ? 'Selected' : undefined}
      />

      <ListTile
        title="Screenshot"
        onPress={() => setSelectedEvents(['screenshot'])}
        testID="id_screenshot"
        subtitle={isSelected(['screenshot']) ? 'Selected' : undefined}
      />

      <ListTile
        title="Shake"
        onPress={() => setSelectedEvents(['shake'])}
        testID="id_shake"
        subtitle={isSelected(['shake']) ? 'Selected' : undefined}
      />

      <ListTile
        title="Floating Button, Shake, and Screenshot"
        onPress={() => setSelectedEvents(['floatingButton', 'shake', 'screenshot'])}
        testID="id_common"
        subtitle={isSelected(['floatingButton', 'shake', 'screenshot']) ? 'Selected' : undefined}
      />

      <ListTile
        title="All"
        onPress={() =>
          setSelectedEvents(['floatingButton', 'twoFingersSwipe', 'screenshot', 'shake'])
        }
        testID="id_all"
        subtitle={
          isSelected(['floatingButton', 'twoFingersSwipe', 'screenshot', 'shake'])
            ? 'Selected'
            : undefined
        }
      />
      <ListTile
        title="None"
        onPress={() => setSelectedEvents([])}
        testID="id_none"
        subtitle={isSelected([]) ? 'Selected' : undefined}
      />
    </Screen>
  );
};
