import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ModeToggle } from "@/components/ui/Mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCard from "./components/ui/ProjectCard";
import History from "./components/ui/History";
import ExperienceUI from "@/components/ui/ExperienceUI";
import GradualBlurEffect from "./components/ui/Gradualblur";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Github, Twitter, Linkedin, Instagram, Mail, Globe, Sparkles, ArrowRight } from "lucide-react";
import LeetCodeIcon from "./components/ui/LeetCodeIcon";
import logoImg from './assets/logo.jpg';
import apnaCollegeLogo from './assets/apnaCollegeLogo.jpeg';
import reImagine from './assets/reImagine.jpeg';
import hero from './assets/hero.png'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import "./App.css";

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isChevronAnimating, setIsChevronAnimating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setAlertType("success");
        setAlertMessage("Message sent successfully!");
        setDialogOpen(false);
        setShowAlert(true);
        e.target.reset();
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        setAlertType("error");
        setAlertMessage("Failed to send message. Please try again.");
        setDialogOpen(false);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage(`Error: ${error.message}`);
      setDialogOpen(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const initLenis = async () => {
      if (window.innerWidth >= 768) {
        try {
          const Lenis = (await import("lenis")).default;
          const lenis = new Lenis();

          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);

          return () => lenis.destroy();
        } catch (error) {
          console.log("Lenis not available");
        }
      }
    };

    initLenis();
    setTimeout(() => setShowContent(true), 0);
    const loadingTime = window.innerWidth >= 768 ? 2000 : 500;
    setTimeout(() => setIsLoading(false), loadingTime);
  }, []);

  const [experiences] = useState([

    {
      companyName: "Apna College",
      position: "Teaching Assistant - MERN Stack",
      logo: `${apnaCollegeLogo}`,
      startDate: "August 2024",
      endDate: "December 2024",
      description:
        "Mentored and instructed 5000 students in the MERN stack (MongoDB, Express.js, React, Node.js), driving a 40% increase in project proficiency. Guided learners in building real-world projects like Zoom and Airbnb clones by integrating WebRTC, Socket.IO, and OpenAI API. Debugged and optimized code, reducing development time by 30% while improving final project quality for 90% of participants.",
    },
    {
      companyName: "Reimagine Hackathon 2024",
      position: "Developer & Designer",
      logo: `${reImagine}`,
      // startDate: "August 2024",
      endDate: "August 2024",
      description:
        "Redesigned the Microsoft Xbox webpage using HTML, CSS, JavaScript, and GSAP based on a Figma prototype. Focused on UI/UX enhancements, delivering a fully responsive and interactive design that improved user engagement by 25%.",
    },
    // {
    //   companyName: "Freelance / Personal Projects",
    //   position: "Full Stack Developer",
    //   logo: "https://picsum.photos/150/150?random=1",
    //   startDate: "2023",
    //   endDate: "Present",
    //   description:
    //     "Design and develop end-to-end web applications with React, Node.js, and Express. Implement secure, scalable backends with MongoDB and MySQL, while ensuring modern, responsive UI/UX using Tailwind CSS and Shadcn UI. Delivered SaaS platforms, admin dashboards, and AI-driven tools for clients and personal use, focusing on performance, accessibility, and seamless deployment.",
    // }


  ]);

  const [educations] = useState([
    {
      companyName: "Vidyasagar University",
      position: "B.Sc. in Computer Science",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMKSMbawennZg1GR6yd5ZUJ9URgl6bEf5ZfQ&s",
      startDate: "2022",
      endDate: "2025",
      description:
        "Pursuing a Bachelor of Science in Computer Science with a current CGPA of 7.62. Focused on full stack development, software engineering, and problem-solving through academic projects and real-world applications. Actively engaged in hackathons, open-source contributions, and collaborative teamwork to bridge theoretical learning with industry practices.",
    },
  ]);


  const [Skills] = useState([
    // Programming Languages
    { tech: "C" },
    { tech: "Java" },
    { tech: "JavaScript" },
    { tech: "SQL" },

    // Frontend Development
    { tech: "React.js" },
    { tech: "Redux" },
    { tech: "Tailwind CSS" },
    { tech: "Shadcn UI" },
    { tech: "GSAP" },
    { tech: "Framer Motion" },

    // Backend Development
    { tech: "Node.js" },
    { tech: "Express.js" },
    { tech: "RESTful APIs" },
    { tech: "Socket.IO" },
    { tech: "Passport.js" },
    // { tech: "WebRTC" },

    // Databases
    { tech: "MongoDB" },
    { tech: "Mongoose" },
    { tech: "MySQL" },
    { tech: "Redis" },

    // Tools & Platforms
    { tech: "Git & GitHub" },
    { tech: "VS Code" },
    { tech: "Figma" },
  ]);


  const [projectsData] = useState([
    {
      id: 1,
      title: "ALVEN - Developer Collaboration Platform",
      description:
        "AI-powered developer collaboration platform built with React.js and Node.js, featuring real-time chat with “@ai” assistance for instant answers and code generation. Integrated Gemini API for automated project setup, WebContainer for secure in-browser code execution, and Nodemailer for OTP-based authentication.",
      video: "",
      date: "",
      badges: [
        "MERN",
        "Nodemailer",
        "Gemini API",
        "Socket.IO",
        "TailwindCSS",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/Developer-Bandhan/ALVEN_AI",
      liveText: "Live Demo",
      githubText: "GitHub",
    },
    {
      id: 2,
      title: "Social Media Platform - Instagram Clone",
      description:
        "A full-stack production-grade social media app built with React.js, Node.js, and MongoDB. Features post creation, likes, comments, real-time notifications, and live chat using Socket.IO. Integrated Cloudinary for image storage, Sharp for optimization, and JWT + bcryptjs for secure authentication.",
      video: "",
      image: "https://unblast.com/wp-content/uploads/2023/06/Instagram-UI-Template-and-Mockup-3.jpg",
      date: "",
      badges: [
        "MERN",
        "Redux Toolkit",
        "Socket.IO",
        "Cloudinary",
        "JWT",
        "TailwindCSS",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/Developer-Bandhan/insta_project",
      liveText: "Live Demo",
      githubText: "GitHub",
    },
    {
      id: 3,
      title: "Drivy - Ride Hailing Platform",
      description:
        "A mobile-first ride-hailing platform designed with React.js and Node.js. Features JWT-based authentication, role-based access, and real-time location tracking via Google Maps API. Integrated Socket.IO for dynamic ride updates and implemented optimized Express APIs achieving a 25% performance gain.",
      video: "",
      date: "",
      badges: [
        "MERN",
        "Socket.IO",
        "Google Maps API",
        "JWT",
        "TailwindCSS",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/Developer-Bandhan/Drivy",
      liveText: "Live Demo",
      githubText: "GitHub",
    },
    
  ]);


  const [historyData] = useState([
    {
      id: 1,
      logo: "https://picsum.photos/150/150?random=8",
      date: "12-July-2024",
      title: "Tech-Tonic Hackathon — Scanix AI",
      place: "Remote / Online",
      info: "Built Scanix AI, an AI-powered brain tumor detection tool. Awarded for innovation in healthcare tech.",
      githubUrl: "https://github.com/Ansh-dhanani/Scanix_AI",
      siteUrl: "https://scanix-ai.netlify.app",
    },
    {
      id: 2,
      logo: "https://picsum.photos/150/150?random=9",
      date: "15-March-2024",
      title: "Oodo Hackathon — CheckWise AI",
      place: "Remote / Online",
      info: "Developed CheckWise AI, an automated CBC report diagnosis system using modern AI/ML models.",
      githubUrl: "https://github.com/Ansh-dhanani/CheckwiseAI",
      siteUrl: "https://check-wise.netlify.app/",
    },
    {
      id: 3,
      logo: "https://picsum.photos/150/150?random=7",
      date: "April-2024",
      title: "Open Source — React Template Library",
      place: "GitHub",
      info: "Published and maintained a React template library providing free premium templates and components.",
      githubUrl: "https://github.com/Ansh-dhanani/react_template",
    },
    {
      id: 4,
      logo: "https://picsum.photos/150/150?random=12",
      date: "May-2024",
      title: "Stock Prediction App Launched",
      place: "Personal Project",
      info: "Designed and launched a modern React-based stock tracking and visualization app.",
      siteUrl: "https://stockpredicti0n.netlify.app/",
    },
  ]);

  return (
    <>
      <GradualBlurEffect />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100000] bg-background/80 backdrop-blur-sm border rounded-full px-4 py-2 flex items-center gap-3">
          <div className="relative group">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/Developer-Bandhan" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
                GitHub
              </Badge>
            </div>
          </div>
          <div className="relative group">
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://www.instagram.com/04_bandhan_sarkar_/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </Button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Badge
                variant="secondary"
                className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg"
              >
                Instagram
              </Badge>
            </div>
          </div>

          <div className="relative group">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://www.linkedin.com/in/bandhansarkar/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
                LinkedIn
              </Badge>
            </div>
          </div>
          <div className="relative group">
            <Button variant="ghost" size="sm" asChild>
              <a href="bandhansarkar63@gmail.com">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
                Email
              </Badge>
            </div>
          </div>
          <div className="relative group">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://leetcode.com/u/04_bandhan_sarkar/" target="_blank" rel="noopener noreferrer">
                <LeetCodeIcon className="h-4 w-4" />
              </a>
            </Button>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
                LeetCode
              </Badge>
            </div>
          </div>
          <div className="w-px h-6 bg-foreground/20 mx-1"></div>
          <div className="relative group">
            <ModeToggle />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Badge variant="secondary" className="whitespace-nowrap bg-background/90 backdrop-blur-sm border shadow-lg">
                Theme
              </Badge>
            </div>
          </div>
        </div>
        {showAlert && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-96">
            <Alert
              variant={alertType === "success" ? "default" : "destructive"}
              className={
                alertType === "success"
                  ? "border-green-400 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200 dark:border-green-400"
                  : "border-red-500 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
              }
            >
              {alertType === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {alertType === "success" ? "Success!" : "Error!"}
              </AlertTitle>
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          </div>
        )}

        <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    {selectedProject.date}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <video
                    src={selectedProject.video}
                    autoPlay
                    muted
                    loop
                    className="w-full rounded-lg"
                  />
                  <p className="text-sm leading-relaxed">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary">{badge}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    {selectedProject.liveUrl && (
                      <Button asChild>
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button variant="outline" asChild>
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        <div className="bg-background flex flex-col items-center justify-center p-5 pt-10 md:pt-20 relative">
          {window.innerWidth >= 768 && (
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              initial={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%)",
                backdropFilter: "blur(10px)"
              }}
              animate={showContent ? {
                background: "linear-gradient(to bottom, rgba(0,0,0,0) -100%, rgba(0,0,0,0) 0%)",
                backdropFilter: "blur(0px)"
              } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          )}
          <div className="main max-w-2xl w-full flex flex-col gap-10">


            {/* <div className="hero flex flex-row sm:flex-row gap-6 sm:text-left">
              <div className="relative min-w-10 max-w-[30px] max-[458px]:hidden sm:max-w-[300px] ">
                <img
                  src="https://cdn.britannica.com/99/236599-050-1199AD2C/Mark-Zuckerberg-2019.jpg"
                  alt="Profile picture of Ansh"
                  className="rounded-full w-[22vw] aspect-square object-cover"
                />
              </div>
              <div className="title flex flex-col gap-3">
                <h1 className="text-3xl sm:text-5xl md:text-5xl font-bold tracking-tighter whitespace-normal break-words">
                  Hello! I'm Bandhan 👋
                </h1>
                <p className="text-[1.1rem] tracking-tighter sm:tracking-normal text-stone-600 dark:text-stone-400">
                  Innovative full stack developer, bridging design and technology to create impactful, responsive, and performance-driven digital products.
                </p>
              </div>

            </div> */}

            <section id="home" className="hero flex flex-col md:flex-row gap-8 items-center justify-between ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs mb-4 bg-primary/10 text-primary">

                  <Sparkles className="w-3 h-3 mr-1" />
                  full Stack Developer & AI Enthusiast
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-5xl font-bold mb-3 tracking-tighter whitespace-normal break-words">
                  Hello! I'm Bandhan 👋
                </h1>
                <p className="text-[1.1rem] tracking-tighter sm:tracking-normal text-stone-600 dark:text-stone-400">
                  Innovative full stack developer, bridging design and technology to create impactful, responsive, and performance-driven digital products.
                </p>
                <div className="flex gap-3 mt-6">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        Get in Touch <Mail className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button variant="outline" asChild>
                    <a href="#projects" className="gap-2">
                      View Projects <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative min-w-40 max-w-[100px] hidden md:block md:max-w-[170px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-xl opacity-50"></div>
                <img
                  // src={logoImg}
                  src={hero}
                  alt="Profile picture of Ansh"
                  className="rounded-full aspect-square w-full object-cover relative z-10 border-4 border-background shadow-lg"
                />
              </motion.div>


            </section>

            <div className="About">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-0.5 w-8 bg-primary rounded-full"></div>
                <h2 className="text-xl font-semibold">About Me</h2>
              </div>
              <p className="text-stone-600 dark:text-stone-400 text-[1rem]">
                I’m recently compleated my Bachelor of Science (B.Sc.) in Computer Science
                at Vidyasagar University. As a passionate full stack developer, I specialize in building
                responsive web applications, designing user-friendly interfaces, and
                integrating scalable backend solutions. I have worked on multiple projects,
                explored real-world problem-solving through teamwork, and continuously strive
                to create digital experiences that are impactful, efficient, and visually
                engaging.
              </p>

            </div>

            <div className="work experience">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-0.5 w-8 bg-primary rounded-full"></div>
                <h2 className="text-xl font-semibold">Work Experience</h2>
              </div>
              <div className="flex flex-col gap-5 pt-3">
                {isLoading
                  ? Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                        <div className="flex-1 space-y-1">
                          <Skeleton className="h-[17px] w-[280px]" />
                          <Skeleton className="h-[13px] w-[200px]" />
                          <Skeleton className="h-3 w-[120px]" />
                        </div>
                      </div>
                    ))
                  : experiences.map((exp, index) => (
                    <ExperienceUI
                      key={index}
                      companyName={exp.companyName}
                      position={exp.position}
                      logo={exp.logo}
                      startDate={exp.startDate}
                      endDate={exp.endDate}
                      description={exp.description}
                    />
                  ))}
              </div>
            </div>

            {/* education */}
            <div className="Education">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-0.5 w-8 bg-primary rounded-full"></div>
                <h2 className="text-xl font-semibold">Education</h2>
              </div>
              <div className="flex flex-col pt-3 gap-5">
                {isLoading
                  ? Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                        <div className="flex-1 space-y-1">
                          <Skeleton className="h-[17px] w-[320px]" />
                          <Skeleton className="h-[13px] w-[240px]" />
                          <Skeleton className="h-3 w-[140px]" />
                        </div>
                      </div>
                    ))
                  : educations.map((exp, index) => (
                    <ExperienceUI
                      key={index}
                      companyName={exp.companyName}
                      position={exp.position}
                      logo={exp.logo}
                      startDate={exp.startDate}
                      endDate={exp.endDate}
                      description={exp.description}
                    />
                  ))}
              </div>
            </div>

            <div className="Skills">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-0.5 w-8 bg-primary rounded-full"></div>
                <h2 className="text-xl font-semibold ">Skills</h2>
              </div>
              <div className="flex w-full gap-1 flex-wrap">
                {isLoading
                  ? Array(12)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-[22px] w-[60px] rounded-full"
                      />
                    ))
                  : Skills.map((data, index) => (
                    <Badge
                      key={index}
                      size="sm"
                      shape="pill"

                      className="cursor-pointer"
                    >
                      {data.tech}
                    </Badge>
                  ))}
              </div>
            </div>


            {/* work */}
            <div className="Projects pt-14">
              <div className="text-center mb-12">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs mb-4 bg-primary/10 text-primary">
                  <Sparkles className="w-3 h-3 mr-1" />
                  My Work
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Check out my latest work
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  From AI-powered applications to modern UI projects, here are
                  some of the works I've built recently.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading
                  ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="rounded-2xl overflow-hidden w-full h-full flex flex-col border-2"
                      >
                        <Skeleton className="h-[180px] w-full" />
                        <div className="p-[7px] flex flex-col space-y-2">
                          <Skeleton className="h-[18px] w-[200px]" />
                          <Skeleton className="h-[14px] w-[100px]" />
                          <div className="space-y-1">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-[90%]" />
                            <Skeleton className="h-3 w-[80%]" />
                          </div>
                          <div className="flex gap-1 pt-2">
                            <Skeleton className="h-[18px] w-[50px] rounded" />
                            <Skeleton className="h-[18px] w-[60px] rounded" />
                            <Skeleton className="h-[18px] w-[55px] rounded" />
                          </div>
                          <div className="flex gap-1 pt-1">
                            <Skeleton className="h-[24px] w-[70px] rounded" />
                            <Skeleton className="h-[24px] w-[60px] rounded" />
                          </div>
                        </div>
                      </div>
                    ))
                  : projectsData.map((project) => (
                    <div key={project.id} onClick={() => { if (window.innerWidth >= 768) { setSelectedProject(project); setProjectDialogOpen(true); } }} className="md:cursor-pointer">
                      <ProjectCard project={project} />
                    </div>
                  ))}
              </div>
            </div>

            {/* <div className="History pt-14">
              <div className="flex-col text-center justify-center pb-10">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs mb-4 bg-primary/10 text-primary">
                  <Sparkles className="w-3 h-3 mr-1" />
                  My Journey
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  I like building things
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  I actively participate in hackathons and collaborative tech
                  events, creating innovative projects in just 2–3 days with
                  passionate teams.
                </p>
              </div>
              <div>
                {isLoading
                  ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="relative flex flex-row gap-4 ml-14 p-2 pl-5 pt-4 border-l-2"
                      >
                        <div className="absolute -left-6 top-2 flex items-center w-12 h-12">
                          <Skeleton className="w-full h-full rounded-full" />
                        </div>
                        <div className="flex-grow ml-5 space-y-2">
                          <Skeleton className="h-[14px] w-[100px]" />
                          <Skeleton className="h-[15px] w-[180px]" />
                          <Skeleton className="h-[14px] w-[120px]" />
                          <div className="space-y-1 pt-1">
                            <Skeleton className="h-[14px] w-full" />
                            <Skeleton className="h-[14px] w-[85%]" />
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Skeleton className="h-[24px] w-[60px] rounded" />
                            <Skeleton className="h-[24px] w-[50px] rounded" />
                          </div>
                        </div>
                      </div>
                    ))
                  : historyData.map((item) => (
                    <History
                      key={item.id}
                      logo={item.logo}
                      date={item.date}
                      title={item.title}
                      place={item.place}
                      info={item.info}
                      githubUrl={item.githubUrl}
                      siteUrl={item.siteUrl}
                    />
                  ))}
              </div>
            </div> */}


            {/* contact */}
            <div className="Contact pt-14 pb-14">
              <div className="flex-col text-center justify-center pb-10">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setIsChevronAnimating(false)}>
                      {isChevronAnimating && (
                        <div className="animate-bounce">
                          <ChevronDown className="h-6 w-6" />
                        </div>
                      )}
                      <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs mb-4 bg-primary/10 text-primary">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Get In Touch
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Let's work together
                      </h2>
                      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Want to collaborate or discuss a project? Reach out via
                        Twitter DM or GitHub, and I'll respond as soon as I can.
                      </p>
                    </DialogHeader>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="What's this about?"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell me about your project or idea..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          required
                        />
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <h1 className="text-5xl font-bold pt-1">Let's work together</h1>
                <p className="pt-2 text-2xl text-stone-600 dark:text-stone-400 tracking-tight">
                  Want to collaborate or discuss a project? Reach out via
                  Twitter DM or GitHub, and I’ll respond as soon as I can.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
