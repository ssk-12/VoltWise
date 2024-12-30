"use client";

import React from "react";
import { Home, BarChart, Cloud, Map, GitCompare, Lightbulb } from 'lucide-react';
import { FloatingDock } from "./floating-dock";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home className="h-4 w-4 text-black dark:text-white" />,
  },
  {
    title: "Load Analysis",
    href: "/load-analysis",
    icon: <BarChart className="h-4 w-4 text-black dark:text-white" />,
  },
  {
    title: "Weather Impact",
    href: "/weather-impact",
    icon: <Cloud className="h-4 w-4 text-black dark:text-white" />,
  },
  {
    title: "Zone Insights",
    href: "/zone-insights",
    icon: <Map className="h-4 w-4 text-black dark:text-white" />,
  },
  {
    title: "Comparative Study",
    href: "/comparative-study",
    icon: <GitCompare className="h-4 w-4 text-black dark:text-white" />,
  },
  {
    title: "Recommendations",
    href: "/recommendations",
    icon: <Lightbulb className="h-4 w-4 text-black dark:text-white" />,
  },
];

export default function Navigation() {
  return (
    <div className="relative w-full">
     <FloatingDock items={navItems} collapsible={true} desktopClassName="fixed  bottom-4 scale-75 hover:scale-100  transform -translate-x-1/2" mobileClassName="fixed bottom-4 right-4" />
      
    </div>
  );
}

