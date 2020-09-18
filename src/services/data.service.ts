import { Injectable, resolve } from '@kitcon/core/annotations';
import { matchRoutes, RouteConfig } from 'react-router-config';
import { LocationService } from './location.service';
import { CONTAINER_CONTEXT } from '@kitcon/core/container';

@Injectable
export class DataService {

    @resolve
    private readonly locationService: LocationService

    async load(pages: RouteConfig[]) {
        const routes = matchRoutes(pages, this.locationService.pathname);
        let promises = [];

        const { route } = routes.pop()

        const load = Reflect.getMetadata('load', route.component) || [];
        const metadata = Reflect.getMetadata('resolve', route.component) || [];

        const context = {};
        const container = this[CONTAINER_CONTEXT];

        metadata
            .forEach(([name, target]) => {
                Object.defineProperty(context, name, {
                    get: function () { return container.get(target); }
                });
            });

        const fns = load
            .filter(([target]) => {
                // @ts-ignore
                const curentTarget = global.IS_BROWSER ? 'BROWSER' : 'SERVER';

                return target === 'ALL' || curentTarget === target;
            })
            .map(([, fn]) => fn.call(context));
            
        promises = promises.concat(fns);

        return Promise.all(promises);

    }

    listen(pages: RouteConfig[]) {
        this.load(pages);
        this.locationService.history.listen(() => {
            this.load(pages);
        })
    }

}