# Alles zum Bundling - Zusammenfassung
Details siehe [Skript 4 Tools im Entwicklungsprozess](https://studip.hochschule-trier.de/sendfile.php?type=0&file_id=6057ba18b082917b66654c91ef10f0d1&file_name=Web-Entwicklung+-+04+-+Tools+im+Entwicklungsprozess.pdf")

## Erzeugung der Projektstruktur
manuell gegeben

## Überprüfung der Code-Qualität
STYLE-GUIDES ist: Code-Formatierung, Wahl von Bezeichnern, Groß- /Kleinschreibung
LINTING ist: Einhaltung von Code-Konventionen
ES-Lint:
`npm install -D eslint eslint-plugin-sonarjs`
`eslint --init`
### Semistandard Regelsatz: (Einhaltung der) Regeln von Javascript & Am Ende einer Zeile muss ein Semikolon stehen
Sonar.JS erkennt weitere Bugs und gibt Warnungen / Tipps
`npm install -D semistandard snazzy`
`semistandard --fix Main.mjs`
Snazzy übernimmt Formatierung der Ausgabe von eslint

## Präprozessoren
CSS-less-Präprozessoren
Less Präprozessor
`npm install -D less`
Linting für less
`npm install -D lesshint`
`lesshint ( --reporter lesshint-reporter-stylish) client/src/styles`
Minifikation von less-CSS-Dateien
`npm i -D less-plugin-clean-css`
`lessc --clean-css [files]`


## Bundling, Minifikation und Obfuskation
esbuild: kombiniert alle JS-Dateien zu einer zusammen

`npm i -D esbuild`
```bash
esbuild client/src/js/Main.mjs
	--log-level=warning
	--bundle
	--outfile=client/dist/bundle.js
```

Minifikation: Terser & Obfuskation
`npm i -D terser`
```bash
terser client/dist/bundle.js
	--compress // Minifikation
	--mangle // Obfuskation
	-o client/dist/bundle.js // Output
```

## Build- Tools
### npm
`npm run [befehls-name]`
