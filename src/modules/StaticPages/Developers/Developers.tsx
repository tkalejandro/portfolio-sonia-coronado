import {
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Image,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Container,
} from '@chakra-ui/react';

const devTeamInfo = [
  {
    id: 0,
    fullName: 'Alejandro Coronado',
    img: 'https://www.nefrologiaenlinea.com/static/media/jacc.0ca55152d92bcd4c0d97.jpeg',
    role: ['Product Owner', 'Frontend Development', 'Three Development'],
    linkedinUrl: 'https://www.linkedin.com/in/jorge-alejandro-coronado-cuesta/',
  },
  {
    id: 1,
    fullName: 'Hicham-Zaadla',
    img: 'https://avatars.githubusercontent.com/u/99765449?v=4',
    role: ['Frontend Development', 'Three Development'],
    linkedinUrl: 'https://www.linkedin.com/in/hicham-zaadla/',
  },
  {
    id: 2,
    fullName: 'Albert Clemente',
    img: 'https://www.nefrologiaenlinea.com/static/media/albert.a0ab0d605c574bce3bee.jpeg',
    role: ['Frontend Development'],
    linkedinUrl: 'https://www.linkedin.com/in/albert-clemente/',
  },
];

const tools = [
  'Javascript',
  'Typescript',
  'React',
  'NextJs',
  'ThreeJs',
  'React Three Fiber',
  'ChakraUI',
  'Github',
  'Discord',
];
export const Developers = () => {
  return (
    <>
      <Heading as="h1" my={10}>
        About Development
      </Heading>
      <Text>
        If you've found your way to this section, it's probably because you're curious about the
        brilliant minds behind the creation of this composer portfolio. Below, you'll find an
        extensive overview of our dedicated development team, each member contributing their unique
        skills and expertise to bring this project to life. If you're interested in reaching out to
        any of our team members directly, their LinkedIn profiles are provided for your convenience.
        Whether you stumbled upon this page intentionally or by chance, we extend a hearty welcome
        to you! Take a moment to delve into the details and discover more about our team and the
        collaborative efforts that have shaped this composer portfolio.
      </Text>
      <Flex justify="space-between" my="12" gap="10" direction={{ base: 'column', md: 'row' }}>
        {devTeamInfo.map((member) => (
          <Card key={member.id} w={{ base: '100%', md: '30vw' }} boxShadow="md">
            <CardBody padding="0">
              <Image src={member.img} alt={`${member.fullName} portrait`} mb="5" />
              <UnorderedList mx="4" listStyleType="none">
                {member.role.map((task, i) => (
                  <ListItem key={i} mb="2" mx={{ base: '0', md: '4' }}>
                    {task}
                  </ListItem>
                ))}
              </UnorderedList>
            </CardBody>
            <CardFooter>
              <a href={member.linkedinUrl}>MORE ON LINKEDIN</a>
            </CardFooter>
          </Card>
        ))}
      </Flex>
      <Container my={10}>
        <Heading as="h2" size="lg" my={10}>
          Tools
        </Heading>
        <UnorderedList listStyleType="none">
          {tools.map((tool, i) => (
            <ListItem key={i} m={4}>
              {tool}
            </ListItem>
          ))}
        </UnorderedList>
      </Container>
    </>
  );
};
