/**
 * Test utilities for mocking DOM element methods
 */
const elementPrototypes = new Map<string, any>();

export function spyElementPrototypes<T extends Record<string, any>>(
  Element: any,
  spyFunctions: T,
): { mockRestore: () => void } {
  const spies: jest.SpyInstance[] = [];

  Object.keys(spyFunctions).forEach((funcName) => {
    const spyFunction = spyFunctions[funcName];

    // Store original prototype method
    if (!elementPrototypes.has(funcName)) {
      elementPrototypes.set(funcName, Element.prototype[funcName]);
    }

    const spy = jest.spyOn(Element.prototype, funcName).mockImplementation(spyFunction);

    spies.push(spy);
  });

  return {
    mockRestore: () => {
      spies.forEach((spy) => {
        spy.mockRestore();
      });
    },
  };
}
