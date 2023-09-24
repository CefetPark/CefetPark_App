// QueueScreen.js
import useStore from '@features/app/use-store';
import Queue from '@features/queue/users-queue';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

function QueueScreen() {
    const { parkingLotStore } = useStore();
    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState<{ key: string, title: string }[]>([]);

    useEffect(() => {
        const parkingLots = parkingLotStore.parkingLots;
        const newRoutes = parkingLots.map((parkingLot, index) => ({
            key: `tab${index}`,
            title: parkingLot.name,
        }));
        setRoutes(newRoutes);
    }, [parkingLotStore.parkingLots]);

    const renderScene = SceneMap(
        Object.fromEntries(
            routes.map((route) => [
                route.key,
                () => <Queue id={parkingLotStore.parkingLots[Number(route.key.replace('tab', ''))].id} />
            ])
        )
    );

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'blue' }}
            style={{ backgroundColor: 'white' }}
            activeColor='blue'
            inactiveColor='gray'
            labelStyle={{ fontSize: 10 }}
        />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
            />
        </SafeAreaView>
    );
}

export default QueueScreen;
