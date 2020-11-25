import { Injectable } from '@kitcon/core/annotations';
import * as qs from 'qs';

@Injectable
export class ApiService {

    async get(url: string, query: {} = {}) {
        return this.request('GET', url, { query });
    }

    async post(url: string, body: any, query: {} = {}) {
        return this.request('POST', url, { body, query })
    }

    async request(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options: any = {}) {
        const endpoint = `/api${url}${options.query ? '?' + qs.stringify(options.query) : ''}`;

        const headers: any = {
            'content-type': 'application/json'
        };

        const response = await fetch(endpoint, {
            method,
            headers,
            body: options.body ? JSON.stringify(options.body) : null
        });

        const result = await response.json();

        if (response.status > 399) {
            throw result;
        }

        return result;
    }

}