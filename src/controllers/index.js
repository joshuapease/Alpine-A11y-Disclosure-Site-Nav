import Alpine from "alpinejs";
import focus from "@alpinejs/focus";

window.Alpine = Alpine;

Alpine.plugin(focus);

Alpine.data("nav", () => ({
  /** @type {string[]} */
  stack: [],

  popStack() {
    this.stack = this.stack.slice(0, -1);
  },

  toggle(el) {
    const indexStr = el.dataset.index;
    const id = el.id;
    const index = parseInt(indexStr, 10);
    const currentIndex = this.stack.length - 1;

    if (index > currentIndex) {
      this.stack.push(id);
    } else {
      const popTimes = currentIndex - index + 1;
      const idInCurrentStack = this.stack.includes(id);

      // Remove everything down to the level you clicked.
      for (let i = 0; i < popTimes; i++) {
        this.popStack();
      }

      // If you clicked a toggle outside of the current stack, push it to the stack
      if (!idInCurrentStack) {
        this.stack.push(id);
      }
    }
  },

  shouldTrap(el) {
    return this.isInStack(el);
  },

  isHidden(el) {
    return !this.isInStack(el);
  },

  isInStack(el) {
    return this.stack.includes(el.id);
  },
}));

Alpine.start();
