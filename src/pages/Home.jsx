import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  Heart,
  Recycle,
  ShieldCheck,
  Mail,
  Send,
  Users,
  Globe,
  Target,
  Sparkles,
  Clock3,
  BellRing,
  BadgeCheck,
  ChevronRight,
  PhoneCall,
  Lock,
  Leaf,
  Zap,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowUpRight,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span>{count}{suffix}</span>;
};

// Floating Particles Background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-green-400/20 to-teal-400/20 blur-xl animate-float"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        />
      ))}
    </div>
  );
};

// Slide Carousel with Hover Navigation
const SlideCarousel = ({ images = ['/about1.png', '/about2.png', '/about3.png'], title = 'Preview' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div 
      className="relative w-full h-[420px] rounded-[28px] overflow-hidden shadow-2xl group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Main Image Display */}
      <div className="relative w-full h-full bg-gray-200">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out"
            style={{
              opacity: idx === currentIndex ? 1 : 0,
              pointerEvents: idx === currentIndex ? 'auto' : 'none',
            }}
          >
            <img 
              src={img} 
              className="w-full h-full object-cover" 
              alt={`${title} slide ${idx + 1}`}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=420&fit=crop&q=80';
              }}
            />
          </div>
        ))}
      </div>

      {/* Hover Navigation Buttons */}
      <button
        onClick={goToPrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 z-10 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        ←
      </button>

      <button
        onClick={goToNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 z-10 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        →
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white/50 w-2 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Title Badge */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium z-10">
        {title}
      </div>
    </div>
  );
};

// About Section Images - Community Impact & Helping Needy People
// About Section Images - NGO Helping Needy People (8 Impact Scenarios)
const aboutImages = [
  'https://images.unsplash.com/photo-1644822861306-55353baefb98?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Food distribution to poor/slum area
  'https://images.unsplash.com/photo-1628717341663-0007b0ee2597?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Volunteer helping elderly homeless with warmth
  'https://plus.unsplash.com/premium_photo-1681492095021-4d5182c0c66a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // NGO volunteers with underprivileged children education
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Medical/health camp rural area
  'https://images.unsplash.com/photo-1680778469882-a186a77e67d3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Women empowerment & skill training
  'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Close-up hands giving donation/help
  'https://images.unsplash.com/photo-1503454537688-e6c437b1eba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Hopeful group children smiling with happiness
];

const trustPoints = [
  { text: 'Verified donors and receivers', icon: BadgeCheck },
  { text: 'Fast geo-matched alerts', icon: Zap },
  { text: 'Secure contact exchange', icon: Lock },
];

const impactStats = [
  { value: 10000, suffix: '+', label: 'Meals Rescued', icon: Heart, color: 'from-red-500 to-pink-500' },
  { value: 50, suffix: '+', label: 'Active NGOs', icon: Users, color: 'from-blue-500 to-cyan-500' },
  { value: 24, suffix: '/7', label: 'Real-Time Matching', icon: Clock3, color: 'from-green-500 to-emerald-500' },
  { value: 100, suffix: '%', label: 'Free to Use', icon: Award, color: 'from-purple-500 to-pink-500' },
];

const featureCards = [
  {
    icon: Recycle,
    title: 'Smart Donation Posting',
    text: 'Donors can quickly post food, clothes, or essentials with pickup details, images, and safe expiry timing.',
    accent: 'from-green-500 to-emerald-400',
    bg: 'bg-green-50',
  },
  {
    icon: BellRing,
    title: 'Instant NGO Alerts',
    text: 'Nearby receivers get fast notifications, reducing delay and improving the chance of successful rescue.',
    accent: 'from-blue-500 to-cyan-400',
    bg: 'bg-blue-50',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Reliable Flow',
    text: 'Role-based access, verified dashboards, protected profile updates, and controlled claim handling improve trust.',
    accent: 'from-teal-500 to-green-400',
    bg: 'bg-teal-50',
  },
];

