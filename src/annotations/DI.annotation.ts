import { Context } from '../context';

export function DI(target: any) {
    target.contextType = Context;
}