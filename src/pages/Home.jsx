import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Mail, Phone, MapPin, Send, X, Menu, ChevronRight, Code, Cpu, Brain, LineChart, Users, BookOpen, CheckCircle2, ArrowRight, MessageSquare, MousePointer2, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { initialConfig } from '../data/initialConfig';

const QuintoEjeInnovative = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [expandedService, setExpandedService] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const canvasRef = useRef(null);

  // Cargar configuración del panel de administración
  const [config, setConfig] = useState(initialConfig);

  useEffect(() => {
    const savedConfig = localStorage.getItem('quintoEjeConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        // Validate array types to prevent crashes
        if (parsed && Array.isArray(parsed.services) && Array.isArray(parsed.projects) && Array.isArray(parsed.capacitaciones)) {
          setConfig(parsed);
        } else {
          console.warn("Invalid config schema found. Resetting.");
          localStorage.removeItem('quintoEjeConfig');
        }
      } catch (e) {
        console.error("Error loading config:", e);
        localStorage.removeItem('quintoEjeConfig');
      }
    }
  }, []);

  // Toggle expand service
  const toggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  // Toggle expand project
  const toggleProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Connect nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Icon mapping for services
  const getServiceIcon = (id) => {
    switch (Number(id)) {
      case 1: return <Brain className="w-10 h-10" />;
      case 2: return <Code className="w-10 h-10" />;
      case 3: return <Cpu className="w-10 h-10" />;
      case 4: return <LineChart className="w-10 h-10" />;
      default: return <Brain className="w-10 h-10" />;
    }
  };

  // Servicios - usar configuración del admin si existe
  const services = config?.services ? config.services.map(s => ({
    ...s,
    icon: getServiceIcon(s.id) // Restore icon
  })) : [
    {
      id: 1,
      icon: <Brain className="w-10 h-10" />,
      title: "Agentes IA",
      description: "Desarrollo de agentes inteligentes y sistemas de automatización basados en IA para optimizar procesos empresariales.",
      detailedInfo: "Desarrollamos agentes de IA personalizados que automatizan tareas complejas, aprenden de datos y mejoran continuamente. Incluye chatbots, asistentes virtuales, sistemas de recomendación y automatización de procesos de negocio.",
      color: "from-cyan-500 to-blue-600",
      image: "",
      detailImage: "",
      url: ""
    },
    {
      id: 2,
      icon: <Code className="w-10 h-10" />,
      title: "Desarrollo Web & Apps",
      description: "Aplicaciones web y móviles modernas, escalables y centradas en la experiencia del usuario.",
      detailedInfo: "Creamos aplicaciones web responsivas y apps móviles nativas utilizando las últimas tecnologías. Desde e-commerce hasta sistemas empresariales complejos, garantizamos rendimiento óptimo y excelente UX.",
      color: "from-purple-500 to-pink-600",
      image: "",
      detailImage: "",
      url: ""
    },
    {
      id: 3,
      icon: <Cpu className="w-10 h-10" />,
      title: "Industria 4.0",
      description: "Implementación de soluciones IoT, monitoreo en tiempo real y digitalización de procesos industriales.",
      detailedInfo: "Transformamos operaciones industriales con sensores IoT, análisis en tiempo real y dashboards predictivos. Conectamos máquinas, optimizamos producción y reducimos costos mediante digitalización inteligente.",
      color: "from-orange-500 to-red-600",
      image: "",
      detailImage: "",
      url: ""
    },
    {
      id: 4,
      icon: <LineChart className="w-10 h-10" />,
      title: "Monitoreo & Reportes",
      description: "Sistemas inteligentes de seguimiento, análisis de datos y dashboards interactivos para toma de decisiones.",
      detailedInfo: "Desarrollamos sistemas de monitoreo en tiempo real con visualizaciones interactivas. Convertimos datos complejos en insights accionables mediante dashboards personalizados y reportes automatizados.",
      color: "from-green-500 to-teal-600",
      image: "",
      detailImage: "",
      url: ""
    }
  ];

  // Proyectos - usar configuración del admin si existe
  const projects = config?.projects || [
    {
      id: 1,
      title: "Sistema IoT Industrial",
      category: "Industria 4.0",
      description: "Monitoreo en tiempo real con sensores IoT",
      detailedInfo: "Sistema completo de monitoreo industrial que integra sensores IoT para captura de datos en tiempo real. Incluye dashboard de visualización, alertas automáticas y análisis predictivo.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      image: "",
      detailImage: "",
      url: ""
    },
    {
      id: 2,
      title: "Agente IA Cliente",
      category: "Inteligencia Artificial",
      description: "Chatbot con procesamiento de lenguaje natural",
      detailedInfo: "Agente conversacional inteligente que atiende consultas 24/7. Utiliza NLP avanzado para entender contexto y gestionar múltiples idiomas.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      image: "",
      detailImage: "",
      url: ""
    },
    {
      id: 3,
      title: "App Gestión Stock",
      category: "Desarrollo Web",
      description: "Control de inventario con predicción de demanda",
      detailedInfo: "Aplicación web completa para gestión de inventarios con ML que predice demanda. Incluye alertas de stock bajo y sincronización multi-sucursal.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "",
      detailImage: "",
      url: ""
    },
    {
      id: 4,
      title: "Análisis Predictivo",
      category: "Data Science",
      description: "Machine learning para mantenimiento preventivo",
      detailedInfo: "Sistema de análisis predictivo que anticipa fallas en equipos industriales. Reduce costos de mantenimiento y aumenta disponibilidad operativa.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      image: "",
      detailImage: "",
      url: ""
    }
  ];

  // Capacitaciones - usar configuración del admin si existe
  const capacitaciones = config?.capacitaciones || [
    {
      title: "PYTHON PARA ANALISIS DE DATOS EN LA INDUSTRIA PETROLERA",
      duration: "24 horas",
      level: "Intermedio",
      date: "07 MARZO 2026",
      description: "Curso especializado orientado a profesionales del sector energético que buscan convertir datos operacionales en decisiones estratégicas. A través de Python y herramientas de análisis de datos, los participantes aprenderán a procesar, analizar y visualizar información proveniente de operaciones petroleras reales",
      image: "https://i.imgur.com/Va5L3LW.jpg",
      url: "#"
    },
    {
      title: "Desarrollo Web Moderno con React",
      duration: "16 horas",
      level: "Principiante",
      date: "22 Marzo 2026",
      description: "Domina React y construye aplicaciones web profesionales desde cero. Aprende componentes, hooks, y despliegue.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
      url: "#"
    },
    {
      title: "IoT e Industria 4.0",
      duration: "12 horas",
      level: "Avanzado",
      date: "5 Abril 2026",
      description: "Implementa soluciones IoT para la transformación industrial. Conexión de sensores, protocolos MQTT y dashboards en tiempo real.",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop",
      url: "#"
    }
  ];

  const scrollToSection = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email config exists
    if (!config?.emailConfig?.emailJsServiceId || !config?.emailConfig?.emailJsTemplateId || !config?.emailConfig?.emailJsPublicKey) {
      alert('Error: La configuración de email no está completa en el panel de administración.');
      return;
    }

    const serviceId = config.emailConfig.emailJsServiceId;
    const templateId = config.emailConfig.emailJsTemplateId;
    const publicKey = config.emailConfig.emailJsPublicKey;

    try {
      // Show loading state if desired (optional improvement)
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Hubo un error al enviar el mensaje. Por favor intenta más tarde o contáctanos directamente.');
    }
  };

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
        }

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }

        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }

        .custom-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          border: 2px solid #06b6d4;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.2s, width 0.2s, height 0.2s;
          mix-blend-mode: difference;
        }

        .custom-cursor-follower {
          position: fixed;
          width: 8px;
          height: 8px;
          background: #06b6d4;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transition: transform 0.15s ease-out;
        }

        .glitch {
          position: relative;
          animation: glitch-skew 2s infinite;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 #ff00de;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }

        .glitch::after {
          left: -2px;
          text-shadow: -2px 0 #00fff9;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0% { clip: rect(39px, 9999px, 64px, 0); }
          20% { clip: rect(96px, 9999px, 22px, 0); }
          40% { clip: rect(8px, 9999px, 85px, 0); }
          60% { clip: rect(43px, 9999px, 71px, 0); }
          80% { clip: rect(18px, 9999px, 38px, 0); }
          100% { clip: rect(74px, 9999px, 6px, 0); }
        }

        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          10% { transform: skew(2deg); }
          20% { transform: skew(-2deg); }
          30% { transform: skew(1deg); }
          40% { transform: skew(-1deg); }
          50% { transform: skew(0deg); }
          100% { transform: skew(0deg); }
        }

        .floating {
          animation: floating 6s ease-in-out infinite;
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(2deg); }
          50% { transform: translateY(0px) rotate(0deg); }
          75% { transform: translateY(20px) rotate(-2deg); }
        }

        .rotate-3d {
          animation: rotate3d 20s linear infinite;
          transform-style: preserve-3d;
        }

        @keyframes rotate3d {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }

        .parallax-layer {
          transition: transform 0.1s ease-out;
        }

        .morphing-shape {
          animation: morph 8s ease-in-out infinite;
        }

        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 60% 40% 30% 70% / 30% 70% 40% 60%; }
          75% { border-radius: 40% 70% 60% 30% / 70% 50% 60% 30%; }
        }

        .text-gradient {
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
          background-size: 200% 200%;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .card-3d:hover {
          transform: rotateY(10deg) rotateX(10deg) scale(1.05);
        }

        .grid-broken {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 2rem;
        }

        .span-7 { grid-column: span 7; }
        .span-5 { grid-column: span 5; }
        .span-8 { grid-column: span 8; }
        .span-4 { grid-column: span 4; }

        .hero-shape {
          position: absolute;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1));
          filter: blur(60px);
        }

        .scroll-indicator {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6);
          z-index: 1000;
          transition: width 0.1s;
        }

        .nav-menu-creative {
          backdrop-filter: blur(20px);
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .magnetic-button {
          transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @media (max-width: 768px) {
          .grid-broken {
            grid-template-columns: 1fr;
          }
          .span-7, .span-5, .span-8, .span-4 {
            grid-column: span 1;
          }
        }

        .holographic {
          position: relative;
          overflow: hidden;
        }

        .holographic::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.1), transparent);
          animation: holographic-shine 3s linear infinite;
        }

        @keyframes holographic-shine {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .typing-animation {
          overflow: hidden;
          border-right: 2px solid #06b6d4;
          white-space: nowrap;
          animation: typing 3.5s steps(40) 1s 1 normal both, blink 0.75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }
      `}</style>

      {/* Scroll Progress */}
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }} />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 nav-menu-creative">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => scrollToSection('inicio')}>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg width="64" height="64" viewBox="0 0 64 64" className="group-hover:scale-110 transition-transform duration-500">
                  <defs>
                    <linearGradient id="pentagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="32,8 58,26 48,54 16,54 6,26"
                    fill="url(#pentagonGradient)"
                    stroke="#06b6d4"
                    strokeWidth="1"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-black text-white text-xl mt-1">5E</span>
                </div>
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-gradient">Quinto Eje</h1>
                <p className="text-xs text-cyan-400 font-mono">// Ingeniería</p>
              </div>
            </div>

            <div className="hidden md:flex space-x-8 font-display">
              {['inicio', 'servicios', 'proyectos', 'capacitaciones', 'contacto'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize text-sm font-medium transition-all hover:text-cyan-400 relative group ${activeSection === item ? 'text-cyan-400' : 'text-gray-400'
                    }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            <button className="md:hidden text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-6 pb-4 space-y-3">
              {['inicio', 'servicios', 'proyectos', 'capacitaciones', 'contacto'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-4 py-3 rounded-lg capitalize font-display transition-all ${activeSection === item
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-gray-400 hover:bg-white/5'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="hero-shape w-96 h-96 rounded-full top-20 -left-20 morphing-shape" />
        <div className="hero-shape w-80 h-80 rounded-full bottom-20 -right-20 morphing-shape" style={{ animationDelay: '2s' }} />

        {/* Floating Geometric Shapes - Hidden on mobile */}
        <div
          className="hidden md:block absolute top-1/4 left-1/4 w-32 h-32 border-2 border-cyan-500/30 floating"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px) rotate(45deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div
          className="hidden md:block absolute top-1/3 right-1/4 w-40 h-40 border-2 border-purple-500/30 rounded-full floating"
          style={{
            transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '1s'
          }}
        />
        <div
          className="hidden lg:block absolute bottom-1/4 left-1/3 w-24 h-24 border-2 border-blue-500/30 floating"
          style={{
            transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px) rotate(30deg)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '2s',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 border border-cyan-500/40 rounded-full holographic">
              <span className="text-cyan-400 text-xs sm:text-sm font-mono font-medium">
                &lt;Ingeniero 5.0 / Santa Cruz, Bolivia&gt;
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-9xl mb-6 sm:mb-8 leading-tight px-4">
              {config?.heroTitle ? (
                <span className="text-gradient">{config.heroTitle}</span>
              ) : (
                <>
                  <span className="text-gradient">Soluciones en</span>
                  <br />
                  <span className="text-gradient">Ingeniería</span>
                  <br />
                  <span className="text-gradient">Inteligente</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto font-display font-light px-4 leading-relaxed">
              {config?.heroSubtitle || (
                <>
                  Transformamos ideas en realidad mediante <span className="text-cyan-400 font-semibold">desarrollo web</span>,
                  <span className="text-purple-400 font-semibold"> agentes IA</span>, y
                  <span className="text-blue-400 font-semibold"> tecnologías Industria 4.0</span>
                </>
              )}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 px-4">
              <button
                onClick={() => scrollToSection('servicios')}
                className="magnetic-button group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full font-display font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explorar Servicios
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => scrollToSection('contacto')}
                className="magnetic-button px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-500 rounded-full font-display font-bold text-base sm:text-lg hover:bg-cyan-500/10 transition-all backdrop-blur-sm"
              >
                Contactar
              </button>
            </div>

            {/* 3D Rotating Pentagon - Responsive sizing */}
            <div className="mt-12 sm:mt-20 flex justify-center">
              <div
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 relative"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 15}deg) rotateY(${mousePosition.x * 15}deg)`,
                  transition: 'transform 0.3s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Pentagon shape with 3D effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/40 backdrop-blur-xl"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                    transform: 'translateZ(0px)'
                  }}
                ></div>
                <div
                  className="absolute inset-4 border-2 border-cyan-500/20"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                    transform: 'translateZ(20px)'
                  }}
                ></div>
                <div
                  className="absolute inset-8 border-2 border-cyan-500/10"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                    transform: 'translateZ(40px)'
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(60px)' }}>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-gradient">5E</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Broken Grid */}
      <section id="servicios" className="py-16 sm:py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">
              <span className="text-gradient">Servicios</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl font-display max-w-3xl mx-auto px-4">
              Soluciones tecnológicas especializadas para impulsar tu transformación digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, idx) => (
              <div
                key={service.id || idx}
                className="card-3d holographic bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 group transition-all duration-500"
                style={{
                  animationDelay: `${idx * 0.2}s`,
                  maxHeight: expandedService === (service.id || idx) ? '1000px' : '400px',
                  overflow: 'hidden'
                }}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${service.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <div className="relative z-10">{service.icon || '🚀'}</div>
                </div>

                {service.image && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                  </div>
                )}

                <h3 className="font-display font-bold text-2xl sm:text-3xl mb-3 sm:mb-4 text-white group-hover:text-gradient transition-all">
                  {service.title}
                </h3>

                <p className="text-gray-400 font-display leading-relaxed text-base sm:text-lg mb-4">
                  {service.description}
                </p>

                {/* Contenido expandible */}
                <div
                  className="transition-all duration-500 overflow-hidden"
                  style={{
                    maxHeight: expandedService === (service.id || idx) ? '2000px' : '0px',
                    opacity: expandedService === (service.id || idx) ? 1 : 0
                  }}
                >
                  {service.detailedInfo && (
                    <div className="mt-6 p-4 bg-white/5 rounded-xl border border-cyan-500/20">
                      <h4 className="font-display font-bold text-cyan-400 mb-3">Detalles del Servicio</h4>
                      <p className="text-gray-300 font-display text-sm sm:text-base leading-relaxed">
                        {service.detailedInfo}
                      </p>
                    </div>
                  )}

                  {service.detailImage && (
                    <div className="mt-4 rounded-xl overflow-hidden">
                      <img src={service.detailImage} alt={`${service.title} - Detalle`} className="w-full h-64 object-cover" />
                    </div>
                  )}

                  {service.url && (
                    <div className="mt-4">
                      <a
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-display font-medium"
                      >
                        Más información <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleService(service.id || idx)}
                  className="mt-4 sm:mt-6 flex items-center text-cyan-400 font-display font-medium group-hover:gap-2 transition-all relative z-20"
                >
                  {expandedService === (service.id || idx) ? (
                    <>
                      Ver menos <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transform rotate-90 transition-transform" />
                    </>
                  ) : (
                    <>
                      Ver más <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Asymmetric Layout */}
      <section id="proyectos" className="py-16 sm:py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">
              <span className="text-gradient">Proyectos</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl font-display max-w-3xl mx-auto px-4">
              Casos de éxito que demuestran nuestra experiencia técnica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, idx) => (
              <div
                key={project.id || idx}
                className="card-3d group relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-500"
                style={{
                  background: project.gradient,
                  minHeight: expandedProject === (project.id || idx) ? '600px' : '300px'
                }}
              >
                {/* Background image if exists */}
                {project.image && (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      opacity: expandedProject === (project.id || idx) ? 0.3 : 0.5
                    }}
                  />
                )}

                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>

                {/* Floating geometric shape on hover */}
                <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 sm:w-20 sm:h-20 border-2 border-white/20 rotate-45 group-hover:rotate-90 group-hover:scale-150 transition-all duration-700"></div>

                <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="mb-3 sm:mb-4">
                      <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs sm:text-sm font-mono">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl mb-2 sm:mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 font-display text-sm sm:text-base md:text-lg mb-4">
                      {project.description}
                    </p>

                    {/* Contenido expandible */}
                    <div
                      className="transition-all duration-500 overflow-hidden"
                      style={{
                        maxHeight: expandedProject === (project.id || idx) ? '1000px' : '0px',
                        opacity: expandedProject === (project.id || idx) ? 1 : 0
                      }}
                    >
                      {project.detailedInfo && (
                        <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                          <h4 className="font-display font-bold text-cyan-400 mb-3 text-sm sm:text-base">Detalles del Proyecto</h4>
                          <p className="text-gray-200 font-display text-sm leading-relaxed">
                            {project.detailedInfo}
                          </p>
                        </div>
                      )}

                      {project.detailImage && (
                        <div className="mt-4 rounded-xl overflow-hidden">
                          <img src={project.detailImage} alt={`${project.title} - Detalle`} className="w-full h-48 object-cover" />
                        </div>
                      )}

                      {project.url && (
                        <div className="mt-4">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-display font-medium text-sm"
                          >
                            Ver proyecto completo <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleProject(project.id || idx)}
                    className="mt-4 sm:mt-6 flex items-center text-cyan-400 font-display font-medium opacity-100 transition-all text-sm sm:text-base"
                  >
                    {expandedProject === (project.id || idx) ? (
                      <>
                        Ver menos <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform rotate-90 transition-transform" />
                      </>
                    ) : (
                      <>
                        Ver detalles <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacitaciones Section - Simple and Clean */}
      <section id="capacitaciones" className="py-16 sm:py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">
              <span className="text-gradient">Capacitaciones</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl font-display max-w-3xl mx-auto px-4">
              Formación especializada para profesionales y equipos técnicos
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 sm:gap-8 px-4">
            {capacitaciones.map((curso, idx) => (
              <div
                key={idx}
                className="w-full max-w-2xl card-3d bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden group hover:border-cyan-500/40 transition-all flex flex-col"
              >
                {/* Image Section - Smart Fit (No cropping) */}
                {curso.image && (
                  <div className="w-full h-64 sm:h-96 relative overflow-hidden bg-gray-900 group">
                    {/* Layer 1: Blurred Background (fills space) */}
                    <div className="absolute inset-0">
                      <img
                        src={(() => {
                          const url = curso.image;
                          if (url.includes('imgur.com/a/')) return url.replace('imgur.com/a/', 'i.imgur.com/') + '.jpg';
                          if (url.includes('imgur.com') && !url.includes('i.imgur.com')) return url.replace('imgur.com', 'i.imgur.com') + '.jpg';
                          return url;
                        })()}
                        alt=""
                        className="w-full h-full object-cover opacity-30 blur-xl scale-110"
                      />
                    </div>

                    {/* Layer 2: Full Image (contained, no cropping) */}
                    <div className="absolute inset-0 flex items-center justify-center p-4 z-10 transition-transform duration-700 group-hover:scale-105">
                      <img
                        src={(() => {
                          const url = curso.image;
                          if (url.includes('imgur.com/a/')) return url.replace('imgur.com/a/', 'i.imgur.com/') + '.jpg';
                          if (url.includes('imgur.com') && !url.includes('i.imgur.com')) return url.replace('imgur.com', 'i.imgur.com') + '.jpg';
                          return url;
                        })()}
                        alt={curso.title}
                        className="w-full h-full object-contain drop-shadow-2xl"
                        onError={(e) => {
                          e.target.style.opacity = '0.5';
                        }}
                      />
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-display font-medium backdrop-blur-md shadow-lg ${curso.level === 'Principiante' ? 'bg-green-500/90 text-white' :
                        curso.level === 'Intermedio' ? 'bg-yellow-500/90 text-white' :
                          'bg-red-500/90 text-white'
                        }`}>
                        {curso.level}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-cyan-400 transition-colors leading-tight">
                          {curso.title}
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                        <Calendar size={18} className="text-cyan-400" />
                        <span className="font-mono text-sm">{curso.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                        <Clock size={18} className="text-cyan-400" />
                        <span className="font-mono text-sm">{curso.duration}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 font-display text-sm sm:text-base leading-relaxed mb-8 border-l-2 border-cyan-500/30 pl-4">
                      {curso.description}
                    </p>
                  </div>

                  <a
                    href={curso.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl text-white font-display font-bold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    Más información
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Experimental */}
      <section id="contacto" className="py-16 sm:py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">
              <span className="text-gradient">Hablemos</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl font-display max-w-3xl mx-auto px-4">
              ¿Tienes un proyecto en mente? Conversemos sobre cómo podemos ayudarte
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-3xl"></div>
              <form onSubmit={handleSubmit} className="relative card-3d bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-gray-300 font-display font-medium mb-2 sm:mb-3 text-sm sm:text-base">Nombre</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/30 border border-cyan-500/30 rounded-lg sm:rounded-xl text-white font-display text-sm sm:text-base focus:outline-none focus:border-cyan-400 transition-all"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-display font-medium mb-2 sm:mb-3 text-sm sm:text-base">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/30 border border-cyan-500/30 rounded-lg sm:rounded-xl text-white font-display text-sm sm:text-base focus:outline-none focus:border-cyan-400 transition-all"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-display font-medium mb-2 sm:mb-3 text-sm sm:text-base">Mensaje</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="5"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/30 border border-cyan-500/30 rounded-lg sm:rounded-xl text-white font-display text-sm sm:text-base focus:outline-none focus:border-cyan-400 transition-all resize-none"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full magnetic-button px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg sm:rounded-xl font-display font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 group"
                >
                  Enviar Mensaje
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              {[
                { icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8" />, label: 'Email', value: config?.contactEmail || 'contacto@quintoeje.com', href: `mailto:${config?.contactEmail || 'contacto@quintoeje.com'}` },
                { icon: <Phone className="w-6 h-6 sm:w-8 sm:h-8" />, label: 'Teléfono', value: config?.phone || '+591 7000-0000', href: `tel:${(config?.phone || '+591 7000-0000').replace(/\s+/g, '')}` },
                { icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />, label: 'Ubicación', value: config?.location || 'Santa Cruz de la Sierra, Bolivia', href: null }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="card-3d holographic bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 flex items-center gap-4 sm:gap-6 group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform text-white">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-semibold text-gray-400 mb-1 text-xs sm:text-sm">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-cyan-400 font-display text-sm sm:text-base md:text-lg hover:text-cyan-300 transition-colors truncate block">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-white font-display text-sm sm:text-base md:text-lg">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 sm:py-12 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                  <svg width="56" height="56" viewBox="0 0 56 56" className="w-12 h-12 sm:w-14 sm:h-14">
                    <defs>
                      <linearGradient id="pentagonGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="28,6 51,22 42,48 14,48 5,22"
                      fill="url(#pentagonGradientFooter)"
                      stroke="#06b6d4"
                      strokeWidth="1"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display font-black text-white text-base sm:text-lg mt-1">5E</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-gradient">Quinto Eje</h3>
                  <p className="text-xs text-cyan-400 font-mono">// Ingeniería</p>
                </div>
              </div>
              <p className="text-gray-400 font-display text-sm mb-6">
                Soluciones en ingeniería inteligente
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-4">
                {config?.socialMedia?.facebook && (
                  <a href={config.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all hover:scale-110">
                    <Facebook size={18} />
                  </a>
                )}
                {config?.socialMedia?.instagram && (
                  <a href={config.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all hover:scale-110">
                    <Instagram size={18} />
                  </a>
                )}
                {config?.socialMedia?.twitter && (
                  <a href={config.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all hover:scale-110">
                    <Twitter size={18} />
                  </a>
                )}
                {config?.socialMedia?.linkedin && (
                  <a href={config.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600/50 hover:bg-blue-600/10 transition-all hover:scale-110">
                    <Linkedin size={18} />
                  </a>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Enlaces</h4>
              <ul className="space-y-2">
                {['servicios', 'proyectos', 'capacitaciones', 'contacto'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className="text-gray-400 hover:text-cyan-400 transition-colors font-display capitalize text-sm"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Síguenos</h4>
              <div className="flex gap-3 sm:gap-4">
                {['LinkedIn', 'GitHub', 'Twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all"
                    title={social}
                  >
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 sm:pt-8 text-center text-gray-400 font-mono text-xs sm:text-sm px-4">
            <span className="text-cyan-400">&lt;</span> © 2026 Quinto Eje Ingeniería. Todos los derechos reservados. <span className="text-cyan-400">/&gt;</span>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button Removed */}
    </div>
  );
};

export default QuintoEjeInnovative;