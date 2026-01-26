import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "cars.json");

async function readCars() {
  const raw = await fs.readFile(dataPath, "utf8");
  return JSON.parse(raw);
}

async function writeCars(data: any) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");
}

export async function GET() {
  try {
    const cars = await readCars();
    return NextResponse.json(cars);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newCar = await req.json();
    const cars = await readCars();

    if (cars.find((c: any) => c.slug === newCar.slug)) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    cars.push(newCar);
    await writeCars(cars);
    return NextResponse.json(newCar, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    const updated = await req.json();
    const cars = await readCars();
    const idx = cars.findIndex((c: any) => c.slug === slug);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    cars[idx] = { ...cars[idx], ...updated };
    await writeCars(cars);
    return NextResponse.json(cars[idx]);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    const cars = await readCars();
    const filtered = cars.filter((c: any) => c.slug !== slug);
    if (filtered.length === cars.length) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await writeCars(filtered);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
