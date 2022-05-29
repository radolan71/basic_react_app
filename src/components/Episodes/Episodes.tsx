import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import * as React from "react";
import { ReactElement } from "react";
import { isLoading, isNotRequested } from "../../helpers/requestHelper";
import { useCharacterEpisodes } from "../../hooks/useCharacterEpisodes";
import { Loader } from "../common/Loader/Loader";

interface EpisodesProps {
  episodesUris: string[];
  characterId: number;
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const Episodes = ({
  episodesUris,
  characterId,
}: EpisodesProps): ReactElement => {
  const classes = useStyles2();
  const episodeIds = episodesUris
    .map((ep) => parseInt(ep.split("/").pop() ?? ""))
    .filter((ep) => ep !== 0);
  const episodes = useCharacterEpisodes(episodeIds, characterId);
  if (!episodes || isLoading(episodes) || isNotRequested(episodes)) {
    return <Loader />;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Air Date</TableCell>
            <TableCell align="right">Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {episodes &&
            episodes?.payload &&
            episodes?.payload?.length > 0 &&
            episodes?.payload?.map((episode: any) => (
              <TableRow key={episode.id}>
                <TableCell component="th" scope="row">
                  {episode.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {episode.air_date}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {episode.episode}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter> */}
      </Table>
    </TableContainer>
  );
};

export default Episodes;
