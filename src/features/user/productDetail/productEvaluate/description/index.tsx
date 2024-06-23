import { renderDescription } from "@/utils/renderText";

interface Props {
  product: ProductState | null;
}

const Description = ({ product }: Props) => {
  return renderDescription(product?.contentMarkdown)
};

export default Description;
