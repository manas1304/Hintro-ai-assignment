"use client";
import Link from "next/link";

export default function LandingPage() {
  
  // Smooth scroll helper function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 scroll-smooth font-montserrat">
      {/* 1. Enhanced Blue Navbar */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-[#0052CC] shadow-lg border-b border-blue-400/30 backdrop-blur-md">
        <div className="flex items-center gap-8 max-w-7xl mx-auto w-full">
          
          {/* Logo - White text on Blue background */}
          <h1 
            className="text-2xl font-bold text-white flex items-center gap-2 mr-auto cursor-pointer group"
          >
            <span className="bg-white text-[#0052CC] px-2 py-0.5 rounded group-hover:bg-blue-50 transition-colors">T</span> 
            TaskFlow
          </h1>
          
          {/* Navigation Links - Light Blue/White */}
          <div className="hidden md:flex gap-10 text-lg font-bold text-blue-100/90 tracking-wide uppercase">
            <button 
              onClick={() => scrollToSection('features')} 
              className="hover:text-white transition-all hover:scale-105"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="hover:text-white transition-all hover:scale-105"
            >
              How It Works
            </button>
          </div>

          {/* Action Buttons - Adjusted to stand out against Blue bg */}
          <div className="flex items-center gap-6 ml-auto">
            <Link 
              href="/login" 
              className="text-white hover:text-blue-200 font-bold text-lg transition-colors"
            >
              Log in
            </Link>
            
            {/* The primary CTA is now White with Blue text so it pops out from the blue bar */}
            <Link 
              href="/signup" 
              className="bg-white text-[#0052CC] px-6 py-2.5 rounded-lg text-lg font-extrabold hover:bg-blue-50 transition-all shadow-md hover:shadow-blue-900/20 active:scale-95"
            >
              Get TaskFlow for free
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Enhanced Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-24 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">🚀 Now with Real-time Collaboration</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.1] text-[#091E42] tracking-tight">
            Collect, structure, & execute goals <span className="text-[#0065FF]">seamlessly.</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
            Leave the mess behind—amplify your efficiency with TaskFlow, 
            the all-in-one platform designed for high-performing teams.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/signup" className="w-full sm:w-auto text-center bg-[#0065FF] text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 active:scale-95">
              Get Started for Free
            </Link>
            <button onClick={() => scrollToSection('how-it-works')} className="w-full sm:w-auto text-center px-8 py-4 rounded-xl text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              How it works →
            </button>
          </div>

        </div>

        {/* Right Side: Visual Layering */}
        <div className="relative flex justify-center animate-in fade-in zoom-in duration-1000">
          {/* Main Background Blob */}
          <div className="absolute inset-0 bg-blue-400/10 blur-3xl rounded-full transform -rotate-12 scale-110" />
          
          <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-[2.5rem] w-full h-[400px] flex items-center justify-center border border-white shadow-2xl overflow-hidden">
             
             {/* Central "Active" Card */}
             <div className="z-20 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 w-72 transform -rotate-2 hover:rotate-0 transition-transform duration-500 cursor-default">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded uppercase">In Review</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Q1 Project Roadmap</h4>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">Finalize the landing page assets and prepare for internship submission.</p>
                <div className="flex items-center justify-between border-t pt-3">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[8px] text-white">M</div>
                    <div className="w-6 h-6 rounded-full bg-gray-300" />
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">Feb 16</span>
                </div>
             </div>

             {/* Floating Badges */}
             <div className="absolute top-20 right-10 z-30 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg -rotate-12 text-sm font-bold text-green-600 border border-green-50 animate-bounce">
               ✅ Done
             </div>
             
             <div className="absolute bottom-20 left-10 z-30 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg rotate-12 text-sm font-bold text-blue-600 border border-blue-50">
               ⏳ Pending
             </div>

             {/* Background Grid Pattern */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '20px 20px' }} 
             />
          </div>
        </div>
      </main>

      {/* 3. Features Section - Vertical Card UI */}
      <section id="features" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-extrabold text-[#091E42] mb-4">Our Features</h2>
            <div className="h-1.5 w-20 bg-[#0065FF] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            {/* Feature 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-blue-400 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 transition-all duration-300">
                <span className="transition-all">📋</span>
              </div>
              <h3 className="font-bold text-xl text-[#091E42] mb-3">Task Boards</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Organize your tasks easily with our intuitive drag-and-drop interface inspired by modern workflows.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-blue-400 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 transition-all duration-300">
                <span className="transition-all">⏰</span>
              </div>
              <h3 className="font-bold text-xl text-[#091E42] mb-3">Activity Logs</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Track every change made to a board, from card movements to title updates, ensuring team transparency.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-blue-400 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 transition-all duration-300">
                <span className="transition-all">🤝</span>
              </div>
              <h3 className="font-bold text-xl text-[#091E42] mb-3">Collaboration</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Invite members and work together seamlessly in real-time with activity logs and shared workspaces.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-blue-400 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 transition-all duration-300">
                <span className="transition-all">⚙️</span>
              </div>
              <h3 className="font-bold text-xl text-[#091E42] mb-3">Customization</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Add rich descriptions, custom labels, and checklists to any task card to capture every project detail.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. How It Works - Improved Timeline UI */}
      <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-20">
            <h2 className="text-4xl font-extrabold text-[#091E42] mb-4">How It Works</h2>
            <div className="h-1.5 w-20 bg-[#0065FF] mx-auto rounded-full" />
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
            {/* Background Connector Line (Visible on Desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-blue-100 -z-0" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center flex-1 group">
              <div className="w-24 h-24 bg-white border-4 border-blue-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-xl group-hover:border-[#0065FF] group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:animate-bounce">💻</span>
              </div>
              <h3 className="font-bold text-xl text-[#091E42] mb-2 font-montserrat">1. Create Project</h3>
              <p className="text-gray-500 max-w-[200px] leading-relaxed">
                Initialize your workspace and define your project goals in seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center flex-1 group">
              <div className="w-24 h-24 bg-white border-4 border-blue-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-xl group-hover:border-[#0065FF] group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:animate-bounce">📝</span>
              </div>
              <h3 className="font-bold text-xl text-[#091E42] mb-2 font-montserrat">2. Add Tasks</h3>
              <p className="text-gray-500 max-w-[200px] leading-relaxed">
                Break down work into manageable cards and organize them into custom lists.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center flex-1 group">
              <div className="w-24 h-24 bg-white border-4 border-blue-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-xl group-hover:border-[#0065FF] group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:animate-bounce">📈</span>
              </div>
              <h3 className="font-bold text-xl text-[#091E42] mb-2 font-montserrat">3. Track Progress</h3>
              <p className="text-gray-500 max-w-[200px] leading-relaxed">
                Monitor movement in real-time and celebrate your team's completion milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-10 bg-gray-50 text-gray-400 text-xs border-t border-gray-100">
        © 2026 TaskFlow - All Rights Reserved.
      </footer>
    </div>
  );
}