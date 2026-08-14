# Shopping List Manager

**Live Demo:** https://olayinka-olaniran.github.io/Assessment_Project_5/
**Repository:** https://github.com/Olayinka-Olaniran/Assessment_Project_5

A persistent shopping list app with categories, duplicate detection, editing, and bulk delete.

## Overview

This project (Weekly Assessment 5) lets you add items with a name, category (Food, Electronics, Clothes), and quantity, then browse the list filtered by category. Items persist across page reloads via `localStorage`, and adding a name that already exists on the list triggers a duplicate warning instead of silently creating a second entry.

## Features

- Add items with name, category, and amount
- Duplicate-item detection with a warning dialog before adding
- Filter the displayed list by category (All / Food / Electronics / Clothes)
- Inline editing of existing items
- Select-and-delete multiple items, or clear the entire list
- Live item count / duplicate tracker display
- Data persisted in `localStorage`, with defensive parsing so a corrupted/empty store doesn't crash the page

## Tech Stack

- HTML5
- CSS3 (flexbox layout)
- Vanilla JavaScript (DOM manipulation, `localStorage`, array filtering)

## Project Structure

```
Assessment_Project_5/
├── index.html               # Add-item form + shopping list display
├── WeeklyAssessment5.js      # List CRUD, filtering, duplicate + persistence logic
└── WeeklyAssessment5.css     # Styling
```

## How to Run

```bash
# Option 1: open directly
open index.html

# Option 2: serve locally
npx serve .
```

Add an item, filter by category, and try adding a duplicate name to see the warning flow.
