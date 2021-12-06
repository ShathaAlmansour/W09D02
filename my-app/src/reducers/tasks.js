const initialState = {
    user: null,
    token: "",
  };
  
  const tasks = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "GET":
        const { task } = payload;
        return { task };
      default:
        return state;
    }
  };
  
  export default tasks;
  
  export const task = (data) => {
    return {
      type: "GET",
      payload: data,
    };
  };
  