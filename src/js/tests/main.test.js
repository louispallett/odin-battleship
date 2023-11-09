import { add } from "../scripts/main";

test.skip("Adds", () => {
    expect(add(5, 3)).toBe(8);
});