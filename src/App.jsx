import { useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TextInput from "./components/TextInput";
import KeywordsModal from "./components/KeywordsModal";

const App = () => {
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  // Extracts keywords from the input text using the Cohere API.
  const extractKeywords = async (inputText) => {
    setIsLoading(true);
    setIsOpen(true);

    const apiKey = import.meta.env.VITE_COHERE_API_KEY;
    const apiUrl =
      import.meta.env.VITE_COHERE_API_URL || "https://api.cohere.ai/v2/chat";

    if (!apiKey) {
      console.error("Cohere API key is missing! Check your .env file.");
      setIsLoading(false);
      return;
    }

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "command-a-03-2025",
          messages: [
            {
              role: "system",
              content:
                "You are a highly skilled AI assistant that extracts keywords from a given text. You must only return the keywords, separated by commas. Do not include any other text, explanation, or any words that are not present in the original text. Preserve the original capitalization.",
            },
            {
              role: "user",
              content: `Text: "The quick brown fox jumps over the lazy dog."\nKeywords: quick, brown, fox, jumps, lazy, dog\n\nText: "${inputText.trim()}"\nKeywords:`,
            },
          ],
          max_tokens: 200,
          temperature: 0.1,
        }),
      };

      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response status:", response.status);
        console.error("Response text:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      const data = json.message.content[0].text.trim();

      console.log(data);
      setKeywords(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setText("");
  };

  return (
    <Box bg="blue.600" color="white" height="100vh" paddingTop={130}>
      <Container maxW="3xl" centerContent>
        <Header />
        <TextInput
          extractKeywords={extractKeywords}
          isLoading={isLoading}
          text={text}
          setText={setText}
        />
        <Footer />
      </Container>
      <KeywordsModal
        isOpen={isOpen}
        closeModal={closeModal}
        keywords={keywords}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default App;
