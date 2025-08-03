import React from 'react';
import { 
  Box, 
  Text, 
  Button, 
  VStack, 
  Alert, 
  AlertIcon, 
  AlertTitle, 
  AlertDescription 
} from '@chakra-ui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you might want to log this to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          minH="400px" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          p={8}
        >
          <VStack spacing={6} textAlign="center" maxW="md">
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Something went wrong!</AlertTitle>
                <AlertDescription>
                  {this.props.fallbackMessage || 
                   "We're sorry, but something unexpected happened. Please try refreshing the page."}
                </AlertDescription>
              </Box>
            </Alert>

            <VStack spacing={3}>
              <Button 
                colorScheme="blue" 
                onClick={this.handleRetry}
                size="sm"
              >
                Try Again
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </VStack>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box 
                as="details" 
                mt={4} 
                p={4} 
                bg="gray.100" 
                borderRadius="md"
                fontSize="sm"
                textAlign="left"
                maxW="100%"
                overflow="auto"
              >
                <Text as="summary" cursor="pointer" fontWeight="bold" mb={2}>
                  Error Details (Development)
                </Text>
                <Text fontFamily="mono" whiteSpace="pre-wrap">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </Text>
              </Box>
            )}
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export const withErrorBoundary = (Component, fallbackMessage) => {
  return function WithErrorBoundaryComponent(props) {
    return (
      <ErrorBoundary fallbackMessage={fallbackMessage}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

export default ErrorBoundary;
