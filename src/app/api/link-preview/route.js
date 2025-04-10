import { getLinkPreview } from "link-preview-js";

export const runtime = "edge";

export async function POST(req, res) {
  const { url } = await req.json();
  const meta = await getLinkPreview(url);
  return Response.json({ ...meta });
}
