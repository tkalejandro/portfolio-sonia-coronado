'use client';
import { soniaCoronado } from '@/constants';
import React, { useRef, useState } from 'react';
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
  Container as Box,
  Link,
  Container,
  VStack,
} from '@chakra-ui/react';

const Resume = () => {
  const sonia = soniaCoronado;
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
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
      console.log(e);
    }
  };
  return (
    <>
      <Box maxW="100%" py={8}>
        <Heading as="h1" mb={16}>
          Portfolio - {sonia.name}
        </Heading>
        <Text>{sonia.summary}</Text>
      </Box>
      <Box maxW="100%" py={8}>
        <Heading as="h2" size="lg">
          Skills
        </Heading>
        <UnorderedList styleType="none">
          {sonia.skills.map((skill, i) => (
            <ListItem key={i}>{skill.title}</ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box maxW="100%" py={8}>
        <Heading as="h2" size="lg">
          Experience
        </Heading>
        <UnorderedList styleType="none">
          {sonia.experience.map((xp) => (
            <ListItem key={xp.id}>{xp.title}</ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box maxW="100%" py={8}>
        <Heading as="h2" size="lg">
          Education
        </Heading>
        <UnorderedList styleType="none">
          {sonia.education.map((project) => (
            <ListItem key={project.id}>{project.title}</ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box maxW="100%" py={8}>
        <Heading as="h2" size="lg">
          Projects
        </Heading>
        <UnorderedList styleType="none">
          {sonia.projects.map((project) => (
            <ListItem key={project.id}>{project.title}</ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box maxW="100%" py={8}>
        <Heading as="h2" size="lg">
          Contact
        </Heading>
        <address className="">
          <VStack align="start" mb={12}>
            <Link href={`mailto:${sonia.email}`}>{sonia.email}</Link>
            <Link href={`phone:${sonia.phone}`}>{sonia.phone}</Link>
          </VStack>
        </address>
        <form action="" onSubmit={onSubmit}>
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
          <Button colorScheme="primary" variant="outline" type="submit">
            Send
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Resume;
