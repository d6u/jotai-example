import { atom } from "jotai";

export const countAtom = atom(0);

export const countMaybePromiseAtom = atom<number | Promise<number>>(
  Promise.resolve(0)
);

let i = 0;

export const countDerivedAsyncAtom = atom(async (get) => {
  const count = get(countMaybePromiseAtom);
  if (count instanceof Promise) {
    console.log("derived: is promise");
  } else {
    console.log("derived: is NOT promise");
  }
  console.log("derived: 1");
  const c = await count;
  console.log("derived: 2");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return c * 2;
});

// export const countAtomDerivedAsync = atom(async (get) => {
//   const value = get(countAtomMaybeAsync);
//   console.log("countAtomDerived async", value);
//   if (value instanceof Promise) {
//     return (await value) * 2;
//   }
//   return value * 2;
// });

// export const countAtomAsyncRead = atom(async (get) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return get(countAtom);
// });

// export const countAtomAsyncWrite = atom(
//   null,
//   async (get, set, newValue: number) => {
//     console.log("countAtomAsyncWrite", newValue);
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     set(
//       countAtomMaybeAsync,
//       new Promise((resolve) =>
//         setTimeout(() => {
//           resolve(newValue);
//         }, 1000)
//       )
//     );

//     console.log("countAtomAsyncWrite after", newValue);
//   }
// );
