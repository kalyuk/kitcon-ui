import { DatabusService } from '@kitcon/node/services/abstract/databus.service';
import { Container } from '@kitcon/core/container';

export class ApiSsrService {
    private readonly databusService: DatabusService = Container.getContext().get(DatabusService);

    async get(url: string, query: any) {
        return this.request('GET', url, {query})
    }

    private async request(method: string, url: string, options: any = {}) {
        const serviceName = `${url.split('/')[1].toUpperCase()}-SERVICE`;
        const response =  await this.databusService.send(serviceName, `${method} /api${url}`, { query: options.query });

        return response.body;
    }
}