import type { StaticImageData } from 'next/image';

import kalyamRamImage from '@/assets/img/portfolio/port-inner-up-1.jpg';
import multiFormatConverterImage from '@/assets/img/portfolio/port-inner-up-4.jpg';
import telegramBotImage from '@/assets/img/portfolio/port-inner-up-5.jpg';
import gitWallImage from '@/assets/img/portfolio/port-inner-up-2.jpg';
import reelsXpressImage from '@/assets/img/portfolio/port-inner-up-3.jpg';
import bachelorBrotherImage from '@/assets/img/portfolio/portfolio-2.jpg';

export type PortfolioProject = {
  id: number;
  slug: string;
  path: string;
  title: string;
  category: string;
  year: number;
  client: string;
  role: string;
  services: string[];
  summary: string;
  heroDescription: string;
  heroStats: {
    value: string;
    label: string;
  }[];
  aboutTitle: string;
  aboutDescription: string[];
  overviewLead: string;
  overviewPoints: string[];
  results: {
    value: string;
    label: string;
  }[];
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
  listingImage: StaticImageData;
  listingBackgroundImage: string;
  thumbVariant: 1 | 2 | 3 | 4;
  featuredOnHome?: boolean;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    slug: 'kalyamram',
    path: '/portfolio/kalyamram',
    title: 'KalyamRam',
    category: 'Portfolio Website',
    year: 2025,
    client: "Personal / demo project",
    role: 'Strategy, UI/UX, Frontend Build',
    services: ['Website Development', 'Portfolio Website', 'Responsive Website Development'],
    summary:
      "A personal portfolio demo exploring how to introduce a person, present work and guide a visitor to contact.",
    heroDescription:
      "A personal/demo website project focused on the order of information: introduction, capabilities, selected work and contact. This is not a paid client case study.",
    heroStats: [
      {
        "value": "01",
        "label": "Introduce the person"
      },
      {
        "value": "02",
        "label": "Explain the work"
      },
      {
        "value": "03",
        "label": "Make contact clear"
      }
    ],
    aboutTitle: "A portfolio should answer more than who built it.",
    aboutDescription: [
      "KalyamRam explores a familiar portfolio problem: a visitor sees a name and visual work but has to work out what the person offers or why a project matters. The design direction groups the introduction, capabilities and selected work into an understandable sequence.",
      "The central content decision is to give the work context. A project title or image alone does not explain the problem, the person's role or what was produced. Short descriptions can provide that context without turning the opening page into a lengthy biography.",
      "Contact belongs near the decision to enquire. A visitor who has understood the work should be able to find the next step without returning to the top or choosing among several unrelated actions. On a smaller screen, readable descriptions and an obvious link matter more than preserving a desktop composition exactly.",
      "This is personal/demo work. The page describes the intended structure and design focus; it does not report client enquiries, usability-study results or commercial improvements. Those outcomes would require evidence from a real deployment and its users.",
      "For a similar portfolio, prepare an introduction, a short capability list and a factual note for each project. Identify personal, demo and client work accurately. The useful review question is whether a new visitor can explain what you do and where to contact you after reading the page."
    ],
    overviewLead:
      "The project can be reviewed through three practical questions. They describe the design priorities, rather than measured performance results.",
    overviewPoints: [
      "Introduction: can a visitor identify the person, focus and type of work without interpreting vague claims?",
      "Project context: does each example explain its purpose and the role involved?",
      "Contact: is the next action easy to find after the visitor has reviewed the work, including on a phone?"
    ],
    results: [
      {
        "value": "01",
        "label": "Clear introduction and capabilities"
      },
      {
        "value": "02",
        "label": "Project descriptions with context"
      },
      {
        "value": "03",
        "label": "A visible contact path"
      }
    ],
    ctaLabel: 'Start Similar Project',
    ctaHref: '/contact',
    metaTitle: "KalyamRam Portfolio Website Demo | Reddystack",
    metaDescription:
      "Explore a personal portfolio demo focused on introduction, project context and contact flow. Personal work, with no paid client or performance claims.",
    listingImage: kalyamRamImage,
    listingBackgroundImage: '/assets/img/portfolio/port-inner-up-1.jpg',
    thumbVariant: 4,
    featuredOnHome: true,
  },
  {
    id: 2,
    slug: 'multi-format-converter',
    path: '/portfolio/multi-format-converter',
    title: 'Multi-Format Converter',
    category: 'File Tool',
    year: 2025,
    client: "Personal / demo project",
    role: 'Product Planning, UI Flow, App Build',
    services: ['Custom Web Application', 'Tool UX', 'Workflow Application'],
    summary:
      "A file-conversion tool concept organised around selecting a file, choosing an output and understanding the result.",
    heroDescription:
      "A personal/demo utility project exploring a short, understandable conversion journey. The focus is the interface and workflow described here, not a claim about production usage or supported formats.",
    heroStats: [
      {
        "value": "01",
        "label": "Select the input"
      },
      {
        "value": "02",
        "label": "Choose the output"
      },
      {
        "value": "03",
        "label": "Understand the result"
      }
    ],
    aboutTitle: "Make the next step clear in a small utility.",
    aboutDescription: [
      "Multi-Format Converter explores how a single-purpose tool can explain its operation without making a user learn a complex interface. The core sequence is file selection, format choice and an output state. Each step should make the next decision apparent.",
      "A converter's interface needs more than an upload button. People need to understand which input they selected and what the requested output means. A concise description beside the choice can be more useful than several decorative controls competing for attention.",
      "The design direction keeps the utility's action central. First-time users need orientation, while repeat users need a short route through familiar steps. Clear state changes help both groups understand whether the tool is waiting, processing or ready to present a result.",
      "This is a personal/demo product concept. No conversion-success rate, customer count, processing-speed benchmark or production availability is reported. The portfolio description should not be used as a specification of supported file types, limits or data retention.",
      "For a production brief, those missing operational details would need explicit decisions. Define supported formats, size limits, failed-file handling, output naming and where files are processed or retained. Review an unsupported input and an interrupted operation alongside the successful journey before inviting users to depend on it."
    ],
    overviewLead:
      "The concept provides a way to discuss the user journey. Production capabilities would need their own implementation and verification.",
    overviewPoints: [
      "Input clarity: show the selected file and communicate accepted formats and limits for the actual implementation.",
      "Choice clarity: describe the output format so users understand what they are requesting.",
      "Outcome clarity: distinguish a successful output from a failed or incomplete conversion without implying that a button click finished the job."
    ],
    results: [
      {
        "value": "01",
        "label": "Visible file selection"
      },
      {
        "value": "02",
        "label": "An understandable format choice"
      },
      {
        "value": "03",
        "label": "A distinct output state"
      }
    ],
    ctaLabel: 'Discuss Utility Build',
    ctaHref: '/contact',
    metaTitle: "Multi-Format Converter Demo Project | Reddystack",
    metaDescription:
      "A personal file-tool concept exploring upload, format selection and output states. Read the workflow decisions and the limits of the demo.",
    listingImage: multiFormatConverterImage,
    listingBackgroundImage: '/assets/img/portfolio/port-inner-up-4.jpg',
    thumbVariant: 4,
  },
  {
    id: 3,
    slug: 'telegram-auto-reply-bot',
    path: '/portfolio/telegram-auto-reply-bot',
    title: 'Telegram Auto-Reply Bot',
    category: 'Automation',
    year: 2025,
    client: "Personal / demo project",
    role: 'Workflow Design, Prompt Logic, Bot Setup',
    services: ['AI Automation', 'Telegram Automation', 'Lead Handling Flow'],
    summary:
      "An internal automation experiment exploring common reply paths and when a conversation needs a person.",
    heroDescription:
      "A personal/demo Telegram automation project focused on repeated questions, response paths and handoff. No live customer-service results or response-time improvement is claimed.",
    heroStats: [
      {
        "value": "01",
        "label": "Recognise a supported request"
      },
      {
        "value": "02",
        "label": "Provide a useful response"
      },
      {
        "value": "03",
        "label": "Hand off when needed"
      }
    ],
    aboutTitle: "Keep a first reply useful and its limits visible.",
    aboutDescription: [
      "Telegram Auto-Reply Bot explores a narrow operational task: handling common incoming messages and directing the conversation toward a useful next step. The aim of the concept is to organise repeatable reply paths rather than pretend every message can be resolved automatically.",
      "The important planning question is what the automation is allowed to answer. A supported request can receive an approved response or a request for missing information. An unclear or unsupported question needs a fallback that does not trap the person in a loop.",
      "A handoff needs context. When a conversation requires a person, the useful information is the original request, any details already supplied and the reason the automated path stopped. Asking the user to start over can remove much of the convenience of an immediate reply.",
      "This is personal/demo work and an internal experiment. The page does not establish production reliability, a reduction in workload or any paid client deployment. The scope described here is a basis for discussing reply logic and boundaries.",
      "Before using a similar workflow for a real business, define account ownership, allowed actions, duplicate-message handling and who monitors failures. Test unknown requests and repeated events. Any action that sends messages or changes records needs explicit authorisation and a way to pause the process."
    ],
    overviewLead:
      "The useful review is whether each supported path has an understandable response and each unsupported path has an honest exit.",
    overviewPoints: [
      "Map common requests to approved responses instead of relying on vague all-purpose replies.",
      "Keep clarification and human handoff available when the request falls outside the supported scope.",
      "For a live implementation, verify duplicate handling, permissions and monitoring before relying on automated responses."
    ],
    results: [
      {
        "value": "01",
        "label": "Defined reply boundaries"
      },
      {
        "value": "02",
        "label": "Clear next steps"
      },
      {
        "value": "03",
        "label": "A human handoff plan"
      }
    ],
    ctaLabel: 'Discuss Automation Build',
    ctaHref: '/contact',
    metaTitle: "Telegram Auto-Reply Bot Demo | Reddystack",
    metaDescription:
      "A personal Telegram automation experiment exploring common replies, fallback paths and human handoff, without client or performance claims.",
    listingImage: telegramBotImage,
    listingBackgroundImage: '/assets/img/portfolio/port-inner-up-5.jpg',
    thumbVariant: 4,
    featuredOnHome: true,
  },
  {
    id: 4,
    slug: 'gitwall-app',
    path: '/portfolio/gitwall-app',
    title: 'GitWall App',
    category: 'Developer Tool',
    year: 2025,
    client: "Personal / demo project",
    role: 'Product Design, UX Direction, Build Execution',
    services: ['Custom Web App', 'Dashboard UX', 'MVP Development'],
    summary:
      "A developer-tool concept exploring product explanation, first-use orientation and a readable interface.",
    heroDescription:
      "A personal/demo developer-facing product project. The work described focuses on explaining the tool and helping a visitor understand its first-use journey.",
    heroStats: [
      {
        "value": "01",
        "label": "Explain the purpose"
      },
      {
        "value": "02",
        "label": "Orient the user"
      },
      {
        "value": "03",
        "label": "Keep the interface readable"
      }
    ],
    aboutTitle: "Explain a technical idea before adding more interface.",
    aboutDescription: [
      "GitWall App explores the presentation of a developer-facing utility. Technical users still need to understand what a product does, what information it uses and what action to take first. A dense interface cannot supply that explanation on its own.",
      "The design direction gives the product's purpose a place before deeper interaction. Clear labels and an understandable starting point help a visitor assess whether the tool is relevant. The visual language can remain technical without assuming every visitor already knows the workflow.",
      "First-use and repeated-use needs differ. A new user needs context for an empty screen, while a returning user may want direct access to familiar information. Those states should be considered together so guidance does not become a permanent obstacle to routine use.",
      "This page describes a personal/demo concept. It does not claim a production integration, a verified feature inventory, adoption figures or a measured improvement in developer productivity. Those claims would require separate evidence.",
      "For a similar live tool, the brief should identify the source of data, required permissions, refresh behaviour and what happens when access expires. Before adding more interface areas, check whether a user can explain the product's purpose and complete the intended first action with representative information."
    ],
    overviewLead:
      "The project centres on product communication and orientation. It is presented as design and development exploration rather than commercial proof.",
    overviewPoints: [
      "Describe the product's purpose before asking the visitor to interpret technical details.",
      "Make the initial state and first useful action understandable, including when no data is available.",
      "Keep any future capability claims tied to functionality that has actually been implemented and checked."
    ],
    results: [
      {
        "value": "01",
        "label": "A clear product explanation"
      },
      {
        "value": "02",
        "label": "First-use orientation"
      },
      {
        "value": "03",
        "label": "Readable information hierarchy"
      }
    ],
    ctaLabel: 'Build a Product Like This',
    ctaHref: '/contact',
    metaTitle: "GitWall App Developer-Tool Demo | Reddystack",
    metaDescription:
      "A personal developer-tool concept focused on product explanation and first-use clarity. Explore the design priorities and scope of the demo.",
    listingImage: gitWallImage,
    listingBackgroundImage: '/assets/img/portfolio/port-inner-up-2.jpg',
    thumbVariant: 4,
    featuredOnHome: true,
  },
  {
    id: 5,
    slug: 'reelsxpress',
    path: '/portfolio/reelsxpress',
    title: 'ReelsXpress',
    category: 'Social Media',
    year: 2025,
    client: "Personal / demo project",
    role: 'Brand Landing Page, UX Polish, Conversion Direction',
    services: ['Landing Page Development', 'Lead Generation Page', 'Offer Structuring'],
    summary:
      "A service-website demo exploring how offer details, pricing information and contact actions fit into a clear page sequence.",
    heroDescription:
      "A personal/demo service-website project focused on offer presentation, section order and mobile readability. This portfolio entry does not report paid client work or campaign results.",
    heroStats: [
      {
        "value": "01",
        "label": "Explain the offer"
      },
      {
        "value": "02",
        "label": "Clarify the scope"
      },
      {
        "value": "03",
        "label": "Guide the enquiry"
      }
    ],
    aboutTitle: "Help a visitor compare the service before asking them to enquire.",
    aboutDescription: [
      "ReelsXpress explores the structure of a website presenting social-media services. The design problem is practical: visitors need to understand what is offered, what a package includes and how to discuss their needs without decoding a long series of promotional claims.",
      "Section order matters because each part should answer the next reasonable question. An introduction establishes the offer, scope information explains what is delivered and the contact action gives the visitor a route to discuss details. Repeating a button does not replace missing information about the service.",
      "Pricing presentation needs context. A figure is difficult to assess without deliverables, exclusions and any conditions. In a real service brief, those details would need approval from the business before publication. Any project examples or testimonials would also need accurate labels and permission.",
      "This is personal/demo work. The portfolio does not claim that the page increased bookings, improved conversion rates or produced customer revenue. The focus is the information structure and the design questions described, rather than an unverified commercial outcome.",
      "For a similar service site, prepare the exact offer, asset requirements, review process and enquiry details before design review. On mobile, check whether a visitor can compare the scope and reach contact without losing their place. Real enquiries can later reveal which questions the page still needs to answer."
    ],
    overviewLead:
      "The demo is useful for discussing how a service offer is explained and how the page supports an informed enquiry.",
    overviewPoints: [
      "Sequence the offer, scope information and contact action so the visitor can follow the decision.",
      "Present pricing only with the inclusions and conditions needed to understand it.",
      "Review smaller screens for readable content and accessible enquiry links; assess actual outcomes separately when evidence exists."
    ],
    results: [
      {
        "value": "01",
        "label": "Offer-led page structure"
      },
      {
        "value": "02",
        "label": "Scope and pricing context"
      },
      {
        "value": "03",
        "label": "A clear enquiry route"
      }
    ],
    ctaLabel: 'Start Similar Landing Page',
    ctaHref: '/contact',
    metaTitle: "ReelsXpress Service Website Demo | Reddystack",
    metaDescription:
      "A personal service-website demo exploring offer structure, pricing context and mobile enquiry flow. No paid client or conversion results are claimed.",
    listingImage: reelsXpressImage,
    listingBackgroundImage: '/assets/img/portfolio/port-inner-up-3.jpg',
    thumbVariant: 4,
    featuredOnHome: true,
  },
  {
    id: 6,
    slug: 'bachelor-brother',
    path: '/portfolio/bachelor-brother',
    title: 'Bachelor Brother',
    category: 'Restaurant Website',
    year: 2024,
    client: "Personal / demo project",
    role: 'Brand Site Direction, Menu Presentation, Local Business UX',
    services: ['Restaurant Website Development', 'Small Business Website', 'Mobile-First UX'],
    summary:
      "A restaurant-website concept exploring menu discovery, business information and practical contact paths for mobile visitors.",
    heroDescription:
      "A personal/demo restaurant website project. The concept balances brand presentation with the information someone needs before deciding to visit or enquire.",
    heroStats: [
      {
        "value": "01",
        "label": "Find the menu information"
      },
      {
        "value": "02",
        "label": "Understand the business"
      },
      {
        "value": "03",
        "label": "Reach the next step"
      }
    ],
    aboutTitle: "Put the visitor's immediate questions within reach.",
    aboutDescription: [
      "Bachelor Brother explores a restaurant website where atmosphere and practical information need to work together. A visitor may appreciate the visual style, but still needs to understand the food, where the business is and how to contact it.",
      "The content direction keeps menu-related information and contact intent close to the brand presentation. A useful restaurant page should not make a phone user search through decorative sections for basic details. The immediate task may be checking an item, planning a visit or asking a question.",
      "A live version would need accurate hours, menu details, location and the ordering or booking methods actually supported. Those details change, so the business needs a clear way to maintain them. A button should not imply an online booking or ordering service unless the corresponding workflow exists.",
      "This is a personal/demo concept, not a paid restaurant case study. No visit growth, booking count, search ranking or sales result is reported. The page describes design priorities and questions that a real project would need to resolve.",
      "For a similar brief, collect current menu information, approved photographs, business details and the preferred contact action. Test a small screen and a slower connection. Review the text as well as the visual presentation: prices, availability and location details are only useful when the owner confirms they are current."
    ],
    overviewLead:
      "The project frames a restaurant site around the information a prospective visitor needs, with visual mood supporting that task.",
    overviewPoints: [
      "Make menu-related information understandable without relying only on decorative imagery.",
      "Place accurate business and contact details where mobile visitors can find them.",
      "Match every booking, ordering or contact label to the real action available in the intended implementation."
    ],
    results: [
      {
        "value": "01",
        "label": "Menu and offer visibility"
      },
      {
        "value": "02",
        "label": "Practical business information"
      },
      {
        "value": "03",
        "label": "Mobile contact clarity"
      }
    ],
    ctaLabel: 'Plan a Restaurant Website',
    ctaHref: '/contact',
    metaTitle: "Bachelor Brother Restaurant Website Demo | Reddystack",
    metaDescription:
      "A personal restaurant-website concept covering menu discovery, business details and mobile contact paths. Read the demo's design priorities.",
    listingImage: bachelorBrotherImage,
    listingBackgroundImage: '/assets/img/portfolio/portfolio-2.jpg',
    thumbVariant: 4,
    featuredOnHome: true,
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getAdjacentPortfolioProjects(slug: string) {
  const currentIndex = portfolioProjects.findIndex((project) => project.slug === slug);

  if (currentIndex === -1) {
    return {
      previousProject: null,
      nextProject: null,
    };
  }

  return {
    previousProject:
      portfolioProjects[(currentIndex - 1 + portfolioProjects.length) % portfolioProjects.length],
    nextProject: portfolioProjects[(currentIndex + 1) % portfolioProjects.length],
  };
}

export function getFeaturedPortfolioProjects(limit?: number) {
  const featuredProjects = portfolioProjects.filter((project) => project.featuredOnHome);
  return typeof limit === 'number' ? featuredProjects.slice(0, limit) : featuredProjects;
}
