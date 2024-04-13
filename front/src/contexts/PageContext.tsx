import { ReactNode, createContext, useEffect, useState, useMemo } from "react";
import Api from "../services/Api";

type PageProviderProps = {
  children?: ReactNode;
};

type PageContext = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const PageContext = createContext<PageContext>({
  title: "",
  setTitle: () => {},
});

const PageProvider = ({ children }: PageProviderProps) => {
  const [title, setTitle] = useState("");

  return (
    <PageContext.Provider value={{ title, setTitle }}>
      {children}
    </PageContext.Provider>
  );
};

export { PageContext, PageProvider };