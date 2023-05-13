import {
  ReactNode,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";

type ChildrenProps = {
  children: ReactNode;
};

type DisplayContext = {
  width: number;
  height: number;
};

const DisplayContext = createContext<DisplayContext>({} as DisplayContext);

export function useDisplay() {
  const { width, height } = useContext(DisplayContext);

  return { width, height };
}

export function DisplayProvider({ children }: ChildrenProps) {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  }, []);

  return (
    <DisplayContext.Provider value={{ width, height }}>
      {children}
    </DisplayContext.Provider>
  );
}
