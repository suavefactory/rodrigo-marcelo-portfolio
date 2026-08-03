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
        year: "A decorrer",
        type: "drive-file",
        id: "1vkS9yi2iX_gDxmae5RpLQ2gPlpJy-lIZ",
        link: "https://drive.google.com/file/d/1vkS9yi2iX_gDxmae5RpLQ2gPlpJy-lIZ/view?usp=sharing"
      },
      {
        title: "A SIP — Série de Retratos",
        role: "Realizador · Série Visual / Retratos",
        year: "A decorrer",
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
      return "https://drive.google.com/thumbnail?id=" + project.id + "&sz=w200";
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

  function buildRow(project) {
    var row = document.createElement("div");
    row.className = "row";

    var thumb = thumbFor(project);
    if (thumb) {
      var img = document.createElement("img");
      img.className = "row__thumb";
      img.src = thumb;
      img.alt = project.title;
      img.loading = "lazy";
      img.onerror = function () {
        var fb = document.createElement("div");
        fb.className = "row__thumb-fallback";
        fb.textContent = project.title;
        img.replaceWith(fb);
      };
      row.appendChild(img);
    } else {
      var fallback = document.createElement("div");
      fallback.className = "row__thumb-fallback";
      fallback.textContent = project.title;
      row.appendChild(fallback);
    }

    var year = document.createElement("span");
    year.className = "row__year";
    year.textContent = project.year;
    row.appendChild(year);

    var body = document.createElement("div");
    body.className = "row__body";
    body.innerHTML =
      '<div class="row__title">' + project.title + "</div>" +
      '<div class="row__role">' + project.role + "</div>";
    row.appendChild(body);

    var btn = document.createElement("span");
    btn.className = "btn btn--outline row__btn";
    btn.textContent = project.type === "drive-folder" ? "Abrir pasta" : "Ver";
    row.appendChild(btn);

    row.addEventListener("click", function () {
      if (project.type === "drive-folder") {
        window.open(project.link, "_blank", "noopener");
      } else {
        openModal(project);
      }
    });

    return row;
  }

  function renderList(id, list) {
    var container = document.getElementById(id);
    if (!container) return;
    list.forEach(function (p) {
      container.appendChild(buildRow(p));
    });
  }

  renderList("list-realizacao", PROJECTS.realizacao);
  renderList("list-design", PROJECTS.design);

  /* ---------- modal ---------- */
  var modal = document.getElementById("modal");
  var modalMedia = document.getElementById("modalMedia");
  var modalTitle = document.getElementById("modalTitle");
  var modalRole = document.getElementById("modalRole");
  var modalOriginal = document.getElementById("modalOriginal");

  function openModal(project) {
    var embed = embedFor(project);
    modalMedia.innerHTML = embed
      ? '<iframe src="' + embed + '" allow="autoplay; fullscreen" allowfullscreen></iframe>'
      : "";
    modalTitle.textContent = project.title;
    modalRole.textContent = project.role + " — " + project.year;
    modalOriginal.href = project.link;
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
})();
