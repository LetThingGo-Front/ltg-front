import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.url.slice(req.url.indexOf("?"));
  const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc${searchParams}&output=json&orders=roadaddr`;
  const naverResponse = await fetch(url, {
    method: "GET",
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_MAPS_CLIENT_ID!,
      "X-NCP-APIGW-API-KEY": process.env.NAVER_MAPS_CLIENT_SECRET!,
    },
  });
  if (!naverResponse.ok) {
    throw new Error(`Naver API 요청 오류: ${naverResponse.statusText}`);
  }
  const data = await naverResponse.json(); // Naver API 응답 받기
  return NextResponse.json(data); // 클라이언트에 응답 보내기
}
