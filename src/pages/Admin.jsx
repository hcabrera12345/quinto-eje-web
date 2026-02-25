import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Upload, Eye, Settings, Mail, Image as ImageIcon, Link as LinkIcon, Edit2, X, Check, Facebook, Instagram, Linkedin, Twitter, Copy } from 'lucide-react';
import configData from '../data/config.json';

const AdminPanel = () => {
  // Estado inicial con toda la configuración real
  const [config, setConfig] = useState(configData);

  // Guardar configuración permanentemente en el código fuente
  const downloadConfig = async () => {
    try {
      const response = await fetch('/api/save-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config)
      });

      const result = await response.json();

      if (result.success) {
        alert('✅ ¡Cambios guardados exitosamente en tu código fuente!\n\nLa configuración se ha congelado en config.json y se verá al instante en la página principal.\nPara publicarlo a todos los usuarios, solo necesitas hacer un "git push".');
        localStorage.setItem('quintoEjeConfig', JSON.stringify(config)); // Backup local
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error saving config:', error);
      alert('❌ Error al guardar. Asegúrate de estar ejecutando el entorno de desarrollo local (npm run dev).\n\nComo plan de respaldo, hemos guardado tus cambios en el navegador.');
      localStorage.setItem('quintoEjeConfig', JSON.stringify(config));
    }
  };

  const copyConfig = () => {
    const configStr = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(configStr).then(() => {
      alert("¡Configuración copiada al portapapeles! Puedes usarla como respaldo.");
    });
  };

  const [activeTab, setActiveTab] = useState('general');
  const [editingItem, setEditingItem] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [saved, setSaved] = useState(false);

  // Guardar configuraciÃ³n en localStorage
  // Guardar configuración en localStorage (Temporal)
  const saveConfig = () => {
    localStorage.setItem('quintoEjeConfig', JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Cargar configuraciÃ³n guardada
  useEffect(() => {
    const savedConfig = localStorage.getItem('quintoEjeConfig');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Error loading config:", e);
        // Optional: clear bad config
      }
    }
  }, []);



  // Funciones para manejar servicios
  const addService = () => {
    const newService = {
      id: Date.now(),
      title: "Nuevo Servicio",
      description: "DescripciÃ³n del servicio",
      detailedInfo: "InformaciÃ³n detallada del servicio. AquÃ­ puedes agregar mÃ¡s detalles sobre caracterÃ­sticas, beneficios, proceso, etc.",
      image: "",
      detailImage: "",
      url: "",
      color: "from-cyan-500 to-blue-600"
    };
    setConfig({ ...config, services: [...config.services, newService] });
  };

  const deleteService = (id) => {
    if (window.confirm('Â¿EstÃ¡s seguro de eliminar este servicio?')) {
      setConfig({ ...config, services: config.services.filter(s => s.id !== id) });
    }
  };

  const updateService = (id, field, value) => {
    setConfig({
      ...config,
      services: config.services.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  // Funciones para manejar proyectos
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: "Nuevo Proyecto",
      category: "CategorÃ­a",
      description: "DescripciÃ³n del proyecto",
      detailedInfo: "InformaciÃ³n detallada del proyecto. Incluye objetivos, tecnologÃ­as utilizadas, resultados obtenidos, etc.",
      image: "",
      detailImage: "",
      url: "",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    };
    setConfig({ ...config, projects: [...config.projects, newProject] });
  };

  const deleteProject = (id) => {
    if (window.confirm('Â¿EstÃ¡s seguro de eliminar este proyecto?')) {
      setConfig({ ...config, projects: config.projects.filter(p => p.id !== id) });
    }
  };

  const updateProject = (id, field, value) => {
    setConfig({
      ...config,
      projects: config.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  // Funciones para manejar capacitaciones
  const addCapacitacion = () => {
    const newCapacitacion = {
      id: Date.now(),
      title: "Nueva CapacitaciÃ³n",
      duration: "8 horas",
      level: "Intermedio",
      date: "1 Enero 2026",
      description: "DescripciÃ³n de la capacitaciÃ³n",
      image: "",
      url: ""
    };
    setConfig({ ...config, capacitaciones: [...config.capacitaciones, newCapacitacion] });
  };

  const deleteCapacitacion = (id) => {
    if (window.confirm('Â¿EstÃ¡s seguro de eliminar esta capacitaciÃ³n?')) {
      setConfig({ ...config, capacitaciones: config.capacitaciones.filter(c => c.id !== id) });
    }
  };

  const updateCapacitacion = (id, field, value) => {
    setConfig({
      ...config,
      capacitaciones: config.capacitaciones.map(c => c.id === id ? { ...c, [field]: value } : c)
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        .gradient-bg {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }

        .card {
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.1);
        }

        .input-field {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(148, 163, 184, 0.2);
          transition: all 0.3s;
        }

        .input-field:focus {
          border-color: #06b6d4;
          outline: none;
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          transition: all 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
        }

        .tab-button {
          transition: all 0.3s;
          border-bottom: 2px solid transparent;
        }

        .tab-button.active {
          border-bottom-color: #06b6d4;
          color: #06b6d4;
        }

        .save-notification {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Header */}
      <header className="gradient-bg border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-cyan-400">Panel de AdministraciÃ³n</h1>
              <p className="text-slate-400 text-sm">Quinto Eje IngenierÃ­a</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveConfig}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all flex items-center gap-2"
                title="Guardar temporalmente en el navegador"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Guardar (Local)</span>
              </button>
              <button
                onClick={downloadConfig}
                className="btn-primary px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
                title="Descargar archivo para guardar permanentemente"
              >
                <Upload className="w-4 h-4" />
                Guardar Definitivo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Save Notification */}
      {saved && (
        <div className="fixed top-20 right-6 save-notification bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <Check className="w-5 h-5" />
          Â¡Guardado exitosamente!
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6 overflow-x-auto">
            {[
              { id: 'general', label: 'General', icon: <Settings className="w-4 h-4" /> },
              { id: 'servicios', label: 'Servicios', icon: <Edit2 className="w-4 h-4" /> },
              { id: 'proyectos', label: 'Proyectos', icon: <Edit2 className="w-4 h-4" /> },
              { id: 'capacitaciones', label: 'Capacitaciones', icon: <Edit2 className="w-4 h-4" /> },
              { id: 'email', label: 'ConfiguraciÃ³n Email', icon: <Mail className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button py-4 px-2 font-medium flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'active' : 'text-slate-400 hover:text-white'
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">InformaciÃ³n General</h2>

            <div className="card rounded-xl p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre del Sitio</label>
                <input
                  type="text"
                  value={config.siteName}
                  onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slogan</label>
                <input
                  type="text"
                  value={config.siteSlogan}
                  onChange={(e) => setConfig({ ...config, siteSlogan: e.target.value })}
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">TÃ­tulo Hero Principal</label>
                <input
                  type="text"
                  value={config.heroTitle}
                  onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">SubtÃ­tulo Hero</label>
                <textarea
                  value={config.heroSubtitle}
                  onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                  rows="3"
                  className="input-field w-full px-4 py-3 rounded-lg text-white resize-none"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email de Contacto</label>
                  <input
                    type="email"
                    value={config.contactEmail}
                    onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
                    className="input-field w-full px-4 py-3 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">TelÃ©fono</label>
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                    className="input-field w-full px-4 py-3 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">UbicaciÃ³n</label>
                  <input
                    type="text"
                    value={config.location}
                    onChange={(e) => setConfig({ ...config, location: e.target.value })}
                    className="input-field w-full px-4 py-3 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Servicios Tab */}
        {activeTab === 'servicios' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Servicios</h2>
              <button
                onClick={addService}
                className="btn-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Agregar Servicio
              </button>
            </div>

            <div className="grid md:grid-cols-1 gap-6">
              {config.services.map((service) => (
                <div key={service.id} className="card rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <button
                      onClick={() => deleteService(service.id)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">TÃ­tulo</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => updateService(service.id, 'title', e.target.value)}
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Color del gradiente</label>
                      <select
                        value={service.color}
                        onChange={(e) => updateService(service.id, 'color', e.target.value)}
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                      >
                        <option value="from-cyan-500 to-blue-600">Cyan a Azul</option>
                        <option value="from-purple-500 to-pink-600">PÃºrpura a Rosa</option>
                        <option value="from-orange-500 to-red-600">Naranja a Rojo</option>
                        <option value="from-green-500 to-teal-600">Verde a Teal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">DescripciÃ³n Corta (se ve en la tarjeta)</label>
                    <textarea
                      value={service.description}
                      onChange={(e) => updateService(service.id, 'description', e.target.value)}
                      rows="2"
                      className="input-field w-full px-4 py-2 rounded-lg text-white resize-none"
                      placeholder="DescripciÃ³n breve que aparece en la tarjeta"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      InformaciÃ³n Detallada (se muestra al hacer clic en "Ver mÃ¡s")
                    </label>
                    <textarea
                      value={service.detailedInfo}
                      onChange={(e) => updateService(service.id, 'detailedInfo', e.target.value)}
                      rows="4"
                      className="input-field w-full px-4 py-2 rounded-lg text-white resize-none"
                      placeholder="InformaciÃ³n detallada del servicio que aparecerÃ¡ al expandir"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        URL de Imagen Principal
                      </label>
                      <input
                        type="text"
                        value={service.image}
                        onChange={(e) => updateService(service.id, 'image', e.target.value)}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                      />
                      <p className="text-xs text-slate-400 mt-1">Imagen que aparece en la tarjeta</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        URL de Imagen Detallada
                      </label>
                      <input
                        type="text"
                        value={service.detailImage}
                        onChange={(e) => updateService(service.id, 'detailImage', e.target.value)}
                        placeholder="https://ejemplo.com/detalle.jpg"
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                      />
                      <p className="text-xs text-slate-400 mt-1">Imagen al expandir (opcional)</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      URL Externa (opcional)
                    </label>
                    <input
                      type="text"
                      value={service.url}
                      onChange={(e) => updateService(service.id, 'url', e.target.value)}
                      placeholder="https://ejemplo.com"
                      className="input-field w-full px-4 py-2 rounded-lg text-white"
                    />
                    <p className="text-xs text-slate-400 mt-1">Si quieres que el botÃ³n redirija a otra pÃ¡gina</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Proyectos Tab */}
        {activeTab === 'proyectos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Proyectos</h2>
              <button
                onClick={addProject}
                className="btn-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Agregar Proyecto
              </button>
            </div>

            <div className="grid md:grid-cols-1 gap-6">
              {config.projects.map((project) => (
                <div key={project.id} className="card rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">TÃ­tulo</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">CategorÃ­a</label>
                      <input
                        type="text"
                        value={project.category}
                        onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                        placeholder="Ej: Industria 4.0, IA, Web Development"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">DescripciÃ³n Corta (se ve en la tarjeta)</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      rows="2"
                      className="input-field w-full px-4 py-2 rounded-lg text-white resize-none"
                      placeholder="DescripciÃ³n breve del proyecto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      InformaciÃ³n Detallada (se muestra al hacer clic en "Ver detalles")
                    </label>
                    <textarea
                      value={project.detailedInfo}
                      onChange={(e) => updateProject(project.id, 'detailedInfo', e.target.value)}
                      rows="4"
                      className="input-field w-full px-4 py-2 rounded-lg text-white resize-none"
                      placeholder="InformaciÃ³n completa: objetivos, tecnologÃ­as, resultados, impacto, etc."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        URL de Imagen Principal
                      </label>
                      <input
                        type="text"
                        value={project.image}
                        onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                        placeholder="https://ejemplo.com/proyecto.jpg"
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                      />
                      <p className="text-xs text-slate-400 mt-1">Imagen de fondo de la tarjeta</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        URL de Imagen Detallada
                      </label>
                      <input
                        type="text"
                        value={project.detailImage}
                        onChange={(e) => updateProject(project.id, 'detailImage', e.target.value)}
                        placeholder="https://ejemplo.com/detalle.jpg"
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                      />
                      <p className="text-xs text-slate-400 mt-1">Imagen al expandir (opcional)</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        URL del Proyecto
                      </label>
                      <input
                        type="text"
                        value={project.url}
                        onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                        placeholder="https://ejemplo.com/proyecto"
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                      />
                      <p className="text-xs text-slate-400 mt-1">Link externo, demo o portafolio</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Color de Gradiente</label>
                      <select
                        value={project.gradient}
                        onChange={(e) => updateProject(project.id, 'gradient', e.target.value)}
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                      >
                        <option value="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">PÃºrpura</option>
                        <option value="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">Rosa</option>
                        <option value="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">Azul</option>
                        <option value="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">Verde</option>
                        <option value="linear-gradient(135deg, #fa709a 0%, #fee140 100%)">Naranja</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Capacitaciones Tab */}
        {activeTab === 'capacitaciones' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Capacitaciones</h2>
              <button
                onClick={addCapacitacion}
                className="btn-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Agregar CapacitaciÃ³n
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {config.capacitaciones.map((curso) => (
                <div key={curso.id} className="card rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{curso.title}</h3>
                    <button
                      onClick={() => deleteCapacitacion(curso.id)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">TÃ­tulo</label>
                    <input
                      type="text"
                      value={curso.title}
                      onChange={(e) => updateCapacitacion(curso.id, 'title', e.target.value)}
                      className="input-field w-full px-4 py-2 rounded-lg text-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">DuraciÃ³n</label>
                      <input
                        type="text"
                        value={curso.duration}
                        onChange={(e) => updateCapacitacion(curso.id, 'duration', e.target.value)}
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Nivel</label>
                      <select
                        value={curso.level}
                        onChange={(e) => updateCapacitacion(curso.id, 'level', e.target.value)}
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                      >
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Fecha</label>
                      <input
                        type="text"
                        value={curso.date}
                        onChange={(e) => updateCapacitacion(curso.id, 'date', e.target.value)}
                        className="input-field w-full px-4 py-2 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">DescripciÃ³n</label>
                    <textarea
                      value={curso.description}
                      onChange={(e) => updateCapacitacion(curso.id, 'description', e.target.value)}
                      rows="2"
                      className="input-field w-full px-4 py-2 rounded-lg text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      URL de Imagen
                    </label>
                    <input
                      type="text"
                      value={curso.image}
                      onChange={(e) => updateCapacitacion(curso.id, 'image', e.target.value)}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="input-field w-full px-4 py-2 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      URL de InscripciÃ³n
                    </label>
                    <input
                      type="text"
                      value={curso.url}
                      onChange={(e) => updateCapacitacion(curso.id, 'url', e.target.value)}
                      placeholder="https://formulario-inscripcion.com"
                      className="input-field w-full px-4 py-2 rounded-lg text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email Configuration Tab */}
        {activeTab === 'email' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">ConfiguraciÃ³n de Email</h2>

            <div className="card rounded-xl p-6 space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="font-bold text-blue-400 mb-2">ðŸ“§ Instrucciones para EmailJS</h3>
                <ol className="text-sm text-slate-300 space-y-2 list-decimal list-inside">
                  <li>Ve a <a href="https://www.emailjs.com" target="_blank" className="text-cyan-400 underline">emailjs.com</a> y crea una cuenta gratis</li>
                  <li>Conecta tu email (Gmail, Outlook, etc.)</li>
                  <li>Crea un servicio de email</li>
                  <li>Crea una plantilla de email</li>
                  <li>Copia los IDs y pÃ©galos abajo</li>
                </ol>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tu Email (donde recibirÃ¡s los formularios)</label>
                <input
                  type="email"
                  value={config.emailConfig.serviceEmail}
                  onChange={(e) => setConfig({
                    ...config,
                    emailConfig: { ...config.emailConfig, serviceEmail: e.target.value }
                  })}
                  placeholder="tu@email.com"
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">EmailJS Service ID</label>
                <input
                  type="text"
                  value={config.emailConfig.emailJsServiceId}
                  onChange={(e) => setConfig({
                    ...config,
                    emailConfig: { ...config.emailConfig, emailJsServiceId: e.target.value }
                  })}
                  placeholder="service_xxxxxxx"
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">EmailJS Template ID</label>
                <input
                  type="text"
                  value={config.emailConfig.emailJsTemplateId}
                  onChange={(e) => setConfig({
                    ...config,
                    emailConfig: { ...config.emailConfig, emailJsTemplateId: e.target.value }
                  })}
                  placeholder="template_xxxxxxx"
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">EmailJS Public Key</label>
                <input
                  type="text"
                  value={config.emailConfig.emailJsPublicKey}
                  onChange={(e) => setConfig({
                    ...config,
                    emailConfig: { ...config.emailConfig, emailJsPublicKey: e.target.value }
                  })}
                  placeholder="xxxxxxxxxxxxxx"
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                />
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-6">
                <p className="text-sm text-green-400">
                  âœ… Una vez configurado, cada vez que alguien envÃ­e el formulario de contacto, recibirÃ¡s un email automÃ¡ticamente.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="gradient-bg border-t border-slate-700 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>Panel de AdministraciÃ³n - Quinto Eje IngenierÃ­a</p>
          <p className="mt-2">ðŸ’¡ Recuerda guardar los cambios antes de salir</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
