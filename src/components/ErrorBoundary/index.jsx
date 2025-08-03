import React from 'react';
import { Box, Button, Text, VStack, Alert, AlertIcon } from '@chakra-ui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          p={8} 
          maxW="md" 
          mx="auto" 
          mt={10}
          textAlign="center"
        >
          <Alert status="error" borderRadius="md" mb={4}>
            <AlertIcon />
            Something went wrong!
          </Alert>
          
          <VStack spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Oops! Something unexpected happened
            </Text>
            
            <Text color="gray.600">
              We're sorry for the inconvenience. The error has been logged and we'll look into it.
            </Text>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box 
                p={4} 
                bg="gray.50" 
                borderRadius="md" 
                fontSize="sm" 
                textAlign="left"
                w="full"
                overflow="auto"
              >
                <Text fontWeight="bold" mb={2}>Error Details:</Text>
                <Text fontFamily="mono" color="red.600">
                  {this.state.error.toString()}
                </Text>
                {this.state.errorInfo && (
                  <Text fontFamily="mono" fontSize="xs" mt={2} color="gray.600">
                    {this.state.errorInfo.componentStack}
                  </Text>
                )}
              </Box>
            )}
            
            <VStack spacing={2}>
              <Button colorScheme="blue" onClick={this.handleReset}>
                Try Again
              </Button>
              
              <Button variant="ghost" onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            </VStack>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
