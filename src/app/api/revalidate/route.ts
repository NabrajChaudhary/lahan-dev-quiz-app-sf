import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const tags = request.nextUrl.searchParams.get("tag");
  const key = request.nextUrl.searchParams.get("key");
  if (key !== process.env.REVALIDATION_HASH_KEY) {
    return Response.json({ revalidated: "false" }, { status: 400 });
  }
  tags?.split(",").forEach((x) => {
    revalidateTag(x);
  });
  // revalidateTag(tag as string);
  return Response.json({ revalidated: "success", tags: tags });
}
