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

export async function GET(req) {
    try {
        const userId = await getUserId();
        if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const q = searchParams.get('q');
        const type = searchParams.get('type');
        const variant = searchParams.get('variant');

        let query = { user: userId };

        if (q) {
            query.$or = [
                { title: { $regex: q, $options: 'i' } },
                { subtitle: { $regex: q, $options: 'i' } }
            ];
        }

        if (type) query.templateType = type;
        if (variant) query.variant = parseInt(variant);

        await dbConnect();
        const templates = await Invitation.find(query).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            count: templates.length,
            data: templates
        });
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}
