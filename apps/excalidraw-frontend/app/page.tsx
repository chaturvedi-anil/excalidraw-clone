"use client";

import { Button } from "@repo/ui/button";
import { FaPenFancy, FaCloud, FaUsers, FaLock, FaLaptopCode } from "react-icons/fa";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20 font-sans bg-gray-50">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-4 px-8 bg-white shadow-md fixed top-0 left-0">
        <h1 className="text-2xl font-bold text-gray-900">Excalidraw Clone</h1>
        <div className="flex gap-4">
          <Button className="px-4 py-2 rounded-md" variant="outline">Sign In</Button>
          <Button className="px-4 py-2 rounded-md" variant="default">Sign Up</Button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="text-center mt-24 max-w-2xl">
        <h2 className="text-4xl font-extrabold text-gray-900">Collaborative Sketching, Simplified</h2>
        <p className="mt-4 text-gray-600">An open-source whiteboard tool to draw freely, brainstorm ideas, and collaborate in real-time.</p>
        <Button className="mt-6 px-6 py-3 text-lg">Get Started</Button>
      </section>

      {/* Features Section */}
      <section className="mt-16 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <FaPenFancy className="text-4xl mx-auto text-primary" />
          <h3 className="mt-4 text-lg font-semibold">Freehand Drawing</h3>
          <p className="text-gray-600">Create sketches with smooth strokes and intuitive tools.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <FaCloud className="text-4xl mx-auto text-primary" />
          <h3 className="mt-4 text-lg font-semibold">Cloud Storage</h3>
          <p className="text-gray-600">Save and access your drawings anytime, anywhere.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <FaUsers className="text-4xl mx-auto text-primary" />
          <h3 className="mt-4 text-lg font-semibold">Real-time Collaboration</h3>
          <p className="text-gray-600">Work with your team in real-time, seamlessly.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <FaLock className="text-4xl mx-auto text-primary" />
          <h3 className="mt-4 text-lg font-semibold">Secure Access</h3>
          <p className="text-gray-600">Your data is safe with top-notch security protocols.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <FaLaptopCode className="text-4xl mx-auto text-primary" />
          <h3 className="mt-4 text-lg font-semibold">Open Source</h3>
          <p className="text-gray-600">Fully customizable and extensible with open-source code.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-16 w-full max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
        <p className="mt-4 text-gray-600">Join thousands of satisfied users who love Excalidraw Clone.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <p className="text-gray-700">"This tool has completely changed how we collaborate!"</p>
            <span className="block mt-2 text-gray-500">- Jane Doe</span>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <p className="text-gray-700">"Absolutely love the real-time drawing experience."</p>
            <span className="block mt-2 text-gray-500">- John Smith</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 w-full text-center py-4 bg-gray-100 text-gray-600">
        &copy; 2024 Excalidraw Clone. All rights reserved.
      </footer>
    </div>
  );  
}
