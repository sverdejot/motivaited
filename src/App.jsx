import { 
  Card,
  CardHeader,
  CardBody,
  Heading,
  Center,
  Input,
  HStack,
  Button,
  Image,
  FormControl,
  Flex,
  ScaleFade,
  useColorMode
} from '@chakra-ui/react'
import { LineWobble } from '@uiball/loaders'

import { useState } from 'react'

export default function App() {
  const [loading, setLoading]         = useState(false)
  const [imageSrc, setImageSrc]       = useState('https://motivaitional.sverdejot.dev/1781000505003305294.png')
  const [inputPrompt, setInputPrompt] = useState('')
  const { colorMode, toggleColorMode } = useColorMode('dark')

  const generateNewImage = () => {
    setLoading(true)
    fetch(
      'https://api.sverdejot.dev/cohere-hackathon', 
      {
        method: 'POST',
        body: JSON.stringify({prompt: inputPrompt})
      }
    )
    .then((res) => res.json())
    .then((data) => {
      setLoading(false)
      setImageSrc(data.url)
    })
  }

  return (
    <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
      <Center>
        <Card mt="10" w="768px" boxShadow='2xl'>
          <CardHeader>
            <Center>
              <Heading 
                size='2xl'
                _hover={{
                  transition: '0.2s',
                  color: (colorMode === 'dark') ? 'tomato' : 'black'
                }}
                onClick={toggleColorMode}
              >Motiv(AI)ted</Heading>
            </Center>
          </CardHeader>
          <CardBody>
            <FormControl>
              <Center>
              <Heading color='gray' as='h2' size='md' mb='3'>Describe in a few words how are you feeling today</Heading>
              </Center>
              <HStack spacing='10px'>
                <Input placeholder="Give it a try!" value={inputPrompt} onChange={(event) => setInputPrompt(event.target.value)}/>
                <Button onClick={generateNewImage}>Generate</Button>
              </HStack>
            </FormControl>
            <Center w='512' h='512' mb='5'>
              {
                loading ? <LineWobble size={200} speed={3} color={(colorMode === 'dark') ? "white" : "#231F20"} /> : <Image src={imageSrc} mt='5' rounded='10' />
              }
            </Center>
          </CardBody>
        </Card>
      </Center>
    </Flex>
  )
}