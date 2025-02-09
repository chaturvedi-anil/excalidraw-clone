import React from 'react';
import { 
  FiPenTool as Pen, 
  FiShare2 as Share2, 
  FiUsers as Users, 
  FiLock as Lock, 
  FiChevronDown as ChevronDown, 
  FiGithub as Github, 
  FiTwitter as Twitter, 
  FiLinkedin as Linkedin 
} from "react-icons/fi";

import Link from 'next/link';

const Page =() => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Pen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">DrawFlow</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href={"/signin"} target='_blank'> 
                <button className="px-4 py-2 text-gray-600 outline outline-1 outline-blue-700 rounded-lg hover:text-gray-900">Sign In</button> 
              </Link>
              <Link href={"/signup"} target='_blank'>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Sign Up Free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Collaborate and Create<br />Beautiful Diagrams Together
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The simplest way to create and share diagrams. No sign-up required. Start drawing instantly with our intuitive whiteboard.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg">
              Start Drawing
            </button>
            <button className="px-8 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition text-lg text-black">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Why Choose DrawFlow?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <Share2 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-black">Real-time Collaboration</h3>
              <p className="text-gray-600">Work together with your team in real-time. See changes instantly as they happen.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-black">Team Friendly</h3>
              <p className="text-gray-600">Perfect for teams of any size. Share and organize your diagrams effortlessly.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <Lock className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-black">Secure by Default</h3>
              <p className="text-gray-600">Your diagrams are encrypted and secure. Control who can view and edit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Loved by Thousands</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">"The best whiteboarding tool I've ever used. Simple yet powerful."</p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="User"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-3">
                  <p className=" text-black">John Doe</p>
                  <p className="text-sm text-gray-500">Product Designer</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">"Perfect for remote collaboration. We use it daily in our team."</p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="User"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-black">Jane Smith</p>
                  <p className="text-sm text-gray-500">Team Lead</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">"The intuitive interface makes it easy to create professional diagrams."</p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="User"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-black">Mike Johnson</p>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Is DrawFlow free to use?",
                a: "Yes, DrawFlow is free for basic use. We also offer premium features for teams and businesses."
              },
              {
                q: "Can I collaborate with others in real-time?",
                a: "Absolutely! Multiple users can work on the same diagram simultaneously."
              },
              {
                q: "Do I need to create an account?",
                a: "No account is required to start drawing. However, creating an account lets you save and organize your work."
              },
              {
                q: "Can I export my diagrams?",
                a: "Yes, you can export your diagrams in various formats including PNG, SVG, and PDF."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <button className="flex justify-between items-center w-full text-left">
                  <span className="text-black font-semibold">{faq.q}</span>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </button>
                <p className="mt-2 text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Pen className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-white">DrawFlow</span>
              </div>
              <p className="mt-4">Making collaboration visual and effortless.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Use Cases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white"><Github className="h-6 w-6" /></a>
                <a href="#" className="hover:text-white"><Twitter className="h-6 w-6" /></a>
                <a href="#" className="hover:text-white"><Linkedin className="h-6 w-6" /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} DrawFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Page;