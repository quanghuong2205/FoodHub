export const sendEvent = (
  eventName: string,
  detail?: unknown,
  context: Document | Window = document,
) => {
  context.dispatchEvent(new CustomEvent(eventName, { detail }));
};

export const listenEvent = (
  eventName: string,
  handler: (e: Event) => void,
  context: Document | Window = document,
) => {
  context.addEventListener(eventName, handler);
  return () => {
    context.removeEventListener(eventName, handler);
  };
};
