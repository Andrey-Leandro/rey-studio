
"use strict";

/* REY´NAILS — CONFIGURAÇÃO */

const WHATSAPP = "5511924872004";

// Preços fictícios de demonstração.
// Confirme serviços e preços antes de publicar.

const SERVICES = [
  {
    id: "gel",
    name: "Alongamento em gel",
    price: 160,
    desc: "Comprimento e formato para combinar com seu estilo.",
    img: "https://images.unsplash.com/photo-1680540555907-c99c665a20b7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "banho",
    name: "Banho de gel",
    price: 100,
    desc: "Uma opção delicada para suas unhas naturais.",
    img: "https://images.unsplash.com/photo-1754799670410-b282791342c3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "esmaltacao",
    name: "Esmaltação em gel",
    price: 75,
    desc: "Cor, brilho e um acabamento especial.",
    img: "https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "manutencao",
    name: "Manutenção",
    price: 95,
    desc: "Retoques e cuidados com o alongamento.",
    img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "nailart",
    name: "Nail art",
    price: 35,
    desc: "Detalhes criativos para expressar sua personalidade.",
    img: "https://images.unsplash.com/photo-1754799670410-b282791342c3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "tradicional",
    name: "Manicure tradicional",
    price: 40,
    desc: "Cuidado clássico para mãos bem cuidadas.",
    img: "https://images.unsplash.com/photo-1680540555907-c99c665a20b7?auto=format&fit=crop&w=800&q=80"
  }
];

/* GALERIA ILUSTRATIVA */

const GALLERY = [
  {
    title: "Rosa delicado",
    category: "delicadas",
    img: "https://images.unsplash.com/photo-1680540555907-c99c665a20b7?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Toque clássico",
    category: "classicas",
    img: "https://images.unsplash.com/photo-1754799670410-b282791342c3?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Nail inspiration",
    category: "modernas",
    img: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Beleza natural",
    category: "delicadas",
    img: "https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Mood rosé",
    category: "modernas",
    img: "https://images.unsplash.com/photo-1754799670410-b282791342c3?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Detalhes clássicos",
    category: "classicas",
    img: "https://images.unsplash.com/photo-1680540555907-c99c665a20b7?auto=format&fit=crop&w=900&q=80"
  }
];

/* FUNÇÕES AUXILIARES */

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];

const brl = value =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);

const bookingDialog = $("#bookingDialog");
const lightbox = $("#lightbox");
const bookingService = $("#clientService");
const bookingDate = $("#clientDate");
const mobileNav = $("#mobileNav");
const toggleMenu = $("#menuToggle");

// Ativar controle das animações.
document.documentElement.classList.add("js");

/* DATA LOCAL */

function localTodayISO() {
  const d = new Date();

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${y}-${m}-${day}`;
}

/* MENU MOBILE */

function setMenu(open) {
  mobileNav.hidden = !open;

  toggleMenu.setAttribute(
    "aria-expanded",
    String(open)
  );

  toggleMenu.setAttribute(
    "aria-label",
    open ? "Fechar menu" : "Abrir menu"
  );
}

/* ABRIR AGENDAMENTO */

function openBooking(serviceId = "") {
  setMenu(false);

  $("#formError").hidden = true;

  bookingDate.min = localTodayISO();

  if (serviceId) {
    bookingService.value = serviceId;
  }

  if (!bookingDialog.open) {
    bookingDialog.showModal();
  }

  $("#clientName").focus();
}

/* IMAGEM SUBSTITUTA EM CASO DE ERRO */

function protectImage(img) {
  const markError = () => {
    img.parentElement?.classList.add("image-unavailable");
  };

  img.addEventListener("error", markError, {
    once: true
  });

  if (img.complete && img.naturalWidth === 0) {
    markError();
  }
}

/* CRIAR CARDS DOS SERVIÇOS */

function renderServices() {
  const grid = $("#servicesGrid");

  SERVICES.forEach(service => {
    const card = document.createElement("article");

    card.className = "service-card reveal";

    card.innerHTML = `
      <div class="service-photo image-frame">

        <img
          src="${service.img}"
          alt="Imagem ilustrativa de manicure"
          loading="lazy"
          decoding="async">

        <span class="photo-fallback" aria-hidden="true">
          Foto em breve ♡
        </span>

      </div>

      <div class="service-body">

        <div class="service-top">
          <h3>${service.name}</h3>

          <span class="price">
            ${brl(service.price)}*
          </span>
        </div>

        <p>${service.desc}</p>

        <button
          class="service-book"
          type="button"
          data-service="${service.id}">

          Quero agendar ↗

        </button>

      </div>
    `;

    grid.appendChild(card);

    protectImage($("img", card));

    const option = document.createElement("option");

    option.value = service.id;

    option.textContent =
      `${service.name} — ${brl(service.price)} (exemplo)`;

    bookingService.appendChild(option);
  });
}

/* GALERIA COM FILTROS */

function renderGallery(category = "todos") {
  const grid = $("#galleryGrid");

  grid.replaceChildren();

  GALLERY
    .filter(item =>
      category === "todos" ||
      item.category === category
    )
    .forEach(item => {
      const button = document.createElement("button");

      button.type = "button";

      button.className = "gallery-item image-frame";

      button.setAttribute(
        "aria-label",
        `Ampliar inspiração: ${item.title}`
      );

      button.innerHTML = `
        <img
          src="${item.img}"
          alt="Inspiração ilustrativa: ${item.title}"
          loading="lazy"
          decoding="async">

        <span class="photo-fallback" aria-hidden="true">
          Inspiração em breve ♡
        </span>

        <span class="gallery-plus" aria-hidden="true">
          +
        </span>

        <span class="gallery-label">
          ${item.title}
        </span>
      `;

      button.addEventListener("click", () => {
        openLightbox(item);
      });

      grid.appendChild(button);

      protectImage($("img", button));
    });
}

/* ABRIR FOTO AMPLIADA */

function openLightbox(item) {
  const image = $("#lightboxImage");

  image.src = item.img;

  image.alt =
    `Imagem de inspiração: ${item.title}`;

  $("#lightboxCaption").textContent =
    `${item.title} · Foto ilustrativa`;

  lightbox.showModal();
}

/* ENVIAR SOLICITAÇÃO PELO WHATSAPP */

function submitBooking(event) {
  event.preventDefault();

  const name = $("#clientName").value.trim();

  const service = SERVICES.find(
    s => s.id === bookingService.value
  );

  const date = bookingDate.value;
  const period = $("#clientPeriod").value;
  const notes = $("#clientNotes").value.trim();
  const error = $("#formError");

  error.hidden = true;

  if (!name || !service || !date || !period) {
    error.textContent =
      "Preencha os campos obrigatórios.";

    error.hidden = false;
    return;
  }

  if (date < localTodayISO()) {
    error.textContent =
      "Escolha hoje ou uma data futura.";

    error.hidden = false;
    return;
  }

  const [year, month, day] = date.split("-");

  const message = [
    "Olá, Rey´nails! Gostaria de solicitar um agendamento.",
    "",
    `Nome: ${name}`,
    `Serviço: ${service.name}`,
    `Data desejada: ${day}/${month}/${year}`,
    `Período: ${period}`,

    ...(notes
      ? [`Observações: ${notes}`]
      : []),

    "",
    "Pode me confirmar a disponibilidade e o preço atualizado? Obrigada!"
  ].join("\n");

  // Navega diretamente para o WhatsApp.
  // A cliente precisa enviar a mensagem.
  // Nenhuma reserva é confirmada automaticamente.

  window.location.assign(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`
  );
}

