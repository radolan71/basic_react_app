import React, { ReactElement, ReactChildren } from "react";
import {
  Backdrop,
  Fade,
  IconButton,
  Modal as MuiModal,
} from "@material-ui/core";
import { Clear as ClearIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import * as CSS from "csstype";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    outline: "none",
    "box-shadow": "none",
  },
  large: {
    minWidth: theme.spacing(40),
    width: "800px",
    padding: theme.spacing(6, 8, 5),
    maxHeight: "87%",
  },
  small: {
    minWidth: theme.spacing(10),
    padding: theme.spacing(6, 8, 5),
    maxHeight: "20%",
  },
  closeButton: {
    float: "right",
    position: "absolute",
    right: theme.spacing(6),
    top: theme.spacing(4),
  },
  closeIcon: {
    fontSize: 32,
  },
}));

export enum ModalSize {
  large = "large",
  small = "small",
}

export interface CustomModalProps {
  children: ReactElement;
  handleClose: Function;
  open: boolean;
  size?: ModalSize;
  overflow?: CSS.Property.Overflow;
}

export const Modal = ({
  children,
  handleClose,
  open,
  size = ModalSize.large,
  overflow = "scroll" as CSS.Property.Overflow,
}: CustomModalProps): ReactElement => {
  const classes = useStyles();

  return (
    <div>
      <MuiModal
        className={classes.modal}
        open={open}
        onClose={(e) => {
          handleClose();
        }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade in={open}>
          <div
            className={`${classes.paper} ${classes[size]}`}
            style={{ overflow: overflow }}
          >
            <IconButton
              className={classes.closeButton}
              aria-label="close"
              onClick={(e) => {
                handleClose();
              }}
            >
              <ClearIcon className={classes.closeIcon} />
            </IconButton>
            {children}
          </div>
        </Fade>
      </MuiModal>
    </div>
  );
};
