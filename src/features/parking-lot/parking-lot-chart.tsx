import { Box, Center, Divider, HStack, Text, View, VStack } from 'native-base';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Chart = () => {
  const [indexs, setIndexs] = useState([0, 7]);
  const data = [5, 12, 13, 20, 15, 25, 40, 25, 30, 20, 15, 10, 10, 5];
  const hours = [
    '07H',
    '08H',
    '09H',
    '10H',
    '11H',
    '12H',
    '13H',
    '14H',
    '15H',
    '16H',
    '17H',
    '18H',
    '19H',
    '20H',
  ];
  const currentData = data.slice(indexs[0], indexs[1]);
  const currentHour = hours.slice(indexs[0], indexs[1]);

  const addData = () => {
    if (indexs[1] != 14) {
      setIndexs([indexs[1], indexs[1] + 7]);
    }
  };

  const removeData = () => {
    if (indexs[0] != 0) {
      setIndexs([indexs[0] - 7, indexs[0]]);
    }
  };

  return (
    <Box w={'100%'} backgroundColor={'blue.200'} paddingY={1} borderRadius={12}>
      <VStack space={3}>
        <Box marginLeft={6}>
          <Text fontSize={20} fontWeight={500}>
            Horário de pico essa semana
          </Text>
        </Box>
        <Box>
          <HStack justifyContent={'center'} alignContent={'center'} space={3}>
            <HStack space={1}>
              <Box justifyContent={'center'}>
                <Icon name="user" />
              </Box>
              <Box>
                <Text>12:00</Text>
              </Box>
            </HStack>
            <Box>
              <Text>Pouco movimentado essa hora</Text>
            </Box>
          </HStack>
        </Box>
        <Box>
          <HStack h={20} justifyContent={'center'} alignItems={'flex-end'} space={4}>
            <Box alignSelf={'center'} w={5} h={5}>
              <Icon size={20} onPress={() => removeData()} name="chevron-left" />
            </Box>
            {currentData.map((info, index) => {
              return (
                <Center key={index} rounded={4} w={7} h={`${info}%`} bg={'primary'} shadow={3} />
              );
            })}
            <View alignSelf={'center'} w={5} h={5}>
              <Icon size={20} onPress={() => addData()} name="chevron-right" />
            </View>
          </HStack>
          <Divider marginTop={1} w={'90%'} bg={'textLigth'} alignSelf={'center'} />
          <HStack justifyContent={'center'} space={4}>
            {currentData.map((_, index) => {
              return (
                <Box key={index} w={7} h={1}>
                  <Divider
                    orientation="vertical"
                    marginTop={1}
                    bg={'textLigth'}
                    alignSelf={'center'}
                    bgColor={'primary'}
                  />
                </Box>
              );
            })}
          </HStack>
        </Box>
        <Box>
          <HStack justifyContent={'center'} space={4}>
            {currentHour.map((hour, index) => {
              return (
                <Box key={index} w={7} h={5}>
                  <Text fontWeight={400}>{hour}</Text>
                </Box>
              );
            })}
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};
