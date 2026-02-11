import React, { useState, useEffect } from 'react';
import saudi1 from './assets/haidan-5cGe_80KuO8-unsplash.jpg';
import saudi2 from './assets/bornil-amin-0n_nxr0bMGw-unsplash.jpg';
import emirates1 from './assets/saim-munib-OQY3FMo10Us-unsplash.jpg';
import emirates2 from './assets/stefan-schwinghammer-d6aouQYeavc-unsplash.jpg';
import qatar2 from './assets/djonk-creative-AdZ68iA9X08-unsplash.jpg';
import qatar3 from './assets/lukas-souza-dzdoByQejXc-unsplash.jpg';
import turkishFlight from './assets/izyan-sultanali-_JBMWUAsbAY-unsplash.jpg';
import airIndiaFlight from './assets/daniel-eledut-0dvPFzubryE-unsplash.jpg';
import qantas1 from './assets/david-syphers-uSVABoyhpNo-unsplash.jpg';
import qantas2 from './assets/troy-mortier-aiJhx2KXIhU-unsplash.jpg';
import indigo2 from './assets/md-shafinur-rahman-4-MSW1OwSz4-unsplash.jpg';
import flyadealFlight from './assets/flyadeal-YQdbb8sF274-unsplash.jpg';
import iberiaFlight from './assets/miguel-angel-sanz-S_Vo-umb6yM-unsplash.jpg';
import makkahKaaba from './assets/hushaan-fromtinyisles-EWtprB5HAL0-unsplash.jpg';
import madinahNabawi from './assets/sulthan-auliya-rzzS0_pMsD0-unsplash.jpg';
import dubaiSkyline from './assets/karen-dalton-nk7rQ24o0v8-unsplash.jpg';
import dohaSkyline from './assets/kenny-rsMfEFFrgqc-unsplash.jpg';
import wingView1 from './assets/shot-by-joe-MFwttEM3ThU-unsplash.jpg';
import wingView2 from './assets/vaibhav-arate-AxmvmOryb3A-unsplash.jpg';

// Reusing for grid
import dubaiBurj from './assets/mohamed-reshad-VQFcO52GIhc-unsplash.jpg';
import dohaSkylineGrid from './assets/jaseel-mohammed-BXlyUTTnMK8-unsplash.jpg';
import dubaiSkylineGrid from './assets/ishan-seefromthesky-Iqk8OFDJWnk-unsplash.jpg';
import burjAlArab from './assets/darcey-beau-vtK31JoeAFk-unsplash.jpg';


/**
 * AL-Hind Tour & Travels - Refined Premium Design
 * Improvements: Fixed broken images, Serif typography, and polished aesthetics.
 */

const HERO_IMAGES = [
  { url: emirates1, title: "Emirates Experience", subtitle: "Fly better with the world's most awarded international airline." },
  { url: saudi1, title: "Saudi Arabian Airlines", subtitle: "Luxury travel redefined with the Kingdom's pride." },
  { url: madinahNabawi, title: "Majestic Madinah", subtitle: "Peaceful pilgrimages and comfortable stays in the holy city." },
  { url: airIndiaFlight, title: "Air India", subtitle: "Experience the legendary Maharaja hospitality across the globe." },
  { url: turkishFlight, title: "Turkish Airlines", subtitle: "Widen your world with flights to more countries than any other." },
  { url: qantas1, title: "Qantas Spirit", subtitle: "The spirit of Australia soaring high across continents." },
  { url: flyadealFlight, title: "Flyadeal Efficiency", subtitle: "Modern, young fleet offering the best value in the skies." },
  { url: dubaiSkyline, title: "Vibrant Dubai", subtitle: "Explore the futuristic skyline and heartbeat of luxury." },
  { url: dohaSkyline, title: "Modern Doha", subtitle: "Where tradition meets modern innovation in the heart of Qatar." },
  { url: saudi2, title: "Global Reach", subtitle: "Connecting cultures and continents with elite flight services." },
  { url: emirates2, title: "Elite Comfort", subtitle: "Unmatched service and entertainment in every cabin." },
  { url: qatar2, title: "Five-Star Service", subtitle: "Sophisticated travel tailored for the discerning global citizen." },
  { url: iberiaFlight, title: "Iberia Elegance", subtitle: "European flair and premium connections to the Americas." },
  { url: wingView1, title: "Breathtaking Vistas", subtitle: "The world looks different from above. Enjoy the journey." },
  { url: indigo2, title: "Reliable Travel", subtitle: "India's preferred airline for business and leisure." },
  { url: qantas2, title: "Adventure Awaits", subtitle: "Your gateway to the vast wonders of the Pacific and beyond." },
  { url: qatar3, title: "Precision & Poise", subtitle: "Excellence in every detail of your flight experience." },
  { url: wingView2, title: "Pure Serenity", subtitle: "Peaceful moments above the clouds, curated by AL-Hind." }
];

