export default {
  gatrackQueue: (category: string, event: string, payload?: unknown) => {
    console.log(`gatrackQueue: ${category}, ${event}`, payload);
  }
};
