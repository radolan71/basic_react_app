import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLocation } from "../apis/rickAndMorty/locations";
import { fetchOrigin } from "../application/rickAndMorty/rickAndMortySlice";
import { AppDispatch, RootState } from "../application/store";
import { isNotRequested } from "../helpers/requestHelper";

export const useOrigin = (id: number): ShowLocation | undefined => {
  const origin = useSelector((state: RootState) => state.rickAndMorty.origin);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (
      isNotRequested(origin) ||
      !origin?.payload ||
      origin.payload.id !== id
    ) {
      dispatch(fetchOrigin(id));
    }
  }, []);

  return origin?.payload;
};
