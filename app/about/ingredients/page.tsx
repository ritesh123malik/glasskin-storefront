"use client";
/* eslint-disable react/no-unescaped-entities */

import React from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { Leaf, Droplet, Shield, Sparkles, Star, Zap } from "lucide-react";

export default function IngredientsPage() {

  // A-Z Ingredient Index
  const ingredientIndex = {
    A: ["Aloe Vera", "Avocado Oil", "Acerola Cherry"],
    B: ["Blueberry Extract", "Bakuchiol", "Bergamot Oil"],
    C: ["Vitamin C", "Chamomile", "Coconut Water", "Cica (Centella Asiatica)"],
    D: ["Daisy Flower", "Dragon Fruit Extract"],
    E: ["Edelweiss", "Evening Primrose Oil"],
    F: ["Fig Extract", "Frankincense"],
    G: ["Green Tea", "Gotu Kola", "Grapeseed Oil"],
    H: ["Hyaluronic Acid", "Hibiscus", "Honey"],
    I: ["Indian Ginseng (Ashwagandha)"],
    J: ["Jojoba Oil", "Jasmine Flower"],
    K: ["Kakadu Plum", "Kiwi Extract"],
    L: ["Licorice Root", "Lavender Oil", "Lemon Peel Oil"],
    M: ["Mango Butter", "Marula Oil", "Moringa"],
    N: ["Niacinamide", "Neem Extract"],
    O: ["Orange Peel Oil", "Olive Oil"],
    P: ["Papaya Extract", "Peptide Complex", "Pomegranate Seed Oil"],
    Q: ["Quinoa Extract"],
    R: ["Rose Water", "Raspberry Seed Oil", "Retinol Alternative"],
    S: ["Squalane", "Sunflower Oil", "Saffron"],
    T: ["Turmeric", "Tamanu Oil", "Tomato Extract"],
    U: [],
    V: ["Vitamin E", "Vanilla Extract"],
    W: ["Witch Hazel", "Water Lily Extract"],
    X: [],
    Y: ["Ylang Ylang", "Yuzu Extract"],
    Z: ["Zinc Oxide"],
  };

  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  // Star Ingredients
  const starIngredients = [
    {
      name: "Kakadu Plum",
      icon: <Star className="w-8 h-8" />,
      description: "Nature's richest source of Vitamin C — 100x more than an orange. Brightens and evens skin tone.",
      color: "bg-gradient-to-br from-brand-cyan to-brand-sky",
    },
    {
      name: "Hyaluronic Acid",
      icon: <Droplet className="w-8 h-8" />,
      description: "Holds 1000x its weight in water. Deeply hydrates and plumps skin instantly.",
      color: "bg-gradient-to-br from-brand-mint to-brand-cyan",
    },
    {
      name: "Niacinamide",
      icon: <Shield className="w-8 h-8" />,
      description: "The multitasking powerhouse. Minimizes pores, reduces redness, and strengthens the skin barrier.",
      color: "bg-gradient-to-br from-brand-lilac to-brand-pink",
    },
    {
      name: "Bakuchiol",
      icon: <Leaf className="w-8 h-8" />,
      description: "The gentle, plant-based alternative to retinol. Stimulates collagen without irritation.",
      color: "bg-gradient-to-br from-brand-peach to-brand-yellow",
    },
    {
      name: "Squalane",
      icon: <Sparkles className="w-8 h-8" />,
      description: "A lightweight, non-greasy moisturizer derived from sugarcane. Mimics skin's natural oils.",
      color: "bg-gradient-to-br from-brand-pink to-brand-peach",
    },
    {
      name: "Cica",
      icon: <Zap className="w-8 h-8" />,
      description: "Centella Asiatica soothes and repairs damaged skin. Perfect for sensitive or irritated skin.",
      color: "bg-gradient-to-br from-brand-mint to-brand-green",
    },
  ];

  // No List
  const noList = [
    "Parabens",
    "Sulfates (SLS/SLES)",
    "Phthalates",
    "Synthetic Fragrances",
    "Synthetic Dyes",
    "Formaldehyde",
    "Triclosan",
    "Mineral Oil",
    "Silicon (except in hair products)",
    "Alcohol Denat.",
    "Animal-Derived Ingredients",
    "Microplastics",
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <section className="mb-20" id="hero">
          <span className="sticker bg-brand-mint text-white text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play">
            What's Inside
          </span>
          
          <h1 className="heading-display text-brand-text text-4xl md:text-6xl mt-4 mb-6">
            Our <span className="text-brand-cyan">Ingredients</span>
          </h1>
          
          <p className="text-lg text-brand-text/70 leading-relaxed max-w-3xl mb-8">
            We believe in the power of nature, amplified by science. Every Glasskin formula is crafted with thoughtfully sourced, effective ingredients that deliver visible results without compromise.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-brand-pink/10 to-brand-peach/10 p-8 rounded-3xl border-4 border-brand-pink/30">
              <Leaf className="w-10 h-10 text-brand-magenta mb-4" />
              <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-2">Plant-Powered</h3>
              <p className="text-sm text-brand-text/60">
                We harness the potency of botanicals — fruits, flowers, roots, and seeds that have been cherished for centuries.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-brand-sky/10 to-brand-cyan/10 p-8 rounded-3xl border-4 border-brand-sky/30">
              <Droplet className="w-10 h-10 text-brand-sky mb-4" />
              <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-2">Science-Backed</h3>
              <p className="text-sm text-brand-text/60">
                Nature meets innovation. We combine traditional wisdom with modern technology for maximum efficacy.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-brand-yellow/10 to-brand-citron/10 p-8 rounded-3xl border-4 border-brand-yellow/30">
              <Sparkles className="w-10 h-10 text-brand-yellow mb-4" />
              <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-2">Sensory Delight</h3>
              <p className="text-sm text-brand-text/60">
                Effective skincare shouldn't feel like a chore. Our textures and natural fragrances make every use a pleasure.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Our <span className="text-brand-magenta">Philosophy</span>
          </h2>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-play border-4 border-brand-mint/40">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-rounded font-extrabold text-brand-text text-2xl mb-4">Less, But Better</h3>
                <p className="text-sm text-brand-text/60 leading-relaxed mb-6">
                  We believe in multi-functional formulas that do more with fewer, more potent ingredients. No filler ingredients, no unnecessary complexity.
                </p>
                <h3 className="font-rounded font-extrabold text-brand-text text-2xl mb-4">Ethically Sourced</h3>
                <p className="text-sm text-brand-text/60 leading-relaxed">
                  We prioritize fair-trade, organic, and sustainably harvested ingredients. We believe in beauty that respects both people and the planet.
                </p>
              </div>
              <div className="bg-gradient-to-br from-brand-cyan/20 to-brand-sky/20 p-8 rounded-2xl">
                <span className="text-6xl font-display text-brand-cyan/30">G</span>
              </div>
            </div>
          </div>
        </section>

        {/* Star Ingredients Section */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Star <span className="text-brand-yellow">Ingredients</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {starIngredients.map((ingredient, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl shadow-play border-4 border-brand-text/8 ${ingredient.color}`}
              >
                <div className="text-brand-bg mb-4">{ingredient.icon}</div>
                <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-3">{ingredient.name}</h3>
                <p className="text-sm text-brand-text/70 leading-relaxed">{ingredient.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Don't Use Section */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            What We <span className="text-brand-red">Don't Use</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-brand-red/5 to-brand-pink/5 p-8 rounded-3xl border-4 border-brand-red/20">
              <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-4">Our No-List</h3>
              <p className="text-sm text-brand-text/60 leading-relaxed mb-6">
                Just as important as what we put in our products is what we leave out. These are the ingredients you'll never find in any Glasskin formula.
              </p>
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-brand-red" />
                <span className="font-bold text-brand-red">SAFE & CLEAN</span>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-text/8">
              <div className="grid grid-cols-2 gap-2 text-sm text-brand-text/60">
                {noList.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 py-2 border-b border-brand-text/5 last:border-0"
                  >
                    <span className="text-red-500 text-xs">✗</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* A-Z Index Section */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            A-Z <span className="text-brand-blue">Ingredient Index</span>
          </h2>
          
          <p className="text-sm text-brand-text/60 leading-relaxed mb-8 max-w-2xl">
            Explore our comprehensive list of ingredients. Every single one has been carefully selected for its safety, efficacy, and alignment with our clean beauty standards.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alphabet.map((letter) => {
              const ingredients = ingredientIndex[letter as keyof typeof ingredientIndex];
              return (
                <div
                  key={letter}
                  className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-text/5"
                >
                  <h3 className="font-rounded font-extrabold text-brand-blue text-2xl mb-4">{letter}</h3>
                  {ingredients.length > 0 ? (
                    <ul className="space-y-2">
                      {ingredients.map((ingredient, idx) => (
                        <li key={idx} className="text-sm text-brand-text/70">
                          &bull; {ingredient}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-brand-text/30 italic">No ingredients</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Ingredient <span className="text-brand-magenta">FAQs</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-pink/20">
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-3">Are Glasskin products vegan?</h3>
              <p className="text-sm text-brand-text/60 leading-relaxed">
                Yes! All Glasskin products are 100% vegan and cruelty-free. We never use animal-derived ingredients or test on animals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-cyan/20">
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-3">Are your ingredients organic?</h3>
              <p className="text-sm text-brand-text/60 leading-relaxed">
                We use organic ingredients wherever possible and prioritize certified organic sources. Some ingredients are wild-harvested or sustainably sourced.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-yellow/20">
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-3">Do you use synthetic fragrances?</h3>
              <p className="text-sm text-brand-text/60 leading-relaxed">
                Never. Our products are fragranced only with natural essential oils and plant extracts. We avoid synthetic fragrances completely.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-play border-4 border-brand-mint/20">
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-3">Where do you source your ingredients?</h3>
              <p className="text-sm text-brand-text/60 leading-relaxed">
                Globally! We work with ethical suppliers from India, Australia, Europe, and beyond to source the highest quality ingredients.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
