"use client";

import React, { createContext, useContext, useState } from "react";
import * as defaultData from "../../lib/factoryData";

export type FactoryData = typeof defaultData;

interface FactoryDataContextType {
  data: FactoryData;
  setData: (data: FactoryData) => void;
}

const FactoryDataContext = createContext<FactoryDataContextType | undefined>(undefined);

export function FactoryDataProvider({ 
  children, 
  initialData 
}: { 
  children: React.ReactNode;
  initialData?: FactoryData;
}) {
  const [data, setLocalData] = useState<FactoryData>(initialData || defaultData);

  const setData = async (newData: FactoryData) => {
    try {
      setLocalData(newData);
      await fetch("/api/factory-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
      });
    } catch (e) {
      console.error("Failed to save to DB", e);
    }
  };

  return (
    <FactoryDataContext.Provider value={{ data, setData }}>
      {children}
    </FactoryDataContext.Provider>
  );
}

export function useFactoryData() {
  const context = useContext(FactoryDataContext);
  if (context === undefined) {
    throw new Error("useFactoryData must be used within a FactoryDataProvider");
  }
  return context;
}
