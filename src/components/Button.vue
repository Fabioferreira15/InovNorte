<template>
  <button :class="buttonClasses" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      String,
      default: "button",
    },
    variant: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "medium",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      return [
        "custom-button",
        `custom-button--${this.variant}`,
        `custom-button--${this.size}`,
      ];
    },
  },
};
</script>

<style scoped>
.custom-button {
  font-family: var(--font-title);
  font-weight: 700;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color;
}

/* Variants */
.custom-button--primary {
  background-color: var(--color-primary-100);
  color: var(--color-text-light);
}
.custom-button--secondary {
  background-color: var(--color-secondary-100);
  color: var(--color-text-light);
}
.custom-button--tertiary {
  background-color: transparent;
  color: var(--color-primary-100);
  border: 1px solid var(--color-primary-100);
}

/* Sizes */

.custom-button--large {
  padding: 1rem 2rem;
  font-size: 1.25rem;
  font-family: var(--font-title);
  letter-spacing: 1.5px;
}
.custom-button--medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}
.custom-button--small {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

/* disabled */

.custom-button:disabled {
  background-color: rgb(135, 94, 160);
  color: #a0a0a0;
  cursor: not-allowed;
  border: none;
}
.custom-button--tertiary:disabled {
  background-color: transparent;
  color: #a0a0a0;
  border: 1px solid #a0a0a0;
}
</style>
