'use client';
import { soniaCoronado } from '@/constants';
import React, { useRef } from 'react';
import {
  Button,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Container,
  Link,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { useAppBreakpoints, useAppTheme } from '@/hooks';
import { EmailIcon, LinkIcon, PhoneIcon } from '@chakra-ui/icons';

const Resume = () => {
  const sonia = soniaCoronado;
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const theme = useAppTheme();

  const onSubmit = async (e: { preventDefault: () => void }): Promise<void> => {
    try {
      e.preventDefault();

      const fullName = fullNameRef.current?.value;
      const email = emailRef.current?.value;
      const description = textAreaRef.current?.value;

      const mailtoLink = `mailto:${sonia.email}?subject=Contact Request - Portfolio Sonia Coronado&body=${description} %0D%0A%0D%0ASincerly,%0D%0A%0D%0A${fullName}%0D%0A${email}%0D%0A`;
      //Open external Mail App
      window.location.href = mailtoLink;
      //Clear values
      if (fullNameRef.current) fullNameRef.current.value = '';
      if (emailRef.current) emailRef.current.value = '';
      if (textAreaRef.current) textAreaRef.current.value = '';
    } catch (e) {
      console.warn(e);
    }
  };

  const Section = ({ children }: { children: React.ReactNode }) => (
    <Container maxW="100%" py={8} px={0} fontWeight={300}>
      {' '}
      {children}
    </Container>
  );

  return (
    <>
      <Section>
        <Heading
          as="h1"
          mb={6}
          bg={theme.colors.primary.main}
          p={3}
          color={theme.colors.primary.contrastText}
          borderRadius="lg"
        >
          {sonia.name}
        </Heading>
        <Text>{sonia.summary}</Text>
      </Section>

      <Section>
        <Heading as="h2" size="lg" fontWeight="normal">
          Skills
        </Heading>
        <UnorderedList styleType="none" margin={0} my={4}>
          {sonia.skills.map((skill, i) => (
            <ListItem
              key={i}
              display="inline-block"
              bg={theme.colors.secondary[100]}
              p={2}
              m={2}
              mr={4}
              ml={0}
              rounded="lg"
            >
              {skill.title}
            </ListItem>
          ))}
        </UnorderedList>
      </Section>

      <Section>
        <Heading as="h2" size="lg">
          Experience
        </Heading>
        <UnorderedList styleType="none" mx={0} my={4}>
          {sonia.experience.map((xp) => (
            <ListItem key={xp.id}>
              <Text fontWeight={600} fontSize="md" color={theme.colors.primary.main}>
                {xp.title}
              </Text>
              <Text fontWeight={700} fontSize="lg" color={theme.colors.secondary.main}>
                {xp.entity}
              </Text>
              <Text>{xp.startDate.toLocaleDateString()} - Present </Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Section>

      <Section>
        <Heading as="h2" size="lg">
          Education
        </Heading>
        <UnorderedList
          styleType="none"
          color={theme.colors.primary[700]}
          mx={0}
          my={4}
          maxWidth={'100%'}
        >
          {sonia.education.map((education) => (
            <ListItem key={education.id} mb={4} width={'100%'}>
              <Text fontWeight={600} fontSize="md" color={theme.colors.primary.main}>
                {education.title}
              </Text>
              <Text fontWeight={700} fontSize="lg" color={theme.colors.secondary.main}>
                {education.entity}
              </Text>
              <Text m={0} p={0} display="flex" alignItems="center" justifyContent="space-between">
                <Text as="span" whiteSpace="nowrap" padding={0}>
                  {education.startDate.toLocaleDateString()} -{' '}
                  {education.endDate?.toLocaleDateString()}{' '}
                </Text>
                <Text as="span" color={theme.colors.primary.main}>
                  {`${education.city}, ${education.country}`}
                </Text>
              </Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Section>

      <Section>
        <Heading as="h2" size="lg">
          Projects
        </Heading>
        <UnorderedList styleType="none" margin={0} padding={0} my={4}>
          {sonia.projects.map((project) => (
            <ListItem key={project.id} width={'100%'} my={8}>
              <Text as="h3" fontWeight={600} fontSize="md" color={theme.colors.primary.main}>
                {project.title}
              </Text>
              <Text fontWeight={700} fontSize="lg" color={theme.colors.secondary.main}>
                {project.entity}
              </Text>
              <Text display="flex" alignItems="center" justifyContent="space-between">
                <Text as="span" whiteSpace="nowrap" padding={0}>
                  {project.startDate.toLocaleDateString()} - {project.endDate?.toLocaleDateString()}{' '}
                </Text>
                <Text as="span">{`${project.city}, ${project.country}`}</Text>
              </Text>

              <Accordion allowMultiple>
                <AccordionItem>
                  <AccordionButton justifyContent="space-between" px={0}>
                    <Text as="h3">Highlights</Text>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <UnorderedList>
                      {project.highlights?.map((item, i) => {
                        return (
                          <ListItem my={2} key={i}>
                            {item}
                          </ListItem>
                        );
                      })}
                    </UnorderedList>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </ListItem>
          ))}
        </UnorderedList>
      </Section>

      <Section>
        <Heading as="h2" size="lg">
          Contact
        </Heading>

        <VStack as="address" align="start" my={4}>
          <Box my={2}>
            <EmailIcon color={theme.colors.secondary.main} fontSize="xl" mr={2} />
            <Link href={`mailto:${sonia.email}`}>{sonia.email}</Link>
          </Box>
          <Box my={2}>
            <PhoneIcon color={theme.colors.secondary.main} fontSize="xl" mr={2} />
            <Link href={`phone:${sonia.phone}`}>{sonia.phone}</Link>
          </Box>
          <Box my={2}>
            <LinkIcon color={theme.colors.secondary.main} fontSize="xl" mr={2} />
            <Link href={soniaCoronado.linkedin} target="_blank">{`LinkedIn - Sonia Coronado`}</Link>
          </Box>
        </VStack>

        <Box as="form" action="" onSubmit={onSubmit} my={4}>
          <FormControl my={6}>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" placeholder="Full Name" ref={fullNameRef} />
          </FormControl>
          <FormControl my={6}>
            <FormLabel htmlFor="">Your Email</FormLabel>
            <Input type="email" placeholder="your@mail.com" ref={emailRef} />
          </FormControl>
          <FormControl my={6}>
            <FormLabel htmlFor="">Description</FormLabel>
            <Textarea placeholder="Enter your description" ref={textAreaRef} />
          </FormControl>
          <Button type="submit">Send</Button>
        </Box>
      </Section>
    </>
  );
};

export default Resume;
