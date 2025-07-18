import i18n from "~/assets/i18n";

const template = "{{key}}";

const replaceObject = (text, toReplace) =>
    Object.keys(toReplace).reduce((txt, key) => {
        const value = toReplace[key];
        return value ? txt.replace(template.replace("key", key), value) : txt;
    }, text);

const replaceArray = (text, toReplace) =>
    toReplace.reduce((txt, value, index) => (
        value ? txt.replace(template.replace("key", index), value) : txt
    ), text);

export const replace = (text, toReplace) => (
    Array.isArray(toReplace)
        ? replaceArray(text, toReplace)
        : replaceObject(text, toReplace)
);

export const t = (key, toReplace) => {
    const text = i18n[key];
    if (!text) return key;
    if (!toReplace) return text;
    return replace(text, toReplace);
};