let unauthorizedHandler: (() => void) | null = null;

export function registerUnauthorizedHandler(handler: () => void) {
  unauthorizedHandler = handler;
}

export function triggerUnauthorized() {
  if (unauthorizedHandler) {
    unauthorizedHandler();
  }
}