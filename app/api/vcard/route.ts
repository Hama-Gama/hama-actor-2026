import { NextResponse } from 'next/server'
import { ACTOR_VCARD } from '@/lib/vcard-config'

export async function GET() {
	const vcard = [
		'BEGIN:VCARD',
		'VERSION:3.0',
		`N:${ACTOR_VCARD.lastName};${ACTOR_VCARD.firstName};;;`,
		`FN:${ACTOR_VCARD.firstName} ${ACTOR_VCARD.lastName}`,
		'NICKNAME:Hama, Хама, 하마',
		`TITLE:${ACTOR_VCARD.title}`,
		'TEL;TYPE=CELL,VOICE,NONE:+77002541195',
		'EMAIL;TYPE=INTERNET:ardager121@mail.ru',
		'URL:https://hama-actor.com',
		'END:VCARD',
	].join('\r\n')

	return new NextResponse(vcard, {
		status: 200,
		headers: {
			'Content-Type': 'text/vcard; charset=utf-8',
			'Content-Disposition': 'attachment; filename="Khamit_Arkayev.vcf"',
		},
	})
}


