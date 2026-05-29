# AI Gekozen - Presentaties

Herbruikbare HTML-presentaties voor AI Gekozen. Fullscreen schaalbaar, lokaal te presenteren vanaf laptop, online te delen via GitHub Pages.

## Structuur

```
/
  index.html                  Overzichtspagina met alle beschikbare presentaties
  README.md
  shared/
    styles.css                Gedeelde AI Gekozen styling
    presentation.js           Slide-engine: scaling, keyboard, hash routing
  mkb-rotterdam/
    index.html                Presentatie voor MKB Rotterdam (9 slides)
```

## Lokaal testen

1. Pak de ZIP uit
2. Open de map
3. Ga in de map `mkb-rotterdam/`
4. Dubbelklik `index.html`
5. Browser opent het bestand via `file://`
6. Druk op pijl rechts of spatie om door slides te navigeren
7. Druk F voor fullscreen

Werkt zonder server, zonder internet, zonder build step.

## Presenteren

Navigatie:
- Volgende slide: pijl rechts, spatie, enter, page down, klik rechts op het scherm
- Vorige slide: pijl links, backspace, page up, klik links op het scherm
- Eerste slide: Home
- Laatste slide: End
- Fullscreen toggle: F
- Verlaten fullscreen: Escape

Direct naar een specifieke slide via URL: `mkb-rotterdam/#slide-5`

## Techniek

- 16:9 canvas van 1920x1080 pixels
- Automatische scaling via `transform: scale()`
- System serif + system sans, geen externe fonts of CDN's
- Geen build tools, geen dependencies
- Werkt offline

## Nieuwe presentatie toevoegen

1. Maak een nieuwe folder, bijvoorbeeld `/klantnaam/`
2. Kopieer `mkb-rotterdam/index.html` als startpunt
3. Pas titel en slide-content aan
4. De `../shared/styles.css` en `../shared/presentation.js` blijven gelijk
5. Voeg de presentatie toe aan de lijst in de root `index.html`

## Deploy via GitHub Pages

1. Push deze structuur naar `aigekozen/presentaties`
2. Settings - Pages - Source: branch `main`, folder `/ (root)`
3. Voeg in repo-root een `CNAME` bestand toe met inhoud: `presentaties.aigekozen.nl`
4. DNS bij domeinprovider: CNAME-record `presentaties` naar `aigekozen.github.io`
5. Vink "Enforce HTTPS" aan in GitHub Pages settings

Na deploy:
- Overzicht: `https://presentaties.aigekozen.nl/`
- MKB Rotterdam: `https://presentaties.aigekozen.nl/mkb-rotterdam/`
