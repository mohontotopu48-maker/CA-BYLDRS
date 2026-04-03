import {
  Droplets,
  Home,
  Sparkles,
  Bug,
  Thermometer,
  Zap,
  Wrench,
  Paintbrush,
  Truck,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  name: string;
  icon: LucideIcon;
  shortDescription: string;
  description: string;
  features: string[];
  faqs: { q: string; a: string }[];
}

export interface County {
  slug: string;
  name: string;
  tagline: string;
  cities: string[];
  description: string;
}

export const services: Service[] = [
  {
    slug: "plumbing",
    name: "Plumbing",
    icon: Droplets,
    shortDescription: "Leak repairs, drain cleaning, water heater service & full plumbing solutions.",
    description:
      "Whether it's a burst pipe, a clogged drain, or a new water heater installation, our verified local plumbers provide fast, professional plumbing services across Orange County and Los Angeles County. Every plumber in our network is licensed, insured, and background-checked for your peace of mind.",
    features: [
      "Emergency leak and pipe repair",
      "Drain cleaning and unclogging",
      "Water heater installation and repair",
      "Sewer line inspection and repair",
      "Fixture installation and upgrades",
      "Preventive maintenance plans",
    ],
    faqs: [
      {
        q: "How fast can a plumber arrive?",
        a: "Most of our plumbers offer same-day service. For emergencies, many can arrive within 1-2 hours depending on your location in Orange County or Los Angeles County.",
      },
      {
        q: "Are your plumbers licensed?",
        a: "Yes, every plumber in our network holds a valid California plumbing license and carries full insurance coverage.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve all of Orange County and Los Angeles County, including Anaheim, Irvine, Santa Ana, Long Beach, Pasadena, and surrounding areas.",
      },
    ],
  },
  {
    slug: "roofing",
    name: "Roofing",
    icon: Home,
    shortDescription: "Roof repair, replacement, inspections & storm damage restoration.",
    description:
      "Protect your home with expert roofing services from California's most trusted local roofers. From minor repairs to complete roof replacements, our verified roofing professionals deliver quality craftsmanship backed by years of experience serving Southern California homeowners.",
    features: [
      "Complete roof replacement",
      "Leak detection and repair",
      "Storm damage restoration",
      "Roof inspections and certifications",
      "Shingle, tile, and flat roof expertise",
      "Gutter installation and repair",
    ],
    faqs: [
      {
        q: "Do you provide free roof inspections?",
        a: "Many of our roofing partners offer free initial inspections and quotes. Submit a request and we'll connect you with available roofers in your area.",
      },
      {
        q: "How long does a roof replacement take?",
        a: "Most residential roof replacements are completed within 2-5 days, depending on the size and complexity of the project.",
      },
      {
        q: "Do you work with insurance claims?",
        a: "Yes, several of our roofing partners are experienced in working with homeowners insurance for storm damage claims.",
      },
    ],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    icon: Sparkles,
    shortDescription: "Deep cleaning, move-in/out, recurring maid service & specialized cleaning.",
    description:
      "Keep your home spotless with professional cleaning services tailored to your needs. Our verified cleaning professionals offer everything from routine housekeeping to deep cleaning, move-in/move-out services, and specialized cleaning solutions for homes across Orange County and Los Angeles County.",
    features: [
      "Regular housekeeping and maid service",
      "Deep cleaning and spring cleaning",
      "Move-in and move-out cleaning",
      "Post-construction cleaning",
      "Window cleaning",
      "Carpet and upholstery cleaning",
    ],
    faqs: [
      {
        q: "How often should I schedule professional cleaning?",
        a: "It depends on your household needs. We offer weekly, bi-weekly, and monthly options. Many homeowners find bi-weekly service to be the ideal balance.",
      },
      {
        q: "Are your cleaning products safe for pets and children?",
        a: "Yes, our cleaning professionals use eco-friendly, non-toxic products. You can also request specific products if you have preferences.",
      },
      {
        q: "Do I need to be home during cleaning?",
        a: "No, many of our cleaning teams offer key-holding services and can clean while you're away for maximum convenience.",
      },
    ],
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    icon: Bug,
    shortDescription: "Termite treatment, rodent control, bed bug removal & ongoing prevention.",
    description:
      "Protect your home from unwanted pests with professional pest control services. Our network of licensed exterminators provides comprehensive pest management solutions including termite treatment, rodent control, bed bug removal, and preventive treatments for homes throughout Southern California.",
    features: [
      "General pest control and prevention",
      "Termite inspection and treatment",
      "Rodent exclusion and removal",
      "Bed bug heat treatment",
      "Wasp and bee removal",
      "Eco-friendly pest solutions",
    ],
    faqs: [
      {
        q: "How long does a pest treatment last?",
        a: "Most standard treatments provide protection for 60-90 days. We offer ongoing quarterly maintenance plans for continuous protection.",
      },
      {
        q: "Are the treatments safe for my family and pets?",
        a: "Yes, our pest control professionals use EPA-approved products and follow strict safety protocols. They will advise you on any precautions needed.",
      },
      {
        q: "Do you offer same-day pest control service?",
        a: "Many of our partners offer same-day or next-day emergency service for urgent pest issues like wasp nests, rodent infestations, or bed bugs.",
      },
    ],
  },
  {
    slug: "hvac",
    name: "HVAC",
    icon: Thermometer,
    shortDescription: "AC repair, heating installation, maintenance & indoor air quality solutions.",
    description:
      "Stay comfortable year-round with expert HVAC services from California's top-rated heating and cooling professionals. Whether you need AC repair, furnace installation, or indoor air quality improvements, our verified HVAC technicians deliver reliable, efficient solutions for your home.",
    features: [
      "AC repair and installation",
      "Heating system repair and replacement",
      "Ductwork inspection and repair",
      "Indoor air quality solutions",
      "Thermostat installation and programming",
      "Preventive maintenance agreements",
    ],
    faqs: [
      {
        q: "Do you offer emergency HVAC service?",
        a: "Yes, many of our HVAC partners provide 24/7 emergency service for heating and cooling issues, especially during extreme temperatures.",
      },
      {
        q: "How often should I have my HVAC system serviced?",
        a: "We recommend having your system professionally serviced at least twice a year — once before the cooling season and once before the heating season.",
      },
      {
        q: "Can you help me choose an energy-efficient system?",
        a: "Absolutely. Our HVAC professionals can assess your home's needs and recommend energy-efficient systems that may qualify for rebates.",
      },
    ],
  },
  {
    slug: "electrical",
    name: "Electrical",
    icon: Zap,
    shortDescription: "Wiring, panel upgrades, lighting installation & electrical safety inspections.",
    description:
      "Keep your home safe and powered up with professional electrical services from licensed electricians. Our verified electrical contractors handle everything from simple outlet repairs to complete rewiring projects, ensuring your home meets all California electrical codes and safety standards.",
    features: [
      "Electrical panel upgrades",
      "Wiring and rewiring",
      "Outlet and switch installation",
      "Lighting design and installation",
      "Ceiling fan installation",
      "Electrical safety inspections",
    ],
    faqs: [
      {
        q: "How do I know if I need a panel upgrade?",
        a: "Signs you may need an upgrade include frequently tripped breakers, flickering lights, and the use of multiple extension cords. Our electricians can provide a free assessment.",
      },
      {
        q: "Are your electricians licensed in California?",
        a: "Yes, every electrician in our network holds a valid California C-10 electrical contractor license and carries full liability insurance.",
      },
      {
        q: "Can you install EV charging stations?",
        a: "Yes, many of our electrical partners are certified to install Level 2 EV charging stations for residential garages.",
      },
    ],
  },
  {
    slug: "handyman",
    name: "Handyman",
    icon: Wrench,
    shortDescription: "General repairs, furniture assembly, TV mounting & home maintenance.",
    description:
      "Tackle your home's to-do list with reliable handyman services. Our verified handymen are skilled in a wide range of home repair and maintenance tasks, from fixing drywall and assembling furniture to mounting TVs and performing seasonal maintenance throughout Orange County and Los Angeles County.",
    features: [
      "General home repairs",
      "Furniture assembly",
      "TV mounting and installation",
      "Drywall repair and patching",
      "Door and window repair",
      "Seasonal home maintenance",
    ],
    faqs: [
      {
        q: "What types of jobs can a handyman do?",
        a: "Our handymen handle a wide range of tasks including minor plumbing and electrical repairs, furniture assembly, painting touch-ups, drywall repair, and general home maintenance.",
      },
      {
        q: "Do you charge by the hour or by the job?",
        a: "Both options are available depending on the scope of work. Our partners will provide a clear quote before starting any work.",
      },
      {
        q: "Can a handyman help with multiple tasks in one visit?",
        a: "Yes, many homeowners create a list of tasks for a single visit. This is often more cost-effective and convenient than scheduling separate appointments.",
      },
    ],
  },
  {
    slug: "painting",
    name: "Painting",
    icon: Paintbrush,
    shortDescription: "Interior & exterior painting, cabinet refinishing & color consultation.",
    description:
      "Transform your home with professional painting services from experienced local painters. Our network of verified painting contractors delivers flawless results for interior and exterior projects, from single accent walls to complete home repaints, serving homeowners throughout Southern California.",
    features: [
      "Interior painting and wallpaper removal",
      "Exterior painting and staining",
      "Cabinet refinishing and painting",
      "Deck and fence staining",
      "Color consultation services",
      "Drywall repair and surface preparation",
    ],
    faqs: [
      {
        q: "How long does it take to paint a room?",
        a: "A standard 12x12 room typically takes 4-6 hours of active painting, but with preparation, drying time, and second coats, plan for 1-2 days total.",
      },
      {
        q: "Do I need to move my furniture before painting?",
        a: "Our painting professionals will help move furniture to the center of the room and cover everything to protect it. Some light furniture moving may be requested.",
      },
      {
        q: "Can you help me choose paint colors?",
        a: "Yes, many of our painting partners offer color consultation services and can provide sample swatches so you can see how colors look in your space.",
      },
    ],
  },
];

