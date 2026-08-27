"use client";
/* eslint-disable react/no-unescaped-entities */

import React, { useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { Search, MapPin, Clock, Phone, Mail, Star, ShoppingBag, Building2 } from "lucide-react";

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string | null;
  timing: string;
  latitude: number;
  longitude: number;
  featured: boolean;
  rating?: number;
  reviewCount?: number;
}

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [activeTab, setActiveTab] = useState("india");

  // Sample store data
  const indiaStores: Store[] = [
    {
      id: "1",
      name: "Glasskin Flagship Store - Bandra",
      address: "Shop No. 123, Linking Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
      country: "India",
      phone: "+91 22 4567 8900",
      email: "bandra@glasskin.in",
      timing: "10:00 AM - 8:00 PM",
      latitude: 19.0595,
      longitude: 72.8347,
      featured: true,
      rating: 4.9,
      reviewCount: 128,
    },
    {
      id: "2",
      name: "Sephora India - Select Citywalk",
      address: "A-4, Select Citywalk Mall, Saket",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110017",
      country: "India",
      phone: "+91 11 4123 4567",
      email: null,
      timing: "11:00 AM - 9:00 PM",
      latitude: 28.5256,
      longitude: 77.1942,
      featured: false,
      rating: 4.7,
      reviewCount: 89,
    },
    {
      id: "3",
      name: "Cult Beauty - Phoenix Market City",
      address: "420, Phoenix Marketcity, Whitefield Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560048",
      country: "India",
      phone: "+91 80 4678 9012",
      email: null,
      timing: "10:30 AM - 9:30 PM",
      latitude: 12.9716,
      longitude: 77.7447,
      featured: true,
      rating: 4.8,
      reviewCount: 156,
    },
    {
      id: "4",
      name: "Nykaa Luxe - DLF Avenue",
      address: "Shop 201-202, DLF Avenue, Saket",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110017",
      country: "India",
      phone: "+91 11 4321 5678",
      email: null,
      timing: "11:00 AM - 8:00 PM",
      latitude: 28.5234,
      longitude: 77.1921,
      featured: false,
      rating: 4.6,
      reviewCount: 72,
    },
    {
      id: "5",
      name: "Glasskin Beauty Bar - Indiranagar",
      address: "80 Feet Road, 100 Feet Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560038",
      country: "India",
      phone: "+91 80 4789 0123",
      email: "indiranagar@glasskin.in",
      timing: "10:00 AM - 7:00 PM",
      latitude: 12.9762,
      longitude: 77.6489,
      featured: true,
      rating: 4.9,
      reviewCount: 203,
    },
    {
      id: "6",
      name: "Lifestyle - Elante Mall",
      address: "Plot No 178-180, Industrial & Business Park Phase I",
      city: "Chandigarh",
      state: "Punjab",
      pincode: "160002",
      country: "India",
      phone: "+91 172 5678 9012",
      email: null,
      timing: "11:00 AM - 9:00 PM",
      latitude: 30.7333,
      longitude: 76.7794,
      featured: false,
      rating: 4.5,
      reviewCount: 45,
    },
    {
      id: "7",
      name: "Glasskin Beauty Lounge - Kemps Corner",
      address: "Ground Floor, Kemps Corner",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400036",
      country: "India",
      phone: "+91 22 4789 0123",
      email: "kempscorner@glasskin.in",
      timing: "10:00 AM - 8:00 PM",
      latitude: 18.9589,
      longitude: 72.8012,
      featured: true,
      rating: 4.9,
      reviewCount: 98,
    },
    {
      id: "8",
      name: "Central - Phoenix Mall of Asia",
      address: "LBS Marg, Kurla West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400070",
      country: "India",
      phone: "+91 22 4890 1234",
      email: null,
      timing: "11:00 AM - 10:00 PM",
      latitude: 19.0887,
      longitude: 72.8981,
      featured: false,
      rating: 4.4,
      reviewCount: 61,
    },
  ];

  const internationalStores: Store[] = [
    {
      id: "1",
      name: "Sephora - Mall of the Emirates",
      address: "Sheikh Zayed Road, Al Barsha",
      city: "Dubai",
      country: "UAE",
      phone: "+971 4 341 0888",
      email: null,
      timing: "10:00 AM - 10:00 PM",
      latitude: 25.1188,
      longitude: 55.2039,
      featured: true,
      rating: 4.8,
      reviewCount: 134,
    },
    {
      id: "2",
      name: "Harvey Nichols - The Dubai Mall",
      address: "Financial Center Road, Downtown Dubai",
      city: "Dubai",
      country: "UAE",
      phone: "+971 4 438 8388",
      email: null,
      timing: "10:00 AM - 11:00 PM",
      latitude: 25.1972,
      longitude: 55.2790,
      featured: false,
      rating: 4.7,
      reviewCount: 89,
    },
    {
      id: "3",
      name: "Sephora - ION Orchard",
      address: "2 Orchard Turn, Singapore",
      city: "Singapore",
      country: "Singapore",
      phone: "+65 6235 3500",
      email: null,
      timing: "10:00 AM - 9:30 PM",
      latitude: 1.3032,
      longitude: 103.8319,
      featured: true,
      rating: 4.9,
      reviewCount: 215,
    },
    {
      id: "4",
      name: "Cult Beauty - Covent Garden",
      address: "49-51 Monmouth Street, London",
      city: "London",
      country: "UK",
      phone: "+44 20 7836 6000",
      email: null,
      timing: "10:00 AM - 7:00 PM",
      latitude: 51.5124,
      longitude: -0.1268,
      featured: true,
      rating: 4.8,
      reviewCount: 178,
    },
    {
      id: "5",
      name: "Space NK - Apthorp Centre",
      address: "135-137 Westbourne Grove, London",
      city: "London",
      country: "UK",
      phone: "+44 20 7792 8800",
      email: null,
      timing: "10:00 AM - 7:00 PM",
      latitude: 51.5167,
      longitude: -0.2057,
      featured: false,
      rating: 4.6,
      reviewCount: 56,
    },
  ];

  // Get unique cities
  const getUniqueCities = (stores: Store[]) => {
    const cities = stores.map(store => store.city);
    return ["All", ...Array.from(new Set(cities))].sort();
  };

  // Filter stores
  const getFilteredStores = (): Store[] => {
    const stores: Store[] = activeTab === "india" ? indiaStores : internationalStores;
    let filtered = stores;

    if (selectedCity !== "All") {
      filtered = filtered.filter(store => store.city === selectedCity);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(store => 
        store.name.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query) ||
        store.city.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredStores = getFilteredStores();
  const cities = getUniqueCities(activeTab === "india" ? indiaStores : internationalStores);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <section className="mb-20">
          <span className="sticker bg-brand-magenta text-white text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play">
            Find Us Near You
          </span>
          
          <h1 className="heading-display text-brand-text text-4xl md:text-6xl mt-4 mb-6">
            Store <span className="text-brand-pink">Locator</span>
          </h1>
          
          <p className="text-lg text-brand-text/70 leading-relaxed max-w-3xl mb-8">
            Experience Glasskin in person at one of our flagship stores or at select retail partners. Use our store locator to find the nearest location where you can shop our complete collection.
          </p>

          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-8">
            <button
              onClick={() => {
                setActiveTab("india");
                setSelectedCity("All");
                setSearchQuery("");
              }}
              className={`btn-play-solid px-6 py-2 text-sm rounded-full transition-colors ${
                activeTab === "india"
                  ? "bg-brand-pink text-white"
                  : "bg-white border-2 border-brand-text/15 text-brand-text hover:border-brand-pink"
              }`}
            >
              India
            </button>
            <button
              onClick={() => {
                setActiveTab("international");
                setSelectedCity("All");
                setSearchQuery("");
              }}
              className={`btn-play-solid px-6 py-2 text-sm rounded-full transition-colors ${
                activeTab === "international"
                  ? "bg-brand-cyan text-white"
                  : "bg-white border-2 border-brand-text/15 text-brand-text hover:border-brand-cyan"
              }`}
            >
              International
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-pink/20 mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-text/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTab === "india" ? "India" : "International"} stores...`}
                  className="w-full border-2 border-brand-text/15 rounded-full px-12 py-4 text-sm bg-transparent focus:outline-none focus:border-brand-pink transition-colors"
                />
              </div>
              <div className="relative">
                <Building2 className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-text/40" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full border-2 border-brand-text/15 rounded-full px-12 py-4 text-sm bg-transparent focus:outline-none focus:border-brand-pink transition-colors appearance-none"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Stores */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Featured <span className="text-brand-yellow">Stores</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {(activeTab === "india" ? indiaStores : internationalStores)
              .filter(store => store.featured)
              .slice(0, 3)
              .map((store) => (
                <button
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className="bg-white p-6 rounded-3xl shadow-play border-4 border-brand-yellow/20 hover:border-brand-yellow/40 transition-colors text-left"
                >
                  <div className="mb-4">
                    <div className="w-full h-32 bg-gradient-to-br from-brand-pink/10 to-brand-magenta/10 rounded-2xl flex items-center justify-center mb-4">
                      <MapPin className="w-12 h-12 text-brand-pink" />
                    </div>
                    <span className="sticker bg-brand-yellow text-white text-[10px] px-3 py-1 -rotate-2 inline-flex shadow-play mb-4">
                      Featured
                    </span>
                  </div>
                  <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-2">{store.name}</h3>
                  <p className="text-sm text-brand-text/60 mb-1">{store.address}</p>
                  <p className="text-sm text-brand-text/60 mb-3">{store.city}, {store.state && store.state + ", "} {store.country}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-brand-yellow" />
                    <span className="text-sm font-bold">{store.rating}</span>
                    <span className="text-xs text-brand-text/40">({store.reviewCount} reviews)</span>
                  </div>
                  <p className="text-xs text-brand-text/50 uppercase tracking-widest font-semibold">
                    <Clock className="w-3 h-3 inline-block mr-1" />
                    {store.timing}
                  </p>
                </button>
              ))}
          </div>
        </section>

        {/* All Stores */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            All <span className="text-brand-blue">Locations</span>
          </h2>

          {filteredStores.length > 0 ? (
            <div className="space-y-6">
              {filteredStores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className="w-full bg-white p-6 rounded-3xl shadow-play border-4 border-brand-text/8 hover:border-brand-cyan/40 transition-colors text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-brand-cyan/10 to-brand-sky/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-brand-cyan" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-1">{store.name}</h3>
                      <p className="text-sm text-brand-text/60 mb-1">{store.address}</p>
                      <p className="text-sm text-brand-text/60 mb-2">{store.city}, {store.state && store.state + ", "} {store.country}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-brand-text/50">
                        {store.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {store.phone}
                          </span>
                        )}
                        {store.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {store.email}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {store.timing}
                        </span>
                        {store.featured && (
                          <span className="bg-brand-yellow/10 text-brand-yellow px-2 py-1 rounded-full text-xs font-bold">
                            FEATURED
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {store.rating && (
                        <>
                          <Star className="w-5 h-5 text-brand-yellow" />
                          <span className="font-bold">{store.rating}</span>
                        </>
                      )}
                      <span className="text-right">
                        <MapPin className="w-5 h-5 text-brand-text/40" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl shadow-play border-4 border-brand-text/8 text-center">
              <MapPin className="w-12 h-12 text-brand-text/20 mx-auto mb-4" />
              <h3 className="font-rounded font-extrabold text-brand-text text-xl mb-2">
                No Stores Found
              </h3>
              <p className="text-sm text-brand-text/60">
                We couldn't find any stores matching your search criteria. Try adjusting your filters.
              </p>
            </div>
          )}

          {/* Results Count */}
          <p className="text-sm text-brand-text/50 mt-4">
            Showing {filteredStores.length} of {activeTab === "india" ? indiaStores.length : internationalStores.length} locations
          </p>
        </section>

        {/* Online Shopping CTA */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-brand-peach/5 to-brand-citron/5 p-12 md:p-16 rounded-3xl border-4 border-brand-yellow/20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="sticker bg-brand-yellow text-white text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play mb-4">
                  Shop Online
                </span>
                <h3 className="heading-display text-brand-text text-2xl md:text-4xl mb-4">
                  Prefer to Shop <span className="text-brand-yellow">Online</span>?
                </h3>
                <p className="text-sm text-brand-text/60 leading-relaxed mb-6">
                  Enjoy the convenience of shopping from home with our full product range, exclusive online deals, and doorstep delivery across India and select international destinations.
                </p>
                <a
                  href="/shop"
                  className="btn-play-solid bg-brand-yellow text-white px-8 py-4 text-sm"
                >
                  <ShoppingBag className="w-4 h-4 inline-block mr-2" />
                  Shop Now
                </a>
              </div>
              <div className="hidden md:block">
                <div className="w-48 h-48 bg-gradient-to-br from-brand-yellow to-brand-citron rounded-full mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Store Modal */}
        {selectedStore && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-brand-bg rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-brand-text/8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="sticker bg-brand-magenta text-white text-[10px] px-3 py-1 -rotate-2 inline-flex shadow-play mb-4">
                    Store Details
                  </span>
                  <h2 className="font-rounded font-extrabold text-brand-text text-xl md:text-2xl mb-2">
                    {selectedStore.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedStore(null)}
                  className="text-3xl text-brand-text/40 hover:text-brand-text transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="bg-white p-6 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-brand-pink flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-brand-text text-sm mb-1">Address</h3>
                      <p className="text-sm text-brand-text/60">{selectedStore.address}</p>
                      <p className="text-sm text-brand-text/60">{selectedStore.city}, {selectedStore.state && selectedStore.state + ", "}{selectedStore.country}</p>
                      {selectedStore.pincode && <p className="text-sm text-brand-text/60">PIN: {selectedStore.pincode}</p>}
                    </div>
                  </div>
                </div>

                {/* Contact */}
                {(selectedStore.phone || selectedStore.email) && (
                  <div className="bg-white p-6 rounded-2xl">
                    <h3 className="font-bold text-brand-text text-sm mb-4">Contact</h3>
                    <div className="space-y-3">
                      {selectedStore.phone && (
                        <a
                          href={`tel:${selectedStore.phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-3 text-sm text-brand-text hover:text-brand-accent transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {selectedStore.phone}
                        </a>
                      )}
                      {selectedStore.email && (
                        <a
                          href={`mailto:${selectedStore.email}`}
                          className="flex items-center gap-3 text-sm text-brand-text hover:text-brand-accent transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          {selectedStore.email}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Timing */}
                <div className="bg-white p-6 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-brand-cyan flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-brand-text text-sm mb-1">Store Timing</h3>
                      <p className="text-sm text-brand-text/60">{selectedStore.timing}</p>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                {selectedStore.rating && (
                  <div className="bg-white p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-yellow/10 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-brand-yellow" />
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-text text-sm mb-1">Customer Rating</h3>
                        <div className="flex items-center gap-2">
                          <span className="font-rounded font-extrabold text-brand-text text-xl">{selectedStore.rating}</span>
                          <div className="flex text-brand-yellow">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${star <= Math.floor(selectedStore.rating || 0) ? "text-brand-yellow" : "text-brand-yellow/20"}`}
                                fill={star <= Math.floor(selectedStore.rating || 0) ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-brand-text/50">({selectedStore.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Directions */}
                <div className="bg-white p-6 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-brand-sky flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-brand-text text-sm mb-1">Get Directions</h3>
                      <p className="text-sm text-brand-text/60 mb-3">
                        Open in your preferred maps application to get turn-by-turn directions to this store.
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${selectedStore.latitude},${selectedStore.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-play-solid bg-brand-sky text-white px-4 py-2 text-xs inline-flex items-center gap-2"
                      >
                        <span className="text-lg">📍</span>
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${selectedStore.name}, ${selectedStore.address}, ${selectedStore.city}`);
                      alert("Store address copied to clipboard!");
                    }}
                    className="flex-1 btn-play-solid bg-brand-bg border-2 border-brand-text text-brand-text hover:bg-brand-text hover:text-brand-bg px-4 py-3 text-sm transition-colors"
                  >
                    Copy Address
                  </button>
                  <a
                    href={`tel:${selectedStore.phone?.replace(/\s/g, "")}`}
                    className="flex-1 btn-play-solid bg-brand-pink text-white px-4 py-3 text-sm text-center"
                  >
                    <Phone className="w-4 h-4 inline-block mr-2" />
                    Call Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
