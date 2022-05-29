import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Episode } from "../apis/rickAndMorty/episodes";
import { fetchEpisodes } from "../application/rickAndMorty/rickAndMortySlice";
import { AppDispatch, CustomState, RootState } from "../application/store";
import { isNotRequested } from "../helpers/requestHelper";

export const useCharacterEpisodes = (
  episodesIds: number[],
  characterId: number
): CustomState<Episode[]> | undefined => {
  const episodes = useSelector(
    (state: RootState) => state.rickAndMorty.episodes
  );

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (
      isNotRequested(episodes) ||
      !episodes?.payload ||
      episodes.characterId !== characterId
    ) {
      console.log("useCharacterEpisodes");
      dispatch(fetchEpisodes(episodesIds));
    }
  }, []);

  return episodes;
};
