# Alles zum Bundling Zusammenfassung
    Details siehe Skript 4 Tools im Entwicklungsprozess
## Erzeugung der Projektstruktur
	manuell gegeben
## Überprüfung der Code- Qualität
	STYLE-GUIDES ist: Code-Formatierung, Wahl von Bezeichnern, Groß- /Kleinschreibung
	LINTING ist: Einhaltung von Code-Konventionen
	Semistandard Regelsatz: (Einhaltung der) Regeln von Javascript & Am
                                Ende einer Zeile muss ein Semikolon stehen
		npm install -D semistandard snazzy
		-> semistandard --fix Main.mjs
	Snazzy übernimmt Formatierung der Ausgabe von eslint
    ES-Lint: (veraltet)
		 npm install -D eslint eslint-plugin-sonarjs
		 eslint --init
## Präprozessoren
	CSS-less-Präprozessoren
		npm install -D less
		npm install -D lesshint // Linting fuer less
			-> lesshint ( --reporter lesshint- reporter- stylish) client/src/styles
		less-plugin-clean-css // Minifikation von less-CSS-Dateien
			-> lessc --clean-css [files]
## Bundling, Minifikation und Obfuskation
	esbuild: kombiniert alle JS-Dateien zu einer zusammen
		npm i -D esbuild
			-> esbuild client/src/js/Main.mjs
				--log-level=warning
				--bundle
				--outfile=client/dist/bundle.js
	Minifikation: Terser & Obfuskation
		npm i -D terser
			terser client/dist/bundle.js
				--compress // Minifikation
				--mangle // Obfuskation
				-o client/dist/bundle.js // Output
## Unit- Tests
    (optional)
## Build- Tools
	npm run [befehls-name]

