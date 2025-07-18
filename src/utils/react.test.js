import { expect, test } from "vitest";
import { unRef } from "~/utils/react";

const element = { tagName: "div" };

test("using useRef", () => {
    expect(
        unRef({ current: element })
    ).toBe(element);
});

test("no useRef", () => {
    expect(
        unRef(element)
    ).toBe(element);
});