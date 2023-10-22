import { useDebounce } from "@base/src/helpers/use-debounce";
import { AlertDialog, Button, Center } from "native-base";
import React, { useState, useEffect } from 'react'

const MapsDialog = ({ opened, setOpened }: { opened: boolean, setOpened: Function }) => {
    const { openGoodleMaps } = useDebounce()

    const onClose = () => setOpened(false);

    const cancelRef = React.useRef(null);
    return <Center>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={opened} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Body>
                    Deseja abrir o google maps?
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group justifyContent={'space-between'} w={'100%'}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            Voltar
                        </Button>
                        <Button variant="solid" backgroundColor={'primary'} onPress={() => {
                            onClose()
                            openGoodleMaps()
                        }}>
                            Abrir
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    </Center>;
};

export default MapsDialog