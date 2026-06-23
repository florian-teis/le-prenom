# Le Prénom

Site web du restaurant bistronomique **Le Prénom** — Les Sables-d'Olonne, Vendée.

> *« Ici, on s'appelle par son prénom. »*

## 🌐 Voir le site

Site statique (HTML / CSS / JavaScript, sans framework). Il peut être publié tel quel
sur n'importe quel hébergeur statique (GitHub Pages, Netlify, OVH…).

## 📁 Structure

```
le-prenom/
├── index.html        ← page d'accueil
├── lamaison.html     ← l'esprit de la maison (histoire, équipe, philosophie)
├── carte.html        ← la carte
├── styles.css        ← styles partagés
├── reservation.js    ← bouton « Réserver » (voir ci-dessous)
└── assets/           ← photos optimisées, logo et favicons
```

## 🎨 Identité

- Polices Google Fonts : **Playfair Display** + **Inter**
- Palette : crème chaleureux · bleu du logo `#355292` · accents terracotta `#bf6a43`
- Logo décliné en `logo-color.png` (fonds clairs) et `logo-white.png` (fonds sombres)

## 🔖 Réservation

Le bouton « Réserver » affiche pour l'instant une fenêtre *« réservation en ligne bientôt
disponible »* avec le téléphone. Pour brancher une vraie plateforme (Tableo, TheFork,
Zenchef…), ouvrez `reservation.js` et renseignez **une seule ligne** :

```js
const RESERVATION_URL = 'https://…'; // lien de la plateforme
```

Dès qu'une URL est présente, la réservation s'ouvre dans une fenêtre intégrée au site.

## ✏️ Mettre à jour

- **Texte / carte** : ouvrir le fichier `.html` correspondant.
- **Photo** : remplacer le fichier dans `assets/` en gardant le même nom.
- **Mise en ligne** : retirer la balise `<meta name="robots" content="noindex, nofollow">`
  (présente dans chaque page pendant la phase démo) et adapter les URL `canonical` /
  Open Graph au domaine final.

## ℹ️ Infos à confirmer

Données reprises de sources publiques en ligne — **à valider par le restaurant** :

- Adresse : 261 Avenue François Mitterrand, 85100 Les Sables-d'Olonne *(code postal 85100/85340 à confirmer)*
- Téléphone : 07 67 25 20 31
- Horaires : déjeuner 7j/7 (12h–14h30), dîner vendredi & samedi (19h–22h)
- Réseaux : Instagram [@restaurantleprenom](https://www.instagram.com/restaurantleprenom/) · Facebook [Restaurant Le Prénom](https://www.facebook.com/RestaurantLePrenom/)

---

© Le Prénom — 261 Avenue François Mitterrand, 85100 Les Sables-d'Olonne
