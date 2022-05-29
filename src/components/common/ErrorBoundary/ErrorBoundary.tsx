import { Alert } from "@material-ui/lab";
import React from "react";

type ErrorState = {
  isError: boolean;
  error: Error | null;
  history: Array<ErrorState>;
};

export class ErrorBoundary extends React.Component<any, ErrorState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isError: false,
      error: null,
      history: [],
    };
  }

  componentDidCatch(error: Error) {
    this.setState({
      isError: true,
      error: error,
      history: this.state.history?.concat({ ...this.state }),
    });
  }

  componentDidUpdate(prevProps: any, prevState: ErrorState) {
    this.logError(prevState);
  }

  logError = (prevState: ErrorState) => {
    const { error, history } = this.state;
    const isNewError = history?.length
      ? history.length > prevState.history.length
      : !!error;
    if (isNewError && error) console.log(error);
  };

  render(): React.ReactElement | React.ReactNode {
    if (this.state.isError) {
      //Some error was thrown. Let's display something to the user
      return (
        <Alert severity="error">
          <b>{this.state.error?.message}</b>
        </Alert>
      );
    }
    return this.props["children"];
  }
}
