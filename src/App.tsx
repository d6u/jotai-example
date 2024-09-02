import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAtom } from "jotai";
import { countDerivedAsyncAtom, countMaybePromiseAtom } from "./atoms";
import { Suspense, useCallback, useTransition } from "react";
import { loadable } from "jotai/utils";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppContent />
    </Suspense>
  );
}

const loadableAtom = loadable(countDerivedAsyncAtom);

function AppContent() {
  const [count, setCount] = useAtom(countMaybePromiseAtom);
  const [countMaybePromise] = useAtom(loadableAtom);

  const [isPending, startTransition] = useTransition();

  const callback = useCallback(
    async (count: number | Promise<number>): Promise<number> => {
      if (count instanceof Promise) {
        console.log("updater: is promise");
      } else {
        console.log("updater: is NOT promise");
      }
      console.log("updater: 1");
      const c = await count;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("updater: 2", c);
      return c + 1;
    },
    []
  );

  // const indexRef = useRef(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Count {count}</p>
      <p>
        Count maybe promise{" "}
        {countMaybePromise.state === "hasData"
          ? countMaybePromise.data
          : "pending"}
      </p>
      <p>is pending: {isPending ? "pending" : "not pending"}</p>
      <div className="card">
        <button
          onClick={() => {
            setCount(callback);
          }}
        >
          without transition
        </button>
        <button
          onClick={() => {
            startTransition(() => {
              setCount(callback);
            });
          }}
        >
          with transition
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
