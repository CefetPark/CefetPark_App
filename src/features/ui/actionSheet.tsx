import { Actionsheet } from 'native-base'
import React, { memo } from 'react'

const ActionSheetComponent = ({ data, opened, selectFunction }: { data: { id: string, name: string }[], opened: boolean, selectFunction: Function }) => {
    return (
        <Actionsheet isOpen={opened}>
            <Actionsheet.Content>
                <Actionsheet.Item key={-1} onPress={() => selectFunction()}>Não encontrei...</Actionsheet.Item>
                {
                    data.map(item => <Actionsheet.Item key={item.id} onPress={() => selectFunction(item)}>{item.name}</Actionsheet.Item>)
                }
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default memo(ActionSheetComponent)