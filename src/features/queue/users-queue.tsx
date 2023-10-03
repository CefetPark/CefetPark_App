/* import { Avatar, Box, Center, FlatList, HStack, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { QueueModel } from './queue.model';
import useStore from '@features/app/use-store';

const Queue = ({ id }: { id: number }) => {
    const { queueStore } = useStore()



    useEffect(() => {
        queueStore.getTheQueue(id)
    }, [])

    return (
        <>
            {queueStore.queue.members.length > 0 ? <FlatList
                data={queueStore.queue.members}
                renderItem={({ item }) => (
                    <Box
                        borderBottomWidth="1"
                        _dark={{
                            borderColor: 'muted.50',
                        }}
                        borderColor="muted.800"
                        pl={['0', '4']}
                        pr={['0', '5']}
                        py="2"
                        id={item.id}
                    >
                        <HStack space={[2, 3]} justifyContent="space-between">
                            <Avatar
                                size="48px"
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
                                }}
                            />
                            <VStack>
                                <Text
                                    _dark={{
                                        color: 'warmGray.50',
                                    }}
                                    color="coolGray.800"
                                    bold
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    color="coolGray.600"
                                    _dark={{
                                        color: 'warmGray.200',
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                )}
            /> : <Center flex={1}><Text>Sem lista {id}</Text></Center>}
        </>
    );
}

export default Queue */