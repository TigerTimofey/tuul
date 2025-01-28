import React, { createContext, useContext, useState } from "react";

interface PairingContextType {
  selectedCode: string;
  setSelectedCode: (code: string) => void;
}

const PairingContext = createContext<PairingContextType>({
  selectedCode: "",
  setSelectedCode: () => {},
});

export const PairingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCode, setSelectedCode] = useState("");

  return (
    <PairingContext.Provider value={{ selectedCode, setSelectedCode }}>
      {children}
    </PairingContext.Provider>
  );
};

export const usePairing = (): PairingContextType => {
  const context = useContext(PairingContext);
  if (!context) {
    throw new Error("usePairing must be used within a PairingProvider");
  }
  return context;
};

export default PairingProvider;