export const countyServices = [
  { service: "Plumbing", slug: "plumbing" },
  { service: "Roofing", slug: "roofing" },
  { service: "Cleaning", slug: "cleaning" },
  { service: "Pest Control", slug: "pest-control" },
  { service: "HVAC", slug: "hvac" },
  { service: "Electrical", slug: "electrical" },
  { service: "Handyman", slug: "handyman" },
  { service: "Painting", slug: "painting" },
  { service: "Junk Removal", slug: "junk-removal" },
];

export const counties: County[] = [
  {
    slug: "orange-county",
    name: "Orange County",
    tagline: "Premium Home Services Across All of Orange County",
    cities: [
      "Anaheim",
      "Irvine",
      "Santa Ana",
      "Huntington Beach",
      "Costa Mesa",
      "Fullerton",
      "Newport Beach",
      "Garden Grove",
      "Orange",
      "Westminster",
    ],
    description:
      "CA BYLDRS is proud to be Orange County's most trusted platform for connecting homeowners with verified local professionals. From the coast of Newport Beach to the heart of Anaheim, we serve every community in Orange County with fast response times and quality-matched service providers.",
  },
  {
    slug: "los-angeles-county",
    name: "Los Angeles County",
    tagline: "Reliable Home Services Throughout Los Angeles County",
    cities: [
      "Los Angeles",
      "Long Beach",
      "Pasadena",
      "Glendale",
      "Torrance",
      "Inglewood",
      "Santa Clarita",
      "Lancaster",
      "Palmdale",
      "Burbank",
    ],
    description:
      "Serving the vast and diverse communities of Los Angeles County, CA BYLDRS connects homeowners with licensed, verified professionals across every neighborhood. Whether you're in downtown LA, the coastal communities, or the San Fernando Valley, we match you with the right local expert for your home service needs.",
  },
];

export const navLinks = [
  { label: "Home", href: "home" },
  { label: "Services", href: "services" },
  { label: "How It Works", href: "journey" },
  { label: "Book Now", href: "booking" },
  { label: "About", href: "about" },
  { label: "Contact", href: "contact" },
];

export const footerLinks = {
  services: services.map((s) => ({ label: s.name, href: `service/${s.slug}` })),
  locations: [
    { label: "Orange County", href: "orange-county" },
    { label: "Los Angeles County", href: "los-angeles-county" },
  ],
  company: [
    { label: "About Us", href: "about" },
    { label: "Contact", href: "contact" },
    { label: "Become a Partner", href: "partner" },
    { label: "Privacy Policy", href: "privacy" },
    { label: "Terms of Service", href: "terms" },
  ],
};
