export function parseHtmlToJson(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");

  const text = (selector) =>
    doc.querySelector(selector)?.textContent.trim() ?? null;

  const datumRad = [...doc.querySelectorAll(".votprot p")]
    .map((p) => p.textContent.trim())
    .find((p) => p.startsWith("Datum:"));

  const partier = [...doc.querySelectorAll(".vottabell tbody tr")]
    .map((rad) => {
      const celler = [...rad.querySelectorAll("th, td")];
      if (celler.length < 5) return null;

      return {
        parti: celler[0].textContent.trim(),
        ja: Number(celler[1].textContent.trim()),
        nej: Number(celler[2].textContent.trim()),
        avstaende: Number(celler[3].textContent.trim()),
        franvarande: Number(celler[4].textContent.trim()),
      };
    })
    .filter(Boolean);

  
  const ledamoter = [...doc.querySelectorAll("table.votering tr")]
    .slice(1) // hoppa över rubrikraden
    .map((rad) => {
      const celler = [...rad.querySelectorAll("th, td")]
        .map((cell) => cell.textContent.trim());

      if (celler.length < 6) return null;

      return {
        namn: celler[0],
        parti: celler[1],
        valkrets: celler[2],
        bank: Number(celler[3]),
        avser: celler[4],
        rost: celler[5],
      };
    })
    .filter(Boolean);

  return {
    rubrik: text(".votprot h2"),
    underrubrik: text(".votprot h3"),
    datum: datumRad?.replace(/^Datum:\s*/, "") ?? null,
    omrostning: text(".vottabell caption"),
    partier,
    ledamoter,
  };
}



