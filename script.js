/* plain archive list — no cards, no modal, just links, like the reference. */
(function () {
  "use strict";

  var PROJECTS = [
    { title: "O Que Cada Rapaz Devia Saber", role: "Argumentista e Realizador, Curta-Metragem", year: "a decorrer", link: "https://drive.google.com/file/d/1vkS9yi2iX_gDxmae5RpLQ2gPlpJy-lIZ/view?usp=sharing" },
    { title: "A SIP — Série de Retratos", role: "Realizador, Série Visual", year: "a decorrer", link: "https://drive.google.com/drive/folders/1GW27a2O3W2NGiyMPXvdlALV_rjMlrI-g?usp=sharing" },
    { title: "Olha e Não Olhes", role: "Realizador, Curta-Metragem", year: "2026", link: "https://drive.google.com/file/d/13WKmCuhGItqmiAl_KWcwHrY4vpTF46tl/view?usp=sharing" },
    { title: "A Noite Em Que Aprendi a Voar", role: "Production Designer, Curta-Metragem", year: "2026", link: "https://youtu.be/1P8BEFIPZhk?si=XlbynJnZefh_LQoM" },
    { title: "Waking Up Should Be My One And Only Responsibility", role: "Videoclipe", year: "2026", link: "https://youtu.be/JKUCUwgcsx4?si=o6e-78b5DInEYVom" },
    { title: "Auto de Fé", role: "Chefe Decorador e Aderecista, Curta-Metragem", year: "2025", link: "https://drive.google.com/file/d/1Z7o0W-qapAwEKeGDrrour31WwShEvtcF/view?usp=sharing" },
    { title: "50 Anos Gorila", role: "Publicidade", year: "2025", link: "https://youtu.be/-Jte4ryqd2k?si=hW7k6wFHV2Yz1OFt" },
    { title: "Denial — Máquina", role: "Realizador, Videoclipe", year: "2024", link: "https://drive.google.com/file/d/1wYVyjww1C4QXH9x5TNaErwOWlfM1KiH4/view?usp=sharing" },
    { title: "Já Não Era Sem Tempo", role: "Cenógrafo, Transmissão em Direto", year: "2024", link: "https://www.youtube.com/live/Px5uShslcjM?si=hu7TrumzV_Cx7Huk" }
  ];

  var archive = document.getElementById("archive");
  PROJECTS.forEach(function (p) {
    var line = document.createElement("p");
    var a = document.createElement("a");
    a.href = p.link;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = p.role + " - " + p.title + " (" + p.year + ")";
    line.appendChild(a);
    archive.appendChild(line);
  });
})();
