# NPM Build-Prozesse - Erklärung

## package.json
Hausarbeit Vorgabe
```json
{
	"start": "node index.js",
	"clean": "npm run clean:dist && rm -rf ./node_modules",
	"lint": "semistandard --fix Main.mjs",
// projekt erzeugen
	"debug": "",
// erzeugen und minifizieren
	"build": "",
}
```
## Allgemein
Erzeugen = JS-Dateien kombinieren
Minifikation = JS-Dateien und CSS-less verkleinern
- => terser input.js > bundle.js und lessc clean less > css

## Ablauf
1. Fehlerprüfung von JS

1. 1. Javascript 
1. 1. 1. semistandard
1. 1. 2. eslint

1. 2. CSS-less
1. 2. 1. lesshint

2. Kombinierung
2. 1. Javascript
2. 1. 1. esbuild
2. 2. CSS-less kompilieren
2. 2. 1. lessc

3. Minifizierung
3. 1. Javascript
3. 1. 1. terser
3. 2. less-CSS
3. 2. 1. lessc --clean-css

4. Fertig

## Erläuterung Einzelner Befehle
#### CSS-less auf Fehler prüfen
- `"checkless": "lesshint client/src/styles"` 
#### Kompilieren von CSS-less
- `"compileless": "lessc webdev22/client/src/styles/custom.less webdev22/client/dist/styles/custom.css"`
#### Minifizierung von CSS-less
- `"minless": "lessc --clean-css webdev22/client/src/styles/custom.less webdev22/client/dist/styles/custom.min.css"`

### Minifiziert und obfuskiert Bundle.js
- `"minjs": "terser client/dist/bundle.js --compress --mangle -o client/dist/bundle.min.js"`

### Automatische Code-Formatierung mit lesbarer Ausgabe
- `"checksemi": "semistandard --fix --verbose Main.mjs | snazzy"`

### kombiniert alle JS-Dateien zu einer zusammen
- `"combinejs": "esbuild client/src/js/Main.mjs --log-level=warning --bundle --outfile=client/dist/bundle.js"`

### Überprüfung der Code-Qualität
- `"checklint": "eslint client/src/js/** server/**"`

Zusammenfassung:
```json
{
	"checkless": "lesshint client/src/styles",
	"compileless": "lessc webdev22/client/src/styles/custom.less webdev22/client/dist/styles/custom.css",
	"minless": "lessc --clean-css webdev22/client/src/styles/custom.less webdev22/client/dist/styles/custom.min.css",
	"minjs": "terser client/dist/bundle.js --compress --mangle -o client/dist/bundle.min.js",
	"checksemi": "semistandard --fix --verbose Main.mjs | snazzy",
	"combinejs": "esbuild client/src/js/Main.mjs --log-level=warning --bundle --outfile=client/dist/bundle.js",
	"checklint": "eslint client/src/js/** server/**"
}
```

## Gitlab-Zeug

Gitlab soll mithilfe von CI/CD kombinieren und minifizieren.
Code wird nur durch den Entwickler in der lokalen IDE überprüft.

```bash
npm run compileless
npm run combinejs
npm run minless
npm run minjs
```

