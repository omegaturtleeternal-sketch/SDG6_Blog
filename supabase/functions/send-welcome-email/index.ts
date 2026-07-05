import { Resend } from 'npm:resend@4.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY')!);

Deno.serve(async (req) => {
  const payload = await req.json();
  const email = payload.record?.email;

  if (!email) {
    return new Response('No email found', { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Ctrl+Sea <onboarding@resend.dev>',
    to: email,
    subject: 'Welcome to Ctrl+Sea',
    html: `<p>Thanks for subscribing to Ctrl+Sea — from river to coast, you're now part of the mission.</p>`,
  });

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ success: true });
});