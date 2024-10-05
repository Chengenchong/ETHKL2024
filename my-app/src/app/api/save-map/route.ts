import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { imageData } = await req.json();
    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    
    const fileName = `map_${Date.now()}.png`;
    const filePath = path.join(process.cwd(), 'public', 'saved_maps', fileName);
    
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, base64Data, 'base64');
    
    return NextResponse.json({ filePath: `/saved_maps/${fileName}` });
  } catch (error) {
    console.error('Error saving map:', error);
    return NextResponse.json({ error: 'Failed to save map' }, { status: 500 });
  }
}