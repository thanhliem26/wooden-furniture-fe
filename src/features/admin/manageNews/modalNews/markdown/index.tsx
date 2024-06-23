import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

interface Props {
  handleEditorChange: ({ html, text }) => void;
  markdown: { html: string; text: string };
  showMarkDown: boolean;
}

const MarkdownProduct = ({ handleEditorChange, markdown, showMarkDown }: Props) => {
  if(!showMarkDown) return null;

  return (
    <MdEditor
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
      defaultValue={markdown.text}
    />
  );
};

export default MarkdownProduct;
