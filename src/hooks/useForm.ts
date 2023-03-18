import { useState } from "react";

const useForm = (initialState: any) => {
  const [state, SetState] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetState(state => ({...state,[e.target.name]: e.target.value }))
  }

  return [state,
    handleChange
  ];
};

export default useForm;