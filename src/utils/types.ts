import { Block } from '../core/Block';

export type TClickHandler = (evt: PointerEvent) => void;

export type TAnyEventHandler = (evt: Event) => void;

export type TValidationHandler = (elem: Block, childNum: number) => string | undefined;

export type TIndexed<T = any> = {
    [key in string]: T;
};
