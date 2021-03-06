export interface stockInformationOHLC{
    metadata: Object;
    timeSeries: Object;
}

export interface stockNames{
    name: string;
    symbol: string;
}

export interface User{
    userName: string;
    userId: string;
    userEmail: String;
    watchlist?: string[];
  }

export interface DBresponse{
    isSuccess: boolean;
    message?: string;
}