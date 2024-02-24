"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Mateshwari verma",
    avatar: "R",
    title: "Product Manager",
    description: "I've never seen anything like this before, it's truly revolutionary!",
  },
  {
    name: "Sneha",
    avatar: "S",
    title: "UX/UI Designer",
    description: "This tool has streamlined my workflow and improved my productivity tenfold!",
  },
  {
    name: "Kiran",
    avatar: "K",
    title: "Marketing Executive",
    description: "A must-have for anyone in the marketing industry, it's a game-changer!",
  },
  {
    name: "Priya",
    avatar: "P",
    title: "Content Creator",
    description: "As a content creator, this application has become my go-to tool for inspiration!",
  },
];


export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}