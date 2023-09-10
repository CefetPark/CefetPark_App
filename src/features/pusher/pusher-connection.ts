import { PusherKeys } from "@env"
import { authStore } from "@features/auth/auth.store"
import Pusher, { Channel } from 'pusher-js'
import { makeAutoObservable, reaction } from "mobx"
import dayjs from "dayjs"

export interface ConfigTimer {
    interval: number
    repeatNumber: number
}

export class PusherConnectionStore {
    private _pusherConnection?: Pusher = undefined
    private _connected: boolean = false
    private _channel?: Channel
    private antiSpam: any = {}

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        reaction(() => authStore.authToken, this.initPusher)
    }

    set connected(state: boolean) {
        this._connected = state
    }

    get connected() {
        return this._connected
    }

    private async initPusher() {
        if (this._pusherConnection) return
        Pusher.instances.map((instance) => instance.disconnect())
        Pusher.instances = []

        this._pusherConnection = new Pusher(PusherKeys.key, {
            cluster: PusherKeys.cluster,
            enabledTransports: ['ws', 'wss'],
        })

        this._pusherConnection.connection.bind('error', (error: Error) => {
            console.log(error)
        })
        this._pusherConnection.connection.bind('connected', () => {
            this.connectChannel()
            this.connected = true
        })
        this._pusherConnection.connection.bind('unavailable', () => {
            this.connected = false
        })
        this._pusherConnection.connection.bind('disconnected', () => {
            this.connected = false
        })
        this._pusherConnection.connection.bind('failed', () => {
            this.connected = false
        })
    }

    private bind(event: string, callback: (param: any) => void): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const $this = this
        this._channel?.bind(event, (msg: any) => {
            if (msg && msg.ack) {
                const ack = msg.ack
                const eventType = event.substring(7)
                const time = dayjs(msg.horario)

                let eventReceived = false

                if ($this.antiSpam[eventType]) {
                    eventReceived = $this.antiSpam[eventType].some((e: any) => {
                        return e.ack === ack && e.horario === time
                    })
                } else {
                    $this.antiSpam[eventType] = []
                }

                if (!eventReceived) {
                    $this.antiSpam[eventType].push({ ack, horario: time })
                    callback(msg)
                }

                $this.antiSpam[eventType].reduce((item: any) => {
                    return dayjs(item.horario) <= dayjs().subtract(10, 'minutes')
                })
            } else {
                callback(msg)
            }
        })
    }

    private connectChannel() {
        if (!this._connected) return
        const aspNetUserId = authStore.user?.aspNetUsersId
        this._channel = this._pusherConnection?.subscribe(`waiting-list-${aspNetUserId}`)

        this.bind("pusher:subscription_error", () => { console.log('error') })
        this.bind("pusher:subscription_succeeded", () => { console.log('sucesso') })
    }
}

export const pusherConnectionStore = new PusherConnectionStore()