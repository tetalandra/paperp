import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Invitation from '@/models/Invitation';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'paperpop_secret_key_change_me';

async function getUserId() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.id;
    } catch (e) {
        return null;
    }
}

export async function POST(req) {
    try {
        const userId = await getUserId();
        if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { templateId } = await req.json();
        await dbConnect();

        const invitation = await Invitation.findOne({ _id: templateId, user: userId });
        if (!invitation) return NextResponse.json({ message: 'Template not found' }, { status: 404 });

        // For "download", we might just return the data or log the download
        // In this app, the actual PDF generation is client-side, 
        // so this route might just be for tracking or retrieving specific data.
        return NextResponse.json({
            success: true,
            data: invitation
        });
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}
