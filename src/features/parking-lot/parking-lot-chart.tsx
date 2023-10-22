import { Text, useTheme, View } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const Chart = () => {
  const { colors } = useTheme()
  const data = [5, 13, 20, 25, 40, 25, 20, 5];
  const hours = ['07H', '09H', '11H', '13H', '15H', '17H', '19H', '21H'];

  const chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientTo: "#FFF",
    color: (opacity = 1) => `${colors.primary}`,
    strokeWidth: 1.5,
    barPercentage: 1.5,
  };

  return (
    <LineChart
      data={{
        labels: hours,
        datasets: [
          {
            data: data
          }
        ]
      }}
      width={responsiveWidth(95)}
      height={Dimensions.get('window').width < 400 ? responsiveHeight(29) : responsiveHeight(25)}
      formatYLabel={(el) => `${parseInt(el)}%`}
      withVerticalLines={false}
      verticalLabelRotation={0}
      chartConfig={chartConfig}
      style={{
        borderRadius: 12,
        alignSelf: 'center',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: "#CCC",
        elevation: 8,
        shadowColor: '#1a1a1a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      }}
      bezier
    />
  );
};