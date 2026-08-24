import { NextResponse } from 'next/server'
import { ACTOR_VCARD } from '@/lib/vcard-config'

export async function GET() {
	const { firstName, lastName, title, phone, email, website, photoUrl } =
		ACTOR_VCARD

	const lines = [
		'BEGIN:VCARD',
		'VERSION:3.0',
		`N:${lastName};${firstName};;;`,
		`FN:${firstName} ${lastName}`,
		`TITLE:${title}`,
		`TEL;TYPE=CELL,VOICE:${phone}`,
		`EMAIL;TYPE=INTERNET:${email}`,
		`URL:${website}`,
		photoUrl ? `PHOTO;VALUE=URI:${photoUrl}` : null,
		'END:VCARD',
	].filter(Boolean)

	const vcard = lines.join('\r\n')

	return new NextResponse(vcard, {
		headers: {
			// text/vcard критично — именно от него iOS/Android триггерят
			// "Добавить контакт" вместо обычной загрузки файла
			'Content-Type': 'text/vcard; charset=utf-8',
			'Content-Disposition': `attachment; filename="${firstName}_${lastName}.vcf"`,
		},
	})
}
