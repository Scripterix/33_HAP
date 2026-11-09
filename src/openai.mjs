export async function generate(instructions, input) {
  const key = process.env.OPENAI_API_KEY;
  if (!key || key === 'sk-your-key-here') throw new Error('Ustaw OPENAI_API_KEY w .env');
  const model = process.env.OPENAI_MODEL || 'gpt-5-mini';
  const max_output_tokens = Number(process.env.MAX_OUTPUT_TOKENS || 3500);
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, instructions, input, max_output_tokens })
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(`OpenAI ${response.status}: ${JSON.stringify(payload.error || payload)}`);
  const text = (payload.output || []).flatMap(item => item.content || [])
    .filter(part => part.type === 'output_text').map(part => part.text).join('\n').trim();
  if (!text) throw new Error(`Model nie zwrócił tekstu (status: ${payload.status || 'nieznany'})`);
  return { text, usage: payload.usage, model: payload.model || model };
}
