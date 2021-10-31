import React from 'react';
import { Text } from 'react-konva';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  container: any;
}

interface ErrorBoundaryState {
  hasError: boolean;
  exception: any;
  log: any;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      exception: {},
      log: {},
    };
  }

  componentDidCatch(error: any, info: any) {
    this.setState({
      exception: error,
      log: info,
    });
  }

  static getDerivedStateFromError(error: any) {
    return {
      exception: error,
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Text
          x={50}
          y={50}
          fontSize={22}
          fill="red"
          text={`Erro no processamento do documento\n\n - Error na montagem do Schema \n\n -- Corrija e tente novamente \n\n ${JSON.stringify(
            this.state.exception,
          )}`}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
