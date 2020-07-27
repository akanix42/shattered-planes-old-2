declare module '*.kb.yaml' {
  const content: { [commandName: string]: string };
  export default content;
}
