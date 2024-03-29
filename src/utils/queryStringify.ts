export type TStringIndexed = Record<string, any>;

function queryStringify(data: TStringIndexed): string | never {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        const value = data[key];
        const endLine = index < keys.length - 1 ? '&' : '';

        if (Array.isArray(value)) {
            const arrayValue = value.reduce<TStringIndexed>(
                (res, arrData, i) => ({
                    ...res,
                    [`${key}[${i}]`]: arrData,
                }),
                {},
            );

            return `${result}${queryStringify(arrayValue)}${endLine}`;
        }

        if (typeof value === 'object') {
            const objValue = Object.keys(value || {}).reduce<TStringIndexed>(
                (res, objKey) => ({
                    ...res,
                    [`${key}[${objKey}]`]: value[objKey],
                }),
                {},
            );

            return `${result}${queryStringify(objValue)}${endLine}`;
        }
        return `${result}${key}=${value}${endLine}`;
    }, '');
}

export default queryStringify;
