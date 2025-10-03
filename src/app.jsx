import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Variantes de Animación Reutilizables ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

// --- Componentes de Iconos SVG ---
const HeadsetIcon = () => (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.13V12C21 7.029 16.971 3 12 3C7.029 3 3 7.029 3 12V13C3 14.491 3.641 15.834 4.673 16.827" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 18.5C18 19.88 16.88 21 15.5 21C14.12 21 13 19.88 13 18.5V14.5C13 13.12 14.12 12 15.5 12C16.88 12 18 13.12 18 14.5V18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 18.5C6 19.88 7.12 21 8.5 21C9.88 21 11 19.88 11 18.5V14.5C11 13.12 9.88 12 8.5 12C7.12 12 6 13.12 6 14.5V18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.5 16.15C19.893 15.34 20.85 13.84 20.98 12.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ShieldIcon = () => (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22S19 18 19 12V5L12 2L5 5V12C5 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TrendIcon = () => (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 7H21V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// --- Componentes Pequeños y Reutilizables ---
const AnimatedSection = ({ children, className = '' }) => (
  <motion.section
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className={`py-14 md:py-20 ${className}`}
  >
    {children}
  </motion.section>
);

const ServiceCard = ({ icon: Icon, title, text }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white p-8 rounded-xl shadow-lg text-center flex flex-col items-center justify-start border border-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
  >
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 text-microsoft-blue rounded-full p-5 mb-6 inline-block shadow-inner">
      <Icon />
    </div>
    <h4 className="text-xl font-bold mb-3 text-slate-800">{title}</h4>
    <p className="text-slate-600 leading-relaxed">{text}</p>
  </motion.div>
);

const ArticleCard = ({ href, title, text }) => (
    <motion.a
        href={href}
        variants={fadeInUp}
        whileHover={{ scale: 1.03 }}
        className="group relative block bg-white p-6 rounded-xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
        <h4 className="text-xl font-bold mb-2 leading-snug text-slate-800 group-hover:text-microsoft-blue transition-colors">{title}</h4>
        <p className="text-slate-600 text-base">{text}</p>
        <div className="absolute bottom-4 right-4 text-microsoft-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>
    </motion.a>
);

const ContactForm = () => {
  const [status, setStatus] = useState({ submitting: false, message: '', color: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ submitting: true, message: '', color: '' });
    
    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://worker-conectait.soportealvarojeria.workers.dev', {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();

      if (response.ok) {
        setStatus({ submitting: false, message: '¡Gracias! Tu mensaje ha sido enviado.', color: 'text-green-600' });
        form.reset();
      } else {
        throw new Error(responseText);
      }
    } catch (error) {
      setStatus({ submitting: false, message: `Error: ${error.message}`, color: 'text-red-600' });
      console.error('Error:', error);
    } finally {
      if (window.turnstile) {
        window.turnstile.reset();
      }
    }
  };

  return (
    <motion.div variants={fadeInUp}>
      <h3 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-slate-800 drop-shadow-sm">Conecta con Nosotros</h3>
      <p className="text-center text-slate-600 mb-10 text-lg">Completa el formulario y te contactaremos a la brevedad.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
        <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">Tu Nombre Completo</label>
            <input type="text" id="name" name="name" required className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-microsoft-blue" />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico Empresarial</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-microsoft-blue" />
        </div>
        <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">Tu Mensaje o Consulta</label>
            <textarea id="message" name="message" rows="5" required className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-microsoft-blue"></textarea>
        </div>
        
        <div className="cf-turnstile" data-sitekey="0x4AAAAAAB2--dgKAx3_GFgq"></div>

        <div className="text-center pt-6">
          <motion.button
            type="submit"
            disabled={status.submitting}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center py-3 px-10 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-600/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
          >
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            {status.submitting ? 'Enviando...' : 'Enviar Consulta'}
          </motion.button>
        </div>
      </form>
      {status.message && (
        <p className={`text-center mt-6 font-medium text-sm ${status.color}`}>{status.message}</p>
      )}
    </motion.div>
  );
};

