/* ==========================================================================
   RODRIGO MARCELO — PORTFOLIO — behaviour
   ========================================================================== */

(function () {
  "use strict";

  var PROJECTS = {
    realizacao: [
      {
        title: "O Que Cada Rapaz Devia Saber",
        role: "Argumentista e Realizador · Curta-Metragem",
        year: "A DECORRER",
        type: "drive-file",
        id: "1vkS9yi2iX_gDxmae5RpLQ2gPlpJy-lIZ",
        link: "https://drive.google.com/file/d/1vkS9yi2iX_gDxmae5RpLQ2gPlpJy-lIZ/view?usp=sharing"
      },
      {
        title: "A SIP — Série de Retratos",
        role: "Realizador · Série Visual / Retratos",
        year: "A DECORRER",
        type: "drive-folder",
        link: "https://drive.google.com/drive/folders/1GW27a2O3W2NGiyMPXvdlALV_rjMlrI-g?usp=sharing"
      },
      {
        title: "Olha e Não Olhes",
        role: "Realizador · Curta-Metragem",
        year: "2026",
        type: "drive-file",
        id: "13WKmCuhGItqmiAl_KWcwHrY4vpTF46tl",
        link: "https://drive.google.com/file/d/13WKmCuhGItqmiAl_KWcwHrY4vpTF46tl/view?usp=sharing"
      },
      {
        title: "Denial — Máquina",
        role: "Realizador · Videoclipe",
        year: "2024",
        type: "drive-file",
        id: "1wYVyjww1C4QXH9x5TNaErwOWlfM1KiH4",
        link: "https://drive.google.com/file/d/1wYVyjww1C4QXH9x5TNaErwOWlfM1KiH4/view?usp=sharing"
      }
    ],
    design: [
      {
        title: "A Noite Em Que Aprendi a Voar",
        role: "Production Designer · Curta-Metragem",
        year: "2026",
        type: "youtube",
        id: "1P8BEFIPZhk",
        link: "https://youtu.be/1P8BEFIPZhk?si=XlbynJnZefh_LQoM"
      },
      {
        title: "Waking Up Should Be My One And Only Responsibility",
        role: "Videoclipe",
        year: "2026",
        type: "youtube",
        id: "JKUCUwgcsx4",
        link: "https://youtu.be/JKUCUwgcsx4?si=o6e-78b5DInEYVom"
      },
      {
        title: "Auto de Fé",
        role: "Chefe Decorador e Aderecista · Curta-Metragem",
        year: "2025",
        type: "drive-file",
        id: "1Z7o0W-qapAwEKeGDrrour31WwShEvtcF",
        link: "https://drive.google.com/file/d/1Z7o0W-qapAwEKeGDrrour31WwShEvtcF/view?usp=sharing"
      },
      {
        title: "50 Anos Gorila",
        role: "Publicidade",
        year: "2025",
        type: "youtube",
        id: "-Jte4ryqd2k",
        link: "https://youtu.be/-Jte4ryqd2k?si=hW7k6wFHV2Yz1OFt"
      },
      {
        title: "Já Não Era Sem Tempo",
        role: "Cenógrafo · Transmissão em Direto",
        year: "2024",
        type: "youtube-live",
        id: "Px5uShslcjM",
        link: "https://www.youtube.com/live/Px5uShslcjM?si=hu7TrumzV_Cx7Huk"
      }
    ]
  };

  function thumbFor(project) {
    if (project.type === "youtube" || project.type === "youtube-live") {
      return "https://img.youtube.com/vi/" + project.id + "/hqdefault.jpg";
    }
    if (project.type === "drive-file") {
      return "https://drive.google.com/thumbnail?id=" + project.id + "&sz=w1000";
    }
    return null;
  }

  function embedFor(project) {
    if (project.type === "youtube" || project.type === "youtube-live") {
      return "https://www.youtube.com/embed/" + project.id + "?autoplay=1&rel=0";
    }
    if (project.type === "drive-file") {
      return "https://drive.google.com/file/d/" + project.id + "/preview";
    }
    return null;
  }

  function buildCard(project) {
    var card = document.createElement("div");
    card.className = "card";

    var media = document.createElement("div");
    media.className = "card__media";

    var thumb = thumbFor(project);
    if (thumb) {
      var img = document.createElement("img");
      img.src = thumb;
      img.alt = project.title;
      img.loading = "lazy";
      img.onerror = function () {
        media.innerHTML = '<div class="card__placeholder">' + project.title + "</div>";
      };
      media.appendChild(img);
    } else {
      media.innerHTML = '<div class="card__placeholder">' + project.title + "</div>";
    }

    var yearBadge = document.createElement("span");
    yearBadge.className = "card__year";
    yearBadge.textContent = project.year;
    media.appendChild(yearBadge);

    var play = document.createElement("div");
    play.className = "card__play";
    play.textContent = project.type === "drive-folder" ? "▶ ABRIR PASTA" : "▶ VER";
    media.appendChild(play);

    var body = document.createElement("div");
    body.className = "card__body";
    body.innerHTML =
      '<div class="card__title">' + project.title + "</div>" +
      '<div class="card__role">' + project.role + "</div>";

    card.appendChild(media);
    card.appendChild(body);

    card.addEventListener("click", function () {
      if (project.type === "drive-folder") {
        window.open(project.link, "_blank", "noopener");
      } else {
        openModal(project);
      }
    });

    return card;
  }

  function renderGrid(id, list) {
    var grid = document.getElementById(id);
    if (!grid) return;
    list.forEach(function (p) {
      grid.appendChild(buildCard(p));
    });
  }

  renderGrid("grid-realizacao", PROJECTS.realizacao);
  renderGrid("grid-design", PROJECTS.design);

  /* ---------- modal ---------- */
  var modal = document.getElementById("modal");
  var modalMedia = document.getElementById("modalMedia");
  var modalTitle = document.getElementById("modalTitle");
  var modalRole = document.getElementById("modalRole");
  var modalStamp = document.getElementById("modalStamp");

  function openModal(project) {
    var embed = embedFor(project);
    modalMedia.innerHTML = embed
      ? '<iframe src="' + embed + '" allow="autoplay; fullscreen" allowfullscreen></iframe>'
      : "";
    modalTitle.textContent = project.title;
    modalRole.textContent = project.role + " — " + project.year;
    modalStamp.onclick = function () {
      window.open(project.link, "_blank", "noopener");
    };
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modalMedia.innerHTML = "";
    document.body.style.overflow = "";
  }

  modal.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  /* ---------- burger menu ---------- */
  var burger = document.getElementById("burger");
  var header = document.querySelector(".site-header");
  if (burger) {
    burger.addEventListener("click", function () {
      header.classList.toggle("menu-open");
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("menu-open");
      });
    });
  }

  /* ---------- custom cursor ---------- */
  var dot = document.getElementById("cursorDot");
  var ring = document.getElementById("cursorRing");
  var isTouch = matchMedia("(hover: none), (pointer: coarse)").matches;
  if (dot && ring && !isTouch) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
    });
    (function raf() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(raf);
    })();
    document.querySelectorAll("a, button, .card, .tag").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        ring.style.width = "54px"; ring.style.height = "54px"; ring.style.borderColor = "var(--pink)";
      });
      el.addEventListener("mouseleave", function () {
        ring.style.width = "34px"; ring.style.height = "34px"; ring.style.borderColor = "var(--yellow)";
      });
    });
  }

  /* ---------- fake visit counter, self-aware kitsch ---------- */
  var counterEl = document.getElementById("visitCount");
  if (counterEl) {
    var target = 1337 + Math.floor(Math.random() * 42);
    var start = Math.max(0, target - 260);
    var current = start;
    var timer = setInterval(function () {
      current += 7;
      if (current >= target) { current = target; clearInterval(timer); }
      counterEl.textContent = String(current).padStart(7, "0");
    }, 40);
  }
})();
