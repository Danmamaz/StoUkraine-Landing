import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/utils";

/** next/image that also works when the landing lives under a basePath */
export default function Img({ src, alt, ...rest }: Omit<ImageProps, "src"> & { src: string }) {
  return <Image src={withBasePath(src)} alt={alt} {...rest} />;
}
