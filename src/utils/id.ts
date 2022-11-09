declare const validID: unique symbol;

/**
 * Type representing string identifier.
 */
export type ID = string & {
  [validID]: true;
};

export function id(): ID {
  const components = [];
  for (let i = 0; i < 8; i++) {
    const value = Math.floor(Math.random() * 256);
    components.push(value.toString(16).padStart(2, '0'));
  }
  return components.join('') as ID;
}
