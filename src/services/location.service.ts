import { Injectable } from '@kitcon/core/annotations';
import * as History from 'history';
import { observable } from 'mobx';
import * as qs from 'qs';

@Injectable
export class LocationService {

    private _history: any;

    get history() {
        // @ts-ignore
        if (global.IS_BROWSER) {
            this._history = History.createBrowserHistory();
        }

        return this._history;
    };

    @observable
    public pathname: string;


    @observable
    public query: {
        [key: string]: any;
    } = {}

    init() {
        // @ts-ignore
        if (global.IS_BROWSER) {
            this.history.listen(this.handleChangeLocation)
            this.handleChangeLocation(this.history.location);
        }
    }

    public handleChangeLocation = (location: any) => {
        this.query = qs.parse(location.search, { ignoreQueryPrefix: true });
        this.pathname = location.pathname;
    }

    go(pathname: string) {
        this.history.push(pathname)
    }


}