import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character } from "../apis/rickAndMorty/characters";
import { Location } from "../apis/rickAndMorty/locations";
import { fetchLocation } from "../application/rickAndMorty/rickAndMortySlice";
import { AppDispatch, RootState } from "../application/store";
import { isNotRequested } from "../helpers/requestHelper";

export const useResidents = (ids: number[]): Character[] | undefined => {
  const location = useSelector(
    (state: RootState) => state.rickAndMorty.location
  );

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (
      isNotRequested(location) ||
      !location?.payload ||
      location.payload.id !== id
    ) {
      dispatch(fetchLocation(id));
    }
  }, []);

  return location?.payload;
};