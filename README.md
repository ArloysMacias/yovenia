# Yovenia

Läsbar portfölj och examensarbete om **självbestämmande inom LSS** (gruppbostad).

Statisk webbplats — ingen inloggning, ingen backend.

## Öppna i IntelliJ IDEA

1. **File → Open** och välj mappen `yovenia` (denna repo-root).
2. Vänta tills projektet indexeras (webbmodul `yovenia.iml`).
3. Kör **Serve Yovenia**:
   - **Run → Serve Yovenia**, eller gröna play-knappen om konfigurationen är vald.
4. Öppna i webbläsaren: **http://localhost:8765/** (eller den port som skriptet visar).

Alternativ utan run-konfiguration:

```bash
chmod +x serve.sh
./serve.sh
```

Om port **8765** redan används väljer `serve.sh` automatiskt nästa lediga port. Du kan också ange en egen: `PORT=9000 ./serve.sh`.

Du kan också högerklicka på `index.html` → **Open in Browser** (relativa länkar mellan sidor fungerar bäst med servern ovan).

## Sidor

| Fil | Innehåll |
| --- | --- |
| `index.html` | Portfölj — Yovenia |
| `examensarbete.html` | Hela examensarbetet med innehållsförteckning |

## Publicering (GitHub Pages)

Vid push till `main` deployas webbplatsen via GitHub Actions. Aktivera **Pages** i repo-inställningarna med källa **GitHub Actions** om det inte redan är gjort.
