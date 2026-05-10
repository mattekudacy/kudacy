import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');

  if (slug) {
    const filePath = path.join(process.cwd(), 'src/data/posts', `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return NextResponse.json({ slug, raw });
  }

  return NextResponse.json(getAllPosts());
}
