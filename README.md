# Suhani Mathur - Portfolio Website

A modern, responsive portfolio website built with React.js showcasing Suhani Mathur's work as a UI/UX and Graphic Designer.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimalist design with smooth animations
- **Professional Layout**: Well-organized sections for projects, experience, and skills
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: Semantic HTML and proper ARIA labels

## Sections

1. **Header**: Sticky navigation with logo and menu
2. **Hero**: Introduction with call-to-action buttons
3. **About**: Personal background and profile photo
4. **Toolbox**: Skills and technologies in pill-shaped boxes
5. **Projects**: Portfolio of selected works
6. **Work Experience**: Timeline of professional experience
7. **Footer**: Contact information and social links

## Technologies Used

- React.js 19
- CSS3 (Custom styling, no frameworks)
- HTML5
- Vite (Build tool)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

```bash
npm run dev
```

The website will open in your browser at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Toolbox.jsx
│   ├── Projects.jsx
│   ├── WorkExperience.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Customization

### Colors
The website uses a carefully selected color palette:
- Primary Accent: Rosy Brown (#AE8094)
- Secondary Accent: Thistle (#EED7DB)
- Background: Light neutral (#FBF9F9)
- Text: Dim Gray (#58443E)

### Typography
- Font Family: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Adding New Projects
Edit the `projects` array in `src/components/Projects.jsx` to add new portfolio items.

### Updating Work Experience
Edit the `experiences` array in `src/components/WorkExperience.jsx` to update professional experience.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for personal portfolio use.

## Contact

For any questions or suggestions, please reach out to Suhani Mathur.

### Contact Form Email (EmailJS)

Create a `.env` file in the project root with these variables from EmailJS:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

In your EmailJS template, map these fields: `from_name`, `reply_to`, `subject`, `message`.
