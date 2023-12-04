import useStore from '@features/app/use-store';
import { useTheme } from 'native-base';
import React, { memo } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const Chart = memo(() => {
  const { colors } = useTheme()
  const { parkingLotStore } = useStore()
  const data = parkingLotStore.graphData.data
  const hours = parkingLotStore.graphData.hours

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
      formatXLabel={(el) => `${el}H`}
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
  )
})