"use client";

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { Heart, Star, Users, Target, Briefcase, School, Globe, Mail, ArrowRight, Building2 } from "lucide-react";

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState("openings");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  // Open Positions
  const positions = [
    {
      id: "1",
      title: "Senior Formulation Chemist",
      department: "Product Development",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "5+ years",
      description: [
        "Lead the development of innovative, clean beauty formulations that align with Glasskin's ethos.",
        "Research and source sustainable, effective ingredients from global suppliers.",
        "Collaborate with our R&D team to bring new products from concept to production.",
        "Ensure all formulations meet regulatory standards and Glasskin's clean beauty criteria.",
        "Stay ahead of industry trends and emerging ingredients in skincare innovation.",
      ],
      requirements: [
        "Bachelor's or Master's degree in Chemistry, Cosmetic Science, or related field.",
        "Minimum 5 years experience in cosmetic formulation, preferably in clean beauty.",
        "Deep knowledge of natural and organic ingredients and their properties.",
        "Experience with regulatory compliance (FDA, EU, India).",
        "Passion for sustainability and ethical sourcing.",
      ],
      featured: true,
    },
    {
      id: "2",
      title: "Digital Marketing Manager",
      department: "Marketing",
      location: "Delhi, India (Hybrid)",
      type: "Full-time",
      experience: "4+ years",
      description: [
        "Develop and execute comprehensive digital marketing strategies across all channels.",
        "Manage social media presence, content creation, and community engagement.",
        "Oversee paid advertising campaigns (Meta, Google, TikTok) and optimize for ROI.",
        "Collaborate with influencers and brand ambassadors to expand our reach.",
        "Analyze performance metrics and provide actionable insights for growth.",
      ],
      requirements: [
        "Bachelor's degree in Marketing, Communications, or related field.",
        "4+ years in digital marketing, preferably in beauty or D2C brands.",
        "Expertise in social media management, content strategy, and paid advertising.",
        "Strong analytical skills and proficiency with Google Analytics, Meta Business Suite.",
        "Creative thinker with a data-driven approach.",
      ],
      featured: false,
    },
    {
      id: "3",
      title: "E-commerce Manager",
      department: "Operations",
      location: "Remote, India",
      type: "Full-time",
      experience: "3+ years",
      description: [
        "Manage and optimize our Shopify store and other e-commerce platforms.",
        "Oversee website UX/UI, product listings, and checkout flow to maximize conversions.",
        "Coordinate with logistics partners to ensure seamless order fulfillment.",
        "Develop strategies to reduce cart abandonment and increase average order value.",
        "Monitor site performance and implement improvements based on user feedback.",
      ],
      requirements: [
        "Bachelor's degree in Business, E-commerce, or related field.",
        "3+ years experience managing e-commerce platforms (Shopify experience a plus).",
        "Strong understanding of conversion rate optimization (CRO).",
        "Experience with inventory management and order fulfillment systems.",
        "Excellent problem-solving skills and attention to detail.",
      ],
      featured: false,
    },
    {
      id: "4",
      title: "Graphic Designer",
      department: "Creative",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "3+ years",
      description: [
        "Create compelling visual content for digital and print media.",
        "Design packaging, marketing materials, social media assets, and website graphics.",
        "Develop and maintain consistent brand identity across all touchpoints.",
        "Collaborate with marketing and product teams to bring campaigns to life.",
        "Stay updated with design trends and bring fresh, innovative ideas to the table.",
      ],
      requirements: [
        "Bachelor's degree in Design or related field.",
        "3+ years of professional design experience, preferably in beauty or lifestyle brands.",
        "Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign).",
        "Strong portfolio showcasing branding and packaging design skills.",
        "Excellent typography and color theory knowledge.",
      ],
      featured: true,
    },
    {
      id: "5",
      title: "Customer Experience Associate",
      department: "Customer Service",
      location: "Remote, India",
      type: "Full-time",
      experience: "1+ year",
      description: [
        "Provide exceptional customer support via email, chat, and social media.",
        "Respond to customer inquiries about products, orders, and policies.",
        "Process returns, exchanges, and refunds with empathy and efficiency.",
        "Identify common customer issues and provide feedback to relevant teams.",
        "Maintain a positive and professional brand voice in all interactions.",
      ],
      requirements: [
        "Excellent written and verbal communication skills in English.",
        "1+ year in customer service, preferably in e-commerce.",
        "Strong problem-solving skills and ability to handle difficult situations calmly.",
        "Empathy and genuine desire to help customers.",
        "Familiarity with helpdesk software (Zendesk, Gorgias, etc.) is a plus.",
      ],
      featured: false,
    },
    {
      id: "6",
      title: "Sustainability Coordinator",
      department: "Sustainability",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "2+ years",
      description: [
        "Assist in developing and implementing sustainability initiatives across the company.",
        "Coordinate our refill and recycling programs with retail partners.",
        "Research and source eco-friendly packaging and materials.",
        "Track and report on sustainability metrics and progress.",
        "Educate team members and customers about our sustainability efforts.",
      ],
      requirements: [
        "Bachelor's degree in Environmental Science, Sustainability, or related field.",
        "2+ years experience in sustainability, CSR, or environmental management.",
        "Knowledge of sustainable business practices and circular economy principles.",
        "Strong organizational and project management skills.",
        "Passion for environmental conservation and social responsibility.",
      ],
      featured: true,
    },
  ];

  // Benefits
  const benefits = [
    { icon: <Heart className="w-6 h-6" />, title: "Health Insurance", description: "Comprehensive health coverage for you and your family." },
    { icon: <Star className="w-6 h-6" />, title: "Product Discounts", description: "Generous discounts on all Glasskin products." },
    { icon: <Users className="w-6 h-6" />, title: "Team Culture", description: "Collaborative, inclusive, and fun work environment." },
    { icon: <Target className="w-6 h-6" />, title: "Growth Opportunities", description: "Regular training, mentorship, and career development." },
    { icon: <Briefcase className="w-6 h-6" />, title: "Flexible Work", description: "Hybrid and remote work options available." },
    { icon: <School className="w-6 h-6" />, title: "Learning Budget", description: "Annual budget for courses, books, and conferences." },
    { icon: <Globe className="w-6 h-6" />, title: "Wellness Programs", description: "Mental health support, fitness stipends, and more." },
    { icon: <Building2 className="w-6 h-6" />, title: "Stock Options", description: "Opportunity to own a piece of Glasskin's future." },
  ];

  // Why Glasskin
  const whyGlasskin = [
    {
      title: "Mission-Driven Work",
      description: "Join a company that\'s redefining beauty with ethics and sustainability at its core. Your work will have a real impact on people and the planet.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-brand-pink to-brand-magenta",
    },
    {
      title: "Creative Freedom",
      description: "We encourage innovative thinking and give you the space to bring your best ideas to life. Your voice matters here.",
      icon: <Star className="w-8 h-8" />,
      color: "from-brand-yellow to-brand-citron",
    },
    {
      title: "Growth & Learning",
      description: "We're growing fast, which means you'll have ample opportunities to take on new challenges and advance your career.",
      icon: <Target className="w-8 h-8" />,
      color: "from-brand-cyan to-brand-sky",
    },
    {
      title: "Diverse & Inclusive",
      description: "We celebrate diversity and are committed to creating an inclusive workplace where everyone feels valued and respected.",
      icon: <Users className="w-8 h-8" />,
      color: "from-brand-mint to-brand-cyan",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <section className="mb-20">
          <span className="sticker bg-brand-yellow text-white text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play">
            Join Us
          </span>
          
          <h1 className="heading-display text-brand-text text-4xl md:text-6xl mt-4 mb-6">
            Careers at <span className="text-brand-magenta">Glasskin</span>
          </h1>
          
          <p className="text-lg text-brand-text/70 leading-relaxed max-w-3xl mb-8">
            We&apos;re building a different kind of beauty company — one that values ethics as much as aesthetics, sustainability as much as results, and people as much as profits. If you&apos;re passionate about clean beauty and want to make an impact, we&apos;d love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#openings"
              onClick={(e) => { e.preventDefault(); setActiveTab("openings"); }}
              className="btn-play-solid bg-brand-accent text-white px-6 py-3 text-sm"
            >
              View Open Positions
            </a>
            <a
              href="mailto:careers@glasskin.in"
              className="btn-play-solid bg-brand-bg border-2 border-brand-text text-brand-text hover:bg-brand-text hover:text-brand-bg px-6 py-3 text-sm transition-colors"
            >
              Send Us Your Resume
            </a>
          </div>
        </section>

        {/* Why Join Glasskin */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Why Join <span className="text-brand-blue">Glasskin</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyGlasskin.map((item, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl shadow-play border-4 border-brand-text/8 bg-gradient-to-br ${item.color}/10`}
              >
                <div className="text-brand-text mb-4">{item.icon}</div>
                <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-brand-text/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Our <span className="text-brand-cyan">Benefits</span>
          </h2>
          
          <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-cyan/20">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-brand-cyan mb-3">{benefit.icon}</div>
                  <h4 className="font-rounded font-extrabold text-brand-text text-sm mb-1">{benefit.title}</h4>
                  <p className="text-xs text-brand-text/50">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveTab("openings")}
              className={`btn-play-solid px-6 py-2 text-sm rounded-full transition-colors ${
                activeTab === "openings" 
                  ? "bg-brand-accent text-white"
                  : "bg-white border-2 border-brand-text/15 text-brand-text hover:border-brand-accent"
              }`}
            >
              Open Positions
            </button>
            <button
              onClick={() => setActiveTab("life")}
              className={`btn-play-solid px-6 py-2 text-sm rounded-full transition-colors ${
                activeTab === "life" 
                  ? "bg-brand-accent text-white"
                  : "bg-white border-2 border-brand-text/15 text-brand-text hover:border-brand-accent"
              }`}
            >
              Life at Glasskin
            </button>
            <button
              onClick={() => setActiveTab("process")}
              className={`btn-play-solid px-6 py-2 text-sm rounded-full transition-colors ${
                activeTab === "process" 
                  ? "bg-brand-accent text-white"
                  : "bg-white border-2 border-brand-text/15 text-brand-text hover:border-brand-accent"
              }`}
            >
              Hiring Process
            </button>
          </div>
        </section>

        {/* Tab Content */}
        <section id="openings" className="mb-20">
          {activeTab === "openings" && (
            <>
              <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
                Current <span className="text-brand-magenta">Openings</span>
              </h2>
              
              <div className="space-y-6">
                {positions.map((position) => (
                  <div
                    key={position.id}
                    className={`bg-white rounded-3xl shadow-play border-4 overflow-hidden transition-all duration-300 ${
                      position.featured 
                        ? "border-brand-yellow/40 bg-gradient-to-r from-brand-yellow/5 to-transparent"
                        : "border-brand-text/8"
                    }`}
                  >
                    <div className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <h3 className="font-rounded font-extrabold text-brand-text text-xl md:text-2xl">
                              {position.title}
                            </h3>
                            {position.featured && (
                              <span className="sticker bg-brand-yellow text-white text-[10px] px-3 py-1">
                                Featured
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-brand-text/60 mb-4">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {position.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {position.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {position.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              {position.experience}
                            </span>
                          </div>
                          
                          <p className="text-sm text-brand-text/70 leading-relaxed mb-4">
                            {position.description[0]}
                          </p>
                          
                          <button
                            onClick={() => setExpandedJob(expandedJob === position.id ? null : position.id)}
                            className="btn-play inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 px-4 py-2 text-xs"
                          >
                            {expandedJob === position.id ? "Show Less" : "Learn More"}
                            <ArrowRight className={`w-4 h-4 transition-transform ${expandedJob === position.id ? "rotate-90" : ""}`} />
                          </button>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <a
                            href="mailto:careers@glasskin.in?subject=Application for ${encodeURIComponent(position.title)}"
                            className="btn-play-solid bg-brand-magenta text-white px-6 py-3 text-sm hover:bg-brand-pink transition-colors"
                          >
                            Apply Now
                          </a>
                        </div>
                      </div>
                      
                      {expandedJob === position.id && (
                        <div className="mt-6 pt-6 border-t-2 border-dashed border-brand-text/10">
                          <h4 className="font-rounded font-extrabold text-brand-text text-lg mb-4">About the Role</h4>
                          <ul className="space-y-2 text-sm text-brand-text/60 mb-6">
                            {position.description.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-brand-accent mt-1">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                          
                          <h4 className="font-rounded font-extrabold text-brand-text text-lg mb-4">Requirements</h4>
                          <ul className="space-y-2 text-sm text-brand-text/60">
                            {position.requirements.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-brand-accent mt-1">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "life" && (
            <>
              <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
                Life at <span className="text-brand-cyan">Glasskin</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-pink/20">
                  <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-4">Our Culture</h3>
                  <p className="text-sm text-brand-text/60 leading-relaxed mb-6">
                    At Glasskin, we believe that great work happens when people feel valued, inspired, and empowered. We foster a culture of collaboration, creativity, and continuous learning.
                  </p>
                  <p className="text-sm text-brand-text/60 leading-relaxed mb-6">
                    We celebrate diversity and believe that different perspectives make us stronger. Whether you're in the lab formulating our next best-seller or in marketing crafting compelling campaigns, your voice matters here.
                  </p>
                  <p className="text-sm text-brand-text/60 leading-relaxed">
                    We also know how to have fun. From team retreats to product testing sessions (the best perk!), we make sure work is as enjoyable as it is rewarding.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-cyan/20">
                  <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-4">Our Values</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Heart className="w-6 h-6 text-brand-cyan flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-brand-text text-sm mb-1">Passion for Purpose</h4>
                        <p className="text-sm text-brand-text/60">We believe in the power of clean beauty to make a difference.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Star className="w-6 h-6 text-brand-cyan flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-brand-text text-sm mb-1">Excellence in Everything</h4>
                        <p className="text-sm text-brand-text/60">From formulation to customer service, we never compromise on quality.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Users className="w-6 h-6 text-brand-cyan flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-brand-text text-sm mb-1">Teamwork Makes the Dream Work</h4>
                        <p className="text-sm text-brand-text/60">We collaborate, support each other, and celebrate wins together.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Target className="w-6 h-6 text-brand-cyan flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-brand-text text-sm mb-1">Innovation Always</h4>
                        <p className="text-sm text-brand-text/60">We're not afraid to challenge the status quo and try new things.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-brand-peach/10 to-brand-citron/10 p-8 rounded-3xl border-4 border-brand-yellow/20">
                <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-6">Employee Spotlights</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-brand-pink to-brand-magenta rounded-full mx-auto mb-4 border-4 border-white shadow-play" />
                      <h4 className="font-bold text-brand-text text-sm mb-1">Team Member Name</h4>
                      <p className="text-xs text-brand-text/50 uppercase tracking-widest">POSITION</p>
                      <p className="text-sm text-brand-text/60 mt-2 italic">
                        "Joining Glasskin was the best career decision I've made. The growth opportunities are endless."
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "process" && (
            <>
              <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
                Our <span className="text-brand-blue">Hiring Process</span>
              </h2>
              
              <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-blue/20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-6">Simple & Transparent</h3>
                    <p className="text-sm text-brand-text/60 leading-relaxed mb-8">
                      We believe in a hiring process that's respectful of your time and transparent at every step. Here's what you can expect:
                    </p>
                    
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <span className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                        <div>
                          <h4 className="font-bold text-brand-text text-sm mb-1">Application</h4>
                          <p className="text-sm text-brand-text/60">Submit your resume and a brief cover letter telling us why you're excited about Glasskin.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <span className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                        <div>
                          <h4 className="font-bold text-brand-text text-sm mb-1">Initial Screening</h4>
                          <p className="text-sm text-brand-text/60">Our talent team will review your application and reach out if there's a potential fit.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <span className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
                        <div>
                          <h4 className="font-bold text-brand-text text-sm mb-1">Interview Rounds</h4>
                          <p className="text-sm text-brand-text/60">Typically 2-3 rounds including team interviews and a final round with department heads.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <span className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</span>
                        <div>
                          <h4 className="font-bold text-brand-text text-sm mb-1">Assessment</h4>
                          <p className="text-sm text-brand-text/60">Some roles may include a practical assessment or case study relevant to the position.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <span className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">5</span>
                        <div>
                          <h4 className="font-bold text-brand-text text-sm mb-1">Offer</h4>
                          <p className="text-sm text-brand-text/60">Successful candidates will receive a formal offer with details about compensation, benefits, and start date.</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t-2 border-dashed border-brand-text/10">
                      <p className="text-sm text-brand-text/60 leading-relaxed mb-4">
                        <strong className="text-brand-text font-bold">Timeline:</strong> Our hiring process typically takes 2-4 weeks from application to offer, depending on the role and scheduling.
                      </p>
                      <p className="text-sm text-brand-text/60 leading-relaxed">
                        <strong className="text-brand-text font-bold">Equal Opportunity:</strong> Glasskin is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-brand-blue/10 to-brand-sky/10 p-8 rounded-2xl">
                    <span className="text-8xl font-display text-brand-blue/20">G</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* CTA Section */}
        <section>
          <div className="bg-gradient-to-r from-brand-magenta/5 to-brand-pink/5 p-12 md:p-16 rounded-3xl border-4 border-brand-magenta/20 text-center">
            <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-4">
              Ready to Make an <span className="text-brand-magenta">Impact</span>?
            </h2>
            <p className="text-lg text-brand-text/70 leading-relaxed max-w-2xl mx-auto mb-8">
              If you're passionate about clean beauty and want to join a team that's changing the industry for the better, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@glasskin.in"
                className="btn-play-solid bg-brand-magenta text-white px-8 py-4 text-sm"
              >
                <Mail className="w-4 h-4 inline-block mr-2" />
                careers@glasskin.in
              </a>
              <a
                href="#openings"
                onClick={(e) => { e.preventDefault(); setActiveTab("openings"); }}
                className="btn-play-solid bg-white border-2 border-brand-text text-brand-text hover:bg-brand-text hover:text-brand-bg px-8 py-4 text-sm transition-colors"
              >
                View All Openings
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
