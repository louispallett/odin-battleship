import { add } from "../scripts/main";

test("Adds", () => {
    expect(add(5, 3)).toBe(8);
})