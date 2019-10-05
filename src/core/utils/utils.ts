export const flattenMessages = (nestedMessages: any, prefix = '') => {
    return Object.keys(nestedMessages).reduce((messages: any, key: any) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }
        return messages;
    }, {});
};
