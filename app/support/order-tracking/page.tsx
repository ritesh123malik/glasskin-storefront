"use client";
/* eslint-disable react/no-unescaped-entities */

import React, { useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { Search, Truck, Package, CheckCircle, Clock, XCircle, MapPin, Calendar, Mail, Phone } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface TrackingInfo {
  carrier: string;
  number: string;
  url: string;
}

interface Address {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface TimelineEvent {
  date: string;
  time: string;
  status: string;
  icon: React.ReactNode;
}

interface OrderData {
  id: string;
  date: string;
  total: string;
  status: string;
  items: OrderItem[];
  tracking: TrackingInfo | null;
  address: Address;
  estimatedDelivery: string;
  timeline: TimelineEvent[];
}

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentOrders, setRecentOrders] = useState<OrderData[]>([]);

  // Sample order data for demonstration
  const sampleOrders = [
    {
      id: "GS202412345",
      date: "August 20, 2026",
      total: "₹2,499",
      status: "Delivered",
      items: [
        { name: "Dewy SPF 50+", quantity: 1, price: "₹1,299" },
        { name: "Cloud Cream Moisturizer", quantity: 1, price: "₹1,199" },
      ],
      tracking: {
        carrier: "Delhivery",
        number: "DLV123456789",
        url: "https://track.delhivery.com/123456789",
      },
      address: {
        name: "Ritesh Malik",
        address: "123 Beauty Lane, Bandra",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400050",
        country: "India",
      },
      estimatedDelivery: "August 22, 2026",
      timeline: [
        { date: "Aug 20, 2026", time: "10:30 AM", status: "Order Placed", icon: <Package className="w-5 h-5" /> },
        { date: "Aug 20, 2026", time: "12:00 PM", status: "Processing", icon: <Clock className="w-5 h-5" /> },
        { date: "Aug 21, 2026", time: "08:00 AM", status: "Shipped", icon: <Truck className="w-5 h-5" /> },
        { date: "Aug 22, 2026", time: "02:30 PM", status: "Out for Delivery", icon: <Truck className="w-5 h-5" /> },
        { date: "Aug 22, 2026", time: "04:15 PM", status: "Delivered", icon: <CheckCircle className="w-5 h-5" /> },
      ],
    },
    {
      id: "GS202467890",
      date: "August 15, 2026",
      total: "₹1,599",
      status: "Shipped",
      items: [
        { name: "Oil-to-Foam Cleanser", quantity: 1, price: "₹999" },
        { name: "Hyaluronic Acid Serum", quantity: 1, price: "₹599" },
      ],
      tracking: {
        carrier: "FedEx",
        number: "FX123456789",
        url: "https://track.fedex.com/123456789",
      },
      address: {
        name: "Ritesh Malik",
        address: "123 Beauty Lane, Bandra",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400050",
        country: "India",
      },
      estimatedDelivery: "August 24, 2026",
      timeline: [
        { date: "Aug 15, 2026", time: "11:45 AM", status: "Order Placed", icon: <Package className="w-5 h-5" /> },
        { date: "Aug 15, 2026", time: "01:00 PM", status: "Processing", icon: <Clock className="w-5 h-5" /> },
        { date: "Aug 16, 2026", time: "09:30 AM", status: "Shipped", icon: <Truck className="w-5 h-5" /> },
        { date: "Aug 24, 2026", time: "Estimated", status: "Out for Delivery", icon: <Truck className="w-5 h-5" /> },
      ],
    },
    {
      id: "GS202454321",
      date: "August 10, 2026",
      total: "₹999",
      status: "Processing",
      items: [
        { name: "Vitamin C Brightening Serum", quantity: 1, price: "₹999" },
      ],
      tracking: null,
      address: {
        name: "Ritesh Malik",
        address: "123 Beauty Lane, Bandra",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400050",
        country: "India",
      },
      estimatedDelivery: "August 23, 2026",
      timeline: [
        { date: "Aug 10, 2026", time: "03:20 PM", status: "Order Placed", icon: <Package className="w-5 h-5" /> },
        { date: "Aug 10, 2026", time: "04:00 PM", status: "Processing", icon: <Clock className="w-5 h-5" /> },
      ],
    },
    {
      id: "GS202413579",
      date: "August 5, 2026",
      total: "₹3,298",
      status: "Delivered",
      items: [
        { name: "Glow Set (5 products)", quantity: 1, price: "₹2,499" },
        { name: "SPF 50+ Refill", quantity: 1, price: "₹799" },
      ],
      tracking: {
        carrier: "Bluedart",
        number: "BLU987654321",
        url: "https://track.bluedart.com/987654321",
      },
      address: {
        name: "Ritesh Malik",
        address: "123 Beauty Lane, Bandra",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400050",
        country: "India",
      },
      estimatedDelivery: "August 7, 2026",
      timeline: [
        { date: "Aug 5, 2026", time: "09:15 AM", status: "Order Placed", icon: <Package className="w-5 h-5" /> },
        { date: "Aug 5, 2026", time: "10:30 AM", status: "Processing", icon: <Clock className="w-5 h-5" /> },
        { date: "Aug 5, 2026", time: "02:00 PM", status: "Shipped", icon: <Truck className="w-5 h-5" /> },
        { date: "Aug 6, 2026", time: "11:45 AM", status: "Out for Delivery", icon: <Truck className="w-5 h-5" /> },
        { date: "Aug 6, 2026", time: "03:30 PM", status: "Delivered", icon: <CheckCircle className="w-5 h-5" /> },
      ],
    },
  ];

  // Mock fetch function
  const fetchOrder = async () => {
    if (!orderNumber) {
      setError("Please enter an order number.");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find matching order (case insensitive)
    const foundOrder = sampleOrders.find(order => 
      order.id.toLowerCase() === orderNumber.toLowerCase().trim()
    );

    if (foundOrder) {
      setOrderData(foundOrder);
      setRecentOrders(
        sampleOrders
          .filter(order => order.id !== foundOrder.id)
          .slice(0, 3)
      );
    } else {
      setError("Order not found. Please check your order number and try again.");
      setOrderData(null);
    }

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "processing":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "out for delivery":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <section className="mb-20">
          <span className="sticker bg-brand-cyan text-white text-[10px] px-4 py-1 -rotate-2 inline-flex shadow-play">
            Track Your Package
          </span>
          
          <h1 className="heading-display text-brand-text text-4xl md:text-6xl mt-4 mb-6">
            Order <span className="text-brand-magenta">Tracking</span>
          </h1>
          
          <p className="text-lg text-brand-text/70 leading-relaxed max-w-3xl mb-8">
            Enter your order number below to track your delivery status. You can find your order number in your confirmation email or in the order history section of your account.
          </p>

          {/* Track Order Form */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-cyan/20 mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-text/40" />
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number (e.g., GS202412345)"
                  className="w-full border-2 border-brand-text/15 rounded-full px-12 py-4 text-sm bg-transparent focus:outline-none focus:border-brand-cyan transition-colors"
                  required
                />
              </div>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-text/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email (optional)"
                  className="w-full border-2 border-brand-text/15 rounded-full px-12 py-4 text-sm bg-transparent focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`btn-play-solid w-full md:w-auto px-8 py-4 text-sm mt-6 transition-colors ${
                loading 
                  ? "bg-brand-cyan/50 cursor-not-allowed"
                  : "bg-brand-cyan hover:bg-brand-sky text-white"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Tracking...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4" />
                  Track Order
                </span>
              )}
            </button>

            {error && (
              <p className="text-sm text-red-600 mt-4 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                {error}
              </p>
            )}
          </form>
        </section>

        {/* Order Details */}
        {orderData && (
          <section className="mb-20">
            <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
              Order <span className="text-brand-blue">#{orderData.id}</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Order Status */}
              <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-blue/20">
                <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-6">
                  Order Status
                </h3>
                
                <div className="mb-6">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${
                    getStatusColor(orderData.status)
                  }`}>
                    {orderData.status === "Delivered" && <CheckCircle className="w-4 h-4" />}
                    {orderData.status === "Shipped" && <Truck className="w-4 h-4" />}
                    {orderData.status === "Processing" && <Clock className="w-4 h-4" />}
                    {orderData.status}
                  </span>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-brand-text/40" />
                    <div>
                      <p className="font-semibold text-brand-text">Order Date</p>
                      <p className="text-brand-text/60">{orderData.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-brand-text/40" />
                    <div>
                      <p className="font-semibold text-brand-text">Estimated Delivery</p>
                      <p className="text-brand-text/60">{orderData.estimatedDelivery}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-brand-text/40" />
                    <div>
                      <p className="font-semibold text-brand-text">Shipping To</p>
                      <p className="text-brand-text/60">{orderData.address.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-play border-4 border-brand-mint/20">
                <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-6">
                  Order Items
                </h3>

                <div className="space-y-6">
                  {orderData.items.map((item: OrderItem, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-brand-bg rounded-2xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-pink to-brand-magenta rounded-2xl flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-text text-sm">{item.name}</h4>
                        <p className="text-xs text-brand-text/50">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-brand-text">{item.price}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t-2 border-dashed border-brand-text/10 flex items-center justify-between">
                  <p className="font-semibold text-brand-text">Order Total:</p>
                  <p className="font-rounded font-extrabold text-brand-text text-xl">{orderData.total}</p>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-yellow/20 mt-8">
              <h3 className="font-rounded font-extrabold text-brand-text text-lg mb-6">
                Tracking Timeline
              </h3>

              {orderData.tracking && (
                <div className="mb-6 p-4 bg-brand-bg rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-brand-text">Carrier</p>
                      <p className="text-sm text-brand-text/60">{orderData.tracking.carrier}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-text">Tracking Number</p>
                      <p className="text-sm text-brand-text/60">{orderData.tracking.number}</p>
                    </div>
                    <a
                      href={orderData.tracking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-play-solid bg-brand-accent text-white px-4 py-2 text-xs"
                    >
                      Track on Carrier Site
                    </a>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {orderData.timeline.map((event: TimelineEvent, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${
                      index === orderData.timeline.length - 1 
                        ? "bg-brand-cyan/5 border-2 border-brand-cyan/20"
                        : "bg-brand-bg"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                      {event.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-brand-text">{event.status}</p>
                      <p className="text-xs text-brand-text/50">{event.date} • {event.time}</p>
                    </div>
                    {index < orderData.timeline.length - 1 && (
                      <div className="w-0.5 h-8 bg-brand-text/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Orders */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Recent <span className="text-brand-sky">Orders</span>
          </h2>

          {orderData ? (
            <p className="text-sm text-brand-text/60 mb-6">
              Here are some of your other recent orders. Click on any order number to track it.
            </p>
          ) : (
            <p className="text-sm text-brand-text/60 mb-6">
              Don't have your order number handy? Here are some recent orders. Click on any order number to track it.
            </p>
          )}

          <div className="space-y-4">
            {orderData 
              ? [orderData, ...recentOrders].slice(0, 3).map((order, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setOrderNumber(order.id);
                    fetchOrder();
                  }}
                  className="w-full bg-white p-6 rounded-3xl shadow-play border-4 border-brand-text/8 hover:border-brand-cyan/40 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-brand-text/40 uppercase tracking-widest mb-1">
                        Order #{order.id}
                      </p>
                      <p className="font-semibold text-brand-text">{order.date}</p>
                      <p className="text-sm text-brand-text/60">{order.items.length} item(s) • {order.total}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                      getStatusColor(order.status)
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </button>
              ))
              : sampleOrders.slice(0, 4).map((order, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setOrderNumber(order.id);
                    fetchOrder();
                  }}
                  className="w-full bg-white p-6 rounded-3xl shadow-play border-4 border-brand-text/8 hover:border-brand-cyan/40 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-brand-text/40 uppercase tracking-widest mb-1">
                        Order #{order.id}
                      </p>
                      <p className="font-semibold text-brand-text">{order.date}</p>
                      <p className="text-sm text-brand-text/60">{order.items.length} item(s) • {order.total}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                      getStatusColor(order.status)
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </section>

        {/* Help Section */}
        <section className="mb-20">
          <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-8">
            Need <span className="text-brand-magenta">Help</span>?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-pink/20">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="w-8 h-8 text-brand-pink" />
                <h3 className="font-rounded font-extrabold text-brand-text text-xl">
                  Contact Support
                </h3>
              </div>
              <p className="text-sm text-brand-text/60 leading-relaxed mb-6">
                Our support team is available Monday through Friday, 10 AM to 6 PM IST. We typically respond to emails within 24 hours.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:support@glasskin.in?subject=Order Tracking Inquiry - ${orderNumber}"
                  className="btn-play-solid bg-brand-pink text-white w-full text-center py-3 text-sm"
                >
                  support@glasskin.in
                </a>
                <a
                  href="tel:+911145678900"
                  className="btn-play-solid bg-white border-2 border-brand-text text-brand-text w-full text-center py-3 text-sm hover:bg-brand-text hover:text-brand-bg transition-colors"
                >
                  +91 11 4567 8900
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-play border-4 border-brand-cyan/20">
              <div className="flex items-center gap-4 mb-4">
                <Truck className="w-8 h-8 text-brand-cyan" />
                <h3 className="font-rounded font-extrabold text-brand-text text-xl">
                  Shipping Information
                </h3>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Free shipping on orders above ₹999 (India)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>3-7 business days delivery (India)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>7-14 business days delivery (International)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Real-time tracking available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="bg-gradient-to-r from-brand-cyan/5 to-brand-sky/5 p-12 md:p-16 rounded-3xl border-4 border-brand-cyan/20 text-center">
            <h2 className="heading-display text-brand-text text-2xl md:text-4xl mb-4">
              Still Can't <span className="text-brand-cyan">Find Your Order</span>?
            </h2>
            <p className="text-lg text-brand-text/70 leading-relaxed max-w-2xl mx-auto mb-8">
              If you're having trouble tracking your order or have any questions about your delivery, our customer support team is here to help you every step of the way.
            </p>
            <a
              href="/contact"
              className="btn-play-solid bg-brand-cyan text-white px-8 py-4 text-sm"
            >
              <Phone className="w-4 h-4 inline-block mr-2" />
              Get Help Now
            </a>
          </div>
        </section>

      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
