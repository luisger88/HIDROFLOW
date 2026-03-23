/**
 * Enfoca una sección por texto visible en el DOM
 * SIN tocar componentes internos
 */
export function focusByHeading(texto) {
  setTimeout(() => {
    const headings = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5")
    );

    const target = headings.find(h =>
      h.textContent?.toLowerCase().includes(texto.toLowerCase())
    );

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("focus-highlight");

      setTimeout(() => {
        target.classList.remove("focus-highlight");
      }, 2500);
    }
  }, 300);
}
