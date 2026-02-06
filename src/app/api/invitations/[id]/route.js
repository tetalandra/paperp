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

export async function GET(req, { params }) {
    try {
        const userId = await getUserId();
        if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        await dbConnect();
        const invitation = await Invitation.findOne({ _id: id, user: userId });
        if (!invitation) return NextResponse.json({ message: 'Not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: invitation });
    } catch (error) {
        return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const userId = await getUserId();
        if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const body = await req.json();
        await dbConnect();

        const invitation = await Invitation.findOneAndUpdate(
            { _id: id, user: userId },
            body,
            { new: true, runValidators: true }
        );

        if (!invitation) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json({ success: true, data: invitation });
    } catch (error) {
        return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const userId = await getUserId();
        if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        await dbConnect();
        const invitation = await Invitation.findOneAndDelete({ _id: id, user: userId });
        if (!invitation) return NextResponse.json({ message: 'Not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
    }
}
