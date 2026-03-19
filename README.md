# React Developer Technical Task

## Overview

This project is a small demo application that showcases three reusable components:

* DataGrid
* Timeline
* Event Form (Add / Edit)

The goal was to build clean, simple, and reusable components while keeping the code easy to understand and maintain.

---

## Tech Stack

* React + TypeScript
* Vite
* Zustand (state management)
* React Hook Form + Zod (form handling & validation)
* Day.js (date handling)

---

## Features

### DataGrid

* Client-side pagination
* Sorting by columns
* Simple text filtering
* Configurable columns
* Basic loading / empty states (can be extended)
* Open edit form for events (Double-click on row)

### Timeline

* Events grouped by day
* Keyboard navigation (Up / Down arrows)
* Accessible with screen reader support (aria-live announcements)

### Event Form

* Controlled inputs
* Validation (required title, valid date)
* Error messages
* Focus on invalid fields
* Add new events

### App Integration

* Shared state between components using Zustand
* Adding a new event updates both the DataGrid and Timeline
* Modal-based form for better user experience

---

## Design Decisions

### State Management

I used Zustand because it is lightweight and simple. For this task, a global store helps keep the DataGrid and Timeline in sync without adding too much complexity.

### Component Structure

Each feature is separated into its own component (DataGrid, Timeline, EventForm) to keep the code modular and reusable.

### Accessibility

Basic accessibility features were added, especially in the Timeline:

* Keyboard navigation (arrow keys)
* Focus management
* Screen reader announcements using `aria-live`

### Simplicity First

I focused on keeping the implementation simple and readable instead of over-engineering the solution. The goal was to clearly show structure and decision-making.

---

## Possible Improvements

If I had more time, I would:

* Add more advanced filtering (per column)
* Improve accessibility (focus trapping in modal, better ARIA roles)
* Add animations for better UX
* Write unit and integration tests
* Improve styling with a design system or Tailwind

---

## How to Run

```bash
npm install
npm run dev
```

---

## Final Notes

The focus of this task was not only to make things work, but to show how I approach building components, structuring code, and making decisions in a real-world scenario.

Thank you for reviewing my work!