const DESTINATIONS = [
  { name: "Makkah", image: makkahKaaba },
  { name: "Madina", image: madinahNabawi },
  { name: "Dubai", image: burjAlArab },
  { name: "Qatar", image: dohaSkylineGrid },
  { name: "Abu Dhabi", image: dubaiSkylineGrid },
  { name: "Global Hubs", image: turkishFlight }
];

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [view, setView] = useState<'home' | 'privacy'>('home');

  useEffect(() => {
    let loadedCount = 0;
    // Prioritize Destinations first to ensure they are ready before scroll
    const criticalImages = DESTINATIONS.map(img => img.image);
    const otherImages = HERO_IMAGES.map(img => img.url);
    const allImages = [...criticalImages, ...otherImages];
    const uniqueImages = Array.from(new Set(allImages));
    const totalImages = uniqueImages.length;

    const preloadImage = async (url: string) => {
      try {
        const img = new Image();
        img.src = url;
        // Aggressive decoding: wait for the browser to actually decompress the image
        await img.decode();
        return true;
      } catch (err) {
        console.warn("Image pre-decode issue (retrying with basic load):", url);
        // Fallback to basic load if decode fails
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      } finally {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / totalImages) * 100));
      }
    };

    // Sequential priority: Critical first, then others, but we wait for all to be safe
    const executePreload = async () => {
      // Step 1: High priority decode for destinations
      await Promise.all(criticalImages.map(preloadImage));

      // Step 2: Decode the rest
      await Promise.all(uniqueImages.filter(url => !criticalImages.includes(url)).map(preloadImage));

      // Step 3: Final buffer to allow browser to commit decoded frames to GPU memory
      setTimeout(() => setIsLoading(false), 1500);
    };

    executePreload();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isLoading]);

  if (view === 'privacy') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-100 selection:text-amber-900">
        <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-blue-950 leading-none">AL-Hind</h1>
                <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-slate-500">Tour & Travels</p>
              </div>
            </div>
            <button
              onClick={() => setView('home')}
              className="text-xs font-bold text-slate-600 uppercase tracking-widest hover:text-amber-600 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </nav>

        <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-display italic mb-10 text-center">Privacy Policy</h2>
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h3 className="text-xl font-bold text-blue-950 mb-4">1. Introduction</h3>
                <p>Welcome to AL-HIND Tour & Travels. We value your privacy and are committed to protecting your personal data in compliance with the **Information Technology Act, 2000** and the **Digital Personal Data Protection (DPDP) Act, 2023** of India.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-blue-950 mb-4">2. Collection of Information</h3>
                <p>We collect personal information necessary to facilitate your travel, including:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Full Name, Gender, and Date of Birth</li>
                  <li>Contact Details (Phone number, Email, Address)</li>
                  <li>Official Identity Documents (Passport details, Aadhaar/Voter ID for domestic rail)</li>
                  <li>Financial Information (Payment details processed through secure gateways)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-blue-950 mb-4">3. Use of Information</h3>
                <p>Your data is used solely for:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Processing flight and rail bookings</li>
                  <li>Facilitating Visa stamping and Umrah/Haj processing</li>
                  <li>Complying with mandatory government reporting requirements</li>
                  <li>Sending travel-related notifications and updates</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-blue-950 mb-4">4. Data Sharing and Disclosure</h3>
                <p>As a travel agency, we must share your data with third parties to fulfill our services:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Airlines and Railway authorities for ticketing</li>
                  <li>Embassies, Consulates, and Visa processing centers</li>
                  <li>Authorized payment gateways and financial institutions</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-blue-950 mb-4">5. Data Security</h3>
                <p>We implement strict technical and organizational measures to protect your sensitive personal data as per Rule 8 of the SPDI Rules under the IT Act. Your data is stored on secure servers and access is limited to authorized personnel only.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-blue-950 mb-4">6. Your Rights</h3>
                <p>Under the DPDP Act 2023, you have the right to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Access and correct your personal information</li>
                  <li>Withdraw consent for data processing (subject to service conditions)</li>
                  <li>Lodge a complaint with our Grievance Officer</li>
                </ul>
              </section>

              <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-blue-950 mb-4">Grievance Redressal</h3>
                <p className="mb-4">In accordance with the IT Act and DPDP Act, the name and contact details of the Grievance Officer are provided below:</p>
                <div className="font-bold text-slate-900">
                  <p>Attn: Mr. Abid Husain</p>
                  <p>AL-HIND Tour & Travels</p>
                  <p>Email: alhindtravels161@gmail.com</p>
                  <p>Phone: +91 96905 51220</p>
                </div>
              </section>
            </div>

            <div className="mt-16 pt-10 border-t border-slate-100 text-center">
              <button
                onClick={() => {
                  setView('home');
                  window.scrollTo(0, 0);
                }}
                className="bg-blue-950 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg"
              >
                Accept & Return to Home
              </button>
            </div>
          </div>
        </main>

        <footer className="bg-slate-900 py-10 text-white text-center text-xs tracking-widest uppercase opacity-50">
          © AL-HIND Tour & Travels. All Rights Reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900 font-sans">

      {/* Premium Loading Screen */}
      <div className={`fixed inset-0 z-[100] bg-blue-950 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="relative mb-8 transform transition-transform duration-1000 hover:scale-105">
          <img src="/logo.png" alt="AL-Hind Logo" className="w-24 h-24 object-contain rounded-2xl shadow-2xl border border-white/10" />
          <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-2xl animate-pulse"></div>
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-display italic text-white tracking-widest uppercase">AL-HIND</h2>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            ></div>
          </div>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold">Preparing Your Journey... {loadProgress}%</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="AL-Hind Logo" className="w-12 h-12 object-contain rounded-lg shadow-sm" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-blue-950 leading-none">AL-Hind</h1>
              <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-slate-500">Tour & Travels</p>
            </div>
          </div>
          <div className="hidden md:flex gap-10 items-center text-xs font-bold text-slate-600 uppercase tracking-widest">
            <a href="#hero" className="hover:text-amber-600 transition-colors">Home</a>
            <a href="#services" className="hover:text-amber-600 transition-colors">Services</a>
            <a href="#destinations" className="hover:text-amber-600 transition-colors">Destinations</a>
            <a href="#contact" className="px-6 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition-all font-sans text-sm tracking-normal">Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-[100vh] w-full overflow-hidden">
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70 z-10" />
            <img
              src={img.url}
              alt={img.title}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-[12s] ease-linear"
              style={{ transform: idx === currentSlide ? 'scale(1)' : 'scale(1.15)' }}
            />
          </div>
        ))}

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="text-amber-400 font-black tracking-[0.5em] uppercase mb-6 text-sm opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">Experience Excellence</span>
          <h2 className="text-5xl md:text-8xl font-display text-white font-bold mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] drop-shadow-2xl italic">
            AL-Hind Tour & Travels
          </h2>
          <p className="text-xl md:text-2xl text-slate-100 max-w-3xl font-light opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] leading-relaxed">
            {HERO_IMAGES[currentSlide].subtitle}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-5 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
            <a href="#services" className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-5 rounded-full font-bold shadow-xl shadow-amber-500/30 transition-all transform hover:-translate-y-1">Explore Services</a>
            <a href="#contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/30 px-10 py-5 rounded-full font-bold transition-all">Get in Touch</a>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentSlide ? 'w-16 bg-amber-400' : 'w-3 bg-white/40 hover:bg-white'}`}
            />
          ))}
        </div>
      </section>

      {/* 24/7 Availability Marquee */}
      <div className="bg-blue-950 py-5 overflow-hidden relative shadow-inner">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] gap-16 items-center">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 text-white/90 font-bold uppercase tracking-[0.2em] text-[10px]">
              <span className="w-2 rounded-full h-2 bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
              24×7 Global Service • Fast Visa Processing • Trusted Travel Partner
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-blue-900 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Our Expertise</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-display italic">Elite Travel Solutions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Flight Tickets */}
            <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all group relative overflow-hidden cursor-default">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-900 mb-8 group-hover:scale-110 group-hover:bg-blue-900 group-hover:text-white transition-all duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </div>
              <h4 className="text-2xl font-bold font-display mb-4">Flight Tickets</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Connecting you to every major airline worldwide with exclusive group rates.</p>
              <ul className="text-slate-600 text-xs font-bold space-y-3">
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-900"></span> International & Domestic</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-900"></span> Corporate Booking</li>
              </ul>
            </div>

            {/* Visa Services */}
            <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-amber-500/5 transition-all group relative overflow-hidden cursor-default">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-8 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
              <h4 className="text-2xl font-bold font-display mb-4">Visa Experts</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Expert consultation for tourist, business, and family visit visas globally.</p>
              <ul className="text-slate-600 text-xs font-bold space-y-3">
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-amber-500"></span> Rapid Stamping</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-amber-500"></span> 99% Success Rate</li>
              </ul>
            </div>

            {/* Umrah Services */}
            <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-emerald-500/5 transition-all group relative overflow-hidden cursor-default">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 mb-8 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              </div>
              <h4 className="text-2xl font-bold font-display mb-4">Holy Journeys</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Complete end-to-end management for Umrah and Haj with premium stays.</p>
              <ul className="text-slate-600 text-xs font-bold space-y-3">
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-600"></span> Near-Haram Hotels</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-600"></span> Luxury Transits</li>
              </ul>
            </div>

            {/* Train Ticket Booking */}
            <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-purple-500/5 transition-all group relative overflow-hidden cursor-default">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700 mb-8 group-hover:scale-110 group-hover:bg-purple-700 group-hover:text-white transition-all duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h1m-4 0a1 1 0 001 1h1m-5 1v2A1 1 0 005 20h14a1 1 0 001-1v-2"></path></svg>
              </div>
              <h4 className="text-2xl font-bold font-display mb-4">Rail Travel</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Instant domestic IRCTC booking and international rail pass services.</p>
              <ul className="text-slate-600 text-xs font-bold space-y-3">
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-purple-700"></span> IRCTC Authorized</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-purple-700"></span> Global Rail Passes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner with Visual Background */}
      <section className="py-28 bg-blue-900 relative overflow-hidden border-y border-white/10">
        <div className="absolute inset-0 opacity-40">
          <img src={dubaiSkyline} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight italic">Your Gateway to Global Adventures</h2>
              <p className="text-blue-100 text-lg mb-10 leading-relaxed font-light">
                Whether you're soaring through the skies or enjoying a scenic rail journey, AL-Hind Tour & Travels guarantees a hassle-free experience. Our decade-long expertise ensures you get the best value and absolute comfort.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl border border-white/20 text-white font-bold backdrop-blur-md">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  Verified Partners
                </div>
                <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl border border-white/20 text-white font-bold backdrop-blur-md">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  Instant Support
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img src={saudi2} className="rounded-2xl shadow-2xl h-64 w-full object-cover transform hover:scale-[1.02] transition-transform duration-500 border-2 border-white/10" alt="Flight" />
                <img src={dubaiBurj} className="rounded-2xl shadow-2xl h-48 w-full object-cover transform hover:scale-[1.02] transition-transform duration-500 border-2 border-white/10" alt="Dubai" />
              </div>
              <div className="space-y-4">
                <img src={emirates2} className="rounded-2xl shadow-2xl h-48 w-full object-cover transform hover:scale-[1.02] transition-transform duration-500 border-2 border-white/10" alt="Train" />
                <img src={madinahNabawi} className="rounded-2xl shadow-2xl h-64 w-full object-cover transform hover:scale-[1.02] transition-transform duration-500 border-2 border-white/10" alt="Madina" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h3 className="text-blue-900 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Discover</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-display italic">Popular Destinations</h2>
            </div>
            <p className="text-slate-500 max-w-sm font-medium text-sm leading-relaxed">Explore iconic cities and spiritual hubs with our customized travel plans, crafted for your ultimate comfort.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {DESTINATIONS.map((dest, i) => (
              <div key={i} className="group relative h-96 overflow-hidden rounded-[2.5rem] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700 bg-slate-200">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="eager"
                  decoding="async"
                  // @ts-ignore
                  fetchPriority="high"
                  className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent flex items-end p-8">
                  <h5 className="text-white font-bold text-xl tracking-tight font-display italic group-hover:translate-x-1 transition-transform">{dest.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Leadership Spotlight */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:px-12 md:py-20 shadow-3xl relative overflow-hidden border border-white/5">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
              <div className="flex-1">
                <h3 className="text-amber-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6">Leadership</h3>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-2 mb-8">
                  <h4 className="text-3xl md:text-5xl font-bold text-white font-display italic whitespace-nowrap">Mr. Abid Husain</h4>
                  <span className="hidden md:block h-8 w-px bg-white/20"></span>
                  <h4 className="text-3xl md:text-5xl font-bold text-white font-display italic whitespace-nowrap">Mr. Mohd. Ghalib</h4>
                </div>
                <p className="text-slate-400 mb-10 text-lg italic font-light leading-relaxed max-w-2xl">
                  "At AL-Hind, we don't just sell tickets; we fulfill travel dreams. Trust, speed, and reliability are the pillars that have made us a preferred choice for thousands of travelers since 2012."
                </p>
                <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-3 w-full">
                  <a href="tel:+919690551220" className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 px-8 py-5 rounded-2xl text-white transition-all border border-white/10 font-sans whitespace-nowrap hover:scale-[1.02] shadow-xl min-w-[210px]">
                    <span className="font-bold text-lg tracking-wide">+91 96905 51220</span>
                  </a>
                  <a href="tel:+919760737007" className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 px-8 py-5 rounded-2xl text-white transition-all border border-white/10 font-sans whitespace-nowrap hover:scale-[1.02] shadow-xl min-w-[210px]">
                    <span className="font-bold text-lg tracking-wide">+91 97607 37007</span>
                  </a>
                  <a href="mailto:alhindtravels161@gmail.com" className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 px-6 py-5 rounded-2xl text-white transition-all border border-white/10 font-sans whitespace-nowrap hover:scale-[1.02] shadow-xl">
                    <span className="font-bold text-sm tracking-widest">alhindtravels161@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white pt-28 pb-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <img src="/logo.png" alt="AL-Hind Logo" className="w-10 h-10 object-contain rounded-lg" />
                <div>
                  <h4 className="text-xl font-bold tracking-tight text-blue-950 leading-none">AL-Hind</h4>
                  <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-slate-500">Tour & Travels</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Redefining global travel since 2012. Specializing in flights, rail, and professional visa consultation services.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-950 hover:text-white transition-all cursor-pointer">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-black text-slate-900 mb-8 uppercase tracking-[0.2em] text-[10px]">Quick Links</h5>
              <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <li><a href="#hero" className="hover:text-blue-900">Home</a></li>
                <li><a href="#services" className="hover:text-blue-900">Our Services</a></li>
                <li><a href="#destinations" className="hover:text-blue-900">Destinations</a></li>
                <li><a href="#" className="hover:text-blue-900">About Us</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-slate-900 mb-8 uppercase tracking-[0.2em] text-[10px]">What We Do</h5>
              <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <li className="hover:text-blue-900 cursor-default">Flight Ticketing</li>
                <li className="hover:text-blue-900 cursor-default">Visa Consultation</li>
                <li className="hover:text-blue-900 cursor-default">Umrah Packages</li>
                <li className="hover:text-blue-900 cursor-default">Rail Reservations</li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-slate-900 mb-8 uppercase tracking-[0.2em] text-[10px]">Contact</h5>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex-shrink-0 flex items-center justify-center text-blue-900">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mb-1">Office</p>
                    <p className="text-sm font-bold text-slate-700">Taj Market Bus Stand Road Deoband-247554, Uttar Pradesh</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex-shrink-0 flex items-center justify-center text-amber-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mb-1">Direct</p>
                    <p className="text-sm font-black text-slate-950 font-sans">+91 96905 51220</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© AL-HIND Tour & Travels. All Rights Reserved.</p>
            <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <button
                onClick={() => {
                  setView('privacy');
                  window.scrollTo(0, 0);
                }}
                className="hover:text-blue-900 transition-colors"
              >
                Privacy Policy
              </button>
              <a href="#" className="hover:text-blue-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles for marquee and fadeIn */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
      {/* Hidden Preload Container to force browser decoding */}
      <div className="fixed -z-50 opacity-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
        {DESTINATIONS.map((item, idx) => (
          <img
            key={`dest-${idx}`}
            src={item.image}
            loading="eager"
            decoding="async"
            // @ts-ignore
            fetchPriority="high"
            alt="preload"
          />
        ))}
        {HERO_IMAGES.map((item, idx) => (
          <img
            key={`hero-${idx}`}
            src={item.url}
            loading="eager"
            decoding="async"
            alt="preload"
          />
        ))}
      </div>
    </div>
  );
};

export default App;
