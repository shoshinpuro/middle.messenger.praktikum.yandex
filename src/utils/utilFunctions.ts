export type TIndexed<T = any> = {
    [key in string]: T;
};

export function trim(string:string, symbols?:string) {
    if (symbols) {
        const re = new RegExp(`[${symbols}]`, 'g');
        return string.replace(re, '');
    }
    return string.trim();
}

export function queryStringify(data: any) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce(
        (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
        '?',
    );
}
/* eslint-disable */
export function merge(lhs: TIndexed, rhs: TIndexed): TIndexed {
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as TIndexed, rhs[p] as TIndexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}
/* eslint-enable */
export function set(object: TIndexed | unknown, path: string, value: unknown): TIndexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<TIndexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as TIndexed, result);
}

export function remakeDate(date: string) {
    return date ? new Date(date).toString().substring(4, 10) : undefined;
}
/* export const loginsToIds: (logins: string[]) => number[] = (logins) => {
    const users = store.getState().contactedUsers;
    return logins.map((login) => users.find((user: IUserWithId) => user.login === login).id);
}; */