const processSteps = [
  {
    icon: Sparkles,
    title: '1. Share Surplus',
    text: 'Restaurants, homes, and organizations upload available items with details and pickup instructions.',
  },
  {
    icon: MapPin,
    title: '2. Match Nearby',
    text: 'Our location-aware system highlights nearby donations for receivers and volunteers.',
  },
  {
    icon: Clock3,
    title: '3. Claim Quickly',
    text: 'Receivers review the details, check pickup location, and claim the donation before it expires.',
  },
  {
    icon: BadgeCheck,
    title: '4. Deliver Impact',
    text: 'Safe handover reduces food wastage and supports communities with transparency and speed.',
  },
];

const securityHighlights = [
  {
    icon: Lock,
    title: 'Protected Access',
    text: 'Role-based routes and authenticated dashboards keep donor and receiver data secure.',
  },
  {
    icon: PhoneCall,
    title: 'Reliable Coordination',
    text: 'Clean contact sharing and pickup information help receivers connect with the right donor faster.',
  },
  {
    icon: Heart,
    title: 'Trust-Centered Design',
    text: 'Professional layout, clear actions, and transparent information create confidence for all users.',
  },
];

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="bg-slate-50 flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section
        id="home"
        className="relative isolate pt-20 pb-20 sm:pt-28 sm:pb-32 lg:pt-32 lg:pb-40 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden"
      >
        <FloatingParticles />
        
        {/* Animated background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-300/30 to-emerald-400/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-300/30 to-cyan-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="animate-slideInLeft">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-green-300/60 bg-white/90 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-green-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group">
                <ShieldCheck className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
                  Secure • Professional • Community-Focused
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Rescue surplus.
                <br />
                <span className="relative inline-block mt-2">
                  <span className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 blur-2xl opacity-30 animate-pulse"></span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 animate-gradient">
                    Deliver hope.
                  </span>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed">
                SustainaBite is a professional donation platform connecting donors, NGOs, and receivers in real-time. 
                Reduce food waste, improve coordination, and create <span className="font-semibold text-green-600">measurable community impact</span>.
              </p>

              {/* Trust Points */}
              <div className="mt-8 flex flex-wrap gap-3">
                {trustPoints.map((point, idx) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-slate-200/60 px-4 py-2 text-sm text-slate-700 shadow-md hover:shadow-lg hover:border-green-300 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <Icon className="h-4 w-4 text-green-500" />
                      {point.text}
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 px-8 py-4 text-white font-bold shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 hover:-translate-y-1 transition-all duration-300 animate-pulse-glow"
                >
                  Start Donating 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 bg-white px-8 py-4 text-slate-800 font-bold hover:border-green-500 hover:text-green-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  Access Dashboard
                </Link>
              </div>

              {/* Impact Stats */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {impactStats.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group relative rounded-2xl border border-white/80 bg-white/90 backdrop-blur-md p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      <div className="relative">
                        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-md mb-2`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-slate-900">
                          <AnimatedCounter end={item.value} suffix={item.suffix} />
                        </p>
                        <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">{item.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Content - Hero Image/Visualization */}
            <div className="relative animate-slideInRight lg:ml-auto w-full max-w-lg lg:max-w-none">
              {/* Glow effect */}
              <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-green-300/40 via-emerald-300/40 to-teal-300/40 blur-3xl animate-pulse"></div>
              
              {/* Main Card */}
              <div className="relative rounded-[36px] border border-white/80 bg-white/80 backdrop-blur-xl p-6 shadow-[0_40px_120px_rgba(15,23,42,0.15)] hover:shadow-[0_60px_160px_rgba(15,23,42,0.2)] transition-all duration-500">
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="group rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-slate-300 font-medium">Live Donation Pulse</span>
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Users className="h-4 w-4 text-green-400" />
                      </div>
                    </div>
                    <p className="mt-3 text-3xl sm:text-4xl font-black">+128</p>
                    <p className="mt-1 text-xs text-slate-400">Active nearby requests</p>
                    <div className="mt-3 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse w-3/4"></div>
                    </div>
                  </div>

                  <div className="group rounded-3xl bg-gradient-to-br from-green-50 to-teal-50 p-5 border-2 border-green-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-slate-500 font-medium">Safety Layer</span>
                      <div className="h-8 w-8 rounded-full bg-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Lock className="h-4 w-4 text-teal-600" />
                      </div>
                    </div>
                    <p className="mt-3 text-xl sm:text-2xl font-bold text-slate-900">Verified ✓</p>
                    <p className="mt-1 text-xs text-slate-600">Secure coordination</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-700 font-semibold">Active Protection</span>
                    </div>
                  </div>
                </div>

                {/* Professional Value Proposition Section */}
                <div className="space-y-3">
                  <div className="group rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-4 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Target className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">Real-Time Donation Matching</h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">Rescue surplus food instantly. Connect donors with verified receivers through our geo-matched network, ensuring every food item finds a second life within hours.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-4 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Globe className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">Professional NGO Coordination</h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">Streamline logistics and reduce food waste. Our platform eliminates coordination delays, ensuring NGOs receive timely alerts and donors get real-time feedback on impact.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-4 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Heart className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">Measurable Community Impact</h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">Track every donation's journey. Visualize your contribution to fighting hunger with transparent metrics—meals rescued, lives helped, waste prevented.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="group rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-green-600" />
                      <p className="text-xs sm:text-sm font-bold text-green-700">Fast Claims</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">Quick identification & claim</p>
                  </div>
                  <div className="group rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <p className="text-xs sm:text-sm font-bold text-blue-700">Mapped</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">GPS-guided pickups</p>
                  </div>
                  <div className="group rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-amber-600" />
                      <p className="text-xs sm:text-sm font-bold text-amber-700">Pro UI</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">Seamless experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Floating */}
      <section className="py-8 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl shadow-slate-900/20 border border-slate-700/50 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden group">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 group/item">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300 border border-green-500/30">
                  <ShieldCheck className="h-7 w-7 text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Protected Platform</h3>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">Secure flows for donors, receivers, and profile-managed access.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group/item">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300 border border-cyan-500/30">
                  <BellRing className="h-7 w-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Real-Time Awareness</h3>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">Timely notifications and dashboard refreshes reduce missed opportunities.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group/item">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300 border border-emerald-500/30">
                  <Globe className="h-7 w-7 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Community Impact</h3>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">Every rescued meal helps build a more sustainable and humane local ecosystem.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-28 bg-gradient-to-b from-emerald-50/50 via-white to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="animate-slideInLeft">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100/80 border border-green-200 px-4 py-1.5 text-xs font-bold text-green-700 tracking-wide uppercase mb-4">
                <Leaf className="h-3 w-3" />
                About SustainaBite
              </div>
              
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Professional technology for a{' '}
                <span className="relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-400/30 blur-lg"></span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">safer</span>
                </span>{' '}
                and smarter donation ecosystem.
              </h2>
              
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Millions of usable meals and supplies go to waste while communities still need support. 
                SustainaBite creates a <span className="font-semibold text-green-600">streamlined, trustworthy experience</span> where 
                donations can be posted, discovered, claimed, and delivered with more confidence.
              </p>

              {/* Feature Boxes */}
              <div className="mt-10 space-y-5">
                <div className="group flex items-start gap-4 rounded-3xl border-2 border-slate-100 bg-white p-6 hover:border-green-300 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Mission-Driven System</h4>
                    <p className="mt-2 text-slate-600 leading-relaxed">We make food rescue practical through clear workflows, fast communication, and stronger donor-receiver coordination.</p>
                  </div>
                </div>
                
                <div className="group flex items-start gap-4 rounded-3xl border-2 border-slate-100 bg-white p-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Scalable Community Model</h4>
                    <p className="mt-2 text-slate-600 leading-relaxed">The platform is designed to support neighborhoods, NGOs, volunteers, restaurants, and city-wide sustainability programs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative animate-slideInRight lg:ml-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-green-200/50 via-emerald-200/50 to-teal-200/50 blur-3xl animate-pulse"></div>
              <div className="relative rounded-[36px] border-4 border-white bg-white/90 backdrop-blur-xl p-6 shadow-[0_40px_120px_rgba(15,23,42,0.15)] hover:shadow-[0_60px_160px_rgba(15,23,42,0.2)] transition-all duration-500">
                <SlideCarousel images={aboutImages} title="Community Impact" />
                
                {/* Overlay badges */}
                <div className="absolute -top-4 -right-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white px-5 py-3 shadow-xl animate-bounce">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-bold">Growing Daily</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white border-2 border-green-200 text-slate-800 px-5 py-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-bold text-green-700">100% Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Features Section */}
      <section id="services" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-green-200/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-teal-200/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100/80 border border-green-200 px-5 py-2 text-xs font-bold text-green-700 tracking-wide uppercase mb-4">
              <Sparkles className="h-3 w-3" />
              Core Features
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              Built to feel{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">modern</span>,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">reliable</span>, and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-600">efficient</span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              The platform combines secure workflows, elegant UI, and fast action paths so every donation moves from surplus to support with less delay.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {featureCards.map((card, idx) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="group relative rounded-[32px] border-2 border-slate-100 bg-white p-8 shadow-lg hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-fadeInUp"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Hover gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className="relative">
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${card.bg} shadow-md group-hover:scale-110 transition-transform duration-300 border-2 border-white`}>
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${card.accent} flex items-center justify-center shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="mt-6 text-2xl font-bold text-slate-900 group-hover:text-green-600 transition-colors duration-300">{card.title}</h3>
                  <p className="mt-4 text-slate-600 leading-relaxed">{card.text}</p>
                  
                  {/* Learn More Link */}
                  <div className="mt-8 inline-flex items-center text-sm font-bold text-green-700 group-hover:text-green-600">
                    <span className="mr-2">Learn more</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  
                  {/* Decorative corner */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-100/50 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              );
            })}
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-emerald-200 to-teal-200"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={step.title} 
                    className="group relative rounded-[28px] border-2 border-slate-100 bg-white p-8 shadow-lg hover:shadow-2xl hover:border-green-300 hover:-translate-y-2 transition-all duration-300 animate-fadeInUp"
                    style={{ animationDelay: `${(idx + 3) * 0.1}s` }}
                  >
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 -left-4 h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 z-10">
                      <span className="text-lg font-black">{idx + 1}</span>
                    </div>
                    
                    {/* Icon */}
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <h3 className="mt-2 text-lg font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.text}</p>
                    
                    {/* Arrow to next step (hidden on last) */}
                    {idx < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 text-slate-300 group-hover:text-green-500 transition-colors">
                        <ChevronRight className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="max-w-3xl animate-slideInLeft">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-5 py-2 text-xs font-bold text-emerald-300 tracking-wide uppercase mb-4">
              <ShieldCheck className="h-3 w-3" />
              Security & Trust
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              Designed to look{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">professional</span>{' '}
              and feel{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">dependable</span>.
            </h2>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              A donation platform must do more than look good. It must help users feel safe, informed, and confident while they act quickly.
            </p>
          </div>

          {/* Security Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title} 
                  className="group relative rounded-[32px] border-2 border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:bg-white/10 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300 animate-fadeInUp"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-300"></div>
                  
                  {/* Icon */}
                  <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/30 text-emerald-300 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="relative text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">{item.title}</h3>
                  <p className="relative mt-4 text-slate-300 leading-relaxed">{item.text}</p>
                  
                  {/* Decorative element */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              );
            })}
          </div>
          
          {/* Trust Badge */}
          <div className="mt-16 text-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 px-8 py-4 backdrop-blur-sm">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-emerald-300">Enterprise-Grade Security • 99.9% Uptime • GDPR Compliant</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 sm:p-12 shadow-[0_20px_80px_rgba(15,23,42,0.08)] relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 text-green-100 opacity-60">
              <Mail className="h-64 w-64 blur-sm" />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div>
                <span className="text-green-600 font-semibold tracking-[0.25em] uppercase text-xs">Contact</span>
                <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Let’s build impact together</h2>
                <p className="mt-4 text-lg text-slate-600">
                  Want to collaborate, onboard your NGO, or deploy SustainaBite in your city? Send us your message and we’ll get back to you.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="h-11 w-11 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span>Gamma 1, Greater Noida, Uttar Pradesh</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span>support@sustainabite.org</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="h-11 w-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <span>Open for donors, NGOs, volunteers, and city partnerships</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/70 bg-white p-6 shadow-lg">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea
                      required
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                      placeholder="Tell us about your interest or requirement"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-white bg-slate-900 hover:bg-green-600 transition-colors shadow-md"
                  >
                    {isSent ? 'Message Sent Successfully!' : <><Send className="h-4 w-4 mr-2" /> Send Message</>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
