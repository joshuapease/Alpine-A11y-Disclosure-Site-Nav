import Alpine from "alpinejs";
import focus from "@alpinejs/focus";

window.Alpine = Alpine;

Alpine.plugin(focus);

Alpine.data("nav", () => ({
  /** @type {string[]} */
  stack: [],
  popStack(popTimes = 1) {
    this.stack = this.stack.slice(0, popTimes * -1);
  },
  resetStack() {
    this.stack = [];
  },
  toggle(el) {
    const index = parseInt(el.dataset.index, 10);
    const currentIndex = this.stack.length - 1;
    const shouldPush = !this.isInStack(el);
    if (index <= currentIndex) {
      // Remove everything down to the index you clicked.
      this.popStack(currentIndex - index + 1);
    }
    // If you clicked a toggle outside of the current stack, push it to the stack
    if (shouldPush) {
      this.stack.push(el.id);
    }
  },
  shouldTrap(el) {
    // You could modify this to only trap at a mobile sized match media
    return this.isInStack(el);
  },
  isInStack(el) {
    return this.stack.includes(el.id);
  },
}));

Alpine.start();
