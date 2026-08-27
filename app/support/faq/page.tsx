"use client";
/* eslint-disable react/no-unescaped-entities */

import React, { useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { HelpCircle, ShoppingBag, Truck, CreditCard, Box, User, Mail, Star } from "lucide-react";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // FAQ Categories
  const categories = ["All", "Orders & Shipping", "Products", "Payments", "Returns", "Account", "General"];

  // FAQ Items
  const faqItems = [
    {
      id: "1",
      category: "Orders & Shipping",
      question: "How do I track my order?",
      answer: "You can track your order by visiting our Order Tracking page and entering your order number. We also send tracking information via email once your order has shipped. Delivery typically takes 3-7 business days within India, and 7-14 business days for international orders.",
    },
    {
      id: "2",
      category: "Orders & Shipping",
      question: "What is your shipping policy?",
      answer: "We offer free shipping on all orders above INR 999 within India. For orders below INR 999, a flat shipping fee of INR 99 applies. International shipping rates vary by destination and are calculated at checkout. All orders are shipped from our warehouse in Mumbai, India.",
    },
    {
      id: "3",
      category: "Orders & Shipping",
      question: "Do you ship internationally?",
      answer: "Yes! We currently ship to the UAE, Singapore, UK, USA, Canada, and Australia. We're continuously expanding our international reach. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the customer.",
    },
    {
      id: "4",
      category: "Orders & Shipping",
      question: "How long will it take to receive my order?",
      answer: "Within India: 3-7 business days. International: 7-14 business days. Please note that these are estimates and actual delivery times may vary due to factors like customs processing (for international orders) or local postal service delays.",
    },
    {
      id: "5",
      category: "Orders & Shipping",
      question: "Can I cancel or modify my order?",
      answer: "You can cancel your order within 24 hours of placing it by contacting our customer support team. After 24 hours, orders cannot be cancelled as they are already being processed for shipment. Unfortunately, we cannot modify orders once they've been placed.",
    },
    {
      id: "6",
      category: "Products",
      question: "Are Glasskin products cruelty-free?",
      answer: "Absolutely! All Glasskin products are 100% cruelty-free and vegan. We never test on animals, and we don't use any animal-derived ingredients. We're also PETA-certified, which means our suppliers also adhere to cruelty-free standards.",
    },
    {
      id: "7",
      category: "Products",
      question: "What skin types are your products suitable for?",
      answer: "Our products are formulated to be suitable for all skin types. Each product page includes detailed information about which skin types it's best suited for. We also have a Skin Quiz that can help you find the perfect products for your specific skin concerns.",
    },
    {
      id: "8",
      category: "Products",
      question: "Do your products contain any harmful ingredients?",
      answer: "No. All Glasskin products are free from parabens, sulfates, phthalates, synthetic fragrances, synthetic dyes, formaldehyde, triclosan, mineral oil, and over 2,000 other harmful ingredients. We follow a strict No-List and only use ingredients that are safe, effective, and ethically sourced.",
    },
    {
      id: "9",
      category: "Products",
      question: "How do I know which products are right for me?",
      answer: "We offer several ways to find your perfect match: Take our Skin Quiz for personalized recommendations, read the detailed descriptions on each product page, or consult our Product Guide which helps you build a routine based on your skin type and concerns. You can also contact our customer support team for personalized advice.",
    },
    {
      id: "10",
      category: "Products",
      question: "What is the shelf life of your products?",
      answer: "Most Glasskin products have a shelf life of 12-24 months when stored properly (in a cool, dry place away from direct sunlight). Each product has a PAO (Period After Opening) symbol which indicates how long the product is safe to use after opening. For most of our products, this is 12 months.",
    },
    {
      id: "11",
      category: "Payments",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express), UPI payments, net banking, and digital wallets. We also offer Cash on Delivery (COD) for orders within India. All payments are processed securely through our payment gateway partners.",
    },
    {
      id: "12",
      category: "Payments",
      question: "Is Cash on Delivery (COD) available?",
      answer: "Yes! COD is available for all orders within India. For international orders, we only accept prepaid payment methods. Please note that COD orders may be subject to additional verification and could experience slight delays in processing.",
    },
    {
      id: "13",
      category: "Payments",
      question: "Is my payment information secure?",
      answer: "Yes, absolutely. All payment information is processed through encrypted SSL connections. We use Stripe and Razorpay, which are PCI-DSS compliant payment gateways. This means your payment information is never stored on our servers and is protected by the highest industry standards.",
    },
    {
      id: "14",
      category: "Payments",
      question: "Can I use multiple payment methods for a single order?",
      answer: "Currently, we only support one payment method per order. If you need to use multiple payment methods, we recommend placing separate orders or using a digital wallet that allows you to combine payment sources.",
    },
    {
      id: "15",
      category: "Returns",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all products. If you're not completely satisfied with your purchase, you can return the unused and unopened product(s) within 30 days of delivery for a full refund or exchange. For hygiene reasons, we cannot accept returns of opened or used products unless they are defective.",
    },
    {
      id: "16",
      category: "Returns",
      question: "How do I initiate a return?",
      answer: "To initiate a return, please visit our Order Tracking page, select your order, and click on 'Request Return'. Alternatively, you can email us at returns@glasskin.in with your order number and the reason for return. Our team will guide you through the process and provide a return shipping label.",
    },
    {
      id: "17",
      category: "Returns",
      question: "Do you offer refunds or store credit only?",
      answer: "We offer both options! You can choose to receive a full refund to your original payment method, or opt for store credit which can be used for future purchases. Refunds typically take 5-10 business days to process, depending on your bank or card issuer.",
    },
    {
      id: "18",
      category: "Returns",
      question: "Who pays for return shipping?",
      answer: "For returns due to defective products or shipping errors, we cover the return shipping costs. For returns due to change of mind or wrong product ordered, the customer is responsible for the return shipping costs. We provide discounted return shipping labels for your convenience.",
    },
    {
      id: "19",
      category: "Account",
      question: "How do I create an account?",
      answer: "Creating an account is easy! Click on the 'Account' icon in the top right corner of our website, then select 'Register'. You can sign up using your email address or through Google, Apple, or Facebook. Having an account allows you to track orders, save products to your wishlist, and enjoy a faster checkout process.",
    },
    {
      id: "20",
      category: "Account",
      question: "I forgot my password. What should I do?",
      answer: "No worries! Click on 'Forgot Password' on the login page and enter the email address associated with your account. We'll send you a link to reset your password. If you don't receive the email within a few minutes, please check your spam folder or contact our support team.",
    },
    {
      id: "21",
      category: "Account",
      question: "Can I update my account information?",
      answer: "Yes, you can update your account information at any time. Log in to your account and navigate to 'Account Settings' to edit your personal information, shipping address, or communication preferences. For security reasons, you'll need to re-enter your password to make certain changes.",
    },
    {
      id: "22",
      category: "Account",
      question: "How do I delete my account?",
      answer: "We're sorry to see you go! To delete your account, please contact our customer support team at support@glasskin.in. We'll process your request within 7 business days. Please note that deleting your account will remove your order history and wishlist, but we\'re required to retain transaction records for legal and tax purposes.",
    },
    {
      id: "23",
      category: "General",
      question: "Where can I buy Glasskin products?",
      answer: "You can purchase Glasskin products directly from our website (glasskin.in), which offers the full range of our products. We also have select retail partners across India and in our international markets. Check our Store Locator page to find a retailer near you.",
    },
    {
      id: "24",
      category: "General",
      question: "Do you have a physical store?",
      answer: "We have a flagship store in Bandra, Mumbai, where you can experience our products in person. We're also present in select multi-brand beauty stores and department stores across India. Our Store Locator page has the complete list of our retail partners.",
    },
    {
      id: "25",
      category: "General",
      question: "Can I get samples before purchasing?",
      answer: "We currently offer deluxe samples with select orders. We're also working on launching a sample program where you can purchase mini sizes of our bestsellers. Follow us on social media to be the first to know when this becomes available!",
    },
    {
      id: "26",
      category: "General",
      question: "Do you offer gift wrapping?",
      answer: "Yes! We offer complimentary gift wrapping for all orders. At checkout, you can select the gift wrapping option and include a personalized gift message. Your order will arrive beautifully packaged and ready for gifting!",
    },
    {
      id: "27",
      category: "General",
      question: "What is your sustainability commitment?",
      answer: "Sustainability is at the core of everything we do at Glasskin. We use 50% post-consumer recycled plastic for our bottles, FSC-certified paper for our boxes, and offer a refill program. We're also carbon-neutral for all our shipping. You can learn more about our sustainability initiatives on our Sustainability page.",
    },
  ];

  // Filter FAQs by category
  const filteredFAQs = activeCategory === "All"
    ? faqItems
    : faqItems.filter(item => item.category === activeCategory);

  // Category icons
  const categoryIcons: Record<string, React.ReactNode> = {
    "All": <HelpCircle className="w-5 h-5" />,
    "Orders & Shipping": <Truck className="w-5 h-5" />,
    "Products": <ShoppingBag className="w-5 h-5" />,
    "Payments": <CreditCard className="w-5 h-5" />,
    "Returns": <Box className="w-5 h-5" />,
    "Account": <User className="w-5 h-5" />,
    "General": <Star className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <section className="mb-20">
          <span className="sticker bg-brand-blue text-white text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play">
            Frequently Asked Questions
          </span>
          
          <h1 className="heading-display text-brand-text text-4xl md:text-6xl mt-4 mb-6">
            FAQ<span className="text-brand-magenta">s</span>
          </h1>
          
          <p className="text-lg text-brand-text/70 leading-relaxed max-w-3xl mb-8">
            Got questions? We've got answers. Browse through our frequently asked questions to find information about orders, products, payments, returns, and more. Can't find what you're looking for? Our support team is just an email away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@glasskin.in"
              className="btn-play-solid bg-brand-accent text-white px-6 py-3 text-sm"
            >
              <Mail className="w-4 h-4 inline-block mr-2" />
              Contact Support
            </a>
            <a
              href="tel:+911145678900"
              className="btn-play-solid bg-white border-2 border-brand-text text-brand-text hover:bg-brand-text hover:text-brand-bg px-6 py-3 text-sm transition-colors"
            >
              <span className="font-bold">+91 11 4567 8900</span>
            </a>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`btn-play-solid px-4 py-2 text-xs rounded-full transition-colors flex items-center gap-2 ${
                  activeCategory === category
                    ? "bg-brand-accent text-white"
                    : "bg-white border-2 border-brand-text/15 text-brand-text hover:border-brand-accent"
                }`}
              >
                {categoryIcons[category]}
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Items */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Find <span className="text-brand-cyan">Answers</span>
          </h2>

          <div className="space-y-4">
            {filteredFAQs.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-play border-4 border-brand-text/8 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-brand-bg transition-colors"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-accent mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="font-rounded font-extrabold text-brand-text text-lg hover:text-brand-blue transition-colors">
                      {item.question}
                    </h3>
                  </div>
                  <span className={`text-2xl transition-transform ${expandedItems[item.id] ? "rotate-180" : ""}`}>
                    ↓
                  </span>
                </button>
                
                {expandedItems[item.id] && (
                  <div className="p-6 pt-0 text-sm text-brand-text/70 leading-relaxed border-t-2 border-dashed border-brand-text/10">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="bg-white rounded-3xl shadow-play border-4 border-brand-text/8 p-12 text-center">
              <HelpCircle className="w-12 h-12 text-brand-text/20 mx-auto mb-4" />
              <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-2">
                No FAQs Found
              </h3>
              <p className="text-sm text-brand-text/60">
                We don't have any FAQs in this category yet. Try selecting a different category.
              </p>
            </div>
          )}
        </section>

        {/* Quick Links */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Quick <span className="text-brand-yellow">Links</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="/contact"
              className="bg-white p-6 rounded-3xl shadow-play border-4 border-brand-sky/20 hover:border-brand-sky/40 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-sky/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-sky/20 transition-colors">
                  <Mail className="w-6 h-6 text-brand-sky" />
                </div>
                <div>
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg">Contact Us</h3>
                  <p className="text-sm text-brand-text/60">Need personalized help? Our support team is ready to assist.</p>
                </div>
              </div>
            </a>
            
            <a
              href="/support/order-tracking"
              className="bg-white p-6 rounded-3xl shadow-play border-4 border-brand-cyan/20 hover:border-brand-cyan/40 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-cyan/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-cyan/20 transition-colors">
                  <Truck className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg">Track Order</h3>
                  <p className="text-sm text-brand-text/60">Monitor your delivery status in real-time.</p>
                </div>
              </div>
            </a>
            
            <a
              href="/legal/refund-policy"
              className="bg-white p-6 rounded-3xl shadow-play border-4 border-brand-pink/20 hover:border-brand-pink/40 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-pink/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-pink/20 transition-colors">
                  <Box className="w-6 h-6 text-brand-pink" />
                </div>
                <div>
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg">Returns Policy</h3>
                  <p className="text-sm text-brand-text/60">Learn about our 30-day return and refund policy.</p>
                </div>
              </div>
            </a>
            
            <a
              href="/support/store-locator"
              className="bg-white p-6 rounded-3xl shadow-play border-4 border-brand-mint/20 hover:border-brand-mint/40 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-mint/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-mint/20 transition-colors">
                  <ShoppingBag className="w-6 h-6 text-brand-mint" />
                </div>
                <div>
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg">Store Locator</h3>
                  <p className="text-sm text-brand-text/60">Find Glasskin products at a retailer near you.</p>
                </div>
              </div>
            </a>
            
            <a
              href="/skin-quiz"
              className="bg-white p-6 rounded-3xl shadow-play border-4 border-brand-yellow/20 hover:border-brand-yellow/40 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-yellow/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-yellow/20 transition-colors">
                  <Star className="w-6 h-6 text-brand-yellow" />
                </div>
                <div>
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg">Skin Quiz</h3>
                  <p className="text-sm text-brand-text/60">Take our quiz to find the perfect products for your skin.</p>
                </div>
              </div>
            </a>
            
            <a
              href="/about/ingredients"
              className="bg-white p-6 rounded-3xl shadow-play border-4 border-brand-peach/20 hover:border-brand-peach/40 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-peach/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-peach/20 transition-colors">
                  <User className="w-6 h-6 text-brand-peach" />
                </div>
                <div>
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg">Ingredients</h3>
                  <p className="text-sm text-brand-text/60">Learn about what goes into our clean, effective formulations.</p>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Still Have Questions? */}
        <section>
          <div className="bg-gradient-to-r from-brand-cyan/5 to-brand-sky/5 p-12 md:p-16 rounded-3xl border-4 border-brand-cyan/20 text-center">
            <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-4">
              Still Have <span className="text-brand-cyan">Questions</span>?
            </h2>
            <p className="text-lg text-brand-text/70 leading-relaxed max-w-2xl mx-auto mb-8">
              We're here to help. Whether you have a question about a product, need assistance with an order, or just want to say hello — we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@glasskin.in"
                className="btn-play-solid bg-brand-cyan text-white px-8 py-4 text-sm"
              >
                <Mail className="w-4 h-4 inline-block mr-2" />
                support@glasskin.in
              </a>
              <a
                href="/contact"
                className="btn-play-solid bg-white border-2 border-brand-text text-brand-text hover:bg-brand-text hover:text-brand-bg px-8 py-4 text-sm transition-colors"
              >
                Visit Contact Page
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
