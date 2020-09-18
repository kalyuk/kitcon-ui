export function load(type: 'BROWSER' | 'SERVER' | 'ALL' = 'ALL') {
    return (target: any, name: string, descriptor: TypedPropertyDescriptor<Function>) => {

        const types = Reflect.getMetadata('design:paramtypes', target, name);

        if (types.length) {
            throw ('You cant`t use this function "' + name + '" in class ' + target.constructor.name + ' for service rendered, because this function have params')
        }

        const load = Reflect.getMetadata('load', target.constructor) || [];

        load.push([type, descriptor.value])

        Reflect.defineMetadata('load', load, target.constructor);
    }
}