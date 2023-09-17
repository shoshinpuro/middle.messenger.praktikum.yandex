import WSTransport, { WSTransportEvents } from '../utils/WSTransport';
import store from '../utils/storeHOC';
import ChatController from './chatController';
import { IMessage } from '../utils/interfaces';

export class MessageController {
    private transports: Map<number, WSTransport> = new Map();

    async connect(id: number, token: string) {
        if (this.transports.has(id)) {
            return;
        }

        const userId = store.getState().user.id;

        const transport = new WSTransport(
            `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`,
        );

        this.transports.set(id, transport);

        await transport.connect();

        this.subscribe(transport, id);
        this.fetchOldMessages(id);
    }

    async sendMessage(id: number, message: string) {
        const transport = this.transports.get(id);

        if (!transport) {
            throw new Error(`Chat ${id} is not connected`);
        }

        transport!.send({
            type: 'message',
            content: message,
        });
    }

    fetchOldMessages(id: number) {
        const transport = this.transports.get(id);

        if (!transport) {
            throw new Error(`Chat ${id} is not connected`);
        }

        transport.send({ type: 'get old', content: '0' });
    }

    closeAll() {
        Object.values(this.transports).forEach((transport) => transport.close());
    }

    private onMessage(id: number, messages: IMessage | IMessage[]) {
        let messagesToAdd: IMessage[] = [];

        if (Array.isArray(messages)) {
            messagesToAdd = messages.reverse();
        } else {
            messagesToAdd.push(messages);
        }

        const currentMessages = (store.getState().messages || {})[id] || [];

        messagesToAdd = [...currentMessages, ...messagesToAdd];

        store.set(`messages.${id}`, messagesToAdd);
        ChatController.getChats();
    }

    private onClose(id: number) {
        this.transports.delete(id);
    }

    private subscribe(transport: WSTransport, id: number) {
        transport.on(WSTransportEvents.Message, (message: IMessage | IMessage[]) => this.onMessage(id, message)); // eslint-disable-line max-len
        transport.on(WSTransportEvents.Close, () => this.onClose(id));
    }
}

const messageController = new MessageController();

export default messageController;
