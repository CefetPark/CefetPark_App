import React from 'react';
import useStore from '@features/app/use-store';
import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform } from 'react-native';

export const TabBarIcon = observer((props: any) => {
  const {} = useStore();

  const { focused = false, ...rest } = props;
  const highlightProps = {
    backgroundColor: 'rgba(107, 107, 107, 0.31)',
    padding: 10,
    borderRadius: 13,
  };

  return (
    <>
      <Icon
        size={28}
        style={{
          overflow: 'hidden',
          ...(focused && highlightProps),
          marginBottom: Platform.OS === 'ios' ? -12 : 0,
        }}
        {...rest}
      />
    </>
  );
});
