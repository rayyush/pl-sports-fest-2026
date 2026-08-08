import { createContext, useContext, useEffect, useState } from "react";

const RegistrationContext = createContext(null);

export function RegistrationProvider({ children }) {
  const [registrations, setRegistrations] = useState(() => {
    try {
      const saved = localStorage.getItem("plSportsRegistrations");

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Could not load registrations:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "plSportsRegistrations",
      JSON.stringify(registrations),
    );
  }, [registrations]);

  const addRegistration = (registration) => {
    setRegistrations((current) => {
      const alreadyExists = current.some(
        (item) =>
          item.type === registration.type &&
          item.sportId === registration.sportId &&
          item.categoryId === registration.categoryId,
      );

      if (alreadyExists) {
        return current;
      }

      return [...current, registration];
    });
  };

  const removeRegistration = (type, sportId, categoryId) => {
    setRegistrations((current) =>
      current.filter(
        (item) =>
          !(
            item.type === type &&
            item.sportId === sportId &&
            item.categoryId === categoryId
          ),
      ),
    );
  };

  const clearRegistrations = () => {
    setRegistrations([]);
  };

  const isRegistered = (type, sportId, categoryId) => {
    return registrations.some(
      (item) =>
        item.type === type &&
        item.sportId === sportId &&
        item.categoryId === categoryId,
    );
  };

  const totalAmount = registrations.reduce(
    (total, item) => total + Number(item.fee || 0),
    0,
  );

  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        addRegistration,
        removeRegistration,
        clearRegistrations,
        isRegistered,
        totalAmount,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistrations() {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error(
      "useRegistrations must be used inside RegistrationProvider",
    );
  }

  return context;
}
