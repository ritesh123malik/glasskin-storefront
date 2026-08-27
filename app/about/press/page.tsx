"use client";
/* eslint-disable react/no-unescaped-entities */

import React, { useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { Calendar, Newspaper, Quote, Award, Image, Download } from "lucide-react";

export default function PressPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Press mentions data
  const pressMentions = [
    {
      category: "Feature",
      title: "Vogue India spotlights Glasskin's clean beauty revolution",
      publication: "Vogue India",
      date: "March 2024",
      excerpt: "Glasskin is leading a new wave of Indian beauty brands that combine efficacy with ethics. Their SPF 50+ is a game-changer.",
      link: "#",
      featured: true,
    },
    {
      category: "Review",
      title: "Cosmopolitan names Glasskin Dewy SPF among top 10 sunscreens",
      publication: "Cosmopolitan India",
      date: "June 2024",
      excerpt: "This lightweight, non-greasy sunscreen absorbs instantly and leaves skin with a healthy glow. A new holy grail product.",
      link: "#",
      featured: false,
    },
    {
      category: "Interview",
      title: "Grazia interviews Founder on the future of sustainable beauty",
      publication: "Grazia India",
      date: "April 2024",
      excerpt: "Ritesh Malik shares the vision behind Glasskin and why sustainability isn't just a trend, it's a necessity.",
      link: "#",
      featured: false,
    },
    {
      category: "Award",
      title: "Elle Beauty Awards 2024: Best New Skincare Brand",
      publication: "Elle India",
      date: "January 2024",
      excerpt: "Glasskin wins Best New Skincare Brand at the prestigious Elle Beauty Awards, recognized for innovation and clean formulations.",
      link: "#",
      featured: true,
    },
    {
      category: "Feature",
      title: "Femina explores Glasskin's sensory approach to skincare",
      publication: "Femina",
      date: "May 2024",
      excerpt: "Glasskin proves that effective skincare can also be a delightful sensory experience, from texture to natural fragrances.",
      link: "#",
      featured: false,
    },
    {
      category: "Award",
      title: "Harper's Bazaar: Best Moisturizer Under INR 1500",
      publication: "Harper's Bazaar India",
      date: "February 2024",
      excerpt: "The Glasskin Cloud Cream takes the crown for best affordable luxury moisturizer in Harper's Bazaar's annual beauty roundup.",
      link: "#",
      featured: true,
    },
    {
      category: "Review",
      title: "Allure India raves about Glasskin's cleanser duo",
      publication: "Allure India",
      date: "July 2024",
      excerpt: "The oil-to-foam cleanser is a revelation for double cleansing. Removes makeup and sunscreen effortlessly without stripping skin.",
      link: "#",
      featured: false,
    },
    {
      category: "Feature",
      title: "Business of Fashion covers Glasskin's international expansion",
      publication: "Business of Fashion",
      date: "August 2024",
      excerpt: "Glasskin's strategic expansion into the UAE and Singapore markets signals a new era for Indian clean beauty brands going global.",
      link: "#",
      featured: false,
    },
    {
      category: "Award",
      title: "Beauty Insider Awards: Most Innovative Brand",
      publication: "Beauty Insider",
      date: "March 2024",
      excerpt: "Recognized for groundbreaking product development and commitment to clean, sustainable beauty.",
      link: "#",
      featured: true,
    },
  ];

  // Categories
  const categories = ["All", "Feature", "Review", "Interview", "Award"];

  // Filtered mentions
  const filteredMentions = selectedCategory === "All"
    ? pressMentions
    : pressMentions.filter(mention => mention.category === selectedCategory);

  // Press Kit Download
  const pressKit = {
    logo: "/images/glasskin-logo-press.png",
    founderImage: "/images/rites-malik-founder.jpg",
    productImages: "/images/press-product-shots.zip",
    brandStory: "/documents/glasskin-brand-story.pdf",
    factSheet: "/documents/glasskin-fact-sheet.pdf",
    highResImages: "/images/press-high-res.zip",
  };

  // Key Facts
  const keyFacts = [
    { label: "Founded", value: "2020" },
    { label: "Founder & CEO", value: "Ritesh Malik" },
    { label: "Headquarters", value: "New Delhi, India" },
    { label: "Products", value: "25+ SKUs" },
    { label: "Retail Partners", value: "150+ across India" },
    { label: "International Markets", value: "UAE, Singapore, UK" },
    { label: "Awards", value: "12+ Industry Awards" },
    { label: "Social Following", value: "500K+ across platforms" },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <section className="mb-20">
          <span className="sticker bg-brand-blue text-white text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play">
            In The News
          </span>
          
          <h1 className="heading-display text-brand-text text-4xl md:text-6xl mt-4 mb-6">
            Press & <span className="text-brand-magenta">Media</span>
          </h1>
          
          <p className="text-lg text-brand-text/70 leading-relaxed max-w-3xl mb-8">
            Glasskin has been fortunate to receive incredible coverage from leading publications in the beauty, lifestyle, and business spaces. Thank you to our media partners for sharing our story.
          </p>

          {/* Key Stats */}
          <div className="bg-gradient-to-r from-brand-sky/5 to-brand-cyan/5 p-8 rounded-3xl border-4 border-brand-sky/20">
            <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-6">
              Glasskin <span className="text-brand-sky">By The Numbers</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {keyFacts.map((fact, index) => (
                <div key={index} className="text-center">
                  <p className="font-rounded font-extrabold text-brand-text text-lg">{fact.value}</p>
                  <p className="text-xs text-brand-text/50 uppercase tracking-widest font-semibold mt-1">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Navigation */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn-play-solid px-4 py-2 text-xs rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-brand-accent text-white"
                    : "bg-white border-2 border-brand-text/15 text-brand-text hover:border-brand-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Press Mentions */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Recent <span className="text-brand-cyan">Mentions</span>
          </h2>
          
          <div className="space-y-6">
            {filteredMentions.map((mention, index) => (
              <article
                key={index}
                className={`bg-white rounded-3xl shadow-play border-4 overflow-hidden transition-all duration-300 ${
                  mention.featured 
                    ? "border-brand-yellow/40 bg-gradient-to-r from-brand-yellow/5 to-transparent"
                    : "border-brand-text/8"
                }`}
              >
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-brand-pink to-brand-magenta rounded-2xl flex items-center justify-center">
                        <Newspaper className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-text/50">
                          {mention.category}
                        </span>
                        <span className="text-brand-accent font-bold text-sm">
                          {mention.publication}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-brand-text/40">
                          <Calendar className="w-3 h-3" />
                          {mention.date}
                        </span>
                      </div>
                      <h3 className="font-rounded font-extrabold text-brand-text text-lg md:text-xl mb-3 hover:text-brand-blue transition-colors">
                        {mention.title}
                      </h3>
                      <p className="text-sm text-brand-text/60 leading-relaxed mb-4">
                        {mention.excerpt}
                      </p>
                      <a
                        href={mention.link}
                        className="btn-play inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 px-4 py-2 text-xs"
                      >
                        Read More
                        <span className="text-brand-accent">›</span>
                      </a>
                    </div>
                  </div>
                </div>
                {mention.featured && (
                  <div className="bg-brand-yellow/10 px-8 py-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow">
                      Featured Story
                    </span>
                  </div>
                )}
              </article>
            ))}
          </div>

          {filteredMentions.length === 0 && (
            <p className="text-center text-brand-text/50 py-12">
              No press mentions in this category yet. Check back soon!
            </p>
          )}
        </section>

        {/* Press Kit Section */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Press <span className="text-brand-yellow">Kit</span>
          </h2>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-play border-4 border-brand-yellow/30">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-4">
                  Download High-Resolution Assets
                </h3>
                <p className="text-sm text-brand-text/60 leading-relaxed mb-8">
                  For media inquiries, please download our comprehensive press kit containing high-resolution images, brand story, founder biography, and product information.
                </p>
                
                <div className="space-y-4">
                  {Object.entries(pressKit).map(([name, path]) => (
                    <a
                      key={name}
                      href={path}
                      download
                      className="flex items-center justify-between p-4 bg-brand-bg rounded-2xl border-2 border-brand-text/10 hover:border-brand-accent/40 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        {name.includes("logo") && <Image className="w-5 h-5 text-brand-text/30 group-hover:text-brand-accent" />}
                        {name.includes("founder") && <Quote className="w-5 h-5 text-brand-text/30 group-hover:text-brand-accent" />}
                        {name.includes("product") && <Award className="w-5 h-5 text-brand-text/30 group-hover:text-brand-accent" />}
                        {name.includes("brand") && <Newspaper className="w-5 h-5 text-brand-text/30 group-hover:text-brand-accent" />}
                        {name.includes("fact") && <Newspaper className="w-5 h-5 text-brand-text/30 group-hover:text-brand-accent" />}
                        {name.includes("high") && <Image className="w-5 h-5 text-brand-text/30 group-hover:text-brand-accent" />}
                        <span className="font-semibold text-brand-text text-sm">
                          {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </div>
                      <Download className="w-5 h-5 text-brand-accent" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand-yellow/10 to-brand-citron/10 p-8 rounded-2xl">
                <span className="text-8xl font-display text-brand-yellow/20">G</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Media <span className="text-brand-magenta">Contact</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-pink/20">
              <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-4">
                Press Inquiries
              </h3>
              <p className="text-sm text-brand-text/60 leading-relaxed mb-6">
                For press inquiries, interview requests, or product samples, please contact our PR team.
              </p>
              <a
                href="mailto:press@glasskin.in"
                className="btn-play-solid bg-brand-pink text-white px-6 py-3 text-sm"
              >
                press@glasskin.in
              </a>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-cyan/20">
              <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-4">
                Partnerships
              </h3>
              <p className="text-sm text-brand-text/60 leading-relaxed mb-6">
                For brand collaborations, influencer partnerships, or business opportunities, please reach out to our partnerships team.
              </p>
              <a
                href="mailto:partnerships@glasskin.in"
                className="btn-play-solid bg-brand-cyan text-white px-6 py-3 text-sm"
              >
                partnerships@glasskin.in
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
