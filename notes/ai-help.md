


Friday 27 nov. Leo W
I ran into a trouble of fetching data about a specific voting. 
Getting it from e.g. https://data.riksdagen.se/dokument/HE191015-1.json
The interesting part is found in the .html object, wich is a html-string...
I used Duck.ai with model GPT-6 Luna with the prompt:

PROMPT:
hur göra om ngt liknande:

"
<style>
td,th {
    text-align:left;
    padding:2 px;
    font-size:85%;
}
.vcenter{
    text-align:center;
}
</style>
<div class=\"votprot\"><h2>Omröstning: betänkande 2026/27:JuU9 Ett nytt brott och andra åtgärder mot människohandel, förslagspunkt 3</h2><h3>Ett nytt brott och andra åtgärder mot människohandel</h3><p></p><p>Datum: 2026-11-25 </p><table class=\"vottabell\" summary=\"Voteringsresultat\"><caption><b>Omröstning i sakfrågan</b><br />Utskottets förslag mot reservation 2 (SD)</caption><thead><tr class=\"vottabellrubik\"><th scope=\"col\">Parti</th><th scope=\"col\">Ja</th><th scope=\"col\">Nej</th><th scope=\"col\">Avstående</th><th scope=\"col\">Frånvarande</th></tr></thead><tbody><tr><th scope=\"row\" class=\"parti\">S</th><td class=\"rost_ja\">89</td><td class=\"rost_nej\">0</td><td class=\"rost_avstar\">0</td><td class=\"rost_franvarande\">10</td></tr><tr><th scope=\"row\" class=\"parti\">M</th><td class=\"rost_ja\">63</td><td class=\"rost_nej\">0</td><td class=\"rost_avstar\">0</td><td class=\"rost_franvarande\">7</td></tr><tr><th scope=\"row\" class=\"parti\">SD</th><td class=\"rost_ja\">0</td><td class=\"rost_nej\">54</td><td class=\"rost_avstar\">1</td><td class=\"rost_franvarande\">7</td></tr><tr><th scope=\"row\" class=\"parti\">V</th><td class=\"rost_ja\">1</td><td class=\"rost_nej\">0</td><td class=\"rost_avstar\">26</td><td class=\"rost_franvarande\">3</td></tr><tr><th scope=\"row\" class=\"parti\">C</th><td class=\"rost_ja\">22</td><td class=\"rost_nej\">0</td><td class=\"rost_avstar\">0</td><td class=\"rost_franvarande\">3</td></tr><tr><th scope=\"row\" class=\"parti\">KD</th><td class=\"rost_ja\">20</td><td class=\"rost_nej\">0</td><td class=\"rost_avstar\">0</td><td class=\"rost_franvarande\">2</td></tr><tr><th scope=\"row\" class=\"parti\">MP</th><td class=\"rost_ja\">0</td><td class=\"rost_nej\">0</td><td class=\"rost_avstar\">20</td><td class=\"rost_franvarande\">2</td></tr><tr><th scope=\"row\" cla


Till en json??
END PROMPT.

And got an answer:
ANSWER:
Ja. Om HTML:en redan finns som en sträng kan du parsa den i webbläsaren med DOMParser och sedan bygga ett vanligt JavaScript-objekt. JSON.stringify gör objektet till JSON-text om du behöver det.

js


function htmlTillJson(html) {
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

  return {
    rubrik: text(".votprot h2"),
    underrubrik: text(".votprot h3"),
    datum: datumRad?.replace(/^Datum:\s*/, "") ?? null,
    omrostning: text(".vottabell caption"),
    partier,
  };
}
Använd funktionen med HTML-strängen:

js


const html = `
<div class="votprot">
  <!-- klistra in hela HTML-svaret här -->
</div>
`;

const objekt = htmlTillJson(html);

console.log(objekt); // JavaScript-objekt
console.log(JSON.stringify(objekt, null, 2)); // JSON-text
Resultatet får ungefär den här strukturen:

json


{
  "rubrik": "Omröstning: betänkande 2026/27:JuU9 ...",
  "underrubrik": "Ett nytt brott och andra åtgärder mot människohandel",
  "datum": "2026-11-25",
  "omrostning": "Omröstning i sakfrågan Utskottets förslag mot reservation 2 (SD)",
  "partier": [
    {
      "parti": "S",
      "ja": 89,
      "nej": 0,
      "avstaende": 0,
      "franvarande": 10
    },
    {
      "parti": "M",
      "ja": 63,
      "nej": 0,
      "avstaende": 0,
      "franvarande": 7
    }
  ]
}
Klistra in hela HTML-svaret där exemplet visar det. Om strängen faktiskt slutar mitt i en tabellrad, som class="parti"..., kan den raden inte tolkas korrekt; funktionen hoppar över rader som saknar alla fem celler.
END_ANSWER

