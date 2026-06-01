import React, { lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Calendar, Mail, Phone, MapPin, Send, X, Menu, ChevronRight, Code, Cpu, Brain, LineChart, Users, BookOpen, CheckCircle2, ArrowRight, MessageSquare, MousePointer2, Clock, Linkedin, Twitter, Facebook, Instagram, Github, Youtube, Image as ImageIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';
import configData from '../data/config.json';

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

  // Cargar configuración centralizada (La principal fuente de verdad)
  const [config, setConfig] = useState(configData);

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

  const formatImageUrl = (url) => {
    if (!url) return '';
    if (url.includes('imgur.com') && !url.includes('i.imgur.com') && !url.includes('/a/') && !url.includes('/gallery/')) {
      const hash = url.split('/').filter(Boolean).pop();
      return `https://i.imgur.com/${hash}.jpg`;
    }
    return url;
  };

  return (
    <div className="bg-obsidian text-platinum font-body overflow-x-hidden relative min-h-screen">
      
      {/* GLOBAL BACKGROUND & WATERMARK */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
         <img src="/Quinto_Eje_logo_ALTA_CALIDAD.png" alt="Quinto Eje Watermark" className="w-[150vw] md:w-[80vw] opacity-5 object-contain" />
      </div>
      
      {/* Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-neon to-blue-500 z-[1000]" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glassmorphism-strong border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => scrollToSection('inicio')}>
              <img src="/Quinto_Eje_logo_ALTA_CALIDAD.png" alt="Quinto Eje Logo" className="w-32 md:w-48 h-auto object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(0,242,254,0.6)]" />
            </div>

            <div className="hidden md:flex space-x-10 font-display">
              {['inicio', 'servicios', 'proyectos', 'capacitaciones', 'asesoramiento', 'contacto'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize text-base md:text-lg font-bold transition-all hover:text-neon relative group ${activeSection === item ? 'text-neon drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]' : 'text-gray-300'}`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon to-blue-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            <button className="md:hidden text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
        {menuOpen && (
            <div className="md:hidden bg-obsidian/95 backdrop-blur-xl border-t border-white/10 px-6 py-4 space-y-3">
              {['inicio', 'servicios', 'proyectos', 'capacitaciones', 'asesoramiento', 'contacto'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-3 capitalize font-display text-gray-300 hover:text-neon border-b border-white/5"
                >
                  {item}
                </button>
              ))}
            </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-left"
          >
            <div className="inline-block mb-6 px-6 py-2 border border-neon/40 rounded-full bg-white/5 backdrop-blur-md">
              <span className="text-neon text-sm font-mono font-medium tracking-wider">
                &lt; Ingeniería 5.0 / Santa Cruz, BO &gt;
              </span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight">
              {config?.heroTitle ? (
                <span className="text-gradient-premium">{config.heroTitle}</span>
              ) : (
                <>
                  <span className="text-white">Soluciones en</span>
                  <br />
                  <span className="text-gradient-premium">Ingeniería</span>
                  <br />
                  <span className="text-gradient-premium">Inteligente</span>
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl font-display font-light leading-relaxed">
              {config?.heroSubtitle || (
                <>Transformamos ideas en realidad mediante desarrollo web, agentes IA y tecnologías Industria 4.0.</>
              )}
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('servicios')} className="px-8 py-4 bg-neon hover:bg-cyan-400 text-obsidian font-display font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] flex items-center gap-2">
                Descubrir <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => scrollToSection('contacto')} className="px-8 py-4 border border-neon/50 hover:bg-neon/10 text-platinum font-display font-bold text-lg rounded-xl transition-all backdrop-blur-md">
                Contactar
              </button>
            </div>
          </motion.div>

          {/* Huge 3D Floating Logo */}
          <motion.div 
            className="relative flex justify-center items-center"
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute w-[120%] h-[120%] bg-neon/10 blur-[100px] rounded-full pointer-events-none"></div>
            <img 
              src="/Quinto_Eje_logo_ALTA_CALIDAD.png" 
              alt="Quinto Eje" 
              className="w-full max-w-2xl lg:max-w-3xl object-contain drop-shadow-[0_0_80px_rgba(0,242,254,0.8)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Services Section - Bento Grid */}
      <section id="servicios" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-display font-black text-5xl md:text-6xl mb-6 text-gradient-premium">Servicios</h2>
            <p className="text-gray-400 text-lg md:text-xl font-display max-w-2xl">
              Soluciones tecnológicas disruptivas diseñadas para escalar.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[600px] gap-4">
            {services.map((service, idx) => {
              const customIcons = ['/icon_web.png', '/icon_ai.png', '/icon_iot.png', '/icon_data.png'];
              const iconSrc = customIcons[idx % 4];
              return (
                <motion.div
                  key={service.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex-1 lg:hover:flex-[2.5] hover:flex-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-3xl group border border-white/10 min-h-[300px]"
                >
                  {/* Background Image / Overlay */}
                  <img src={iconSrc} alt="Service Background" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 mix-blend-screen" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent"></div>
                  
                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    
                    {/* Custom 3D Icon Generated by AI */}
                    <div className="mb-6 transform group-hover:-translate-y-4 transition-transform duration-700">
                      <img src={iconSrc} alt="Service Icono" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-[0_0_20px_rgba(0,242,254,0.6)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700" />
                    </div>

                    <div className="transform group-hover:-translate-y-4 transition-transform duration-700">
                      <span className="px-3 py-1 bg-neon/10 border border-neon/30 text-neon rounded-full font-mono text-xs mb-4 inline-block shadow-[0_0_10px_rgba(0,242,254,0.2)]">
                        Servicio
                      </span>
                      <h3 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-white mb-2 whitespace-normal break-words leading-tight">
                        {service.title}
                      </h3>
                      
                      {/* Detailed info visible on hover */}
                      <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden mt-4 lg:w-[400px]">
                        <p className="text-gray-300 font-display text-sm md:text-base mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        {service.detailedInfo && (
                          <div className="p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/5">
                            <p className="text-gray-400 text-xs md:text-sm font-display">
                              {service.detailedInfo}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-display font-black text-5xl md:text-6xl mb-6 text-gradient-premium">Proyectos</h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[600px] gap-4">
            {projects.map((project, idx) => {
              const customIcons = ['/icon_iot.png', '/icon_ai.png', '/icon_web.png', '/icon_data.png'];
              const iconSrc = customIcons[idx % 4];
              return (
                <motion.div
                  key={project.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex-1 lg:hover:flex-[2.5] hover:flex-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-3xl group border border-white/10 min-h-[300px]"
                  style={{ background: project.gradient || '#0F172A' }}
                >
                  {/* Background Image / Overlay */}
                  <img src={iconSrc} alt="Proyecto Background" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 mix-blend-screen" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent"></div>
                  
                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    
                    {/* Custom 3D Icon Generated by AI */}
                    <div className="mb-6 transform group-hover:-translate-y-4 transition-transform duration-700">
                      <img src={iconSrc} alt="Proyecto Icono" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-[0_0_20px_rgba(0,242,254,0.6)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700" />
                    </div>

                    <div className="transform group-hover:-translate-y-4 transition-transform duration-700">
                      <span className="px-3 py-1 bg-neon/10 border border-neon/30 text-neon rounded-full font-mono text-xs mb-4 inline-block shadow-[0_0_10px_rgba(0,242,254,0.2)]">
                        {project.category}
                      </span>
                      <h3 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-white mb-2 whitespace-normal break-words leading-tight">
                        {project.title}
                      </h3>
                      
                      {/* Detailed info visible on hover */}
                      <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden mt-4 lg:w-[400px]">
                        <p className="text-gray-300 font-display text-sm md:text-base mb-4 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                        {project.detailedInfo && (
                          <div className="p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/5">
                            <p className="text-gray-400 text-xs md:text-sm font-display line-clamp-4">
                              {project.detailedInfo}
                            </p>
                          </div>
                        )}
                        <button className="mt-4 flex items-center gap-2 text-neon font-display font-bold text-sm hover:gap-3 transition-all">
                          Ver caso de estudio <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capacitaciones */}
      <section id="capacitaciones" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="font-display font-black text-5xl md:text-6xl mb-6 text-gradient-premium">Capacitaciones</h2>
          </motion.div>
          <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[600px] gap-4">
             {capacitaciones.map((curso, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: idx*0.1 }} 
                  className="relative flex-1 lg:hover:flex-[2.5] hover:flex-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-3xl group border border-white/10 min-h-[300px]"
                >
                  {/* Background Image / Overlay */}
                  {curso.image && (
                    <img src={formatImageUrl(curso.image)} alt={curso.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 mix-blend-overlay" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent"></div>
                  
                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="transform group-hover:-translate-y-4 transition-transform duration-700">
                      
                      <span className="px-3 py-1 bg-neon/10 border border-neon/30 text-neon rounded-full font-mono text-xs mb-4 inline-block shadow-[0_0_10px_rgba(0,242,254,0.2)]">
                        {curso.level}
                      </span>
                      
                      <h3 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-white mb-2 whitespace-normal break-words leading-tight">
                        {curso.title}
                      </h3>
                      
                      {/* Detailed info visible on hover */}
                      <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden mt-4 lg:w-[400px]">
                        <div className="flex gap-4 mb-4 text-sm font-mono text-neon">
                          <span className="flex items-center gap-1"><Calendar size={14}/> {curso.date}</span>
                          <span className="flex items-center gap-1"><Clock size={14}/> {curso.duration}</span>
                        </div>
                        <p className="text-gray-300 font-display text-sm md:text-base mb-4 leading-relaxed">
                          {curso.description}
                        </p>
                        {/* El boton de mas informacion fue eliminado por solicitud */}
                      </div>
                    </div>
                  </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>


      {/* Asesoramiento Section */}
      <section id="asesoramiento" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">
              <span className="text-gradient-premium">Asesoramiento</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl font-display max-w-3xl mx-auto px-4">
              Orientación profesional en tus proyectos académicos, profesionales, técnicos e industriales
            </p>
          </div>

          <div className="glassmorphism border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden group hover:border-cyan-500/40 transition-all">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="w-full lg:w-1/2 min-h-[300px] lg:min-h-[400px] relative border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden group">
                <div className="absolute inset-0 bg-black">
                  <img 
                    src="/asesoramiento-bg.png" 
                    alt="Asesoramiento Profesional" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-100" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay pointer-events-none"></div>
              </div>

              {/* Text Description */}
              <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-6 group-hover:text-neon transition-colors">
                  Asesoramiento profesional en tus proyectos
                </h3>
                <p className="text-gray-300 font-display text-base sm:text-lg leading-relaxed mb-6">
                  Ofrecemos un servicio integral de asesoramiento académico especializado en la elaboración de proyectos de alto nivel, fusionándolo con consultoría técnica de vanguardia. Potenciamos sus procesos mediante la implementación de Inteligencia Artificial aplicada, análisis de datos avanzado y sistemas de monitoreo con dashboards en tiempo real, garantizando una toma de decisiones informada, ágil y precisa.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-6 h-6 text-neon shrink-0" />
                     <span className="text-gray-300 font-display">Asesoramiento académico en tus proyectos educativos.</span>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-6 h-6 text-neon shrink-0" />
                     <span className="text-gray-300 font-display">Asesoramiento de alto nivel en tus proyectos de ingeniería y tecnología y análisis de datos.</span>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-6 h-6 text-neon shrink-0" />
                     <span className="text-gray-300 font-display">Asesoramiento aplicado en herramientas de IA.</span>
                  </li>
                </ul>
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="w-fit magnetic-button px-6 sm:px-8 py-3 sm:py-4 border-2 border-neon rounded-lg sm:rounded-xl font-display font-bold text-base sm:text-lg hover:bg-neon hover:text-obsidian transition-all text-neon"
                >
                  Solicitar Evaluación Exclusiva
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asesoramiento & Contacto */}
      <section id="contacto" className="py-24 relative z-10 border-t border-white/5">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display font-black text-5xl md:text-6xl mb-6 text-gradient-premium">Hablemos</h2>
              <p className="text-gray-400 text-lg mb-12 font-display">Transformamos la complejidad técnica en soluciones empresariales elegantes.</p>
              
              <div className="space-y-6">
                {[
                  { icon: <Mail className="w-6 h-6" />, label: 'Email', value: config?.contactEmail || 'quintoejeingenieria@gmail.com' },
                  { icon: <Phone className="w-6 h-6" />, label: 'Teléfono', value: config?.phone || '+591 7000-0000' },
                  { icon: <MapPin className="w-6 h-6" />, label: 'Ubicación', value: config?.location || 'Santa Cruz, Bolivia' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-4 glassmorphism rounded-2xl">
                    <div className="w-12 h-12 bg-neon/10 text-neon rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-mono">{item.label}</div>
                      <div className="text-lg font-display font-medium text-white">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="glassmorphism-strong rounded-3xl p-8 space-y-6">
                <div>
                  <label className="block text-gray-300 font-display mb-2 text-sm">Nombre</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white font-display focus:border-neon outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-gray-300 font-display mb-2 text-sm">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white font-display focus:border-neon outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-gray-300 font-display mb-2 text-sm">Mensaje</label>
                  <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows="4" className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white font-display focus:border-neon outline-none transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full py-4 bg-neon text-obsidian font-display font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,242,254,0.3)]">
                  Enviar Mensaje
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-16 glassmorphism-strong relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6 group cursor-pointer" onClick={() => scrollToSection('inicio')}>
            <img src="/Quinto_Eje_logo_ALTA_CALIDAD.png" alt="Quinto Eje Logo" className="w-24 md:w-32 h-auto object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(0,242,254,0.6)]" />
          </div>
          
          <div className="flex space-x-6">
             <a href="https://www.linkedin.com/in/hernan-cabrera-pantoja-a75a66a2/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]" title="LinkedIn">
               <Linkedin size={20} />
             </a>
             <a href="https://www.facebook.com/profile.php?id=61588550460510" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600/50 hover:bg-blue-600/10 transition-all hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]" title="Facebook">
               <Facebook size={20} />
             </a>
             <a href="https://www.youtube.com/@QUINTOEJE" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]" title="YouTube">
               <Youtube size={20} />
             </a>
          </div>

          <div className="text-gray-400 font-mono text-sm md:text-base tracking-wider text-center md:text-right">
            © 2026 QUINTO EJE.<br className="md:hidden" /> <span className="text-neon">FLUID INNOVATION.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuintoEjeInnovative;
