import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.url.slice(req.url.indexOf("?"));
  const url = `https://business.juso.go.kr/addrlink/addrLinkApi.do${searchParams}&currentPage=1&countPerPage=5&confmKey=${process.env.CONFIRM_KEY!}`;
  const bodyData = new URLSearchParams({
    resultType: "json",
  });
  const jusoResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: bodyData.toString(),
  });

  const data = await jusoResponse.json();
  return NextResponse.json(data);
}
