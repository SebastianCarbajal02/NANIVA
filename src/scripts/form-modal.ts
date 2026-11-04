// "loading": pantalla de carga mientras se envía (sin botones, no se puede cerrar); al llamar a show()
// con 'success' o 'error' el mismo modal cambia de estado sin cerrarse
export type ModalKind = 'success' | 'error' | 'loading';

interface FormModalOptions {
  autoCloseMs?: number;
}

const ICONS: Record<ModalKind, string> = {
  success:
    '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  error:
    '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  loading:
    '<svg class="form-modal-spinner" viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="9" opacity="0.2"/><circle cx="12" cy="12" r="9" stroke-dasharray="14 43"/></svg>',
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function initFormModal(rootId = 'formModal', options: FormModalOptions = {}) {
  const autoCloseMs = options.autoCloseMs ?? 5000;
  const modal = document.getElementById(rootId);
  const noop = () => {};
  if (!modal) return { show: noop, hide: noop };

  const icon = modal.querySelector<HTMLElement>('.form-modal-icon');
  const titleEl = modal.querySelector<HTMLElement>('.form-modal h3');
  const messageEl = modal.querySelector<HTMLElement>('.form-modal p');
  const progress = modal.querySelector<HTMLElement>('.form-modal-progress');
  const closeBtn = modal.querySelector<HTMLButtonElement>('.form-modal-close');
  const okBtn = modal.querySelector<HTMLButtonElement>('.form-modal-btn');

  let lastFocused: HTMLElement | null = null;
  let autoCloseTimer: ReturnType<typeof setTimeout> | null = null;

  function clearAutoClose() {
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }
  }

  const cargando = () => modal?.classList.contains('is-loading') ?? false;

  function onKeydown(e: KeyboardEvent) {
    if (cargando()) {
      // Mientras se envía no se cierra ni se sale del modal con el teclado
      if (e.key === 'Escape' || e.key === 'Tab') e.preventDefault();
      return;
    }
    if (e.key === 'Escape') {
      hide();
      return;
    }
    if (e.key !== 'Tab' || !modal) return;
    const focusables = Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function cancelAutoCloseVisual() {
    clearAutoClose();
    if (progress) {
      progress.style.transitionDuration = '0s';
      progress.style.width = '100%';
    }
  }

  function hide() {
    if (!modal || modal.hidden) return;
    clearAutoClose();
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onKeydown);
    modal.removeEventListener('pointerdown', cancelAutoCloseVisual);
    lastFocused?.focus();
  }

  function show(kind: ModalKind, titleText: string, messageText: string) {
    if (!modal) return;
    const abierto = !modal.hidden;
    const cambiaIcono = !modal.classList.contains(`is-${kind}`);
    // Si ya estaba abierto (pantalla de carga), se conserva el foco de antes de abrirlo
    if (!abierto) lastFocused = document.activeElement as HTMLElement | null;

    modal.classList.toggle('is-success', kind === 'success');
    modal.classList.toggle('is-error', kind === 'error');
    modal.classList.toggle('is-loading', kind === 'loading');
    modal.setAttribute('aria-busy', String(kind === 'loading'));
    if (icon && (cambiaIcono || !abierto)) {
      icon.innerHTML = ICONS[kind];
      // Vuelve a animar la entrada del ícono al pasar de la carga al resultado
      icon.style.animation = 'none';
      void icon.offsetWidth;
      icon.style.animation = '';
    }
    if (titleEl) titleEl.textContent = titleText;
    if (messageEl) messageEl.textContent = messageText;

    if (!abierto) {
      modal.hidden = false;
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', onKeydown);
    }
    if (kind === 'loading') modal.querySelector<HTMLElement>('.form-modal')?.focus();
    else (okBtn ?? closeBtn)?.focus();

    clearAutoClose();
    if (kind === 'loading' && progress) {
      // La barra de abajo avanza en bucle por CSS mientras dure la carga
      progress.style.transitionDuration = '0s';
      progress.style.width = '';
    } else if (kind === 'success' && autoCloseMs > 0 && progress) {
      progress.style.transitionDuration = '0s';
      progress.style.width = '100%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progress.style.transitionDuration = `${autoCloseMs}ms`;
          progress.style.width = '0%';
        });
      });
      autoCloseTimer = setTimeout(hide, autoCloseMs);
      modal.addEventListener('pointerdown', cancelAutoCloseVisual, { once: true });
    } else if (progress) {
      progress.style.transitionDuration = '0s';
      progress.style.width = '0%';
    }
  }

  closeBtn?.addEventListener('click', hide);
  okBtn?.addEventListener('click', hide);
  modal.addEventListener('click', (e) => {
    if (e.target === modal && !cargando()) hide();
  });

  return { show, hide };
}
