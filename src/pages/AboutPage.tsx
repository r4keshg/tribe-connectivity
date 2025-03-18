
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, MessageSquare } from 'lucide-react';
import QuoteDisplay from "@/components/QuoteDisplay";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from 'sonner';

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Passionate about making education accessible to everyone.",
    avatar: "/placeholder.svg",
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen"
  },
  {
    name: "Sarah Johnson",
    role: "Head of Content",
    bio: "Curriculum developer with 10+ years in educational technology.",
    avatar: "/placeholder.svg",
    github: "https://github.com/sarahjohnson",
    linkedin: "https://linkedin.com/in/sarahjohnson"
  },
  {
    name: "Miguel Rodriguez",
    role: "Lead Developer",
    bio: "Full-stack developer focused on creating intuitive learning experiences.",
    avatar: "/placeholder.svg",
    github: "https://github.com/miguelr",
    linkedin: "https://linkedin.com/in/miguelr"
  },
  {
    name: "Priya Patel",
    role: "Community Manager",
    bio: "Building vibrant learning communities and fostering engagement.",
    avatar: "/placeholder.svg",
    github: "https://github.com/priyap",
    linkedin: "https://linkedin.com/in/priyap"
  },
];

const FAQItems = [
  {
    question: "What is vSkill?",
    answer: "vSkill is an innovative eLearning platform that combines structured learning paths with community features to enhance your educational journey. We offer courses, learning paths (Odysseys), and community spaces (Tribes and Clans) to help you connect with other learners."
  },
  {
    question: "How do I join a Clan?",
    answer: "You can join a Clan by visiting the Tribe page, browsing through available Clans, and clicking the 'Join Clan' button on any Clan that interests you. Some Clans may require approval from admins before joining."
  },
  {
    question: "What are Odyssey learning paths?",
    answer: "Odyssey learning paths are structured sequences of courses, modules, and resources designed to help you master a specific skill or topic. They provide a guided learning experience with clear progression and milestones."
  },
  {
    question: "Can I create my own courses?",
    answer: "Yes! vSkill allows users to create and share their own courses through the Odyssey page. You can design custom modules, embed videos, create quizzes, and share your expertise with the community."
  },
  {
    question: "How do streaks and badges work?",
    answer: "Streaks track consecutive days of learning activity on the platform. You'll earn badges for maintaining streaks (7-day, 30-day milestones) and for completing courses or achieving other learning goals. These gamification features help keep you motivated!"
  }
];

const AboutPage: React.FC = () => {
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Contact form submission logic would go here
    toast.success("Message sent successfully! We'll get back to you soon.");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-brand-600">About vSkill</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We're on a mission to transform education through community-driven learning experiences.
          Our platform combines structured courses with vibrant communities to create a holistic learning environment.
        </p>
        <div className="mt-8">
          <QuoteDisplay />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-brand-600 mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-600">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-600">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {FAQItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Contact Us</h2>
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" size="lg">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Us a Message
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Contact Us</DialogTitle>
                  <DialogDescription>
                    Send us a message and we'll get back to you as soon as possible.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleContactSubmit} className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Message subject" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your message" rows={5} required />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </DialogContent>
            </Dialog>
            <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <div className="flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2 text-brand-600" />
                <span>contact@vskill.com</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AboutPage;