// --- Componente Principal de la Aplicación ---
const App = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }} className="bg-gradient-to-br from-gray-50 to-blue-50 text-slate-800 antialiased">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-8">

          <header className="relative text-center py-20 md:py-28 mb-10 rounded-2xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-10"></div>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <motion.a href="/" variants={fadeInUp} className="inline-block mb-6">
                <img src="https://placehold.co/224x48/FFFFFF/0078D4?text=Conecta+IT&font=segoe-ui" alt="Logo de Conecta IT" className="w-48 md:w-56 mx-auto" />
              </motion.a>
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-blue-100 font-light leading-snug max-w-3xl mx-auto">Tecnología que Impulsa. Soporte que Responde.</motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mt-8 text-base">
                <a href="mailto:contacto@conectait.cl" className="text-white hover:text-blue-200 transition-colors font-semibold inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  contacto@conectait.cl
                </a>
                <a href="https://wa.me/56934279755" target="_blank" className="text-white hover:text-blue-200 transition-colors font-semibold inline-flex items-center">
                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                   +56 9 3427 9755
                </a>
              </motion.div>
            </motion.div>
          </header>
          
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="bg-white p-8 md:p-12 lg:p-16 rounded-xl shadow-xl text-center border border-gray-200/80">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight drop-shadow-sm text-slate-800">Tu Pyme es Ágil. Tu Soporte Tecnológico También Debería Serlo.</h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">Entendemos la frustración de un soporte lento e ineficiente. Por eso, nos dedicamos a ser el partner tecnológico que tu Pyme merece: proactivo, siempre disponible y enfocado en potenciar tu crecimiento.</p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection>
            <motion.h3 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-center mb-12 drop-shadow-sm text-slate-800">Más que un Soporte, un Partner Estratégico</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              <ServiceCard icon={HeadsetIcon} title="Soporte que Responde" text="Respuestas en minutos, no en días. Solucionamos tus problemas con la urgencia que tu negocio necesita." />
              <ServiceCard icon={ShieldIcon} title="Seguridad Proactiva" text="Más que apagar incendios, prevenimos que ocurran. Nos anticipamos a las amenazas para que trabajes con tranquilidad." />
              <ServiceCard icon={TrendIcon} title="Consultoría para Crecer" text="Te guiamos para que te dediques a lo que mejor sabes hacer: hacer crecer tu negocio." />
            </div>
          </AnimatedSection>

          <AnimatedSection>
              <motion.h3 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-center mb-12 drop-shadow-sm text-slate-800">Recursos y Artículos para tu Negocio</motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  <ArticleCard href="5-senales-soporte-it-lento.html" title="5 Señales de que tu Soporte IT actual está Frenando a tu Pyme" text="Identifica si tu proveedor actual es lento, reactivo o no está a la altura de tus necesidades." />
                  <ArticleCard href="soporte-ti-no-responde.html" title="¿Tu Soporte TI no Responde? Cuándo y Cómo Cambiar de Proveedor" text="Descubre las señales de alerta y los pasos para encontrar un nuevo partner tecnológico que sí responde." />
                  <ArticleCard href="guia-ciberseguridad-pymes.html" title="Guía de Ciberseguridad para Pymes en Chile: 3 Pasos que Puedes Tomar Hoy" text="Protege tu negocio de amenazas digitales con 3 pasos esenciales que puedes implementar hoy mismo." />
                  <ArticleCard href="optimizacion-pc-oficina.html" title="Optimización de PC en la Oficina: Cómo Acelerar el Rendimiento sin Gastar de Más" text="Consejos prácticos para mejorar la velocidad de tus equipos y aumentar la productividad." />
              </div>
          </AnimatedSection>
          
          <AnimatedSection className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-gray-200/80">
            <ContactForm />
          </AnimatedSection>

          <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-center mt-12 md:mt-20 text-slate-500 text-sm">
            <p>&copy; 2025 Conecta IT. Todos los derechos reservados.</p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
};

export default App;

