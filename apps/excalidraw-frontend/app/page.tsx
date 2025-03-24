"use client";

import { Button } from '@repo/ui/button';
import { Pencil, Share2, Users, Sparkles, Palette, Layers, Zap, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type routerType = {
  router: ReturnType<typeof useRouter>
}
function Navbar({router} : routerType) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200/80 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
              <Pencil className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              DrawFlow
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="cursor-pointer px-5 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              onClick={() => router.push("/signin")}
            >
              Sign In
            </button>
            <Button variant='primary' size='md' onClick={() => router.push('/signup')}> Sign Up Free</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Feature({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="group flex flex-col items-center p-8 bg-white rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1 border border-gray-100">
      <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl group-hover:scale-110 transition-transform">
        <Icon className="h-7 w-7 text-indigo-600" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-4 text-base text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-50/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase">Product</h3>
            <ul className="mt-5 space-y-4">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Templates</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Enterprise</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-5 space-y-4">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-5 space-y-4">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-5 space-y-4">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 text-sm">&copy; 2024 DrawFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50">
      <Navbar router={router} />
      
      {/* Hero Section */}
      <div className="pt-40 pb-24 sm:pt-48 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center mb-8">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-sm font-semibold border border-indigo-100/50">
                ✨ Welcome
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Collaborate and Create
              <span className="block mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Beautiful Diagrams
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Create professional diagrams, wireframes, and illustrations with our intuitive drawing tool. 
              Perfect for teams, designers, and anyone who wants to bring their ideas to life.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center">
              <button 
                className="group px-8 py-4 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-lg font-medium shadow-md shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200 transition-all hover:-translate-y-0.5 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 inline-flex items-center justify-center"
                onClick={() => router.push("/signup")}
              >
                Start Drawing Now
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Button size='md' variant='secondary'> Watch Demo</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
              Everything you need to create
            </h2>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Powerful features that help you draw, design, and create faster than ever before.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <Feature 
              icon={Share2}
              title="Real-time Collaboration"
              description="Work together with your team in real-time. See changes instantly and collaborate seamlessly."
            />
            <Feature 
              icon={Palette}
              title="Smart Drawing Tools"
              description="Intelligent shape recognition, auto-alignment, and professional drawing tools at your fingertips."
            />
            <Feature 
              icon={Users}
              title="Team Workspaces"
              description="Organize your projects and share them with your team. Keep everything in one place."
            />
            <Feature 
              icon={Zap}
              title="Lightning Fast"
              description="Optimized for performance. Create and edit complex diagrams without any lag."
            />
            <Feature 
              icon={Layers}
              title="Version History"
              description="Track changes, restore previous versions, and never lose your work again."
            />
            <Feature 
              icon={Sparkles}
              title="AI-Powered Features"
              description="Let AI help you create better diagrams with smart suggestions and auto-improvements."
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;