/* ANIMAÇÕES DURANTE A ROLAGEM */

function initReveal() {
  const elements = $$(".reveal");

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    elements.forEach(element => {
      element.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: .07,
    rootMargin: "0px 0px -18px 0px"
  });

  elements.forEach(element => {
    observer.observe(element);
  });
}

/* VOLTAR AO TOPO — CORREÇÃO DEFINITIVA */

function scrollToAbsoluteTop(event) {
  event.preventDefault();

  setMenu(false);

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: reduced ? "auto" : "smooth"
  });
}

/* INICIALIZAÇÃO */

renderServices();
renderGallery();

protectImage($(".hero-frame img"));

initReveal();

$("#year").textContent =
  new Date().getFullYear();

bookingDate.min = localTodayISO();

/* EVENTOS DO MENU */

toggleMenu.addEventListener("click", () => {
  setMenu(
    toggleMenu.getAttribute("aria-expanded") !== "true"
  );
});

$$(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    setMenu(false);
  });
});

// Fecha o menu ao voltar para o desktop.

window.addEventListener("resize", () => {
  if (window.innerWidth > 740) {
    setMenu(false);
  }
});

/* VOLTAR AO TOPO */

// Funciona no logo do cabeçalho,
// no logo do rodapé e no botão
// "Voltar ao topo".

$$("[data-scroll-top]").forEach(link => {
  link.addEventListener(
    "click",
    scrollToAbsoluteTop
  );
});

/* BOTÕES DE AGENDAMENTO */

document.addEventListener("click", event => {
  const button = event.target.closest("[data-book]");

  const serviceButton =
    event.target.closest("[data-service]");

  if (button) {
    openBooking();
  }

  if (serviceButton) {
    openBooking(
      serviceButton.dataset.service
    );
  }
});

/* FECHAR AGENDAMENTO */

$("#closeBooking").addEventListener("click", () => {
  bookingDialog.close();
});

/* ENVIAR FORMULÁRIO */

$("#bookingForm").addEventListener(
  "submit",
  submitBooking
);

/* FILTROS DA GALERIA */

$$("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {

    $$("[data-filter]").forEach(item => {
      const active = item === button;

      item.classList.toggle("active", active);

      item.setAttribute(
        "aria-pressed",
        String(active)
      );
    });

    renderGallery(button.dataset.filter);
  });
});

/* FECHAR GALERIA */

$("#closeLightbox").addEventListener("click", () => {
  lightbox.close();
});

/* FECHAR MODAIS CLICANDO FORA */

[bookingDialog, lightbox].forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});

/* EFEITO DE SOMBRA NO CABEÇALHO */

window.addEventListener("scroll", () => {
  $(".site-header").classList.toggle(
    "scrolled",
    window.scrollY > 16
  );
}, {
  passive: true
});
