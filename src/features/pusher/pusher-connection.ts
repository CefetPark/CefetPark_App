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
            enabledTransports: ['ws'],
        })

        this._pusherConnection.connection.bind('error', (error: Error) => {
            console.log(error)
        })
        this._pusherConnection.connection.bind('connected', () => {
            this._pusherConnection?.connect()
            this.connected = true
            this.connectChannel()
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

    private connectChannel() {
        if (!this._connected) return
        this._channel = this._pusherConnection?.subscribe(`my-channel`)

        this._channel?.bind("pusher:subscription_succeeded", (event: any) => { console.log(event) })
        this._channel?.bind("pusher:subscription_error", (event: any) => { console.log(event) })
        this._channel?.bind("my-event", (event: any) => { })
    }
}

export const pusherConnectionStore = new PusherConnectionStore()