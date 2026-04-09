import React from 'react';
import { Shield, Zap, Globe, Github, Server, Layout, Database, CheckCircle } from 'lucide-react';

const ProjectInfo = () => {
  const features = [
    {
      title: 'Real-time Donation Tracking',
      description: 'Donors and receivers can track donations in real-time, ensuring transparency and efficient food rescue.',
      icon: <Zap className="w-6 h-6 text-yellow-500" />
    },
    {
      title: 'Donor & Receiver Dashboards',
      description: 'Dedicated dashboards for different user roles to manage donations, claims, and organization profiles.',
      icon: <Layout className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Secure Authentication',
      description: 'JWT-based authentication ensures that only verified users can interact with the platform and sensitive data.',
      icon: <Shield className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Full-Stack Performance',
      description: 'Built with React 19 and Node.js for high performance and scalability in real-world scenarios.',
      icon: <Server className="w-6 h-6 text-purple-500" />
    }
  ];

  const techStack = [
    { category: 'Frontend', tech: ['React 19', 'Vite', 'Tailwind CSS', 'Lucide React', 'Axios'] },
    { category: 'Backend', tech: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT'] },
    { category: 'Deployment', tech: ['Vercel (Frontend & Serverless Functions)', 'Render (Backend)'] },
    { category: 'Security', tech: ['Helmet', 'CORS', 'Rate Limiting', 'Bcrypt.js'] }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-500 py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">SustainaBite</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            A professional platform connecting donors, NGOs, and receivers in real-time to rescue surplus food and build sustainable communities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Project Mission */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Project Mission</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-lg text-gray-600 space-y-4">
              <p>
                SustainaBite was born from the need to address the massive food wastage problem while millions still face hunger. Our mission is to bridge the gap between food surplus and those who need it most.
              </p>
              <p>
                By providing a professional, real-time platform, we empower businesses and individuals to contribute meaningfully to their communities, reducing waste and supporting sustainable food networks.
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-xl font-bold text-green-800 mb-4">Why SustainaBite?</h3>
                 <ul className="space-y-3">
                   {['Reduces environmental impact of food waste', 'Simplifies the donation process', 'Ensures food reaches those in need quickly', 'Encourages community-driven sustainability'].map((item, index) => (
                     <li key={index} className="flex gap-2 items-start text-green-700">
                       <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-200/50 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Core Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <Database className="w-8 h-8 text-teal-600" />
            <h2 className="text-3xl font-bold text-gray-900">Technology Stack</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">{stack.category}</h3>
                <ul className="space-y-2">
                  {stack.tech.map((t, i) => (
                    <li key={i} className="text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Deployment Info */}
        <section className="rounded-3xl bg-gray-900 text-white p-10 md:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Deployment & Architecture</h2>
            <p className="text-gray-300 text-lg mb-8">
              The project is built as a modern full-stack monorepo, designed for seamless scalability and ease of deployment.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-green-400 font-bold mb-2 uppercase text-sm tracking-widest">Frontend Hosting</h4>
                <p className="text-gray-400">Deployed on Vercel with optimized static asset delivery and edge networking.</p>
              </div>
              <div>
                <h4 className="text-teal-400 font-bold mb-2 uppercase text-sm tracking-widest">Backend Infrastructure</h4>
                <p className="text-gray-400">Node.js server hosted on Render with a robust MongoDB Atlas database cluster.</p>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
               <a 
                 href="https://github.com/balkrishan376" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-full font-medium"
               >
                 <Github className="w-5 h-5" />
                 View on GitHub
               </a>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-500/20 to-transparent"></div>
        </section>
      </div>

      {/* Footer Branding */}
      <div className="border-t border-gray-100 py-10 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} SustainaBite Initiative. Built for impact.</p>
      </div>
    </div>
  );
};

export default ProjectInfo;
