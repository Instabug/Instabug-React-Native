import React from 'react';
import { Screen } from '../../components/Screen';
import { ListTile } from '../../components/ListTile';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';

export interface InvocationOptionsScreenProp {
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
}

export const InvocationOptionsScreen: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'InvocationOptions'>
> = ({ route }) => {
  const { selectedOptions, setSelectedOptions } = route.params;

  const isSelected = (options: string[]) => {
    return (
      options.length === selectedOptions.length &&
      options.every((option) => selectedOptions.includes(option))
    );
  };

  return (
    <Screen>
      <ListTile
        title="Comment Field Required"
        onPress={() => setSelectedOptions(['commentFieldRequired'])}
        testID="id_comment_field_required"
        subtitle={isSelected(['commentFieldRequired']) ? 'Selected' : undefined}
      />

      <ListTile
        title="Email Field Hidden"
        onPress={() => setSelectedOptions(['emailFieldHidden'])}
        testID="id_email_field_hidden"
        subtitle={isSelected(['emailFieldHidden']) ? 'Selected' : undefined}
      />

      <ListTile
        title="Email Field Optional"
        onPress={() => setSelectedOptions(['emailFieldOptional'])}
        testID="id_email_field_optional"
        subtitle={isSelected(['emailFieldOptional']) ? 'Selected' : undefined}
      />

      <ListTile
        title="Disable Post Sending Dialog"
        onPress={() => setSelectedOptions(['disablePostSendingDialog'])}
        testID="id_disable_post_sending_dialog"
        subtitle={isSelected(['disablePostSendingDialog']) ? 'Selected' : undefined}
      />

      <ListTile
        title="Comment Field Required, Email Field Hidden"
        onPress={() => setSelectedOptions(['commentFieldRequired', 'emailFieldHidden'])}
        testID="id_comment_field_required_email_field_hidden"
        subtitle={isSelected(['commentFieldRequired', 'emailFieldHidden']) ? 'Selected' : undefined}
      />

      <ListTile
        title="None"
        onPress={() => setSelectedOptions([])}
        testID="id_none"
        subtitle={isSelected([]) ? 'Selected' : undefined}
      />
    </Screen>
  );
};
