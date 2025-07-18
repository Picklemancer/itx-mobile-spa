import { expect, test } from "vitest";
import { replace } from "~/utils/i18n";

test("object replacing", () => {
    expect(
        replace("Hello {{example}}", { example: "World!" })
    ).toBe("Hello World!");
});

test("array replacing", () => {
    expect(
        replace("Hello {{0}}", ["World!"])
    ).toBe("Hello World!");
});