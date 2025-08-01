# BikeDiagram Component

Ce dossier contient la version refactorisée du composant BikeDiagram, divisé en plusieurs composants plus petits et maintenables.

## Structure des fichiers

- **`index.tsx`** - Composant principal qui orchestre tous les sous-composants
- **`constants.ts`** - Constantes et configuration des zones de composants
- **`BikeSVG.tsx`** - Conteneur principal SVG
- **`SVGFilters.tsx`** - Définitions des filtres et gradients SVG
- **`BikeFrame.tsx`** - Dessin du cadre du vélo amélioré
- **`BikeWheels.tsx`** - Dessin des roues avec rayons détaillés
- **`BikeComponents.tsx`** - Autres composants (guidon, selle, pédales, etc.)
- **`InteractiveAreas.tsx`** - Zones cliquables et interactives
- **`BikeTooltip.tsx`** - Tooltip d'information
- **`ComponentLegend.tsx`** - Légende des statuts de compatibilité
- **`BikeDiagram.css`** - Styles et animations personnalisées

## Améliorations apportées

### 🎨 **Design du vélo**

- Vélo plus réaliste et détaillé
- Cadre avec proportions correctes
- Roues avec rayons et détails
- Composants ajoutés : dérailleur, freins, cassette, etc.
- Style cyberpunk conservé mais plus élégant

### 🔧 **Architecture**

- **Modularité** : Code divisé en composants réutilisables
- **Maintenabilité** : Chaque composant a une responsabilité unique
- **Performance** : Optimisations et lazy loading
- **TypeScript** : Typage strict et interfaces claires

### 🎯 **Zones interactives**

- Coordonnées ajustées pour le nouveau design
- Feedback visuel amélioré
- Animations fluides et optimisées
- Statuts de compatibilité avec couleurs distinctes

### 🎭 **Expérience utilisateur**

- Tooltip informatif et animé
- Légende claire et moderne
- Responsive design
- Accessibilité améliorée

## Utilisation

```tsx
import { BikeDiagram } from "@/components/BikeDiagram";

<BikeDiagram
  selectedComponents={selectedComponents}
  onComponentClick={handleComponentClick}
  compatibilityResults={compatibilityResults}
/>;
```

## Configuration des zones

Les zones interactives sont définies dans `constants.ts` avec leurs coordonnées et catégories correspondantes.

## Styles et animations

Les animations et styles personnalisés sont définis dans `BikeDiagram.css` pour une meilleure performance et séparation des préoccupations.
