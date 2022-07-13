import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Alert } from "react-native";
import { useAppDispatch } from "../store";
import { addExpanseAsync } from "../store/reducers/expanse/expanseActions";

type AddExpanseContextType = {
  title: string;
  setTitle: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  category: string | null;
  setCategory: (value: string | null) => void;
  addExpanse: (onComplete: (added: boolean) => void) => void;
  desc: string;
  setDesc: (value: string) => void;
};

export const AddExpanseContext = createContext<AddExpanseContextType | null>(
  null
);

const AddExpanseProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [desc, setDesc] = useState("");
  const dispatch = useAppDispatch();

  const addExpanse = useCallback(
    (onComplete?: (added: boolean) => void) => {
      if (!title || !amount) {
        Alert.alert("Invalid Credentials");
        onComplete && onComplete(false);
        return;
      }
      const expanseAmount = Number.parseInt(amount);
      dispatch(
        addExpanseAsync({
          title: title || "Untitled Expanse",
          category: category || undefined,
          desc: desc || undefined,
          amount: expanseAmount || 0,
        })
      );
      onComplete && onComplete(true);
    },
    [title, amount, category, dispatch, desc]
  );

  return (
    <AddExpanseContext.Provider
      value={{
        amount,
        setAmount,
        title,
        setTitle,
        category,
        setCategory,
        addExpanse,
        desc,
        setDesc,
      }}
    >
      {children}
    </AddExpanseContext.Provider>
  );
};

export default AddExpanseProvider;

export const useAddExpanse = () => {
  const context = useContext(AddExpanseContext);
  if (!context) {
    throw "useAddExpanse context must use inside AddExpanseProvider";
  }
  return context;
};
