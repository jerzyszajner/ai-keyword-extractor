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

  // Function to extract keywords from text
  const extractKeywords = async (inputText) => {
    setIsLoading(true);
    setIsOpen(true);

    const apiKey = import.meta.env.VITE_COHERE_API_KEY;
    const apiUrl =
      import.meta.env.VITE_COHERE_API_URL || "https://api.cohere.ai/v2/chat";

    if (!apiKey) {
      console.error("Brak klucza Cohere API! Sprawdź plik .env");
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
          model: "command-r-plus",
          messages: [
            {
              role: "system",
              content:
                "You are a specialized keyword extraction AI. Your task is to identify and extract the most relevant, specific, and meaningful keywords from any given text while preserving the original language and context.",
            },
            {
              role: "user",
              content: `Extract keywords from the following text following these strict rules:

              **EXTRACTION RULES:**
              - Identify nouns, proper nouns, technical terms, brand names, locations, actions, and domain-specific vocabulary
              - Preserve the exact original language, spelling, and capitalization
              - Capitalize the first letter of each extracted keyword
              - Separate keywords with commas only (no spaces after commas)
              - Exclude generic filler words, articles, prepositions, and common verbs
              - Focus on content-specific terms that carry meaning
              - Maintain the original language of the input text

              **PHRASE HANDLING:**
              - Keep important technical phrases together (e.g., "Fermentacja Malolaktyczna" not "Fermentacja, Malolaktyczna")
              - Preserve domain-specific compound terms (e.g., "Cabernet Sauvignon" as one term)
              - Avoid breaking meaningful multi-word concepts that lose meaning when separated
              - Prefer single words for general concepts, but keep phrases for specialized terms
              - When in doubt, choose the more specific and meaningful option
              - Maintain proper grammatical forms - use base forms of nouns (e.g., "Stoki" not "Stoków", "Beczki" not "Beczkach")
              - Keep location phrases intact (e.g., "Południowe Stoki" as one phrase)
              - Preserve technical process names in their complete form

              **GRAMMATICAL CONSISTENCY:**
              - Use base forms of nouns (nominative case) rather than inflected forms
              - Keep adjective-noun combinations together when they form a meaningful concept
              - Maintain the original meaning and context of technical terms

              **EXCLUDE THESE WORDS:** the, a, an, and, or, but, in, on, at, to, for, of, with, by, from, up, down, is, are, was, were, be, been, have, has, had, do, does, did, will, would, could, should, may, might, can, this, that, these, those, it, its, they, them, their, we, us, our, you, your, he, she, his, her, good, bad, big, small, new, old, important, thing, stuff, way, time, people, work, make, take, get, go, come, see, look, know, think, feel, want, need, use, find, give, tell, ask, try, help, like, love, hate, want, need, must, should, can, will, may, might, could, would, shall, ought

              **OUTPUT FORMAT:** Only the keywords separated by commas, no additional text, labels, or explanations.

              Text: ${inputText}

              Keywords:`,
            },
          ],
          max_tokens: 300,
          temperature: 0.3,
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
  };

  return (
    <Box bg="blue.600" color="white" height="100vh" paddingTop={130}>
      <Container maxW="3xl" centerContent>
        <Header />
        <TextInput extractKeywords={extractKeywords} isLoading={isLoading} />
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
