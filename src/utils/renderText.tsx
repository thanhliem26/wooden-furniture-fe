export function renderDescription(text: string) {
  return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
}
