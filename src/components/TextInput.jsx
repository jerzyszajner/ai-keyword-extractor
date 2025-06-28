import { useState } from "react";
import { Textarea, Button, useToast } from "@chakra-ui/react";

const TextInput = ({ extractKeywords }) => {
  // State for text input
  const [text, setText] = useState("");

  // Toast for error messages
  const toast = useToast();

  // Handle text input
  const handleSubmit = (e) => {
    setText(e.target.value);
  };

  // Submit text to OpenAI API
  const submitText = () => {
    if (!text.trim()) {
      toast({
        title: "Text field is empty",
        description: "Please enter some text to extract keywords",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
      setText("");
    } else {
      // Call the function to extract keywords from text
      extractKeywords(text);
      setText("");
    }
  };

  return (
    <>
      <Textarea
        bg="blue.400"
        color="white"
        padding={4}
        marginTop={6}
        height={200}
        value={text}
        onChange={handleSubmit}
      />
      <Button
        bg="blue.500"
        color="white"
        marginTop={4}
        width="100%"
        _hover={{ bg: "blue.700" }}
        onClick={submitText}
      >
        Extract Keywords
      </Button>
    </>
  );
};

export default TextInput;
