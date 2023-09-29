/* eslint-disable max-classes-per-file, no-new */
import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type { Block as BlockType } from './Block';

const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake(),
};

const { Block } = proxyquire('./Block', {
    './EventBus': {
        EventBus: class {
            emit = eventBusMock.emit;

            on = eventBusMock.on;
        },
    },
}) as { Block: typeof BlockType };

describe('block', () => {
    class ComponentMock extends Block {
        constructor(props: any) {
            super(props);
        }
    }

    it('should fire init event on initialization', () => {
        new ComponentMock({});

        expect(eventBusMock.emit.calledWith('init')).to.eq(true);
    });

    it('should fire CDU event on props update', () => {
        const components = new ComponentMock({});

        components.setProps({ test: 'test' });

        expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(true);
    });
});
