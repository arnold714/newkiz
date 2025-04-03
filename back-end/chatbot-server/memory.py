from collections import defaultdict

chat_memory = defaultdict(list)  # {session_id: [(q, a)]}

def add_to_history(session_id, question, answer):
    chat_memory[session_id].append((question, answer))

def get_history(session_id):
    return chat_memory[session_id]