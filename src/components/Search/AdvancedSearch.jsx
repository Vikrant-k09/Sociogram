import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  VStack,
  Text,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";
import { useRef, useState } from "react";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";
import useSearchUser from "../../hooks/useSearchUser";
import useSearchPosts from "../../hooks/useSearchPosts";
import { useTheme } from "../../context/ThemeContext";

const AdvancedSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef(null);
  const hashtagRef = useRef(null);
  const [searchType, setSearchType] = useState("users");
  const { isDark, theme } = useTheme();
  
  const { user, isLoading: isLoadingUsers, getUserProfile, setUser } = useSearchUser();
  const { posts, isLoading: isLoadingPosts, searchPosts } = useSearchPosts();

  const handleSearchUser = (e) => {
    e.preventDefault();
    if (searchRef.current?.value) {
      getUserProfile(searchRef.current.value);
    }
  };

  const handleSearchHashtag = (e) => {
    e.preventDefault();
    if (hashtagRef.current?.value) {
      const hashtag = hashtagRef.current.value.replace('#', '');
      searchPosts(hashtag);
      setSearchType("posts");
    }
  };

  const popularHashtags = [
    "#sociogram", "#photography", "#nature", "#sunset", "#food",
    "#travel", "#art", "#lifestyle", "#fitness", "#technology"
  ];

  return (
    <>
      <Tooltip
        hasArrow
        label={"Advanced Search"}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
        bg={isDark ? "gray.800" : "gray.600"}
        color="white"
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ 
            bg: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            transform: "translateX(4px)"
          }}
          borderRadius={12}
          p={3}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
          cursor="pointer"
          color={theme.colors.primary}
          transition="all 0.3s ease"
        >
          <Box color={theme.colors.primary}>
            <SearchLogo />
          </Box>
          <Box 
            display={{ base: "none", md: "block" }}
            fontWeight="500"
            fontSize="md"
          >
            Advanced Search
          </Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft' size="lg">
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Advanced Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Users</Tab>
                <Tab>Hashtags</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel>
                  <form onSubmit={handleSearchUser}>
                    <FormControl>
                      <FormLabel>Search Users</FormLabel>
                      <Input
                        placeholder="Enter username..."
                        ref={searchRef}
                        mb={4}
                      />
                      <Button
                        type="submit"
                        colorScheme="blue"
                        size="sm"
                        isLoading={isLoadingUsers}
                        w="full"
                      >
                        Search Users
                      </Button>
                    </FormControl>
                  </form>
                  
                  {user && <SuggestedUser user={user} setUser={setUser} />}
                </TabPanel>
                
                <TabPanel>
                  <form onSubmit={handleSearchHashtag}>
                    <FormControl>
                      <FormLabel>Search by Hashtag</FormLabel>
                      <Input
                        placeholder="Enter hashtag (e.g., #nature)..."
                        ref={hashtagRef}
                        mb={4}
                      />
                      <Button
                        type="submit"
                        colorScheme="blue"
                        size="sm"
                        isLoading={isLoadingPosts}
                        w="full"
                      >
                        Search Posts
                      </Button>
                    </FormControl>
                  </form>
                  
                  <VStack align="stretch" mt={4}>
                    <Text fontSize="sm" fontWeight="bold" mb={2}>
                      Popular Hashtags
                    </Text>
                    <Flex wrap="wrap" gap={2}>
                      {popularHashtags.map((tag) => (
                        <Badge
                          key={tag}
                          colorScheme="blue"
                          cursor="pointer"
                          onClick={() => {
                            if (hashtagRef.current) {
                              hashtagRef.current.value = tag;
                            }
                          }}
                          _hover={{ opacity: 0.8 }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </Flex>
                  </VStack>
                  
                  {posts.length > 0 && (
                    <VStack align="stretch" mt={4}>
                      <Text fontSize="sm" fontWeight="bold">
                        Search Results ({posts.length} posts)
                      </Text>
                      {/* You can add a post grid component here */}
                    </VStack>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdvancedSearch;
