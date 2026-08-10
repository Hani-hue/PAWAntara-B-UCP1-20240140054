const chatWindow = document.getElementById('chat-window');
const form = document.getElementById('chat-form');
const input = document.getElementById('pertanyaan');

function addBubble(text, from) {
  const bubble = document.createElement('article');
  bubble.className = `chat-bubble chat-bubble-${from}`;
  const p = document.createElement('p');
  p.textContent = text;
  bubble.appendChild(p);
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addBubble(message, 'user');
  input.value = '';

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  const json = await res.json();
  addBubble(json.status === 'success' ? json.data.reply : json.message, 'ai');
});
