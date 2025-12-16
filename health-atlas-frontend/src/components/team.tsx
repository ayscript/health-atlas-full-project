"use client";

import { useState } from "react";
import Image from "next/image";
// import { motion } from "framer-motion";

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(0);

  const team = [
    {
      name: "Dr. Olaosebikan Favour (DVM)",
      role: "Frontend developer/Prompt-Engineer",
      bio: "One Health enthusiast, and generative AI developer exploring innovative ways to merge medicine, global health, and artificial intelligence",
      image: "/favedit.jpg",
      url: "https://www.linkedin.com/in/olaosebikan-favour-218577184?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Olaleye Ayomide",
      role: "Fullstack/AI Developer",
      bio: "",
      image: "/ayscriptjpg.jpg",
      url: "https://www.linkedin.com/in/olaosebikan-favour-218577184?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Jimoh Hamid Abolaji",
      role: "AI Engineer",
      bio: "",
      image: "/hameed.png",
      url: "https://www.linkedin.com/in/olaosebikan-favour-218577184?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Abioye Olajide Abdullateef",
      role: "AI Engineer",
      bio: "",
      image: "/lateef.png",
      url: "https://www.linkedin.com/in/olaosebikan-favour-218577184?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  ];

  return (
    <section
      id="team"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* 🌈 Soft Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-sky-50 to-blue-100" />

      {/* ✨ Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-blue-400/70 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            A diverse team of healthcare professional and technologists on a
            mission to democratize health
          </p>
        </div>

        {/* TEAM CAROUSEL */}
        <div className="flex gap-4 overflow-x-hidden flex-wrap mb-16 mx-auto">
          {team.map((member, i) => (
            <div
              key={i}
              onClick={() => setSelectedMember(i)}
              className={`
                rounded-2xl border-2 flex-1 border-blue-200 bg-white/60 backdrop-blur-sm shadow-lg
                transition-all`}
            >
              <div className="relative h-64 rounded-2xl overflow-hidden bg-linear-to-br from-blue-100/20 to-cyan-100/20 flex items-center justify-center">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-blue-900">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SELECTED MEMBER DETAILS */}
        {/* <div className="bg-white/60 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src={team[selectedMember].image || "/placeholder.svg"}
                alt={team[selectedMember].name}
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-900 mb-2">
                {team[selectedMember].name}
              </h3>
              <p className="text-lg text-blue-600 font-semibold mb-4">
                {team[selectedMember].role}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {team[selectedMember].bio}
              </p>
              <a
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                href={team[selectedMember].url}
                target="_blank"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
