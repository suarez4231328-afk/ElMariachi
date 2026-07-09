document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ============ 0. MENÚ HAMBURGUESA MÓVIL ============
    const hamburger = document.getElementById('hamburger');
    const navContainer = document.getElementById('navContainer');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navContainer.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });

        // Cerrar menú al hacer click en un enlace
        navLinks?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ============ 1. SCROLL NAVBAR OPTIMIZATION CON THROTTLING ============
    const navbar = document.getElementById('navbar');
    let lastScrollTime = 0;
    const throttleDelay = 50; // ms

    const handleNavbarScroll = () => {
        const currentTime = Date.now();

        if (currentTime - lastScrollTime >= throttleDelay) {
            lastScrollTime = currentTime;

            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // ============ 2. SMOOTH SCROLL PARA ENLACES DE ANCLA ============
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                // No prevenir si es un ancla vacía
                if (href === '#') return;

                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Cerrar cualquier menú móvil si existe
                    navbar.classList.remove('mobile-menu-open');

                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    setupSmoothScroll();

    // ============ 3. EVENT LISTENERS PARA BOTONES ============
    const setupButtonListeners = () => {
        const reservarButtons = document.querySelectorAll('button.btn-primary:not(#enviarBtn)');
        const verMenuButtons = document.querySelectorAll('button.btn-secondary');

        reservarButtons.forEach(button => {
            // Evitar duplicados usando event delegation
            button.removeEventListener('click', handleReservarClick);
            button.addEventListener('click', handleReservarClick);
        });

        verMenuButtons.forEach(button => {
            button.removeEventListener('click', handleVerMenuClick);
            button.addEventListener('click', handleVerMenuClick);
        });
    };

    const handleReservarClick = () => {
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleVerMenuClick = () => {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    setupButtonListeners();

    // ============ 4. ANIMACIÓN DE CARACTERÍSTICAS CON INTERSECTION OBSERVER ============
    const initFeatureAnimations = () => {
        const features = document.querySelectorAll('.feature-item');

        if (features.length === 0) return;

        const featureObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.setProperty('--item-index', index);
                    entry.target.classList.add('visible');
                    featureObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        features.forEach(feature => {
            featureObserver.observe(feature);
        });
    };

    initFeatureAnimations();

    // ============ 5. INDICADOR ACTIVO EN NAV SEGÚN SCROLL ============
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        if (sections.length === 0 || navLinks.length === 0) return;

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink(); // Inicial call

    // ============ 6. FILTRADO DEL MENÚ ============
    const initMenuFilters = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const menuItems = document.querySelectorAll('.menu-item');

        if (filterButtons.length === 0 || menuItems.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Remover active de todos
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar al clickeado
                button.classList.add('active');

                // Filtrar items
                menuItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    const shouldShow = filter === 'todos' || category === filter;

                    if (shouldShow) {
                        item.classList.remove('hidden');
                        // Resetear animación
                        item.style.animation = 'none';
                        setTimeout(() => {
                            item.style.animation = 'fadeInUp 0.6s ease-out';
                        }, 10);
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    };

    initMenuFilters();

    // ============ 7. VALIDACIÓN Y ENVÍO DEL FORMULARIO ============
    const initFormValidation = () => {
        const form = document.getElementById('formularioContacto');

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit(form);
        });
    };

    const handleFormSubmit = (form) => {
        const nombre = document.getElementById('nombre')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const asunto = document.getElementById('asunto')?.value.trim() || '';
        const mensaje = document.getElementById('mensaje')?.value.trim() || '';

        clearFormErrors();

        const validations = [
            { field: 'nombre', value: nombre, minLength: 3, message: 'El nombre debe tener al menos 3 caracteres' },
            { field: 'email', value: email, validator: isValidEmail, message: 'Por favor ingresa un email válido' },
            { field: 'asunto', value: asunto, minLength: 5, message: 'El asunto debe tener al menos 5 caracteres' },
            { field: 'mensaje', value: mensaje, minLength: 10, message: 'El mensaje debe tener al menos 10 caracteres' }
        ];

        let isValid = true;

        validations.forEach(({ field, value, minLength, validator, message }) => {
            let fieldValid = true;

            if (!value) {
                fieldValid = false;
            } else if (minLength && value.length < minLength) {
                fieldValid = false;
            } else if (validator && !validator(value)) {
                fieldValid = false;
            }

            if (!fieldValid) {
                showFormError(field, message);
                isValid = false;
            }
        });

        if (isValid) {
            const submission = {
                nombre,
                email,
                asunto,
                mensaje,
                fecha: new Date().toLocaleString('es-ES')
            };

            saveFormData(submission);
            showFormSuccess(form);
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const showFormError = (fieldId, message) => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`error${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`);

        if (field) field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    };

    const clearFormErrors = () => {
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
            field.classList.remove('error');
        });

        document.querySelectorAll('.error-message').forEach(msg => {
            msg.classList.remove('show');
            msg.textContent = '';
        });
    };

    const showFormSuccess = (form) => {
        const successMsg = document.getElementById('successMessage');
        if (successMsg) {
            successMsg.textContent = '✅ ¡Mensaje enviado exitosamente! Te responderemos pronto.';
            successMsg.classList.add('show');

            form.reset();

            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 5000);
        }
    };

    const saveFormData = (data) => {
        try {
            let submissions = JSON.parse(localStorage.getItem('elmariachi_submissions')) || [];
            submissions.push(data);
            localStorage.setItem('elmariachi_submissions', JSON.stringify(submissions));
        } catch (error) {
            console.error('Error guardando datos:', error);
        }
    };

    initFormValidation();

    // ============ 8. ANIMACIONES AL SCROLLEAR (OTRAS SECCIONES) ============
    const initSectionAnimations = () => {
        const observerSections = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.nosotros, .menu, .galeria, .contacto').forEach(section => {
            observerSections.observe(section);
        });
    };

    initSectionAnimations();

});