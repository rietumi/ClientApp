import API, { Payload } from './api';

export interface GameTips {
    item1: string[],
    item2: string[]
}

interface GameReply {
    result: boolean;
    lifes: number;
    unguessed: number;
}

export const postGenerateGame = (payload: Payload<{x: number, y: number}>): Promise<GameTips|undefined>=> {
    const {data, onSuccess, onError} = payload;
    return API.post<GameTips>('/Game/Generate', data)
        .then(response => {
            onSuccess && onSuccess(response);
            return response.data;
        })
        .catch(error => {
            onError && onError(error);
            return undefined;
        });
}

export const postGameTileValue = (payload: Payload<{x: number, y: number, prediction: boolean}>): Promise<GameReply|undefined> => {
    const {data, onSuccess, onError} = payload;
    return API.post<GameReply>('/Game/Value', data)
        .then(response => {
            onSuccess && onSuccess(response);
            return response.data;
        })
        .catch(error => {
            onError && onError(error);
            return undefined;
        });
}