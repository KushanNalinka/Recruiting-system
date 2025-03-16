import { useCallback, useReducer } from "react";

const initialState = {
  zoomDomain: null,
  selectedZoomDomain: null,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "setZoomDomain":
      return {
        ...state,
        zoomDomain: action.value,
      };
    case "setSelectedZoomDomain":
      return {
        ...state,
        selectedZoomDomain: action.value,
      };
    default:
      return state;
  }
}

export function useZoom() {
  const [{ zoomDomain, selectedZoomDomain }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const setZoomDomain = useCallback((domain: any) => {
    dispatch({
      type: "setZoomDomain",
      value: domain,
    });
  }, []);

  const setSelectedZoomDomain = useCallback((domain: any) => {
    dispatch({
      type: "setSelectedZoomDomain",
      value: domain,
    });
  }, []);

  return {
    setZoomDomain,
    setSelectedZoomDomain,
    zoomDomain,
    selectedZoomDomain,
  };
}
