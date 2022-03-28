export class ThingsSLData {
    public id: number;
    public extra: boolean;
    public Date: Date;
    public TemperatureC: number;
    public TemperatureF: number;

    constructor(id: number, extra: boolean , Date: Date, TemperatureC: number, TemperatureF: number) {
        this.id=id;
        this.extra = extra;
        this.Date = Date;
        this.TemperatureC = TemperatureC;
        this.TemperatureF = TemperatureF;
    }
}

export class ThingItemData {
    public id: number;
    public Date: Date;
    public TemperatureC: number;
    public TemperatureF: number;
    public Summary: string;

    constructor(id: number, Date: Date, TemperatureC: number, TemperatureF: number, Summary: string) {
        this.id = id;
        this.Date = Date;
        this.TemperatureC = TemperatureC;
        this.TemperatureF = TemperatureF;
        this.Summary = Summary;
    }

}

export interface ThingsSLAPI{
    id: number;
    extra: boolean;
    date: Date;
    temperatureC: number;
}

export interface ThingItemAPI{
    id: number;
    extra: boolean;
    date: Date;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export interface ThingItemSaveAPI{
    extra: boolean;
    date: Date;
    temperatureC: number;
    summary: string;
}
